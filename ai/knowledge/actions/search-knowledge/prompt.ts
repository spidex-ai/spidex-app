export const SEARCH_KNOWLEDGE_PROMPT = `This tool searches a vector database that is filled with information about blockchain protocols and concepts.

You should call this tool when a user asks a question about a specific protocol or concept that you need specific or up-to-date information about.

There are documents cover:

The Knowledge Agent has a vector database of information about Cardano ecosystem project , especially Minswaps.

There are documents that cover:
- Cardano blockchain L1 Blockchain
- Minswap protocol Decentralized Exchange
- FarmRoll AI
- Fluid Tokens Defi
- Mocossi Planet Gamefi
- Indigo Protocol Defi
- Xerberus Defi
- Mynth AI 
- Taptools News Aggregator
- Book IO Web3 Book Marketplace
- Delta Defi Decentralized Exchange
- Liqwid Lending/Borrowing Platform
- Vespr Cardano Wallet
- Iagon Decentralized Storage & Computing Marketplace
- SundaeSwap Decentralized Exchange
- WingRiders Decentralized Exchange
- VyFinance Decentralized Finance protocol 
- Genius Yield Decentralized Finance protocol
- Bodega Cardano Decentralized Betting Platform
- Sync Ai Depin Communication Network
- JPG Store NFT Marketplace
- Nmkr NFT infrastructure provider
- Metera Protocol Tokenized Index
- Lenfi decentralized lending and borrowing protocol
- DexHunter Dex Aggregator
- Muesli Swap Decentralized Exchange
- Singularity DAO decentralized portfolio management protocol


After searching the docs, answer the user's question with the most relevant information.`;

export const SEARCH_WEB_KNOWLEDGE_PROMPT = `This tool performs a web search to find real-time and up-to-date information from the internet.

You should call this tool when:
- The user's question requires current or real-time information
- The information is not available in the knowledge base
- You need to verify or cross-reference information
- The query is about recent events, news, or developments
- The information might be too specific or niche for the knowledge base

The web search will help gather:
- Latest news and updates
- Real-time market data
- Recent protocol developments
- Community discussions and sentiment
- Technical documentation and guides
- Social media updates
- Blog posts and articles
- Forum discussions

After performing the web search, synthesize the information to provide a comprehensive and accurate answer to the user's question. Always verify the credibility of sources and prioritize official documentation and reputable sources.`;

