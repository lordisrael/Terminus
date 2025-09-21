export async function apiFetch(url: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const path = url.startsWith("/") ? url : `/${url}`;

  console.log("➡️ Fetching:", `${base}${path}`);

  try {
    const res = await fetch(`${base}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${res.status} - ${text}`);
    }

    return res.json();
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    throw err;
  }
}

// lib/auth.ts
export async function logout() {
  const token = localStorage.getItem("accessToken");

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
