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
// seed data functions - run once to populate firestore
// officer document
function writeOfficerData() {
  const docData = {
    name: "Rayne Tok",
  };
  db.collection("neaDashboard").doc("officer").set(docData);
  console.log("✅ Officer data written");
}
// stats document
function writeStatsData() {
  const docData = {
    totalStalls: 8,
    thisMonth: 4,
    pendingComplaints: 0,
    gradeAStalls: 1,
  };
  db.collection("neaDashboard").doc("stats").set(docData);
  console.log("✅ Stats data written");
}
// grade distribution document
function writeGradeDistributionData() {
  const docData = {
    A: 1,
    B: 2,
    C: 1,
    D: 4,
  };
  db.collection("neaDashboard").doc("gradeDistribution").set(docData);
  console.log("✅ Grade distribution data written");
}
// stalls collection - using subcollection under a document
function writeStall1() {
  const docData = {
    name: "Tian Tian Hainanese Chicken Rice",
    stallId: "#01-45",
    grade: "D",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S1")
    .set(docData);
  console.log("✅ Stall 1 written");
}
function writeStall2() {
  const docData = {
    name: "Zhen Zhen Porridge",
    stallId: "#01-52",
    grade: "B",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S2")
    .set(docData);
  console.log("✅ Stall 2 written");
}
function writeStall3() {
  const docData = {
    name: "Ah Heng Curry Chicken Bee Hoon",
    stallId: "#02-18",
    grade: "A",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S3")
    .set(docData);
  console.log("✅ Stall 3 written");
}
function writeStall4() {
  const docData = {
    name: "Happy Duck Rice",
    stallId: "#01-11",
    grade: "C",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S4")
    .set(docData);
  console.log("✅ Stall 4 written");
}
function writeStall5() {
  const docData = {
    name: "Chong Pang Nasi Lemak",
    stallId: "#02-34",
    grade: "B",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S5")
    .set(docData);
  console.log("✅ Stall 5 written");
}
function writeStall6() {
  const docData = {
    name: "Lau Pa Sat Satay",
    stallId: "#01-29",
    grade: "D",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S6")
    .set(docData);
  console.log("✅ Stall 6 written");
}
function writeStall7() {
  const docData = {
    name: "Fishball Story Soup",
    stallId: "#02-07",
    grade: "D",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S7")
    .set(docData);
  console.log("✅ Stall 7 written");
}
function writeStall8() {
  const docData = {
    name: "Nameless Rice Stall",
    stallId: "#01-19",
    grade: "D",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("stalls")
    .doc("S8")
    .set(docData);
  console.log("✅ Stall 8 written");
}
// inspections collection
function writeInspection1() {
  const docData = {
    stall: "Tian Tian Hainanese Chicken Rice",
    stallId: "#01-45",
    date: "Jan 13, 2026",
    officer: "Rayne Tok",
    cleanliness: 92,
    foodHandling: 87,
    equipment: 95,
    overall: 91,
    grade: "A",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("inspections")
    .doc("I1")
    .set(docData);
  console.log("✅ Inspection 1 written");
}
function writeInspection2() {
  const docData = {
    stall: "Zhen Zhen Porridge",
    stallId: "#01-52",
    date: "Jan 12, 2026",
    officer: "Rayne Tok",
    cleanliness: 80,
    foodHandling: 82,
    equipment: 79,
    overall: 80,
    grade: "B",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("inspections")
    .doc("I2")
    .set(docData);
  console.log("✅ Inspection 2 written");
}
function writeInspection3() {
  const docData = {
    stall: "Ah Heng Curry Chicken Bee Hoon",
    stallId: "#02-18",
    date: "Jan 11, 2026",
    officer: "Rayne Tok",
    cleanliness: 98,
    foodHandling: 96,
    equipment: 97,
    overall: 97,
    grade: "A",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("inspections")
    .doc("I3")
    .set(docData);
  console.log("✅ Inspection 3 written");
}
// complaints collection
function writeComplaint1() {
  const docData = {
    stall: "Lau Pa Sat Satay",
    stallId: "#01-29",
    date: "Jan 15, 2026",
    description: "Found cockroach near food preparation area",
    status: "Pending",
    submittedBy: "Customer",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("complaints")
    .doc("C1")
    .set(docData);
  console.log("Complaint 1 written");
}
function writeComplaint2() {
  const docData = {
    stall: "Jian Bo Shui Kueh",
    stallId: "#02-18",
    date: "Jan 10, 2026",
    description:
      "Unhygeinic food handling observed. Lack of hygiene practices.",
    status: "Pending",
    submittedBy: "Customer",
  };
  db.collection("neaDashboard")
    .doc("data")
    .collection("complaints")
    .doc("C2")
    .set(docData);
  console.log("Complaint 2 written");
}
// seed all data function
function seedAllNEAData() {
  console.log("🌱 Starting to seed NEA Dashboard data...");
  // write officer & stats & grade distribution
  writeOfficerData();
  writeStatsData();
  writeGradeDistributionData();
  // write stalls
  writeStall1();
  writeStall2();
  writeStall3();
  writeStall4();
  writeStall5();
  writeStall6();
  writeStall7();
  writeStall8();
  // write inspections
  writeInspection1();
  writeInspection2();
  writeInspection3();
  // write complaints
  writeComplaint1();
  writeComplaint2();
  console.log("All NEA Dashboard data written to Firestore!");
}
seedAllNEAData();
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
    const dataRef = neaRef.doc("data");

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
      dataRef.collection("stalls").get(),
      dataRef.collection("inspections").get(),
      dataRef.collection("complaints").get(),
    ]);
    // process stalls
    const stalls = [];
    stallsSnapshot.forEach((doc) => stalls.push({ id: doc.id, ...doc.data() }));
    // process inspections
    const inspections = [];
    inspectionsSnapshot.forEach((doc) =>
      inspections.push({ id: doc.id, ...doc.data() }),
    );
    // process complaints
    const complaints = [];
    complaintsSnapshot.forEach((doc) =>
      complaints.push({ id: doc.id, ...doc.data() }),
    );
    // build data object
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
// fallback data in case of firebase failure
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
        stallId: "#01-45",
        date: "Jan 13, 2026",
        officer: "Rayne Tok",
        cleanliness: 92,
        foodHandling: 87,
        equipment: 95,
        overall: 91,
        grade: "A",
      },
      {
        id: "I2",
        stall: "Zhen Zhen Porridge",
        stallId: "#01-52",
        date: "Jan 12, 2026",
        officer: "Rayne Tok",
        cleanliness: 80,
        foodHandling: 82,
        equipment: 79,
        overall: 80,
        grade: "B",
      },
      {
        id: "I3",
        stall: "Ah Heng Curry Chicken Bee Hoon",
        stallId: "#02-18",
        date: "Jan 11, 2026",
        officer: "Rayne Tok",
        cleanliness: 98,
        foodHandling: 96,
        equipment: 97,
        overall: 97,
        grade: "A",
      },
    ],
    complaints: [],
  };

  showToast("⚠️ Using offline data", "error");
  renderNEADashboard();
  initializeNEATabs();
  initializeEventListeners();
}
// firebase saving functions
async function saveInspectionToFirebase(inspection) {
  try {
    const docRef = await db
      .collection("neaDashboard")
      .doc("data")
      .collection("inspections")
      .add(inspection);
    console.log("Inspection saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving inspection:", error);
    return null;
  }
}
async function updateStallGradeInFirebase(stallId, grade) {
  try {
    await db
      .collection("neaDashboard")
      .doc("data")
      .collection("stalls")
      .doc(stallId)
      .update({ grade: grade });
    console.log("Stall grade updated");
    return true;
  } catch (error) {
    console.error("Error updating stall grade:", error);
    return false;
  }
}
async function saveComplaintToFirebase(complaint) {
  try {
    const docRef = await db
      .collection("neaDashboard")
      .doc("data")
      .collection("complaints")
      .add(complaint);
    console.log("Complaint saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving complaint:", error);
    return null;
  }
}
async function updateComplaintStatusInFirebase(complaintId, status) {
  try {
    await db
      .collection("neaDashboard")
      .doc("data")
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
    await db.collection("neaDashboard").doc("stats").update(stats);
    console.log("Stats updated");
    return true;
  } catch (error) {
    console.error("Error updating stats:", error);
    return false;
  }
}
async function updateGradeDistributionInFirebase(distribution) {
  try {
    await db
      .collection("neaDashboard")
      .doc("gradeDistribution")
      .update(distribution);
    console.log("Grade distribution updated");
    return true;
  } catch (error) {
    console.error("Error updating grade distribution:", error);
    return false;
  }
}
// real time listeners
function setupRealtimeListeners() {
  console.log("Setting up real-time listeners...");
  const dataRef = db.collection("neaDashboard").doc("data");
  // listener for stalls collection
  dataRef.collection("stalls").onSnapshot((snapshot) => {
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
  // listener for inspections collection
  dataRef.collection("inspections").onSnapshot((snapshot) => {
    console.log("Inspections updated!");
    const inspections = [];
    snapshot.forEach((doc) => inspections.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.inspections = inspections;

    const statsEl = document.getElementById("nea-this-month");
    if (statsEl) statsEl.textContent = inspections.length;

    const inspectionsTab = document.getElementById("nea-inspections-tab");
    if (inspectionsTab && inspectionsTab.classList.contains("active")) {
      renderNEAInspectionsTab(neaDashboardData);
    }
  });
  // listener for complaints collection
  dataRef.collection("complaints").onSnapshot((snapshot) => {
    console.log("Complaints updated!");
    const complaints = [];
    snapshot.forEach((doc) => complaints.push({ id: doc.id, ...doc.data() }));
    neaDashboardData.complaints = complaints;

    const pendingCount = complaints.filter(
      (c) => c.status === "Pending",
    ).length;
    const pendingEl = document.getElementById("nea-pending-complaints");
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

  // update grade A stalls count
  const gradeAEl = document.getElementById("nea-grade-a-stalls");
  if (gradeAEl) gradeAEl.textContent = distribution.A;
}
// render dashboard
function renderNEADashboard() {
  console.log("Rendering NEA Dashboard...");
  const data = neaDashboardData;
  // update the header
  const officerNameEl = document.getElementById("nea-officer-name");
  if (officerNameEl) officerNameEl.textContent = data.officer.name;
  // update stats
  const totalStallsEl = document.getElementById("nea-total-stalls");
  const thisMonthEl = document.getElementById("nea-this-month");
  const pendingEl = document.getElementById("nea-pending-complaints");
  const gradeAEl = document.getElementById("nea-grade-a-stalls");

  if (totalStallsEl) totalStallsEl.textContent = data.stats.totalStalls;
  if (thisMonthEl) thisMonthEl.textContent = data.inspections.length;
  if (pendingEl)
    pendingEl.textContent = data.complaints.filter(
      (c) => c.status === "Pending",
    ).length;
  if (gradeAEl) gradeAEl.textContent = data.gradeDistribution.A;
  // render grade distribution chart
  renderGradeDistribution(data.gradeDistribution);
  console.log("NEA Dashboard rendered.");
}
function renderGradeDistribution(distribution) {
  const countAEl = document.getElementById("nea-count-a");
  const countBEl = document.getElementById("nea-count-b");
  const countCEl = document.getElementById("nea-count-c");
  const countDEl = document.getElementById("nea-count-d");
  if (countAEl) countAEl.textContent = distribution.A;
  if (countBEl) countBEl.textContent = distribution.B;
  if (countCEl) countCEl.textContent = distribution.C;
  if (countDEl) countDEl.textContent = distribution.D;
}
// tab navigation
function initializeNEATabs() {
  console.log("Initializing NEA Dashboard tabs...");
  const tabBtns = document.querySelectorAll(".nea-tab-btn");
  const tabPanes = document.querySelectorAll(".nea-tab-pane");
  if (tabBtns.length === 0 || tabPanes.length === 0) {
    console.error("Tab elements not found!");
    return;
  }
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tabName = btn.getAttribute("data-nea-tab");
      // update buttons
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // update panes
      tabPanes.forEach((p) => p.classList.remove("active"));
      const tabPane = document.getElementById(`nea-${tabName}-tab`);
      if (tabPane) {
        tabPane.classList.add("active");
        renderNEATabContent(tabName);
      }
    });
  });
  // render initial tab
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
// stalls tab
function renderNEAStallsTab(data) {
  console.log("Rendering NEA Stalls tab...");
  const stallsList = document.getElementById("nea-stalls-list");
  if (!stallsList) {
    console.error("Stalls list element not found!");
    return;
  }
  const searchInput = document.getElementById("nea-stalls-search");
  let filteredStalls = [...data.stalls];
  if (searchInput && searchInput.value) {
    const query = searchInput.value.toLowerCase();
    filteredStalls = filteredStalls.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.stallId.toLowerCase().includes(query),
    );
  }
  if (filteredStalls.length === 0) {
    stallsList.innerHTML = `<p class="nea-no-results">No stalls found.</p>`;
    return;
  }
  let html = "";
  filteredStalls.forEach((stall) => {
    const grade = stall.grade || "D";
    html += `
      <article class="nea-stall-row">
        <div class="nea-stall-badge-container">
          ${createGradeBadge(grade)}
        </div>
        <div class="nea-stall-info">
          <p class="nea-stall-name">${stall.name}</p>
          <p class="nea-stall-id">${stall.stallId}</p>
        </div>
        <div class="nea-stall-actions">
          <button class="nea-inspect-btn" onclick="openInspectionModal('${stall.id}', '${stall.name}', '${stall.stallId}')">
            Inspect
          </button>
        </div>
      </article>`;
  });
  stallsList.innerHTML = html;
}
function createGradeBadge(grade) {
  const gradeUpper = (grade || "D").toUpperCase();
  const colors = {
    A: "#10b981",
    B: "#84cc16",
    C: "#f59e0b",
    D: "#ef4444",
  };
  const bgColor = colors[gradeUpper] || "#ef4444";
  return `
    <div class="hygiene-grade-badge">
      <div class="nea-grade-circle grade-${gradeUpper.toLowerCase()}" style="background: ${bgColor};">${gradeUpper}</div>
    </div>`;
}
// inspections tab
function renderNEAInspectionsTab(data) {
  console.log("Rendering NEA Inspections tab...");
  const inspectionsList = document.getElementById("nea-inspections-list");
  if (!inspectionsList) {
    console.error("Inspections list element not found!");
    return;
  }
  if (data.inspections.length === 0) {
    inspectionsList.innerHTML = createEmptyState(
      "📋",
      "No Inspections",
      "Inspections will appear here",
    );
    return;
  }
  // sort by date
  const sortedInspections = [...data.inspections].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  let html = "";
  sortedInspections.forEach((insp) => {
    const grade = insp.grade || getGradeFromScore(insp.overall);
    html += `
      <article class="nea-inspection-card">
        <header class="nea-inspection-header">
          <div class="nea-inspection-left">
            <h4>${insp.stall}</h4>
            <p>${insp.stallId || ""} • ${insp.date}</p>
          </div>
          <div class="nea-inspection-score">${insp.overall}%</div>
        </header>
        <div class="nea-inspection-breakdown">
          <div class="nea-breakdown-item">
            <label>Cleanliness</label>
            <span>${insp.cleanliness}%</span>
          </div>
          <div class="nea-breakdown-item">
            <label>Food Handling</label>
            <span>${insp.foodHandling}%</span>
          </div>
          <div class="nea-breakdown-item">
            <label>Equipment</label>
            <span>${insp.equipment}%</span>
          </div>
        </div>
        <div class="nea-inspection-badge-container">
          ${createGradeBadge(grade)}
        </div>
      </article>`;
  });
  inspectionsList.innerHTML = html;
}
// complaints tab
function renderNEAComplaintsTab(data) {
  console.log("Rendering NEA Complaints tab...");
  const complaintsList = document.getElementById("nea-complaints-list");
  if (!complaintsList) {
    console.error("Complaints list element not found!");
    return;
  }
  const pendingComplaints = data.complaints.filter(
    (c) => c.status === "Pending",
  );
  if (pendingComplaints.length === 0) {
    complaintsList.innerHTML = `
      <div class="nea-complaints-empty">
        <p class="nea-complaint-empty">✅</p>
        <p class="nea-complaint-empty-text">No pending complaints</p>
        <p style="color: #059669; margin-top: 0.5rem; font-size: 0.9rem;">All complaints have been resolved!</p>
      </div>`;
    return;
  }
  let html = "";
  pendingComplaints.forEach((complaint) => {
    html += `
      <article class="nea-complaint-card">
        <header class="nea-complaint-header">
          <div class="nea-complaint-info">
            <h4>${complaint.stall}</h4>
            <p>📍 ${complaint.stallId || "N/A"} • 📅 ${complaint.date}</p>
          </div>
          <span class="nea-complaint-status">${complaint.status}</span>
        </header>
        <div class="nea-complaint-body">
          <p>${complaint.description}</p>
        </div>
        <footer class="nea-complaint-actions">
          <button class="nea-inspect-btn" onclick="resolveComplaint('${complaint.id}')">
            ✓ Mark as Resolved
          </button>
        </footer>
      </article>`;
  });
  complaintsList.innerHTML = html;
}
async function resolveComplaint(complaintId) {
  if (!confirm("Mark this complaint as resolved?")) {
    return;
  }
  try {
    await updateComplaintStatusInFirebase(complaintId, "Resolved");
    const index = neaDashboardData.complaints.findIndex(
      (c) => c.id === complaintId,
    );
    if (index !== -1) {
      neaDashboardData.complaints[index].status = "Resolved";
      renderNEAComplaintsTab(neaDashboardData);
      renderNEADashboard();
      showToast("✅ Complaint marked as resolved", "success");
    }
  } catch (error) {
    console.error("Error resolving complaint:", error);
    showToast("❌ Failed to mark complaint as resolved", "error");
  }
}
// inspection modal
function openInspectionModal(stallId, stallName, stallUnitId) {
  const modal = document.getElementById("nea-inspection-modal");
  if (modal) {
    document.getElementById("inspection-stall-id").value = stallId;
    document.getElementById("inspection-stall-name").value = stallName;
    document.getElementById("inspection-stall-unit-id").value = stallUnitId;
    document.getElementById("inspection-stall-display").textContent = stallName;
    document.getElementById("inspection-stall-unit-display").textContent =
      stallUnitId;
    // reset form fields
    document.getElementById("inspection-cleanliness").value = "";
    document.getElementById("inspection-food-handling").value = "";
    document.getElementById("inspection-equipment").value = "";
    document.getElementById("inspection-notes").value = "";
    modal.classList.add("active");
  }
}
function closeInspectionModal() {
  const modal = document.getElementById("nea-inspection-modal");
  if (modal) {
    modal.classList.remove("active");
  }
}
async function submitInspectionForm() {
  const stallId = document.getElementById("inspection-stall-id").value;
  const stallName = document.getElementById("inspection-stall-name").value;
  const stallUnitId = document.getElementById("inspection-stall-unit-id").value;
  const cleanliness = parseInt(
    document.getElementById("inspection-cleanliness").value,
  );
  const foodHandling = parseInt(
    document.getElementById("inspection-food-handling").value,
  );
  const equipment = parseInt(
    document.getElementById("inspection-equipment").value,
  );
  const notes = document.getElementById("inspection-notes").value;
  // validation
  if (isNaN(cleanliness) || cleanliness < 0 || cleanliness > 100) {
    showToast("Cleanliness score must be 0-100", "error");
    return;
  }
  if (isNaN(foodHandling) || foodHandling < 0 || foodHandling > 100) {
    showToast("Food handling score must be 0-100", "error");
    return;
  }
  if (isNaN(equipment) || equipment < 0 || equipment > 100) {
    showToast("Equipment score must be 0-100", "error");
    return;
  }
  // calculate overall score
  const overall = Math.round((cleanliness + foodHandling + equipment) / 3);
  const grade = getGradeFromScore(overall);
  const inspection = {
    stallId: stallUnitId,
    stall: stallName,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    officer: neaDashboardData.officer.name,
    cleanliness: cleanliness,
    foodHandling: foodHandling,
    equipment: equipment,
    overall: overall,
    grade: grade,
    notes: notes,
    createdAt: new Date().toISOString(),
  };
  const submitBtn = document.querySelector(
    "#nea-inspection-modal .nea-btn-save",
  );
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
  }
  try {
    const docId = await saveInspectionToFirebase(inspection);
    if (docId) {
      inspection.id = docId;
      neaDashboardData.inspections.unshift(inspection);
      // update stall grade
      await updateStallGradeInFirebase(stallId, grade);
      const stallIndex = neaDashboardData.stalls.findIndex(
        (s) => s.id === stallId,
      );
      if (stallIndex !== -1) {
        neaDashboardData.stalls[stallIndex].grade = grade;
      }
      updateGradeDistributionFromStalls();
      closeInspectionModal();
      renderNEADashboard();
      showToast(`✅ Inspection submitted! Grade: ${grade}`, "success");
    } else {
      showToast("❌ Failed to save inspection", "error");
    }
  } catch (error) {
    console.error("Error submitting inspection:", error);
    showToast("❌ An error occurred", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  }
}
// helper functions
function createEmptyState(icon, title, text) {
  return `
    <div class="nea-empty-state">
      <div class="nea-empty-state-icon">${icon}</div>
      <p class="nea-empty-state-title">${title}</p>
      <p class="nea-empty-state-text">${text}</p>
    </div>`;
}
function getGradeFromScore(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "D";
}
// toast notification
function showToast(message, type = "success") {
  const existing = document.querySelector(".nea-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `nea-toast nea-toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
// event listeners
function initializeEventListeners() {
  console.log("Initializing event listeners...");
  // stalls search
  const stallSearch = document.getElementById("nea-stalls-search");
  if (stallSearch) {
    stallSearch.addEventListener("input", () =>
      renderNEAStallsTab(neaDashboardData),
    );
  }
  // inspection modal submit on click
  const inspectionSubmitBtn = document.querySelector(
    "#nea-inspection-modal .nea-btn-save",
  );
  if (inspectionSubmitBtn) {
    inspectionSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitInspectionForm();
    });
  }
  // inspection modal close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInspectionModal();
  });
  // close modal when clicking outside
  const modal = document.getElementById("nea-inspection-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeInspectionModal();
    });
  }
  console.log("Event listeners initialized");
}
// navigation
function navigateHome() {
  window.location.href = "index.html";
}
// global functions
window.openInspectionModal = openInspectionModal;
window.closeInspectionModal = closeInspectionModal;
window.submitInspectionForm = submitInspectionForm;
window.resolveComplaint = resolveComplaint;
window.navigateHome = navigateHome;
window.seedAllNEAData = seedAllNEAData;
