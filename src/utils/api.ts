export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("agroshield.token");
  
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Do not overwrite Content-Type if already explicitly set or if body is FormData
  const hasContentType = Object.keys(headers).some(
    (k) => k.toLowerCase() === "content-type"
  );
  if (!(options.body instanceof FormData) && !hasContentType) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let msg = "API request failed";
    if (typeof errorData.detail === "string") {
      msg = errorData.detail;
    } else if (Array.isArray(errorData.detail)) {
      msg = errorData.detail
        .map((e: any) => e.msg || JSON.stringify(e))
        .join(", ");
    }
    throw new Error(msg);
  }

  return response.json();
}
