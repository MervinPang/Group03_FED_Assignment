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
//Initialise Firestore database
const db = getFirestore(app);
// Vendor Dashboard Init
document.addEventListener("DOMContentLoaded", function () {
  console.log("Vendor Dashboard loading...");

  // Load data from Firebase first, then render
  loadVendorDataFromFirebase();
});
// Fallback data if Firebase fails
function loadFallbackData() {
  console.log("Loading fallback data...");

  vendorDashboardData = {
    stall: {
      name: "Jian Bo Shui Kueh",
      stallId: "02-18",
      owner: "Mr. Lim",
    },
    stats: {
      todaysOrders: 0,
      todaysRevenue: 0.0,
      activeOrders: 0,
      avgRating: 5.0,
    },
    recentActivity: [
      {
        id: "HK41752284",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "9:22 AM",
      },
      {
        id: "HK41063894",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "9:11 AM",
      },
      {
        id: "HK80873979",
        customer: "lou lou",
        status: "cancelled",
        timestamp: "8:54 AM",
      },
      {
        id: "HK80826728",
        customer: "lou lou",
        status: "ready",
        timestamp: "8:42 AM",
      },
      {
        id: "HK86762210",
        customer: "Rayne Tok",
        status: "ready",
        timestamp: "8:15 AM",
      },
    ],
    topItems: [
      { rank: 1, name: "Shui Kueh (5 pcs)", likes: 456, price: 2.0 },
      { rank: 2, name: "Oyster Omelette", likes: 234, price: 3.5 },
      { rank: 3, name: "Popiah", likes: 189, price: 2.5 },
    ],
    activeOrders: [],
    menuItems: [
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
    ],
    reviews: [
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
    ],
    orderHistory: [
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
    ],
    rentalAgreements: [
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
    ],
  };

  renderVendorDashboard();
  initializeVendorTabs();
  initializeEventListeners();
}

function renderVendorDashboard() {
  console.log("Rendering vendor dashboard...");
  var data = vendorDashboardData;
  //update header
  var stallNameEl = document.getElementById("vendor-stall-name");
  var stallIdEl = document.getElementById("vendor-stall-id");
  if (stallNameEl) stallNameEl.textContent = data.stall.name;
  if (stallIdEl) stallIdEl.textContent = data.stall.stallId;

  //update stats
  var ordersEl = document.getElementById("vendor-orders-today");
  var revenueEl = document.getElementById("vendor-revenue-today");
  var activeEl = document.getElementById("vendor-active-orders");
  var ratingEl = document.getElementById("vendor-avg-rating");

  if (ordersEl) ordersEl.textContent = data.stats.todaysOrders;
  if (revenueEl)
    revenueEl.textContent = "$" + data.stats.todaysRevenue.toFixed(2);
  if (activeEl) activeEl.textContent = data.stats.activeOrders;
  if (ratingEl) ratingEl.textContent = data.stats.avgRating;

  console.log("Dashboard rendered successfully");
}
