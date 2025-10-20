const API_BASE_URL =
  process.env.NEXT_PUBLIC_HOST_URL ?? "http://localhost:3000";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      ...options,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error (${res.status})`);
    }

    return res.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
