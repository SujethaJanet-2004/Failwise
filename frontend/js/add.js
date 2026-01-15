// ==============================
// ADD / EDIT ATTEMPT LOGIC
// FailWise
// ==============================

document.addEventListener("DOMContentLoaded", function () {

  const API_URL = "http://127.0.0.1:5000/attempts";

  const form = document.getElementById("addAttemptForm");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");

  // Read query params to check edit mode
  const params = new URLSearchParams(window.location.search);
  const attemptId = params.get("id"); // null if add mode

  // ------------------------------
  // EDIT MODE: Prefill form
  // ------------------------------
  if (attemptId) {
    formTitle.textContent = "Edit Interview Attempt";
    submitBtn.textContent = "Update Attempt";

    fetch(`${API_URL}/${attemptId}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("companyName").value = data.company_name;
        document.getElementById("roundType").value = data.round_type;
        document.getElementById("roundSubType").value = data.round_sub_type;
        document.getElementById("topic").value = data.topic;
        document.getElementById("date").value = data.date_attended;
        document.getElementById("outcome").value = data.outcome;
        document.getElementById("selfScore").value = data.self_score || "";
        document.getElementById("reason").value = data.self_score_reason || "";
      })
      .catch(() => {
        alert("Failed to load attempt data");
      });
  }

  // ------------------------------
  // FORM SUBMIT (Add or Edit)
  // ------------------------------
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page refresh

    const payload = {
      company_name: document.getElementById("companyName").value,
      round_type: document.getElementById("roundType").value,
      round_sub_type: document.getElementById("roundSubType").value,
      topic: document.getElementById("topic").value,
      date_attended: document.getElementById("date").value,
      outcome: document.getElementById("outcome").value,
      self_score: document.getElementById("selfScore").value || null,
      self_score_reason: document.getElementById("reason").value || null
    };

    // Decide method + URL
    const method = attemptId ? "PUT" : "POST";
    const url = attemptId ? `${API_URL}/${attemptId}` : API_URL;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Save failed");
        }
        return res.json();
      })
      .then(() => {
        // Go back to dashboard after success
        window.location.href = "index.html";
      })
      .catch(() => {
        alert("Failed to save attempt. Please try again.");
      });
  });

});



