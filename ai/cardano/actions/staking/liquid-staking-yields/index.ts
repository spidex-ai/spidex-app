import { CARDANO_LIQUID_STAKING_YIELDS_NAME } from "./name";
import { CARDANO_LIQUID_STAKING_YIELDS_PROMPT } from "./prompt";
import { LiquidStakingYieldsInputSchema } from "./input-schema";
import { getLiquidStakingYields } from "./function";
import type { LiquidStakingYieldsResultBodyType } from "./types";
import type { CardanoAction } from "../../cardano-action";


export class CardanoLiquidStakingYieldsAction implements CardanoAction<typeof LiquidStakingYieldsInputSchema, LiquidStakingYieldsResultBodyType> {
  public name = CARDANO_LIQUID_STAKING_YIELDS_NAME;
  public description = CARDANO_LIQUID_STAKING_YIELDS_PROMPT;
  public argsSchema = LiquidStakingYieldsInputSchema;
  public func = getLiquidStakingYields;
} 