export const FAQ_KNOWLEDGE_PROMPT = `
    Here is the FAQ and answers, if the user question related to these, you will use the FAQ and answers to answer the question:
1. What's the most recommended wallet for Cardano in 2025?
 The most recommended wallet in 2025 is Vespr. It offers a fast and stable experience for both daily use and interacting with dApps. Typhon supports multi-account management, hardware wallets, NFT viewing, and has a clean signing UX. It works well across desktop and mobile, making it ideal for most users.
2. Which wallet supports hardware wallets best (Ledger, Trezor)?
 Eternl and Lace both support Ledger and Trezor integration. Eternl gives users deeper technical control, while Lace focuses on simplicity and seamless signing. If you're looking for a plug-and-play experience, Lace is the better option. For advanced features, use Eternl.
3. What wallet should I use for connecting with most Cardano dApps?
 Typhon, Lace, Vespr, Eternl are currently among the most compatible and fastest for interacting with a broad range of dApps—from DEXs to NFT marketplaces to staking platforms. It has low transaction failure rates and fast popup handling.
4. How can I manage multiple wallets efficiently?
 Use Typhon to manage multiple wallet accounts under one interface. For power users managing dozens of wallets (e.g., for testing, staking, or farming), Eternl allows you to load wallets via mnemonic, hardware, or importing from files.
5. What's the safest way to store ADA long term?
 Use a hardware wallet (Ledger or Trezor) in combination with a lightweight wallet like Lace or Eternl. Avoid browser extensions if you're not active daily, and never store your seed phrases on a device connected to the internet.
6. Which wallet supports mobile access to Cardano dApps?
 Lace Mobile and Flint Mobile both offer seamless mobile support for dApp interaction, token transfers, and NFT viewing. Lace is currently more stable and offers smoother UX on newer iOS and Android devices.
7. What's the best wallet for NFT collectors?
 Typhon provides a clean and rich NFT interface, including collection grouping and metadata display. Eternl is another great option for those who prefer advanced features and sorting filters.
8. How can I batch-send tokens from a Cardano wallet?
 Use Typhon for batch-sending multiple tokens or NFTs in a single transaction. It's efficient for giveaways, airdrops, or wallet cleanup. Fees remain low even with dozens of assets.
9. How do I back up my Cardano wallet securely?
 Always write your seed phrase on paper and store it in a secure, offline location. For critical funds, consider splitting the phrase between multiple locations or using a steel backup tool (e.g., Cryptotag or Billfodl).
10. What's a good way to monitor wallet balances and token values?
 Use TapTools Portfolio — just input wallet addresses and it automatically displays balances, token values, staking status, LP positions, and price charts.

11. Which Cardano meme coins are popular and actively traded in 2025?
 Some of the most actively traded and followed meme coins include $SNEK, $BANK, $NUTZ, $FAYF, and $FREN. These tokens have vibrant communities, solid liquidity pools on DEXs like Minswap, and are often featured in quests or NFT integrations.
12. Where do most new tokens launch first on Cardano?
 The vast majority of new token launches happen via Minswap, which remains the most used DEX by liquidity and traffic. Some also launch directly on VyFinance or Spectrum for farming incentives.
13. How do I find new or trending tokens early on Cardano?
 The fastest way is to check DexHunter and monitor new liquidity pairs. Watch for sudden volume spikes and price changes. You can also use a smart way to look for trending tokens powered by swarm intelligence of Spidex AI.
14. How do I verify a token is legitimate before trading it?
 First, confirm the token's policy ID from the official source (e.g., website, Discord). Then cross-check it on Cardanoscan.io. Use TapTools to inspect holder distribution and liquidity lock status. Avoid tokens with high wallet concentration.
15. How do I participate in new token launches safely?
 Use trusted wallets like Typhon to connect to Minswap or Spectrum. Only interact with verified contracts. Make sure you're on the correct project site and always double-check the policy ID to avoid copycat scams.
16. Are there any meme tokens offering real utility today?
 Yes. $BANK integrates with community governance tools. $FREN is adding game layers and NFT mechanics. While meme coins start lighthearted, several are adding staking, quests, and voting.
17. Do any tokens provide real yield or staking opportunities?
 Many tokens offer LP staking on DEXs. For example, $SNEK/ADA pairs can be farmed on Minswap. Others like $BANK offer native staking on partner platforms.
18. How do I qualify for meme token airdrops or loyalty rewards?
 Hold tokens in your wallet before snapshot deadlines. Join community quests on Zealy, Crew3, or QuestHub, which reward holders and contributors alike.
19. Can I get early alpha on new coins from NFT projects?
 Yes. Many NFT communities offer early access to token mints or allocations. Holding the right NFT can sometimes unlock allowlists or token pre-farming.
20. Is there a way to track meme token performance historically?
 Use TapTools to view price history, wallet distribution, and LP volume changes. You can even set alerts for whale buys or major volume movements.
21. What's the most used DEX on Cardano in 2025?
 Minswap leads in volume and liquidity. VyFinance and Spectrum are also popular for trading and farming.
22. Which DEX offers the best farming rewards?
 VyFinance is strong for yield-focused farming. Minswap has competitive APRs across popular pairs.
23. Where can I find newly launched token pairs?
 DexHunter shows new LP pairs with volume and price info — great for spotting trends early.
24. What's a safe strategy for liquidity farming?
 Choose established tokens, ensure LP is locked, and harvest rewards regularly. Monitor APR changes.
25. Are there any stablecoin LPs with good rewards?
 Yes — pairs like iUSD/ADA or USDA/ADA offer moderate APR with lower price risk.
26. What are vaults, and who offers them?
 Vaults auto-compound LP rewards. VyFinance runs structured vaults that handle rewards for you.
27. Can I withdraw LP rewards without removing liquidity?
 Yes. Most DEXs allow you to claim rewards separately without touching the LP tokens.
28. What's the risk of LP farming smaller tokens?
 Higher volatility, potential impermanent loss, or rug pulls. Always check LP lock and dev wallet info.
29. Is there a DEX aggregator on Cardano?
 Yes — DexHunter aggregates swaps from Minswap, Spectrum, VyFinance, and others, so you get best prices.
30. What's the difference between vaults and manual farming?
 Vaults automate compounding, saving time and gas. Manual farming gives more flexibility and control.
31. Can I farm LP tokens and still use them elsewhere?
 Generally no — once staked, LP tokens are locked. Some platforms may offer secondary benefits though. 
32. What's the best way to manage risk in LP farming?
 Don't overcommit, monitor the token's news and price action, and split across different pairs or DEXs.
33. Are Cardano gas fees high when farming or swapping?
 No — they remain very low (under 1 ADA per complex transaction), even during network spikes.
34. Can I farm rewards and get airdrops at the same time?
 Yes — some projects reward LP holders with extra token drops or NFT-based quests.
35. What are high-yield pairs on Cardano right now?
 Smaller pairs like $FAYF/ADA, $NUTZ/ADA, or newer tokens often post high APRs — check VyFinance or Minswap daily.

36. Where can I find current airdrops for Cardano tokens?
 Start with DripDropz, then check project X accounts and platforms like QuestHub or Farmroll.
37. How do I know if I qualify for an airdrop?
 Check project announcements. Tools like TapTools often notify when you hold eligible tokens.
38. What platforms offer quests for tokens?
 QuestHub, Zealy, and Crew3 are common. Some projects also run in-app quests through their dApps.
39. Do I need NFTs for certain airdrops?
 Sometimes. Projects might require holding or staking a specific NFT to qualify for tokens or bonuses.
40. What's the easiest way to join quests?
 Connect wallet to the quest platform (like Zealy), follow social actions or on-chain steps, and track progress.
41. Can I use multiple wallets for the same airdrop?
 Technically yes, but check project rules. Using obvious bots or duplicates could get disqualified.
42. Where are airdrop snapshots announced?
 Usually on the project's X (Twitter), Discord, and sometimes on-chain via metadata.
43. Are there automated alerts for airdrops or quests?
 Yes. Use TapTools alerts, Telegram groups, and subscribe to Discord roles in active communities.
44. How much can I earn from completing Cardano quests?
 Depends — some pay 10-100 ADA worth of tokens. Early participants in new projects tend to benefit more.
45. Are NFT-based quests still active in 2025?
 Yes — many projects reward stakers or holders of special NFTs with tokens, early access, or bonus features.

46. What's the best place to stay updated on Cardano projects?
 Follow top accounts on X, join Discord servers, and use tools like TapTools, DexHunter, and Cardanoscan.
47. Why are Cardano tokens more active now than before?
 More volume, faster tools, and real use cases — especially in NFTs, DeFi, and newer memecoins.
48. Are new projects launching daily on Cardano?
 Yes — especially on Minswap, VyFinance, and other open DEXs. Check DexHunter hourly for new LPs.
49. What's the best strategy to grow a wallet in Cardano right now?
Stake blue chips


Farm small-cap LPs


Join quests/airdrops


Hold a few strong meme tokens


50. Is it too late to get started with Cardano projects?
 Not at all. Ecosystem tools are just maturing, and there's still plenty of opportunity in both farming and trading.

    
`;
