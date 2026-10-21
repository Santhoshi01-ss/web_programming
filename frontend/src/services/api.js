// API service connecting to Flask backend with fallback resilience

const API_BASE_URL = "http://localhost:5000/api";

// Fallback seed items if backend server is unreachable
export const FALLBACK_MENU = [
  {
    id: 1,
    name: "Mysore Ghee Roast Dosa",
    description: "Crisp golden crepe smeared with spicy red garlic chutney, filled with potato masala, roasted in pure desi ghee. Served with 3 chutneys & sambar.",
    price: 145,
    category: "breakfast",
    image_url: "/images/dishes/mysore_dosa.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "medium",
    dietary: "Pure Veg • Chef's Signature"
  },
  {
    id: 2,
    name: "Ghee Button Podi Idli (14 pcs)",
    description: "Bite-sized melt-in-mouth steamed rice cakes tossed in aromatic gunpowder (karam podi) and fresh organic cow ghee.",
    price: 120,
    category: "breakfast",
    image_url: "/images/dishes/podi_idli.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: false,
    spice_level: "medium",
    dietary: "Pure Veg • Gluten-Free"
  },
  {
    id: 3,
    name: "Crispy Medu Vada (2 pcs)",
    description: "Traditional deep-fried crispy golden urad dal doughnuts infused with crushed pepper, ginger, and curry leaves. Served with coconut chutney and piping hot drumstick sambar.",
    price: 40,
    category: "breakfast",
    image_url: "/images/dishes/medu_vada.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "mild",
    dietary: "Pure Veg"
  },
  {
    id: 4,
    name: "Rava Onion Masala Dosa",
    description: "Lacy, crispy semolina crepe studded with finely chopped shallots, green chillies, and cumin, stuffed with seasoned mashed potatoes.",
    price: 160,
    category: "breakfast",
    image_url: "/images/dishes/rava_dosa.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "medium",
    dietary: "Pure Veg"
  },
  {
    id: 5,
    name: "OHO! Royal Grand South Indian Thali",
    description: "Grand feast served with Steamed Rice, Pooris, Special Poriyal, Kootu, Drumstick Sambar, Rasam, Mor Kuzhambu, Curd, Appalam, Pickle, and Elaneer Payasam.",
    price: 260,
    category: "south_indian",
    image_url: "/images/dishes/south_thali.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "medium",
    dietary: "Pure Veg • Unlimited Refills"
  },
  {
    id: 6,
    name: "Hyderabadi Veg Dum Biryani",
    description: "Long-grain aged basmati rice slow-cooked in handi with garden-fresh veggies, aromatic whole spices, and saffron milk. Served with Mirchi Ka Salan and creamy mint raita.",
    price: 240,
    category: "south_indian",
    image_url: "/images/dishes/veg_biryani.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "spicy",
    dietary: "Pure Veg • Traditional Handi"
  },
  {
    id: 7,
    name: "Bisi Bele Bath with Kara Boondi",
    description: "Karnataka's beloved one-pot rice and lentil delicacy simmered with vegetables, tamarind, and secret 14-spice blend, topped with pure ghee and crunchy boondi.",
    price: 140,
    category: "south_indian",
    image_url: "/images/dishes/bisi_bele_bath.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "medium",
    dietary: "Pure Veg"
  },
  {
    id: 8,
    name: "Paneer Tikka Butter Masala",
    description: "Charcoal-tandoor grilled cottage cheese cubes simmered in a velvety, rich tomato-cashew satin gravy with fresh fenugreek and butter.",
    price: 275,
    category: "north_indian",
    image_url: "/images/dishes/paneer_butter_masala.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "mild",
    dietary: "Pure Veg • Rich & Creamy"
  },
  {
    id: 9,
    name: "Dal Makhani (Slow-Cooked 18 Hours)",
    description: "Whole black lentils and kidney beans slow-simmered overnight over smoldering charcoal, finished with artisanal white butter and fresh cream.",
    price: 220,
    category: "north_indian",
    image_url: "/images/dishes/dal_makhani.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: false,
    spice_level: "mild",
    dietary: "Pure Veg • Signature Lentils"
  },
  {
    id: 10,
    name: "Amritsari Kadhai Paneer",
    description: "Fresh paneer blocks and crunchy bell peppers tossed in a robust crushed coriander and dry red chilli masala in an iron kadhai.",
    price: 260,
    category: "north_indian",
    image_url: "/images/dishes/kadhai_paneer.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "spicy",
    dietary: "Pure Veg"
  },
  {
    id: 11,
    name: "Garlic Butter Naan & Laccha Paratha",
    description: "Tandoor baked leavened bread brushed generously with garlic butter and fresh coriander, served alongside multi-layered whole wheat paratha.",
    price: 75,
    category: "north_indian",
    image_url: "/images/dishes/garlic_naan.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "mild",
    dietary: "Pure Veg • Fresh Tandoor"
  },
  {
    id: 12,
    name: "Crispy Chilli Baby Corn",
    description: "Tender baby corn spears batter-fried to golden crispness and wok-tossed with spring onions, bell peppers, and zesty Schezwan sauce.",
    price: 210,
    category: "chinese",
    image_url: "/images/dishes/chilli_baby_corn.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: false,
    spice_level: "spicy",
    dietary: "Pure Veg • Crispy Appetizer"
  },
  {
    id: 13,
    name: "Veg Hakka Noodles Supreme",
    description: "Wok-tossed noodles with julienned bell peppers, shredded cabbage, carrots, garlic, and light sesame soy sauce.",
    price: 195,
    category: "chinese",
    image_url: "/images/dishes/hakka_noodles.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "medium",
    dietary: "Pure Veg"
  },
  {
    id: 14,
    name: "Paneer Manchurian Gravy",
    description: "Crispy batter-coated cottage cheese cubes drenched in a thick savory garlic-ginger and scallion soy glaze.",
    price: 230,
    category: "chinese",
    image_url: "/images/dishes/paneer_manchurian.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "medium",
    dietary: "Pure Veg"
  },
  {
    id: 15,
    name: "Kumbakonam Degree Filter Coffee",
    description: "Authentic chicory-infused South Indian decoction brewed to perfection with frothy full-cream milk in traditional brass dabarah.",
    price: 55,
    category: "beverages",
    image_url: "/images/dishes/filter_coffee.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "mild",
    dietary: "Pure Veg • Traditional Brew"
  },
  {
    id: 16,
    name: "Crispy Golden Poori Bhaji (3 pcs)",
    description: "Puffed golden whole-wheat pooris served with traditional mildly spiced potato bhaji masala, fresh coconut chutney, and tangy pickle.",
    price: 110,
    category: "breakfast",
    image_url: "/images/dishes/poori_bhaji.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: false,
    spice_level: "mild",
    dietary: "Pure Veg • Hot & Fresh"
  },
  {
    id: 17,
    name: "Special Golden Ghee Roast Dosa",
    description: "Paper-thin, ultra-crisp golden crepe drenched in pure A2 desi cow ghee and roasted to perfection. Served with 3 house chutneys, potato masala, and piping hot sambar.",
    price: 135,
    category: "breakfast",
    image_url: "/images/dishes/ghee_roast_dosa.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "medium",
    dietary: "Pure Veg • Pure Desi Ghee"
  },
  {
    id: 18,
    name: "Tender Coconut Elaneer Payasam",
    description: "Coastal Karnataka specialty pudding crafted with tender coconut pulp, coconut milk, condensed milk, and roasted cashews.",
    price: 130,
    category: "desserts",
    image_url: "/images/dishes/elaneer_payasam.jpg",
    is_available: true,
    is_featured: true,
    is_chef_special: true,
    spice_level: "mild",
    dietary: "Pure Veg • Coastal Delicacy"
  },
  {
    id: 19,
    name: "Warm Gulab Jamun with Rabdi",
    description: "Golden fried khoya dumplings soaked in rose and cardamom syrup, topped with thick, slow-reduced artisanal rabdi.",
    price: 140,
    category: "desserts",
    image_url: "/images/dishes/gulab_jamun.jpg",
    is_available: true,
    is_featured: false,
    is_chef_special: false,
    spice_level: "mild",
    dietary: "Pure Veg • Traditional Sweet"
  }
];

