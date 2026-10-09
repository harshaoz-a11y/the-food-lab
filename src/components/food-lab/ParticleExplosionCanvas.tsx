import { useEffect, useRef } from "react";

interface ParticleExplosionProps {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    fromColor: string;
    toColor: string;
    triggerKey: number;
}

// Vertex shader
const VS_SOURCE = `
attribute vec3 aInitialPos;
attribute vec3 aTargetPos;
attribute vec3 aVelocity;
attribute vec3 aSwirlAxis;
attribute vec3 aColor;
attribute float aSize;
attribute float aDelay;

uniform float uProgress;
uniform mat4 uProjection;

varying vec3 vColor;
varying float vAlpha;

void main() {
    float p = clamp((uProgress - aDelay) / (1.0 - aDelay), 0.0, 1.0);
    
    // Ease out explosion, ease in magnetic assembly
    float blast = sin(p * 3.14159265);
    
    // Blend from initial position to target position
    vec3 currentPos = mix(aInitialPos, aTargetPos, smoothstep(0.15, 0.95, p));
    
    // 3D explosion & swirl turbulence flying toward & away from user (Z depth)
    vec3 displacement = aVelocity * blast * 2.8;
    vec3 swirl = cross(aVelocity, aSwirlAxis) * sin(p * 6.28318) * blast * 1.5;
    currentPos += displacement + swirl;
    
    vColor = aColor;
    vAlpha = smoothstep(0.0, 0.1, p) * smoothstep(1.0, 0.85, p) * 0.95 + 0.05;
    
    vec4 pos = uProjection * vec4(currentPos, 1.0);
    gl_Position = pos;
    gl_PointSize = max(1.5, aSize * (1.0 + blast * 1.8) * (800.0 / (pos.w > 0.0 ? pos.w : 1.0)));
}
`;

// Fragment shader: round, soft particles with glow
const FS_SOURCE = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;

