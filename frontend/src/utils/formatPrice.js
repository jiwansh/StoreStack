// Converts a number into a properly formatted USD currency.
// Example: 1500 -> "$1,500.00"
export const formatPrice = (amount) => {
   return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
   }).format(amount);
};


// Calculates total price for a product.
// Used in Order Summary.
// Example: 2 × 499.99 = 999.98
export const formatPriceCalculation = (quantity, price) => {
   return (Number(quantity) * Number(price)).toFixed(2);
};


// Converts large numbers into a shorter, readable format.
// Mainly useful for dashboards or admin statistics.
//
// Examples:
// 1500      -> 1.5K
// 2500000   -> 2.5M
// 3400000000 -> 3.4B
export const formatRevenue = (value) => {

   // Billions
   if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + "B";

   // Millions
   } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M";

   // Thousands
   } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "K";

   // Small values don't need formatting
   } else {
      return value;
   }
};