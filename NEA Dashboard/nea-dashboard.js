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
// initialising firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// global variables to hold NEA data
let neaDashboardData = null;
// initialisation on DOM load
document.addEventListener("DOMContentLoaded", function () {
  console.log("NEA Dashboard initializing...");
  loadNEADataFromFirebase();
});
// loading of firebase data
async function loadNEADataFromFirebase() {
  console.log("Fetching NEA data from Firebase...");
  showLoadingState();

  try {
    const neaRef = db.collection("neaDashboard");

    const [
      officerDoc,
      statsDoc,
      gradeDistDoc,
      stallsSnapshot,
      inspectionsSnapshot,
      complaintsSnapshot,
    ] = await Promise.all([
      neaRef.doc("officer").get(),
      neaRef.doc("stats").get(),
      neaRef.doc("gradeDistribution").get(),
      neaRef.collection("stalls").get(),
      neaRef.collection("inspections").get(),
      neaRef.collection("complaints").get(),
    ]);

    // Process stalls
    const stalls = [];
    stallsSnapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));

    // Process inspections
    const inspections = [];
    inspectionsSnapshot.forEach((doc) =>
      inspections.push({ id: doc.id, ...doc.data() }),
    );

    // Process complaints
    const complaints = [];
    complaintsSnapshot.forEach((doc) =>
      complaints.push({ id: doc.id, ...doc.data() }),
    );

    // Build data object
    neaDashboardData = {
      officer: officerDoc.exists ? officerDoc.data() : { name: "NEA Officer" },
      stats: statsDoc.exists
        ? statsDoc.data()
        : {
            totalStalls: 0,
            thisMonth: 0,
            pendingComplaints: 0,
            gradeAStalls: 0,
          },
      gradeDistribution: gradeDistDoc.exists
        ? gradeDistDoc.data()
        : { A: 0, B: 0, C: 0, D: 0 },
      stalls: stalls,
      inspections: inspections,
      complaints: complaints,
    };

    console.log("NEA Data loaded:", neaDashboardData);

    hideLoadingState();
    renderNEADashboard();
    initializeNEATabs();
    initializeEventListeners();
    setupRealtimeListeners();
  } catch (error) {
    console.error("Error loading NEA data:", error);
    hideLoadingState();
    loadFallbackData();
  }
}
// loading state functions
function showLoadingState() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "nea-loading-overlay";
  loadingDiv.innerHTML = `
    <div class="loading-content">
      <div class="nea-loading-spinner"></div>
      <p>Loading NEA Dashboard...</p>
    </div>
  `;
  document.body.appendChild(loadingDiv);
}