void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) {
        discard;
    }
    float core = 1.0 - smoothstep(0.0, 0.5, dist);
    float glow = exp(-dist * 4.0);
    gl_FragColor = vec4(vColor, vAlpha * (core * 0.85 + glow * 0.35));
}
`;

function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace("#", "");
    if (clean.length === 3) {
        return [
            parseInt(clean[0] + clean[0], 16) / 255,
            parseInt(clean[1] + clean[1], 16) / 255,
            parseInt(clean[2] + clean[2], 16) / 255
        ];
    }
    return [
        parseInt(clean.substring(0, 2), 16) / 255,
        parseInt(clean.substring(2, 4), 16) / 255,
        parseInt(clean.substring(4, 6), 16) / 255
    ];
}

export function ParticleExplosionCanvas({
    sourceX,
    sourceY,
    targetX,
    targetY,
    fromColor,
    toColor,
    triggerKey
}: ParticleExplosionProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", { alpha: true, antialias: true, depth: false });
        if (!gl) return;

        // Compile shaders
        function compileShader(type: number, src: string) {
            const shader = gl!.createShader(type)!;
            gl!.shaderSource(shader, src);
            gl!.compileShader(shader);
            return shader;
        }

        const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
        const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Resize canvas to client bounds
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);

        const PARTICLE_COUNT = 750;
        const initialPos = new Float32Array(PARTICLE_COUNT * 3);
        const targetPos = new Float32Array(PARTICLE_COUNT * 3);
        const velocity = new Float32Array(PARTICLE_COUNT * 3);
        const swirlAxis = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const delays = new Float32Array(PARTICLE_COUNT);

        const c1 = hexToRgb(fromColor);
        const c2 = hexToRgb(toColor);

        // Convert percentage coordinates (0-100) to WebGL coordinate space (-1 to 1)
        const sx = ((sourceX / 100) * 2 - 1) * 1.3;
        const sy = (1 - (sourceY / 100) * 2) * 1.1;
        const tx = ((targetX / 100) * 2 - 1) * 1.3;
        const ty = (1 - (targetY / 100) * 2) * 1.1;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            // Spread initial position around the source interaction zone
            const angle1 = Math.random() * Math.PI * 2;
            const r1 = Math.random() * 0.12;
            initialPos[i3] = sx + Math.cos(angle1) * r1;
            initialPos[i3 + 1] = sy + Math.sin(angle1) * r1;
            initialPos[i3 + 2] = (Math.random() - 0.5) * 0.1;

            // Target assembly position around the destination zone
            const angle2 = Math.random() * Math.PI * 2;
            const r2 = Math.random() * 0.14;
            targetPos[i3] = tx + Math.cos(angle2) * r2;
            targetPos[i3 + 1] = ty + Math.sin(angle2) * r2;
            targetPos[i3 + 2] = (Math.random() - 0.5) * 0.1;

            // 3D explosion vectors with deep Z (flying toward/away from user)
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const speed = 0.5 + Math.random() * 0.95;

            velocity[i3] = Math.sin(phi) * Math.cos(theta) * speed * 1.2;
            velocity[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed * 0.9;
            velocity[i3 + 2] = Math.cos(phi) * speed * 1.8; // intense Z flight

            // Swirl orientation
            swirlAxis[i3] = Math.random() - 0.5;
            swirlAxis[i3 + 1] = Math.random() - 0.5;
            swirlAxis[i3 + 2] = Math.random() - 0.5;

            // Gradient interpolation from origin color to destination color
            const mixRatio = Math.random();
            colors[i3] = c1[0] * (1 - mixRatio) + c2[0] * mixRatio;
            colors[i3 + 1] = c1[1] * (1 - mixRatio) + c2[1] * mixRatio;
            colors[i3 + 2] = c1[2] * (1 - mixRatio) + c2[2] * mixRatio;

            sizes[i] = 2.5 + Math.random() * 3.5;
            delays[i] = Math.random() * 0.18;
        }

        function createBuffer(data: Float32Array, attribName: string, size: number) {
            const buffer = gl!.createBuffer();
            gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
            gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.STATIC_DRAW);
            const loc = gl!.getAttribLocation(program, attribName);
            if (loc !== -1) {
                gl!.enableVertexAttribArray(loc);
                gl!.vertexAttribPointer(loc, size, gl!.FLOAT, false, 0, 0);
            }
            return buffer;
        }

        const bInit = createBuffer(initialPos, "aInitialPos", 3);
        const bTarget = createBuffer(targetPos, "aTargetPos", 3);
        const bVel = createBuffer(velocity, "aVelocity", 3);
        const bSwirl = createBuffer(swirlAxis, "aSwirlAxis", 3);
        const bCol = createBuffer(colors, "aColor", 3);
        const bSize = createBuffer(sizes, "aSize", 1);
        const bDelay = createBuffer(delays, "aDelay", 1);

        // Perspective projection matrix
        const aspect = canvas.width / canvas.height;
        const fov = 45 * (Math.PI / 180);
        const near = 0.1;
        const far = 100.0;
        const f = 1.0 / Math.tan(fov / 2);
        const nf = 1 / (near - far);

        const proj = new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, (2 * far * near) * nf, 0
        ]);

        const uProgressLoc = gl.getUniformLocation(program, "uProgress");
        const uProjLoc = gl.getUniformLocation(program, "uProjection");
        gl.uniformMatrix4fv(uProjLoc, false, proj);

        let animationFrameId: number;
        const duration = 1200; // ms
        const startTime = performance.now();

        function render(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(1.0, elapsed / duration);

            gl!.clearColor(0, 0, 0, 0);
            gl!.clear(gl!.COLOR_BUFFER_BIT);

            gl!.uniform1f(uProgressLoc, progress);
            gl!.drawArrays(gl!.POINTS, 0, PARTICLE_COUNT);

            if (progress < 1.0) {
                animationFrameId = requestAnimationFrame(render);
            }
        }

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteBuffer(bInit);
            gl.deleteBuffer(bTarget);
            gl.deleteBuffer(bVel);
            gl.deleteBuffer(bSwirl);
            gl.deleteBuffer(bCol);
            gl.deleteBuffer(bSize);
            gl.deleteBuffer(bDelay);
            gl.deleteProgram(program);
        };
    }, [triggerKey, sourceX, sourceY, targetX, targetY, fromColor, toColor]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-explosion-canvas pointer-events-none absolute inset-0 z-20 h-full w-full"
            aria-hidden="true"
        />
    );
}
