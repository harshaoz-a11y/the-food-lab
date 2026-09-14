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
      <path d="M13 142C21 76 61 30 123 25c61-4 99 44 104 117Z" fill="#cbd0b6" />
      <circle cx="199" cy="38" r="22" fill="#fff4df" />
      <path d="M205 18a22 22 0 1 0 13 32 25 25 0 0 1-13-32Z" fill="#9a433b" />
      <path d="M72 152c3-35 22-53 55-53 34 0 56 18 59 53Z" fill="#4b5c56" stroke="#173b30" strokeWidth="2.5" />
      <path d="m115 108 13 17 14-17 5 44h-39Z" fill="#e9dfca" />
      <path d="m128 124-7 28h17Z" fill="#9a433b" />
      <path d="M92 57c0-28 14-43 35-43 22 0 37 16 37 44v19c0 25-15 39-37 39-21 0-35-14-35-39Z" fill="#bd805f" stroke="#173b30" strokeWidth="2.5" />
      <path d="M89 58c2-31 17-47 40-47 23 0 37 17 38 43-20 0-35-7-44-20-7 12-18 20-34 24Z" fill="#2f302d" />
      <path d="M101 72c5-3 10-3 15 0M138 72c5-3 10-3 14 0M111 98c11-2 20-2 29 1" fill="none" stroke="#173b30" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M101 83h16M137 83h16" stroke="#785044" strokeLinecap="round" strokeWidth="3" opacity=".6" />
      <circle cx="109" cy="76" r="2" fill="#173b30" /><circle cx="145" cy="76" r="2" fill="#173b30" />
      <path d="M166 113c13 5 20 16 21 33M160 118l-16 20" fill="none" stroke="#bd805f" strokeLinecap="round" strokeWidth="9" />
      <rect x="18" y="111" width="74" height="42" rx="5" fill="#fff4df" stroke="#173b30" strokeWidth="2.5" />
      <path d="M30 124h47M30 134h36M30 144h42" stroke="#9a433b" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M194 111h27v31h-27zM197 104h21" fill="#fff4df" stroke="#173b30" strokeLinejoin="round" strokeWidth="2.5" />
      <path d="M202 120h11M202 129h7" stroke="#9a433b" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}
