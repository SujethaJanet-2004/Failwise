// This file handles adding a new interview attempt

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page reload

    const newAttempt = {
        companyName: document.getElementById("company").value,
        roundType: document.getElementById("roundType").value,
        roundSubType: document.getElementById("roundSubType").value,
        topic: document.getElementById("topic").value,
        date: document.getElementById("date").value,
        outcome: document.getElementById("outcome").value,
        selfScore: document.getElementById("score").value,
        reason: document.getElementById("reason").value
    };

    attempts.push(newAttempt);

    localStorage.setItem("failwise_attempts", JSON.stringify(attempts));

    window.location.href = "index.html";
});
