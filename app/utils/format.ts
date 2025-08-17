

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
