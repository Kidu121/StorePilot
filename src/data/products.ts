import type { Product } from "../types/Product";


export const products: Product[] = [

  {
    id: "1",

    name: "Wireless Mouse",

    description: "Wireless computer mouse",

    category: "Accessories",

    sku: "WM-001",

    brand: "Logitech",

    buyingPrice: 800,

    sellingPrice: 1200,

    quantity: 15,

    unit: "Piece",

    lowStockAlert: 5,

    size: "",

    color: "Black",

    imageUrl: "https://via.placeholder.com/80"

  },


  {
    id: "2",

    name: "Mechanical Keyboard",

    description: "RGB mechanical keyboard",

    category: "Accessories",

    sku: "KB-002",

    brand: "Redragon",

    buyingPrice: 3000,

    sellingPrice: 4500,

    quantity: 8,

    unit: "Piece",

    lowStockAlert: 3,

    size: "",

    color: "Black",

    imageUrl: "https://via.placeholder.com/80"

  },


  {
    id: "3",

    name: "USB Cable",

    description: "Fast charging USB cable",

    category: "Accessories",

    sku: "USB-003",

    brand: "Baseus",

    buyingPrice: 150,

    sellingPrice: 250,

    quantity: 42,

    unit: "Piece",

    lowStockAlert: 10,

    size: "",

    color: "White",

    imageUrl: "https://via.placeholder.com/80"

  }

];