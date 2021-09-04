export default function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }

  // Check if it's a whole number
  if(amount % 100 == 0) {
    options.minimumFractionDigits = 0
  }

  const formatter = new Intl.NumberFormat("en-us", options)

  return formatter.format(amount / 100)
}

