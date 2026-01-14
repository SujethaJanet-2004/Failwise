// data.js
// Handles loading and saving attempts using localStorage

const STORAGE_KEY = "failwise_attempts";

// Load attempts from localStorage OR use default data
let attempts = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!attempts) {
    attempts = [
        {
            companyName: "Zoho",
            roundType: "Coding",
            roundSubType: "Technical",
            topic: "Strings",
            date: "2025-01-10",
            outcome: "Fail",
            selfScore: 4,
            reason: "Struggled with string manipulation logic"
        },
        {
            companyName: "Cognizant",
            roundType: "Aptitude",
            roundSubType: "Quantitative",
            topic: "Ratios",
            date: "2025-01-15",
            outcome: "Fail",
            selfScore: 5,
            reason: "Time management issues"
        }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

