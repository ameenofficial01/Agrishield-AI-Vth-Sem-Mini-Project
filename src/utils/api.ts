export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("agroshield.token");
  
  const headers: HeadersInit = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type to application/json if not FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API request failed");
  }

  return response.json();
}
