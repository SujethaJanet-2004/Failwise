// ==============================
// DASHBOARD LOGIC (FailWise)
// Backend-connected + Edit + Delete
// Mobile responsive compatible
// ==============================

// Backend API endpoint (Render)
const API_URL = "https://failwise.onrender.com/attempts";

// ------------------------------
// 1. UI references
// ------------------------------

const totalAttemptsEl = document.getElementById("totalAttempts");
const failedTopicEl = document.getElementById("mostFailedTopic");
const tableBody = document.querySelector("tbody");

const weakestTopicEl = document.getElementById("weakestTopic");
const failureRateEl = document.getElementById("failureRate");
const recommendationEl = document.getElementById("recommendation");

// ------------------------------
// 2. Fetch attempts
// ------------------------------

fetch(API_URL)
  .then(res => res.json())
  .then(data => renderDashboard(data))
  .catch(err => console.error("Failed to load attempts:", err));

// ------------------------------
// 3. Render Dashboard
// ------------------------------

function renderDashboard(attempts) {

  // ---------- Total Attempts ----------
  totalAttemptsEl.textContent = attempts.length;

  // ---------- Most Failed Topic ----------
  const topicFailureCount = {};

  attempts.forEach(a => {
    if (a.outcome === "Fail") {
      topicFailureCount[a.topic] = (topicFailureCount[a.topic] || 0) + 1;
    }
  });

  let mostFailedTopic = "--";
  let maxFailures = 0;

  for (let topic in topicFailureCount) {
    if (topicFailureCount[topic] > maxFailures) {
      maxFailures = topicFailureCount[topic];
      mostFailedTopic = topic;
    }
  }

  failedTopicEl.textContent = mostFailedTopic;

  // ---------- Attempt History ----------
  tableBody.innerHTML = "";

  attempts.forEach(attempt => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td data-label="Company">${attempt.company_name}</td>
      <td data-label="Round">${attempt.round_type}</td>
      <td data-label="Topic">${attempt.topic}</td>
      <td data-label="Date">${attempt.date_attended}</td>
      <td data-label="Outcome">${attempt.outcome}</td>
      <td data-label="Actions">
        <button class="action-btn edit-btn" onclick="editAttempt(${attempt.id})">
          Edit
        </button>
        <button class="action-btn delete-btn" onclick="deleteAttempt(${attempt.id})">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // ---------- Analytics ----------
  const topicStats = {};

  attempts.forEach(a => {
    if (!topicStats[a.topic]) {
      topicStats[a.topic] = { total: 0, fail: 0 };
    }
    topicStats[a.topic].total++;
    if (a.outcome === "Fail") topicStats[a.topic].fail++;
  });

  let weakestTopic = "--";
  let highestFailureRate = 0;

  for (let topic in topicStats) {
    const stats = topicStats[topic];
    if (stats.total >= 2) {
      const rate = Math.round((stats.fail / stats.total) * 100);
      if (rate > highestFailureRate) {
        highestFailureRate = rate;
        weakestTopic = topic;
      }
    }
  }

  // ---------- Insights UI ----------
  if (weakestTopic !== "--") {
    weakestTopicEl.textContent = weakestTopic;
    failureRateEl.textContent = `${highestFailureRate}%`;
    recommendationEl.textContent =
      "You are consistently failing this topic. Prioritize revising it before your next interview.";
  } else {
    weakestTopicEl.textContent = "--";
    failureRateEl.textContent = "--%";
    recommendationEl.textContent =
      "Not enough data to generate recommendation yet. Keep logging interviews.";
  }
}

// ------------------------------
// 4. Edit Attempt
// ------------------------------

function editAttempt(id) {
  window.location.href = `add.html?id=${id}`;
}

// ------------------------------
// 5. Delete Attempt
// ------------------------------

function deleteAttempt(id) {
  if (!confirm("Are you sure you want to delete this attempt?")) return;

  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok) throw new Error("Delete failed");
      location.reload();
    })
    .catch(() => alert("Failed to delete attempt"));
}

