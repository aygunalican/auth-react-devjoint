const BASE_URL = "http://localhost:4000";

let onUnauthorized = () => {};

export function registerUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    onUnauthorized();
    throw new Error("SESSION_EXPIRED");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  const type = res.headers.get("content-type");
  if (type && type.includes("application/json")) {
    return res.json();
  }
  return null;
}