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
