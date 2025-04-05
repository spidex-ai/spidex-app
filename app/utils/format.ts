export const formatPrice = (price: number) => {
    if (price === 0) return "$0.00";
    if (price < 0.0001) return `$${price.toExponential(4)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(2)}`;
  };