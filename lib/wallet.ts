export const truncateAddress = (address: string, number = 6) => {
  return `${address.slice(0, number)}...${address.slice(-number)}`;
};
