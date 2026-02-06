import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAxVXYDE_RW3uEkT2dDtlUIcBIDp8a_NHg",
  authDomain: "dummy-data-fed-dashboard.firebaseapp.com",
  databaseURL:
    "https://dummy-data-fed-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dummy-data-fed-dashboard",
  storageBucket: "dummy-data-fed-dashboard.firebasestorage.app",
  messagingSenderId: "1054998085997",
  appId: "1:1054998085997:web:9ede1811e32116ee375a64",
  measurementId: "G-WQPPKPZRYJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload all vendor data
async function uploadVendorData() {
  try {
    // 1. Stall Information
    await setDoc(doc(db, "stalls", "02-18"), {
      name: "Jian Bo Shui Kueh",
      stallId: "02-18",
      owner: "Mr. Lim",
    });

    // 2. Stats
    await setDoc(doc(db, "stalls", "02-18", "data", "stats"), {
      todaysOrders: 0,
      todaysRevenue: 0.0,
      activeOrders: 0,
      avgRating: 5.0,
    });

    // 3. Menu Items
    const menuItems = [
      {
        name: "Shui Kueh (5 pcs)",
        cuisine: "Signature",
        description: "Traditional steamed rice cake with turnip",
        price: 2.0,
        available: true,
      },
      {
        name: "Oyster Omelette",
        cuisine: "Seafood",
        description: "Crispy omelette with fresh oysters",
        price: 3.5,
        available: true,
      },
      {
        name: "Popiah",
        cuisine: "Snack",
        description: "Fresh spring rolls with peanut sauce",
        price: 2.5,
        available: true,
      },
    ];

    for (const item of menuItems) {
      await addDoc(collection(db, "stalls", "02-18", "menuItems"), item);
    }

    // 4. Reviews
    const reviews = [
      {
        customer: "Rayne Tok",
        rating: 5,
        comment: "Amazing shui kueh! Highly recommend.",
        date: "Jan 20, 2026",
      },
      {
        customer: "Ali Mohamed",
        rating: 4,
        comment: "Good taste but a bit slow service.",
        date: "Jan 19, 2026",
      },
      {
        customer: "Sarah Lim",
        rating: 5,
        comment: "Fresh and delicious. Great value for money!",
        date: "Jan 18, 2026",
      },
    ];

    for (const review of reviews) {
      await addDoc(collection(db, "stalls", "02-18", "reviews"), review);
    }

    // 5. Order History
    const orderHistory = [
      {
        id: "HK41752284",
        customer: "Rayne Tok",
        date: "Jan 17, 2026 9:22 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK41063894",
        customer: "Rayne Tok",
        date: "Jan 17, 2026 9:11 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK80873979",
        customer: "lou lou",
        date: "Jan 14, 2026 8:54 AM",
        status: "cancelled",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK80826728",
        customer: "lou lou",
        date: "Jan 14, 2026 8:42 AM",
        status: "ready",
        amount: 2.0,
        items: 1,
      },
      {
        id: "HK86762210",
        customer: "Rayne Tok",
        date: "Jan 13, 2026 8:15 AM",
        status: "ready",
        amount: 6.5,
        items: 3,
      },
    ];

    for (const order of orderHistory) {
      await setDoc(doc(db, "stalls", "02-18", "orders", order.id), order);
    }

    // 6. Rental Agreements
    const rentalAgreements = [
      {
        period: "Jan 1, 2024 - Dec 31, 2024",
        status: "Active",
        monthlyRent: 1200.0,
        renewalDue: "Dec 2024",
      },
      {
        period: "Jan 1, 2023 - Dec 31, 2023",
        status: "Expired",
        monthlyRent: 1200.0,
        renewalDue: "Renewed",
      },
    ];

    for (const rental of rentalAgreements) {
      await addDoc(collection(db, "stalls", "02-18", "rentals"), rental);
    }

    // 7. Top Items
    const topItems = [
      { rank: 1, name: "Shui Kueh (5 pcs)", likes: 456, price: 2.0 },
      { rank: 2, name: "Oyster Omelette", likes: 234, price: 3.5 },
      { rank: 3, name: "Popiah", likes: 189, price: 2.5 },
    ];

    await setDoc(doc(db, "stalls", "02-18", "data", "topItems"), {
      items: topItems,
    });

    console.log("✅ All vendor data uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading data:", error);
  }
}

// Run the upload
uploadVendorData();
