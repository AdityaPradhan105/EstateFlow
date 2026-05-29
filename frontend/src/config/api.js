const API_BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : import.meta.env.VITE_API_BASE_URL || "https://opms-project.onrender.com";

export default API_BASE_URL;
