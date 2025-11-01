const API = (path, opts = {}) => {
    const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const headers = opts.headers || {};
    const token = localStorage.getItem("token");
  
    if (token) headers["Authorization"] = `Bearer ${token}`;
  
    return fetch(base + path, {
      ...opts,
      headers: { "Content-Type": "application/json", ...headers },
    }).then(async (res) => ({
      status: res.status,
      data: await res.json().catch(() => null),
    }));
  };
  
  export default API;
  