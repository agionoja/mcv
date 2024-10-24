enum AVAILABILITY {
  IN_STOCK = "in-stock",
  OUT_OF_STOCK = "out-of-stock",
  LOW_STOCK = "low-stock",
}

export const products = [
  {
    name: "maggi",
    price: 430,
    qty: 43,
    thresholdValue: 12,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.IN_STOCK,
  },
  {
    name: "Bru",
    price: 257,
    qty: 23,
    thresholdValue: 12,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.IN_STOCK,
  },
  {
    name: "Red Bull",
    price: 990,
    qty: 43,
    thresholdValue: 9,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.OUT_OF_STOCK,
  },
  {
    name: "Bourn Vita",
    price: 502,
    qty: 36,
    thresholdValue: 6,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.IN_STOCK,
  },
  {
    name: "Horticks",
    price: 530,
    qty: 43,
    thresholdValue: 10,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.LOW_STOCK,
  },
  {
    name: "Ariel",
    price: 230,
    qty: 50,
    thresholdValue: 12,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.IN_STOCK,
  },
  {
    name: "Coca colo",
    price: 410,
    qty: 43,
    thresholdValue: 8,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.OUT_OF_STOCK,
  },
  {
    name: "Pepsi",
    price: 200,
    qty: 12,
    thresholdValue: 10,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.LOW_STOCK,
  },
  {
    name: "Scotch Brite",
    price: 550,
    qty: 12,
    thresholdValue: 30,
    expiryDate: "2021-03-01",
    availability: AVAILABILITY.IN_STOCK,
  },
];

export const overallInventory = {
  categories: {
    qty: 14,
    period: new Date("2024-10-24"),
  },
  topProducts: {
    qty: 888,
    totalPrice: 25000,
    period: new Date("2024-10-17").toISOString(),
  },
  topSelling: {
    qty: 5,
    totalCost: 2500,
    period: new Date("2024-10-17").toISOString(),
  },
  lowStocks: {
    ordered: 12,
    notInStock: 2,
    period: new Date("2024-10-17").toISOString(),
  },
};
