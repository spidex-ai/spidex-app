import { CARDANO_BUBBLE_MAPS_NAME } from "./name";
import { CARDANO_BUBBLE_MAPS_PROMPT } from "./prompt";
import { BubbleMapsArgumentsSchema } from "./input-schema";

import type { CardanoAction } from "../../cardano-action";
import type { CardanoBubbleMapsResultBodyType } from "./types";


export class CardanoGetBubbleMapsAction implements CardanoAction<typeof BubbleMapsArgumentsSchema, CardanoBubbleMapsResultBodyType> {  
  public name = CARDANO_BUBBLE_MAPS_NAME;
  public description = CARDANO_BUBBLE_MAPS_PROMPT;
  public argsSchema = BubbleMapsArgumentsSchema;
} 