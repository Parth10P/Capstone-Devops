const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
  {
    name: "Cotton Kurti - Floral Print",
    nameHi: "कॉटन कुर्ती - फ्लोरल प्रिंट",
    price: 499,
    originalPrice: 899,
    description:
      "Comfortable cotton kurti with beautiful floral print. Perfect for daily wear.",
    category: "clothing",
    image: "/products/kurti.jpg",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    badge: "Bestseller",
  },
  {
    name: "Wireless Earbuds",
    nameHi: "वायरलेस ईयरबड्स",
    price: 799,
    originalPrice: 1999,
    description:
      "High quality wireless earbuds with noise cancellation and long battery life.",
    category: "electronics",
    image: "/products/earbuds.jpg",
    rating: 4.2,
    reviews: 1022,
    inStock: true,
    badge: "60% Off",
  },
  {
    name: "Stainless Steel Lunch Box",
    nameHi: "स्टेनलेस स्टील लंच बॉक्स",
    price: 349,
    originalPrice: 599,
    description:
      "3-compartment leak-proof stainless steel lunch box. BPA free and eco-friendly.",
    category: "home",
    image: "/products/lunchbox.jpg",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    badge: "",
  },
  {
    name: "Organic Toor Dal - 1kg",
    nameHi: "ऑर्गेनिक तूर दाल - 1 किलो",
    price: 189,
    originalPrice: 250,
    description:
      "Premium quality organic toor dal, sourced directly from farms.",
    category: "grocery",
    image: "/products/dal.jpg",
    rating: 4.6,
    reviews: 890,
    inStock: true,
    badge: "Fresh",
  },
  {
    name: "Aloe Vera Face Wash",
    nameHi: "एलोवेरा फेस वॉश",
    price: 199,
    originalPrice: 350,
    description:
      "Natural aloe vera face wash for all skin types. Gentle and refreshing.",
    category: "beauty",
    image: "/products/facewash.jpg",
    rating: 4.3,
    reviews: 456,
    inStock: true,
    badge: "",
  },
  {
    name: "Hindi Story Book Collection",
    nameHi: "हिंदी कहानी पुस्तक संग्रह",
    price: 299,
    originalPrice: 500,
    description:
      "Collection of 5 popular Hindi story books for children and adults.",
    category: "books",
    image: "/products/books.jpg",
    rating: 4.8,
    reviews: 312,
    inStock: true,
    badge: "Popular",
  },
  {
    name: "Men's Polo T-Shirt",
    nameHi: "पुरुषों की पोलो टी-शर्ट",
    price: 599,
    originalPrice: 1299,
    description:
      "Premium cotton polo t-shirt. Available in multiple colors.",
    category: "clothing",
    image: "/products/polo.jpg",
    rating: 4.1,
    reviews: 678,
    inStock: true,
    badge: "54% Off",
  },
  {
    name: "Power Bank 10000mAh",
    nameHi: "पावर बैंक 10000mAh",
    price: 699,
    originalPrice: 1499,
    description:
      "Fast charging power bank with dual USB ports. Compact and lightweight.",
    category: "electronics",
    image: "/products/powerbank.jpg",
    rating: 4.4,
    reviews: 1567,
    inStock: true,
    badge: "",
  },
  {
    name: "Brass Pooja Thali Set",
    nameHi: "पीतल की पूजा थाली सेट",
    price: 899,
    originalPrice: 1500,
    description:
      "Beautiful brass pooja thali set with 7 pieces. Perfect for daily worship.",
    category: "home",
    image: "/products/poojathali.jpg",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    badge: "Handmade",
  },
  {
    name: "Basmati Rice Premium - 5kg",
    nameHi: "बासमती चावल प्रीमियम - 5 किलो",
    price: 549,
    originalPrice: 750,
    description:
      "Long grain premium basmati rice. Aged for extra aroma and taste.",
    category: "grocery",
    image: "/products/rice.jpg",
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    badge: "",
  },
  {
    name: "Coconut Hair Oil - 200ml",
    nameHi: "नारियल हेयर ऑयल - 200ml",
    price: 149,
    originalPrice: 250,
    description:
      "Pure coconut hair oil for strong and healthy hair. No added chemicals.",
    category: "beauty",
    image: "/products/hairoil.jpg",
    rating: 4.6,
    reviews: 890,
    inStock: true,
    badge: "",
  },
  {
    name: "Motivational Books Set",
    nameHi: "प्रेरणादायक पुस्तक सेट",
    price: 450,
    originalPrice: 800,
    description:
      "Set of 3 bestselling motivational books in Hindi and English.",
    category: "books",
    image: "/products/motivational.jpg",
    rating: 4.7,
    reviews: 567,
    inStock: false,
    badge: "",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing products
  await prisma.product.deleteMany();

  // Insert all products
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ Seeded ${products.length} products successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
