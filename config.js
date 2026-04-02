// config.js
const CONFIG = {
  API_BASE: location.hostname.includes("github.io") || location.hostname.includes("dpdns.org")
    ? "https://abhrankan-winternship-endorsements.onrender.com"
    : "http://localhost:5001"
};
