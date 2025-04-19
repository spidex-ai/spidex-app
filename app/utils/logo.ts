export const getLogoUrl = (logo: string) => {
  if (!logo) return "";
  if (logo.startsWith("https://")) return logo;
  if (logo.startsWith("ipfs://")) return `https://ipfs.io/ipfs/${logo.slice(7)}`;
  if (logo.startsWith("data:image")) return logo;
  return `data:image/png;base64,${logo}`;
};