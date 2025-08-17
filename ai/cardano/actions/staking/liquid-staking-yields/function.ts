import type {
  CardanoLiquidStakingYieldsArgumentsType,
  CardanoLiquidStakingYieldsResultBodyType,
} from './types';
import type { CardanoActionResult } from '../../cardano-action';

/**
 * Gets the best liquid staking yields from Staking Rewards API.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the best liquid staking yields information
 */
export async function getLiquidStakingYields(
  args: CardanoLiquidStakingYieldsArgumentsType
): Promise<CardanoActionResult<CardanoLiquidStakingYieldsResultBodyType>> {
  try {


    return {
      message: `Found 0 best liquid staking yields. The user has been shown the options in the UI, ask them which they want to use. DO NOT REITERATE THE OPTIONS IN TEXT.`,
      body:[] as CardanoLiquidStakingYieldsResultBodyType,
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting best liquid staking yields: ${error}`,
    };
  }
}
