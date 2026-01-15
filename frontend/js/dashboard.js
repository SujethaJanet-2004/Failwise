// ==============================
// DASHBOARD LOGIC (FailWise)
// Backend-connected + Edit + Delete
// ==============================

// Backend API endpoint
const API_URL = "https://failwise.onrender.com/attempts";

// ------------------------------
// 1. Get references to UI elements
// ------------------------------

const totalAttemptsEl = document.getElementById("totalAttempts");
const failedTopicEl = document.getElementById("mostFailedTopic");
const tableBody = document.querySelector("tbody");

const weakestTopicEl = document.getElementById("weakestTopic");
const failureRateEl = document.getElementById("failureRate");
const recommendationEl = document.getElementById("recommendation");

// ------------------------------
// 2. Fetch attempts from backend
// ------------------------------

fetch(API_URL)
  .then(response => response.json())
  .then(attempts => {
    renderDashboard(attempts);
  })
  .catch(error => {
    console.error("Error fetching attempts:", error);
  });

// ------------------------------
// 3. Main dashboard render function
// ------------------------------

function renderDashboard(attempts) {

  // --------------------------
  // Total attempts
  // --------------------------
  totalAttemptsEl.textContent = attempts.length;

  // --------------------------
  // Find most failed topic
  // --------------------------
  const topicFailureCount = {};

  attempts.forEach(attempt => {
    if (attempt.outcome === "Fail") {
      const topic = attempt.topic;
      topicFailureCount[topic] = (topicFailureCount[topic] || 0) + 1;
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

  // --------------------------
  // Populate Attempt History table
  // --------------------------
  tableBody.innerHTML = "";

  attempts.forEach(attempt => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${attempt.company_name}</td>
      <td>${attempt.round_type}</td>
      <td>${attempt.topic}</td>
      <td>${attempt.date_attended}</td>
      <td>${attempt.outcome}</td>
      <td>
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

  // --------------------------
  // Advanced Analytics (Insights)
  // --------------------------

  const topicStats = {};

  attempts.forEach(attempt => {
    const topic = attempt.topic;

    if (!topicStats[topic]) {
      topicStats[topic] = {
        total: 0,
        fail: 0,
        pass: 0
      };
    }

    topicStats[topic].total += 1;

    if (attempt.outcome === "Fail") {
      topicStats[topic].fail += 1;
    } else {
      topicStats[topic].pass += 1;
    }
  });

  // Calculate failure rate
  for (let topic in topicStats) {
    const stats = topicStats[topic];
    stats.failureRate = Math.round((stats.fail / stats.total) * 100);
  }

  // Identify weakest topic (only if meaningful data exists)
  let weakestTopic = "--";
  let highestFailureRate = 0;

  for (let topic in topicStats) {
    const stats = topicStats[topic];

    // Defensive analytics: minimum 2 attempts
    if (stats.total >= 2 && stats.failureRate > highestFailureRate) {
      highestFailureRate = stats.failureRate;
      weakestTopic = topic;
    }
  }

  // --------------------------
  // Update Insights UI
  // --------------------------

  if (weakestTopic !== "--") {
    weakestTopicEl.textContent = weakestTopic;
    failureRateEl.textContent = highestFailureRate + "%";

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
// 4. Edit handler
// ------------------------------

function editAttempt(id) {
  window.location.href = `add.html?id=${id}`;
}

// ------------------------------
// 5. Delete handler
// ------------------------------

function deleteAttempt(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this interview attempt?"
  );

  if (!confirmDelete) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      // Reload dashboard after successful delete
      location.reload();
    })
    .catch(() => {
      alert("Failed to delete attempt. Please try again.");
    });
}
