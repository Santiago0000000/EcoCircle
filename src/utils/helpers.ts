/**
 * Delays execution for the specified amount of milliseconds
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Formats a cost value with the appropriate currency symbol
 * @param value The cost value to format
 * @param currency The currency code (default: EUR)
 * @returns Formatted cost string
 */
export const formatCost = (value: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency
  }).format(value);
};