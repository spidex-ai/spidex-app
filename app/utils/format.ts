export const formatPrice = (price: number) => {
  if (price === undefined) return '$0.00'; 
  if (price === null) return '$0.00';
  if (price === 0) return '$0.00';
  if (price < 0.0001) return `$${price.toExponential(4)}`;
  if (price < 1) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(2)}`;
};

export const formatSILK = (amount: string | number) => {
  return Number(amount).toLocaleString(undefined, {
    maximumFractionDigits: 3,
  });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) +
    ', ' +
    date.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
};
