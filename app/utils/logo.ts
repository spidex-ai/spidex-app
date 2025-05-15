export const getLogoUrl = (logo: string) => {
  if (!logo) return "";
  if (logo.startsWith("https://")) return logo;
  if (logo.startsWith("ipfs://")) return `https://ipfs.io/ipfs/${logo.slice(7)}`;
  if (logo.startsWith("data:image")) return logo;
  return `data:image/png;base64,${logo}`;
};

export const dexLogoMap: Record<string, string | null> = {
  "SUNDAESWAPV3": "https://storage.googleapis.com/dexhunter-images/public/sundaev3logodh.png",
  "SPLASH": "https://storage.googleapis.com/dexhunter-images/public/splashlogodh.png",
  "MINSWAPV2": "https://storage.googleapis.com/dexhunter-images/public/minswapv2logodh.png",
  "MINSWAP": "https://storage.googleapis.com/dexhunter-images/public/minswapv1logodh.png",
  "WINGRIDER": "https://storage.googleapis.com/dexhunter-images/public/wrlogodh.png",
  "WINGRIDERV2": "https://storage.googleapis.com/dexhunter-images/public/wingridersv2.png",
  "SNEKFUN": "https://storage.googleapis.com/dexhunter-images/public/snekfun.jpg",
  "SPECTRUM": "https://storage.googleapis.com/dexhunter-images/public/splashlogodh.png",
  "SUNDAESWAP": "https://storage.googleapis.com/dexhunter-images/public/sundaev1logodh.png",
  "VYFI": "https://storage.googleapis.com/dexhunter-images/public/vyfilogodh.png",
  "CSWAP": "https://storage.googleapis.com/dexhunter-images/public/cswap.jpg",
  "MUESLISWAP": "https://storage.googleapis.com/dexhunter-images/public/mueslilogodh.png",
  "CERRA": null,
  "GENIUS": null
};