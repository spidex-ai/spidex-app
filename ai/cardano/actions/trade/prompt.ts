export const CARDANO_TRADE_PROMPT = `Swap tokens using Cardano's native token, ADA.

There are four parameters to swap tokens, all of which are optional:

- inputMint: The mint address of the token to swap
- outputMint: The mint address of the token to receive
- inputAmount: The amount of input token to swap
- slippageBps: The slippage tolerance in basis points (e.g., 100 for 1%)

The user will be shown a swapping UI where they can edit the parameters and swap tokens

Example:
\`\`\`json
{
  "inputMint": "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d",
  "outputMint": "ADA",
  "inputAmount": 1,
  "slippageBps": 5
}
\`\`\`

When the user specifies tokens to swap (e.g., "trade X to Y", "swap A for B"), populate the corresponding parameters:
- The source token should be set as inputMint
- The destination token should be set as outputMint  
- Use "ADA" for Cardano's native token
- For other tokens, use their mint addresses

Only leave parameters undefined if the user doesn't specify them at all.`;
