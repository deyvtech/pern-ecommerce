const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',  
  minimumFractionDigits: 1,
});

export function formatCurrency(value: number): string {
  return formatter.format(value);
}