export async function fetchMenu(category = "all", search = "", featuredOnly = false) {
  try {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (search) params.append("search", search);
    if (featuredOnly) params.append("featured", "true");

    const res = await fetch(`${API_BASE_URL}/menu?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch menu");
    const data = await res.json();
    return data.items;
  } catch (err) {
    console.warn("Backend not reached, using fallback menu:", err.message);
    let items = [...FALLBACK_MENU];
    if (category && category !== "all") {
      items = items.filter(i => i.category === category);
    }
    if (search) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(search.toLowerCase()) || 
        i.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (featuredOnly) {
      items = items.filter(i => i.is_featured);
    }
    return items;
  }
}

export async function submitReservation(reservationData) {
  try {
    const res = await fetch(`${API_BASE_URL}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to submit reservation");
    return data;
  } catch (err) {
    console.warn("Reservation API fallback:", err.message);
    // Simulating success when offline
    return {
      message: "Reservation request received! Our host will confirm shortly via WhatsApp / SMS.",
      reservation: { ...reservationData, id: Date.now(), status: "pending" }
    };
  }
}

export async function submitEnquiry(enquiryData) {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiryData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to submit enquiry");
    return data;
  } catch (err) {
    console.warn("Enquiry API fallback:", err.message);
    return {
      message: "Thank you for reaching out! We have received your inquiry.",
      enquiry: { ...enquiryData, id: Date.now(), status: "unread" }
    };
  }
}

export async function adminLogin(credentials) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function adminGetStats(token) {
  const res = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function adminGetMenu(token) {
  const res = await fetch(`${API_BASE_URL}/admin/menu`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch admin menu");
  return res.json();
}

export async function adminCreateMenu(token, dishData) {
  const res = await fetch(`${API_BASE_URL}/admin/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dishData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create dish");
  return data;
}

export async function adminUpdateMenu(token, id, dishData) {
  const res = await fetch(`${API_BASE_URL}/admin/menu/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dishData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update dish");
  return data;
}

export async function adminDeleteMenu(token, id) {
  const res = await fetch(`${API_BASE_URL}/admin/menu/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete dish");
  return data;
}

export async function adminGetReservations(token, status = "all") {
  const res = await fetch(`${API_BASE_URL}/admin/reservations?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function adminUpdateReservation(token, id, status) {
  const res = await fetch(`${API_BASE_URL}/admin/reservations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update reservation");
  return data;
}

export async function adminGetEnquiries(token) {
  const res = await fetch(`${API_BASE_URL}/admin/enquiries`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch enquiries");
  return res.json();
}

export async function adminUpdateEnquiry(token, id, status) {
  const res = await fetch(`${API_BASE_URL}/admin/enquiries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update enquiry");
  return data;
}