function hideLoadingState() {
  const overlay = document.getElementById("nea-loading-overlay");
  if (overlay) overlay.remove();
}
// fallback data in case of Firebase failure
function loadFallbackData() {
  console.log("Loading fallback data...");

  neaDashboardData = {
    officer: {
      name: "Rayne Tok",
    },
    stats: {
      totalStalls: 8,
      thisMonth: 4,
      pendingComplaints: 0,
      gradeAStalls: 1,
    },
    gradeDistribution: {
      A: 1,
      B: 2,
      C: 1,
      D: 4,
    },
    stalls: [
      {
        id: "S1",
        name: "Tian Tian Hainanese Chicken Rice",
        stallId: "#01-45",
        grade: "D",
      },
      { id: "S2", name: "Zhen Zhen Porridge", stallId: "#01-52", grade: "B" },
      {
        id: "S3",
        name: "Ah Heng Curry Chicken Bee Hoon",
        stallId: "#02-18",
        grade: "A",
      },
      { id: "S4", name: "Happy Duck Rice", stallId: "#01-11", grade: "C" },
      {
        id: "S5",
        name: "Chong Pang Nasi Lemak",
        stallId: "#02-34",
        grade: "B",
      },
      { id: "S6", name: "Lau Pa Sat Satay", stallId: "#01-29", grade: "D" },
      { id: "S7", name: "Fishball Story Soup", stallId: "#02-07", grade: "D" },
      { id: "S8", name: "Nameless Rice Stall", stallId: "#01-19", grade: "D" },
    ],
    inspections: [
      {
        id: "I1",
        stall: "Tian Tian Hainanese Chicken Rice",
        date: "Jan 13, 2026",
        officer: "Rayne Tok",
        cleanliness: 92,
        foodHandling: 87,
        equipment: 95,
        overall: 91,
      },
      {
        id: "I2",
        stall: "Zhen Zhen Porridge",
        date: "Jan 12, 2026",
        officer: "Rayne Tok",
        cleanliness: 80,
        foodHandling: 82,
        equipment: 79,
        overall: 80,
      },
      {
        id: "I3",
        stall: "Ah Heng Curry Chicken Bee Hoon",
        date: "Jan 11, 2026",
        officer: "Rayne Tok",
        cleanliness: 98,
        foodHandling: 96,
        equipment: 97,
        overall: 97,
      },
    ],
    complaints: [],
  };

  showToast("⚠️ Using offline data", "error");
  renderNEADashboard();
  initializeNEATabs();
  initializeEventListeners();
}
//Firebase saving functions
async function saveInspectionToFirebase(inspection) {
  try {
    const neaRef = db.collection("neaDashboard");
    const docRef = await neaRef.collection("inspections").add(inspection);
    console.log("Inspection saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving inspection:", error);
    return null;
  }
}
async function updateStallGradeInFirebase(stallId, grade) {
  try {
    const neaRef = db.collection("neaDashboard");
    await neaRef.collection("stalls").doc(stallId).update({ grade: grade });
    console.log("Stall grade updated");
    return true;
  } catch (error) {
    console.error("Error updating stall grade:", error);
    return false;
  }
}

async function saveComplaintToFirebase(complaint) {
  try {
    const neaRef = db.collection("neaDashboard");
    const docRef = await neaRef.collection("complaints").add(complaint);
    console.log("✅ Complaint saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving complaint:", error);
    return null;
  }
}

async function updateComplaintStatusInFirebase(complaintId, status) {
  try {
    const neaRef = db.collection("neaDashboard");
    await neaRef
      .collection("complaints")
      .doc(complaintId)
      .update({ status: status });
    console.log("Complaint status updated");
    return true;
  } catch (error) {
    console.error("Error updating complaint:", error);
    return false;
  }
}

async function updateStatsInFirebase(stats) {
  try {
    const neaRef = db.collection("neaDashboard");
    await neaRef.doc("stats").update(stats);
    console.log("Stats updated");
    return true;
  } catch (error) {
    console.error("Error updating stats:", error);
    return false;
  }
}

