import eggReferenceBase64 from "@/assets/maestro/egg-reference.b64.txt?raw";
import foodLabMarkBase64 from "@/assets/maestro/food-lab-mark.b64.txt?raw";
import protein11Base64 from "@/assets/maestro/protein11.b64.txt?raw";

const imageData = (mime: string, value: string) =>
  `data:${mime};base64,${value.trim()}`;

export const maestroAssets = {
  eggReference: imageData("image/png", eggReferenceBase64),
  foodLabMark: imageData("image/png", foodLabMarkBase64),
  protein11: imageData("image/jpeg", protein11Base64),
};
