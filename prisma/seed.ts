import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // ======= 1. Admin User =======
  const hashedPassword = await bcrypt.hash("lumeria2024", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("✅ Admin user created");

  // ======= 2. Categories =======
  const categories = [
    { name: "Donat", sortOrder: 1 },
    { name: "Piscok", sortOrder: 2 },
    { name: "Rice Bowl", sortOrder: 3 },
    { name: "Minuman", sortOrder: 4 },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: { sortOrder: cat.sortOrder },
      create: cat,
    });
    categoryMap[cat.name] = created.id;
  }
  console.log("✅ Categories created");

  // ======= 3. Menu Items =======
  const menuItems = [
    // Donat
    {
      name: "Donat Original",
      description:
        "Teksturnya super lembut dengan rasa simpel yang bikin ketagihan dari gigitan pertama!",
      price: 3000,
      image: "/img/donat_original.jpg",
      category: "Donat",
      rating: 4.5,
    },
    {
      name: "Donat Coklat",
      description:
        "Lelehan coklat manis yang berpadu sempurna dengan donat empuk. Auto happy!",
      price: 5000,
      image: "/img/donat_coklat.png",
      category: "Donat",
      rating: 4.7,
    },
    {
      name: "Donat Strawberry",
      description:
        "Rasa strawberry yang fresh dan manis bikin suasana jadi lebih cerah!",
      price: 5000,
      image: "/img/donat_strawberry.png",
      category: "Donat",
      rating: 4.7,
    },
    {
      name: "Donat Taro",
      description:
        "Rasa taro yang lembut dan creamy dengan aroma khas yang bikin nagih di setiap gigitan!",
      price: 5000,
      image: "/img/donat_taro.png",
      category: "Donat",
      rating: 4.6,
    },
    {
      name: "Donat Box Isi 4",
      description:
        "Paket hemat berisi 3 donat dengan pilihan rasa favorit. Cocok buat sharing atau dinikmati sendiri!",
      price: 13000,
      image: "/img/donat_box.png",
      category: "Donat",
      rating: 4.7,
    },
    // Piscok
    {
      name: "Piscok Original",
      description:
        "Pisang manis dibalut kulit crispy dengan coklat lumer yang bikin susah berhenti!",
      price: 3000,
      image: "/img/piscok_original.png",
      category: "Piscok",
      rating: 4.5,
    },
    {
      name: "Piscok Coklat",
      description:
        "Pisang manis dibalut kulit crispy dengan isian coklat lumer yang melimpah. Kombinasi sederhana yang selalu bikin nagih!",
      price: 3000,
      image: "/img/piscok_coklat.png",
      category: "Piscok",
      rating: 4.6,
    },
    {
      name: "Piscok Strawberry",
      description:
        "Sensasi manis dengan sentuhan fruity yang bikin cemilan jadi lebih seru!",
      price: 3000,
      image: "/img/piscok_strawberry.png",
      category: "Piscok",
      rating: 4.5,
    },
    {
      name: "Piscok Taro",
      description:
        "Pisang manis dibalut kulit crispy dengan isian coklat lumer dan sentuhan rasa taro yang creamy dan unik.",
      price: 3000,
      image: "/img/piscok_taro.png",
      category: "Piscok",
      rating: 4.5,
    },
    {
      name: "Piscok isi 4",
      description:
        "Porsi lebih banyak untuk dinikmati bersama. Hemat dan tetap lezat!",
      price: 10000,
      image: "/img/piscok_box.png",
      category: "Piscok",
      rating: 4.5,
    },
    // Rice Bowl
    {
      name: "Rice Bowl Ayam asam manis",
      description:
        "Ayam crispy dengan balutan saus asam manis yang segar dan menggoda. Perpaduan rasa manis, asam, dan gurih bikin setiap suapan terasa nagih dan bikin ketagihan!",
      price: 25000,
      image: "/img/rice_asam manis.png",
      category: "Rice Bowl",
      rating: 4.7,
    },
    {
      name: "Rice Bowl ayam mentega",
      description:
        "Ayam juicy dengan saus mentega yang gurih, creamy, dan wangi menggoda. Disajikan hangat dengan nasi pulen, cocok untuk makan puas kapan saja!",
      price: 25000,
      image: "/img/rice_mentega.png",
      category: "Rice Bowl",
      rating: 4.8,
    },
    // Minuman
    {
      name: "Es Lumut Segar",
      description: "Minuman manis dan segar dengan lumut jelly",
      price: 6000,
      image: "/img/es_lumut.png",
      category: "Minuman",
      rating: 4.7,
    },
  ];

  for (const item of menuItems) {
    const categoryId = categoryMap[item.category];
    await prisma.menuItem.upsert({
      where: { id: `seed-${item.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: {},
      create: {
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        categoryId,
        rating: item.rating,
        isActive: true,
      },
    });
  }
  console.log("✅ Menu items created");

  // ======= 4. Gallery Items =======
  const galleryItems = [
    { src: "/img/donat_box.png", caption: "Donat Box", alt: "Donat Box", sortOrder: 1 },
    { src: "/img/es_lumut.png", caption: "Es Lumut Segar", alt: "Es Lumut", sortOrder: 2 },
    { src: "/img/piscok_box.png", caption: "Piscok Box", alt: "Piscok Box", sortOrder: 3 },
    { src: "/img/donat_coklat.png", caption: "Donat Coklat", alt: "Donat Coklat", sortOrder: 4 },
    { src: "/img/rice_mentega.png", caption: "Rice Bowl Mentega", alt: "Rice Bowl", sortOrder: 5 },
    { src: "/img/piscok_strawberry.png", caption: "Piscok Strawberry", alt: "Piscok", sortOrder: 6 },
  ];

  // Delete existing gallery items and re-create
  await prisma.galleryItem.deleteMany();
  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log("✅ Gallery items created");

  // ======= 5. Homepage Content =======
  const homepageData: Record<string, string> = {
    heroTitle: "Sweetness in every bite",
    heroSubtitle:
      "Nikmati donat lembut, piscok lumer, es lumut segar, dan rice bowl lezat dalam satu tempat.",
    heroImage: "/img/donat_bg.png.png",
    marqueeTexts: JSON.stringify([
      "Sweetness in every bite",
      "Lumer di mulut, manis di hati",
      "Grab your favorite lumer treats now",
      "Dibuat dengan cinta untuk harimu yang sibuk",
      "Free wi-fi inside. Stay as long as you like.",
    ]),
    featuredItemIds: "[]", // Will be populated after menu items are known
    testimonials: JSON.stringify([
      {
        id: "1",
        text: "Donat Lumeria beneran lembut banget! Setiap gigitan lumer di mulut. Ini jadi camilan favorit saya setiap pagi.",
        name: "Shafwan N.",
        role: "Mahasiswa",
      },
      {
        id: "2",
        text: "Es Lumut-nya segar banget, apalagi di cuaca panas. Harganya juga terjangkau untuk kantong mahasiswa!",
        name: "Khalisa R.",
        role: "Mahasiswa",
      },
      {
        id: "3",
        text: "Rice Bowl ayam mentega-nya juara! Porsinya pas, bumbu gurih dan creamy. Pasti balik lagi!",
        name: "Sultan M.",
        role: "Mahasiswa",
      },
    ]),
    features: JSON.stringify([
      {
        id: "1",
        title: "Bahan Pilihan Berkualitas",
        description:
          "Setiap produk dibuat dari bahan-bahan segar pilihan yang berkualitas tinggi.",
        icon: "leaf",
      },
      {
        id: "2",
        title: "Dibuat dengan Cinta",
        description:
          "Proses pembuatan yang higienis dan penuh perhatian di setiap detail.",
        icon: "heart",
      },
      {
        id: "3",
        title: "Harga Terjangkau",
        description:
          "Nikmat tanpa bikin kantong bolong. Cocok untuk semua kalangan.",
        icon: "wallet",
      },
    ]),
    preOrderText: "PRE - ORDER TIME",
    preOrderSchedule: "EVERY TUESDAY - FRIDAY",
  };

  for (const [key, value] of Object.entries(homepageData)) {
    await prisma.homepageContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // Now populate featuredItemIds with actual menu item IDs
  const donatBox = await prisma.menuItem.findFirst({ where: { name: "Donat Box Isi 4" } });
  const esLumut = await prisma.menuItem.findFirst({ where: { name: "Es Lumut Segar" } });
  const piscokBox = await prisma.menuItem.findFirst({ where: { name: "Piscok isi 4" } });
  
  if (donatBox && esLumut && piscokBox) {
    await prisma.homepageContent.update({
      where: { key: "featuredItemIds" },
      data: { value: JSON.stringify([donatBox.id, esLumut.id, piscokBox.id]) },
    });
  }
  console.log("✅ Homepage content created");

  // ======= 6. Site Settings =======
  const settings: Record<string, string> = {
    siteName: "Lumeria",
    whatsappNumber: "6288976183041",
    instagramUrl: "https://www.instagram.com/lumeriaaaa.id",
    address:
      "Jl. Daan Mogot KM 11, RT.12/RW.4, Kedaung Kali Angke, Cengkareng, Jakarta Barat",
    phone: "0895367044045",
    operationalHours: "08.00 - 17.00 WIB",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("✅ Site settings created");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