async function updateGradeDistributionInFirebase(distribution) {
  try {
    const neaRef = db.collection("neaDashboard");
    await neaRef.doc("gradeDistribution").update(distribution);
    console.log("Grade distribution updated");
    return true;
  } catch (error) {
    console.error("Error updating grade distribution:", error);
    return false;
  }
}
//Real time listeners
function setupRealtimeListeners() {
  console.log("Setting up real-time listeners...");
  const neaRef = db.collection("neaDashboard");
  //Listener for stalls collection
  neaRef.collection("stalls").onSnapshot((snapshot) => {
    console.log("Stalls updated!");
    const stalls = [];
    snapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.stalls = stalls;
    updateGradeDistributionFromStalls();

    const stallsTab = document.getElementById("nea-stalls-tab");
    if (stallsTab && stallsTab.classList.contains("active")) {
      renderNEAStallsTab(neaDashboardData);
    }
  });
  //Listener for inspections collection
  neaRef.collection("inspections").onSnapshot((snapshot) => {
    console.log("Inspections updated!");
    const inspections = [];
    snapshot.forEach((doc) => inspections.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.inspections = inspections;
    renderNEAInspectionsTab(neaDashboardData);

    const statsEl = document.getElementById("nea-inspections-count");
    if (statsEl) statsEl.textContent = inspections.length;
    const inspectionsTab = document.getElementById("nea-inspections-tab");
    if (inspectionsTab && inspectionsTab.classList.contains("active")) {
      renderNEAInspectionsTab(neaDashboardData);
    }
  });
  //Listener for complaints collection
  neaRef.collection("complaints").onSnapshot((snapshot) => {
    console.log("🔄 Complaints updated!");
    const complaints = [];
    snapshot.forEach((doc) => complaints.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.complaints = complaints;
    renderNEAComplaintsTab(neaDashboardData);
    const pendingCount = complaints.filter(
      (c) => c.status === "Pending",
    ).length;
    const pendingEl = document.getElementById("nea-pending-count");
    if (pendingEl) pendingEl.textContent = pendingCount;
    const complaintsTab = document.getElementById("nea-complaints-tab");
    if (complaintsTab && complaintsTab.classList.contains("active")) {
      renderNEAComplaintsTab(neaDashboardData);
    }
  });
  console.log("Real-time listeners set up.");
}
function updateGradeDistributionFromStalls() {
  const distribution = { A: 0, B: 0, C: 0, D: 0 };
  neaDashboardData.stalls.forEach((stall) => {
    if (distribution.hasOwnProperty(stall.grade)) {
      distribution[stall.grade]++;
    }
  });
  neaDashboardData.gradeDistribution = distribution;
  renderGradeDistribution(distribution);
}
//Render Dashboard
function renderNEADashboard() {
  console.log("Rendering NEA Dashboard...");
  const data = neaDashboardData;
  //Update the header
  const officerNameEl = document.getElementById("nea-officer-name");
  if (officerNameEl) officerNameEl.textContent = data.officer.name;
  //Update stats
  const totalStallsEl = document.getElementById("nea-total-stalls");
  const inspectionsCountEl = document.getElementById("nea-inspections-count");
  const pendingEl = document.getElementById("nea-pending-count");
  if (totalStallsEl) totalStallsEl.textContent = data.stats.totalStalls;
  if (inspectionsCountEl)
    inspectionsCountEl.textContent = data.inspections.length;
  if (pendingEl)
    pendingEl.textContent = data.complaints.filter(
      (c) => c.status === "pending",
    ).length;
  //Render grade distribution chart
  renderGradeDistribution(data.gradeDistribution);
  console.log("NEA Dashboard rendered.");
}
function renderGradeDistribution(distribution) {
  const gradeAEl = document.getElementById("nea-grade-a-count");
  const gradeBEl = document.getElementById("nea-grade-b-count");
  const gradeCEl = document.getElementById("nea-grade-c-count");
  const gradeDEl = document.getElementById("nea-grade-d-count");
  if (gradeAEl) gradeAEl.textContent = distribution.A;
  if (gradeBEl) gradeBEl.textContent = distribution.B;
  if (gradeCEl) gradeCEl.textContent = distribution.C;
  if (gradeDEl) gradeDEl.textContent = distribution.D;
}
//Tab Navigation
function intializeNEATabs() {
  console.log("Initializing NEA Dashboard tabs...");
  const tabBtns = document.querySelectorAll(".nea-tab-btn");
  const tabPanes = document.querySelectorAll(".nea-tab-pane");
  if (tabBtns.length === 0 || tabPanes.length === 0) {
    console.error("No tab buttons or panes found!");
    return;
  }
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute("data-nea-tab");
      //update buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      //update panes
      tabPanes.forEach((p) => p.classList.remove("active"));
      const tabPane = document.getElementById(`nea-${tabName}-tab`);
      if (tabPane) {
        tabPane.classList.add("active");
        renderNEATabContent(tabName);
      }
    });
  });
  //Render Initial tab
  renderNEATabContent("stalls");
}
function renderNEATabContent(tabName) {
  console.log(`Rendering NEA tab: ${tabName}`);
  const data = neaDashboardData;
  if (tabName === "stalls") {
    renderNEAStallsTab(data);
  } else if (tabName === "inspections") {
    renderNEAInspectionsTab(data);
  } else if (tabName === "complaints") {
    renderNEAComplaintsTab(data);
  }
}
