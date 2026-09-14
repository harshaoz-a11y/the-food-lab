export type FieldScene = "morning" | "desk" | "evening";

type FieldCharacterProps = {
  scene: FieldScene;
};

export function FieldCharacter({ scene }: FieldCharacterProps) {
  if (scene === "morning") {
    return (
      <svg viewBox="0 0 240 170" aria-hidden="true" className="field-character-svg">
        <path d="M17 139C24 88 58 29 120 22c61-7 97 44 101 117Z" fill="#f3e4c9" />
        <circle cx="39" cy="42" r="20" fill="#fff8e9" stroke="#9a433b" strokeWidth="3" />
        <path d="M39 29v14l9 6M28 18l-8 8M50 18l8 8" fill="none" stroke="#9a433b" strokeLinecap="round" strokeWidth="3" />
        <path d="M87 76c-7-31 12-49 34-49 23 0 41 19 34 50Z" fill="#49342c" />
        <circle cx="147" cy="29" r="14" fill="#49342c" />
        <path d="M93 65c0-27 13-39 30-39 19 0 31 14 31 39v17c0 24-13 38-31 38-17 0-30-14-30-38Z" fill="#d99b78" stroke="#173b30" strokeWidth="2.5" />
        <path d="M92 64c4-25 20-38 36-38 16 0 27 10 30 30-17 0-31-5-41-15-4 10-13 18-25 23Z" fill="#49342c" />
        <path d="M103 73c5-4 10-4 15 0M133 73c4-4 9-4 13 0M116 97c6 3 12 3 18-1" fill="none" stroke="#173b30" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="111" cy="78" r="2" fill="#173b30" /><circle cx="140" cy="78" r="2" fill="#173b30" />
        <path d="M75 153c3-28 20-43 49-43 30 0 50 15 54 43Z" fill="#a84f43" stroke="#173b30" strokeWidth="2.5" />
        <path d="M97 121c7 9 17 14 27 14 11 0 21-5 28-15" fill="none" stroke="#fff8e9" strokeWidth="3" />
        <rect x="174" y="56" width="34" height="51" rx="7" fill="#fff8e9" stroke="#173b30" strokeWidth="2.5" />
        <path d="M183 67h16M181 76h20" stroke="#9a433b" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="191" cy="97" r="3" fill="#9a433b" />
        <path d="M73 111c-10-1-18 4-22 14M67 103c-10-5-20-2-27 8" fill="none" stroke="#9a433b" strokeLinecap="round" strokeWidth="3" />
      </svg>
    );
  }

  if (scene === "desk") {
    return (
      <svg viewBox="0 0 240 170" aria-hidden="true" className="field-character-svg">
        <path d="M14 142C20 70 64 24 123 24c62 0 98 50 103 118Z" fill="#e7b1a2" />
        <path d="M69 151c5-33 24-49 56-49 34 0 54 17 58 49Z" fill="#173b30" stroke="#fff4df" strokeWidth="2.5" />
        <path d="m112 110 13 17 14-17 7 41h-42Z" fill="#fff4df" />
        <path d="m125 127-7 24h17Z" fill="#9a433b" />
        <path d="M91 56c0-27 15-42 35-42 22 0 38 16 38 43v19c0 25-15 39-37 39-21 0-36-14-36-39Z" fill="#bf795d" stroke="#173b30" strokeWidth="2.5" />
        <path d="M88 57c2-31 18-46 40-46 22 0 37 17 38 42-17-2-31-8-41-20-7 12-20 20-37 24Z" fill="#332e2b" />
        <rect x="98" y="62" width="24" height="16" rx="7" fill="none" stroke="#173b30" strokeWidth="3" />
        <rect x="134" y="62" width="24" height="16" rx="7" fill="none" stroke="#173b30" strokeWidth="3" />
        <path d="M122 69h12M105 91c14 6 28 6 43-1" fill="none" stroke="#173b30" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="111" cy="69" r="2" fill="#173b30" /><circle cx="146" cy="69" r="2" fill="#173b30" />
        <rect x="20" y="101" width="65" height="41" rx="5" fill="#fff4df" stroke="#173b30" strokeWidth="2.5" />
        <path d="M31 113h42M31 122h31M31 131h37" stroke="#9a433b" strokeLinecap="round" strokeWidth="2.5" />
        <circle cx="202" cy="51" r="24" fill="#fff4df" stroke="#173b30" strokeWidth="2.5" />
        <path d="M202 36v16l11 7" fill="none" stroke="#9a433b" strokeLinecap="round" strokeWidth="3" />
        <path d="M187 92h38M194 83h25M199 74h20" stroke="#fff4df" strokeLinecap="round" strokeWidth="4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 170" aria-hidden="true" className="field-character-svg">
      <path d="M12 144C19 78 63 30 124 26c59-4 97 45 104 118Z" fill="#cbd0b6" />
      <circle cx="202" cy="36" r="22" fill="#fff4df" />
      <path d="M208 16a22 22 0 1 0 13 32 25 25 0 0 1-13-32Z" fill="#9a433b" />
      <path d="M74 153c4-34 22-51 54-51 33 0 53 17 57 51Z" fill="#203f51" stroke="#173b30" strokeWidth="2.5" />
      <path d="m104 116 24 18 25-18-8 37h-34Z" fill="#f2e7d4" />
      <path d="m95 111 18 42H78c2-22 7-35 17-42Zm66 0-18 42h43c-3-22-11-35-25-42Z" fill="#2d5368" />
      <path d="M96 61c0-27 13-43 34-43 22 0 36 17 36 44v17c0 24-15 38-36 38-20 0-34-14-34-38Z" fill="#c98664" stroke="#173b30" strokeWidth="2.5" />
      <path d="M93 61c2-24 8-38 25-46 17-8 34-3 46 10-11-2-18 1-23 7 15-3 25 3 29 15-18 2-35-3-49-15-5 13-14 23-28 29Z" fill="#202f32" />
      <path d="M105 73c5-3 10-3 15 0M140 73c5-3 9-3 14 0M116 98c8-1 15-1 22 1" fill="none" stroke="#173b30" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M106 83h14M139 83h14" stroke="#785044" strokeLinecap="round" strokeWidth="3" opacity=".55" />
      <circle cx="113" cy="77" r="2" fill="#173b30" /><circle cx="147" cy="77" r="2" fill="#173b30" />
      <circle cx="163" cy="72" r="4" fill="#f2e7d4" stroke="#173b30" strokeWidth="2" />
      <path d="M166 76v12" stroke="#173b30" strokeLinecap="round" strokeWidth="2" />
      <rect x="17" y="112" width="73" height="42" rx="6" fill="#fff4df" stroke="#173b30" strokeWidth="2.5" />
      <path d="M29 125h48M29 135h34M29 145h43" stroke="#9a433b" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M176 119c12 5 18 15 19 29" fill="none" stroke="#c98664" strokeLinecap="round" strokeWidth="9" />
      <rect x="190" y="120" width="30" height="22" rx="5" fill="#173b30" />
      <path d="M198 131h14" stroke="#fff4df" strokeLinecap="round" strokeWidth="2" />
      <path d="M51 98h28M58 90h21M65 82h14" stroke="#9a433b" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
