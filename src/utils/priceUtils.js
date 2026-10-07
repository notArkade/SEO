export const lowest = p => Math.min(...p.prices.map(x => x.price))
export const highest = p => Math.max(...p.prices.map(x => x.price))
export const average = p => Math.round(p.prices.reduce((a,x) => a + x.price, 0) / p.prices.length)
export const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)
