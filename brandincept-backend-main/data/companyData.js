// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Project from '../models/Project.js';


// dotenv.config();

const projectsData = [
    {
        brand: "Tim Hortons",
        description: "1st and 2nd Hi-Street stores in Ahmedabad. Secured prime retail space on Sindhu Bhavan Road & CG Road.",
        tags: ["Ahmedabad", "Hi-Street", "F&B"],
        image: "/assests/timhortons.png",
        highlight: "1st Store"
    },
    {
        brand: "Intune",
        description: "Surat's 1st store located at Solaris Kode, VIP Road. Featuring a massive Surat First Store.",
        tags: ["Surat", "Apparel", "Flagship"],
        image: "/assests/intune.png",
        highlight: "Surat First Store"
    },
    {
        brand: "Mamaearth",
        description: "Gujarat's 1st Hi-Street store in Surat. Strategically positioned for maximum footfall and brand exposure.",
        tags: ["Surat", "Cosmetics", "Hi-Street"],
        image: "/assests/mamaearth.png",
        highlight: "Gujarat 1st"
    },
    {
        brand: "Zepto",
        description: "1st and biggest Dark Store in Gujarat at Surat (Sarthana & Bhimrad). Optimized for rapid logistical operations.",
        tags: ["Surat", "Q-Commerce", "Dark Store"],
        image: "/assests/zepto.png",
        highlight: "Surat First"
    },
    {
        brand: "Funky Monkeys",
        description: "Successfully established premium kids play zone at Ahmedabad One Mall, Vastrapur. Indoor playground and birthday party venue serving children up to 14 years.",
        tags: ["Ahmedabad", "Kids Entertainment", "Play Zone", "Mall Location"],
        image: "/assests/funkymonkeysproject.png",
        highlight: "Prime location"
    },
    {
        brand: "Miniklub",
        description: "1st high-street store in Surat at Vesu Road. Baby and kids lifestyle brand offering apparel, footwear, toys, and essentials for newborns to 8-year-olds.",
        tags: ["Surat", "Baby & Kids Lifestyle", "Retail", "High-Street"],
        image: "/assests/miniklubproject.png",
        highlight: "1st High-Street Store in Surat"
    },
    {
        brand: "Homelane",
        description: "Successfully leased and transacted. End-to-end home interior and design solutions.",
        tags: ["Ahmedabad", "Home Interiors"],
        image: "/assests/homelaneproject.png",
        highlight: "Gujarat 1st"
    },
    {
        brand: "Purple",
        description: "New store opening in Ahmedabad. Premium retail expansion in Gujarat.",
        tags: ["Ahmedabad", "New Store Opening", "Retail"],
        image: "/assests/purpleproject.png",
        highlight: "New Store Opening in Ahmedabad"
    }
];

const partnersData = [
    { name: "Croma", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Croma_Logo.svg", desc: "A TATA Enterprise" },
    { name: "HomeLane", src: "https://upload.wikimedia.org/wikipedia/en/2/26/HomeLane_Logo.svg", desc: "Interior" },
    { name: "Zepto", src: "https://upload.wikimedia.org/wikipedia/commons/8/87/Zepto_Logo_2023.svg", desc: "Q-Commerce" },
    { name: "Mamaearth", src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mamaearth.png", desc: "Beauty" },
    { name: "Tim Hortons", src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Tim_Hortons_logo.svg", desc: "Coffee" },
    { name: "Chinese Wok", src: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Chinese_Wok_Logo.svg/512px-Chinese_Wok_Logo.svg.png", desc: "Food" },
    { name: "Funky Monkeys", src: "https://scontent.fhyd11-3.fna.fbcdn.net/v/t39.30808-6/289912066_180479707765181_1180766291696425974_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=2Iox1_eI81YQ7kNvgEr5R_M&_nc_zt=23&_nc_ht=scontent.fhyd11-3.fna&_nc_gid=AG4sS4rO9N9uG-j-I9bV7Gk&oh=00_AYB2QZzZ-2f8E95rBwU7t4DqK7iXk-6z8tO8K4G6h3d8-w&oe=67D02BB5", desc: "Entertainment" }
];

