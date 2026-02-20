
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

(async () => {
  await Product.deleteMany();
  await User.deleteMany();

await Product.insertMany([
  {
    title: "iPhone 14",
    price: 800,
    description: "Latest Apple smartphone",
    image: "https://images.unsplash.com/photo-1603899122928-1e1f1d8f2b4f"
  },
  {
    title: "Samsung Galaxy S23",
    price: 750,
    description: "Powerful Android phone",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf"
  },
  {
    title: "MacBook Air M2",
    price: 1200,
    description: "Lightweight and fast laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    title: "Dell XPS 13",
    price: 1100,
    description: "Premium ultrabook laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
  },
  {
    title: "HP Pavilion",
    price: 650,
    description: "Affordable performance laptop",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28"
  },
  {
    title: "Sony Headphones",
    price: 150,
    description: "Noise cancelling headphones",
    image: "https://images.unsplash.com/photo-1518443895914-6e0d8d1c7b6f"
  },
  {
    title: "Apple Watch",
    price: 400,
    description: "Smartwatch with health tracking",
    image: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d"
  },
  {
    title: "iPad Pro",
    price: 900,
    description: "Powerful tablet device",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
  },
  {
    title: "Canon DSLR Camera",
    price: 700,
    description: "Professional photography camera",
    image: "https://images.unsplash.com/photo-1519183071298-a2962f3d95a1"
  },
  {
    title: "Gaming Mouse",
    price: 50,
    description: "High precision RGB mouse",
    image: "https://images.unsplash.com/photo-1587202372775-9893e53c0f7f"
  },
  {
    title: "Mechanical Keyboard",
    price: 120,
    description: "RGB mechanical keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
  },
  {
    title: "Smart TV 55 inch",
    price: 600,
    description: "4K Ultra HD Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1"
  },
  {
    title: "Bluetooth Speaker",
    price: 80,
    description: "Portable wireless speaker",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad"
  },
  {
    title: "PlayStation 5",
    price: 500,
    description: "Next-gen gaming console",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db"
  },
  {
    title: "External Hard Drive 1TB",
    price: 90,
    description: "High-speed storage device",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215"
  }
]);

  const hash = await bcrypt.hash("123456", 10);

  await User.create([
    { email: "test1@mail.com", password: hash },
    { email: "test2@mail.com", password: hash }
  ]);

  console.log("Seed done");
  process.exit();
})();
