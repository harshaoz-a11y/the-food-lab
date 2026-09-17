import eggReferenceBase64 from "@/assets/maestro/egg-reference.b64.txt?raw";
import alchemyBarBase64 from "@/assets/maestro/alchemyBar.b64.txt?raw";

const imageData = (mime: string, value: string) =>
  `data:${mime};base64,${value.trim()}`;

export const maestroAssets = {
  eggReference: imageData("image/png", eggReferenceBase64),
  alchemyBar: imageData("image/jpeg", alchemyBarBase64),
};
