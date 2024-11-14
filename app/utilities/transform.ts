const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function transformOrderSummaryData(orderData: {
  [K: string]: { ordered: number; delivered: number };
}) {
  const data = months.map((month, index) => ({
    name: shortMonths[index],
    Ordered: orderData[month].ordered,
    Delivered: orderData[month].delivered,
  }));

  console.log(data);
  // return data;

  return [
    { name: "Jan", Ordered: 1500, Delivered: 1200 },
    { name: "Feb", Ordered: 1700, Delivered: 1600 },
    { name: "Mar", Ordered: 1900, Delivered: 1800 },
    { name: "Apr", Ordered: 2000, Delivered: 1900 },
    { name: "May", Ordered: 2200, Delivered: 2100 },
    { name: "Jun", Ordered: 2300, Delivered: 2200 },
    { name: "Jul", Ordered: 2400, Delivered: 2300 },
    { name: "Aug", Ordered: 2500, Delivered: 2400 },
    { name: "Sep", Ordered: 2600, Delivered: 2500 },
    { name: "Oct", Ordered: 2700, Delivered: 2600 },
    { name: "Nov", Ordered: 2800, Delivered: 2700 },
    { name: "Dec", Ordered: 2900, Delivered: 2800 },
  ];
}
export function transformSalesAndPurchaseData(salesAndPurchaseData: {
  [K: string]: {
    amount: number;
    values: { purchase: number; sales: number };
  };
}) {
  const data = months.map((month, index) => ({
    name: shortMonths[index],
    Purchases: salesAndPurchaseData[month].values.purchase,
    Sales: salesAndPurchaseData[month].values.sales,
  }));

  console.log(data);

  // return data;

  return [
    { name: "Jan", Purchases: 32000, Sales: 40000 },
    { name: "Feb", Purchases: 37000, Sales: 42000 },
    { name: "Mar", Purchases: 45000, Sales: 47000 },
    { name: "Apr", Purchases: 39000, Sales: 43000 },
    { name: "May", Purchases: 52000, Sales: 56000 },
    { name: "Jun", Purchases: 48000, Sales: 51000 },
    { name: "Jul", Purchases: 49000, Sales: 53000 },
    { name: "Aug", Purchases: 46000, Sales: 50000 },
    { name: "Sep", Purchases: 44000, Sales: 48000 },
    { name: "Oct", Purchases: 43000, Sales: 45000 },
    { name: "Nov", Purchases: 54000, Sales: 58000 },
    { name: "Dec", Purchases: 51000, Sales: 55000 },
  ];
}
