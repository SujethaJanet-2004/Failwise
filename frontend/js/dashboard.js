// ==============================
// DASHBOARD LOGIC (FailWise)
// ==============================


// 1. Get references to dashboard elements
// These elements will be updated dynamically using JavaScript

const totalAttemptsEl = document.querySelector("strong"); 
const failedTopicEl = document.querySelectorAll("strong")[1];
const tableBody = document.querySelector("tbody");


// 2. Show total number of attempts
// Derived data → count of attempts array

const totalAttempts = attempts.length;
totalAttemptsEl.textContent = totalAttempts;


// 3. Find the most failed topic (basic analytics)
// Count failures per topic

const topicFailureCount = {};

attempts.forEach(attempt => {
    if (attempt.outcome === "Fail") {
        const topic = attempt.topic;
        topicFailureCount[topic] = (topicFailureCount[topic] || 0) + 1;
    }
});

// Identify topic with maximum failures
let mostFailedTopic = "--";
let maxFailures = 0;

for (let topic in topicFailureCount) {
    if (topicFailureCount[topic] > maxFailures) {
        maxFailures = topicFailureCount[topic];
        mostFailedTopic = topic;
    }
}

// Update UI
failedTopicEl.textContent = mostFailedTopic;


// 4. Populate attempt history table
// Convert each attempt object into a table row

attempts.forEach(attempt => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${attempt.companyName}</td>
        <td>${attempt.roundType}</td>
        <td>${attempt.topic}</td>
        <td>${attempt.date}</td>
        <td>${attempt.outcome}</td>
    `;

    tableBody.appendChild(row);
});


// ==============================
// ADVANCED ANALYTICS (v1.5)
// ==============================


// 5. Build topic-wise performance statistics
// This helps calculate failure rate and improvement insights

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


// 6. Calculate failure rate for each topic
// Failure Rate = (fail / total) * 100

for (let topic in topicStats) {
    const stats = topicStats[topic];
    stats.failureRate = Math.round((stats.fail / stats.total) * 100);
}


// 7. Identify weakest topic (decision logic)
// Only consider topics with at least 2 attempts

let weakestTopic = "--";
let highestFailureRate = 0;

for (let topic in topicStats) {
    const stats = topicStats[topic];

    if (stats.total >= 2 && stats.failureRate > highestFailureRate) {
        highestFailureRate = stats.failureRate;
        weakestTopic = topic;
    }
}


// 8. (Temporary) Log analytics for verification
// Later this will be shown in UI

console.log("Topic Stats:", topicStats);
console.log("Weakest Topic:", weakestTopic);

// ==============================
// INSIGHTS UI UPDATE
// ==============================

const weakestTopicEl = document.getElementById("weakestTopic");
const failureRateEl = document.getElementById("failureRate");
const recommendationEl = document.getElementById("recommendation");

if (weakestTopic !== "--") {
    weakestTopicEl.textContent = weakestTopic;
    failureRateEl.textContent = highestFailureRate + "%";

    recommendationEl.textContent =
        "You are consistently failing this topic. Prioritize revising it before your next interview.";
} else {
    weakestTopicEl.textContent = "--";
    failureRateEl.textContent = "--%";

    recommendationEl.textContent =
        "Not enough attempts yet to identify a weak area. Keep logging interviews.";
}
