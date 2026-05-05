export interface MenuItem {
    ID: string;
    Name: string;
    Description: string;
    Price: number;
    Image: string;
    Category: string;
    Rating: number;
}

export const MENU_ITEMS: MenuItem[] = [
    // ===== DONAT =====
    {
        ID: "donat-original",
        Name: "Donat Original",
        Description:
            "Teksturnya super lembut dengan rasa simpel yang bikin ketagihan dari gigitan pertama!",
        Price: 3000,
        Image: "/img/donat_original.jpg",
        Category: "Donat",
        Rating: 4.5,
    },
    {
        ID: "donat-coklat",
        Name: "Donat Coklat",
        Description:
            "Lelehan coklat manis yang berpadu sempurna dengan donat empuk. Auto happy!",
        Price: 5000,
        Image: "/img/donat_coklat.png",
        Category: "Donat",
        Rating: 4.7,
    },
    {
        ID: "donat-strawberry",
        Name: "Donat Strawberry",
        Description:
            "Rasa strawberry yang fresh dan manis bikin suasana jadi lebih cerah!",
        Price: 5000,
        Image: "/img/donat_strawberry.png",
        Category: "Donat",
        Rating: 4.7,
    },
    {
        ID: "donat-taro",
        Name: "Donat Taro",
        Description:
            "Rasa taro yang lembut dan creamy dengan aroma khas yang bikin nagih di setiap gigitan!",
        Price: 5000,
        Image: "/img/donat_taro.png",
        Category: "Donat",
        Rating: 4.6,
    },
    {
        ID: "donat-box",
        Name: "Donat Box Isi 4  ",
        Description:
            "Paket hemat berisi 3 donat dengan pilihan rasa favorit. Cocok buat sharing atau dinikmati sendiri!",
        Price: 13000,
        Image: "/img/donat_box.png",
        Category: "Donat",
        Rating: 4.7,
    },

    // ===== PISCOK =====
    {
        ID: "piscok-original",
        Name: "Piscok Original",
        Description:
            "Pisang manis dibalut kulit crispy dengan coklat lumer yang bikin susah berhenti!",
        Price: 3000,
        Image: "/img/piscok_original.png",
        Category: "Piscok",
        Rating: 4.5,
    },
    {
        ID: "piscok-coklat",
        Name: "Piscok Coklat",
        Description:
            "Pisang manis dibalut kulit crispy dengan isian coklat lumer yang melimpah. Kombinasi sederhana yang selalu bikin nagih!",
        Price: 3000,
        Image: "/img/piscok_coklat.png",
        Category: "Piscok",
        Rating: 4.6,
    },
    {
        ID: "piscok-strawberry",
        Name: "Piscok Strawberry",
        Description:
            "Sensasi manis dengan sentuhan fruity yang bikin cemilan jadi lebih seru!",
        Price: 3000,
        Image: "/img/piscok_strawberry.png",
        Category: "Piscok",
        Rating: 4.5,
    },
    {
        ID: "piscok-taro",
        Name: "Piscok Taro",
        Description:
            "Pisang manis dibalut kulit crispy dengan isian coklat lumer dan sentuhan rasa taro yang creamy dan unik.",
        Price: 3000,
        Image: "/img/piscok_taro.png",
        Category: "Piscok",
        Rating: 4.5,
    },
    {
        ID: "piscok-box",
        Name: "Piscok isi 4",
        Description:
            "Porsi lebih banyak untuk dinikmati bersama. Hemat dan tetap lezat!",
        Price: 10000,
        Image: "/img/piscok_box.png",
        Category: "Piscok",
        Rating: 4.5,
    },

    // ===== RICE BOWL =====
    {
        ID: "rice-ayam asam maanis",
        Name: "Rice Bowl Ayam asam manis",
        Description:
            "Ayam crispy dengan balutan saus asam manis yang segar dan menggoda. Perpaduan rasa manis, asam, dan gurih bikin setiap suapan terasa nagih dan bikin ketagihan!",
        Price: 25000,
        Image: "/img/rice_asam manis.png",
        Category: "Rice Bowl",
        Rating: 4.7,
    },
    {
        ID: "rice-ayam mentega",
        Name: "Rice Bowl ayam mentega",
        Description:
            "Ayam juicy dengan saus mentega yang gurih, creamy, dan wangi menggoda. Disajikan hangat dengan nasi pulen, cocok untuk makan puas kapan saja!",
        Price: 25000,
        Image: "/img/rice_mentega.png",
        Category: "Rice Bowl",
        Rating: 4.8,
    },

    // ===== ES LUMUT SEGAR =====
    {
        ID: "es-lumut-original",
        Name: "Es Lumut Segar",
        Description: "Minuman manis dan segar dengan lumut jelly",
        Price: 6000,
        Image: "/img/es_lumut.png",
        Category: "Minuman",
        Rating: 4.7,
    },
];

export const CATEGORIES = ["Donat", "Piscok", "Rice Bowl", "Minuman"];

export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
