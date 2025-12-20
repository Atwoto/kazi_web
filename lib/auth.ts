export async function checkAuth() {
  if (typeof window === "undefined") return null;

  try {
    // Check localStorage for user
    const userData = localStorage.getItem("admin_user");
    if (!userData) return null;

    const user = JSON.parse(userData);
    return user;
  } catch (error) {
    console.error("Auth check error:", error);
    return null;
  }
}

export async function logout() {
  try {
    localStorage.removeItem("admin_user");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
