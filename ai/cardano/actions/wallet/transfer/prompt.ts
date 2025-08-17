export const CARDANO_TRANSFER_PROMPT = `Transfer tokens or ADA to another address (also called as wallet address).

Required parameters:
- to: The recipient's wallet address (e.g., "addr1q9h3k6j4e90ngm0pnj4e7c9al5s3g89v5jc4l8uf6s6x8xcn6nyscl6zg8hqx40dv32x77d09c0tw77v2hddcd2pqvgs8rwr3r")
- amount: The amount to transfer (e.g., 1 or 0.01)

Optional parameters:
- mint: The token's mint address (e.g., "4e7c2d6a9f98c5dcf92b4f9ae8c3a708e4f2de1c52acfaedcf4e3a7d494441"). If not provided, transfers ADA.`;
