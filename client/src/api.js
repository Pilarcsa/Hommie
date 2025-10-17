// client/src/api.js

// base vacía porque usas el proxy de Vite en desarrollo
const base = "";

/**
 * Inicia sesión en el backend
 */
export async function login(email, password) {
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // NECESARIO si tu backend usa cookies
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

/**
 * Obtiene los posts (feed)
 */
export async function getFeed() {
  const res = await fetch(`${base}/api/post/feed`, {
    credentials: "include"
  });
  return res.json();
}

/**
 * Crea un nuevo post
 */
export async function createPost(description) {
  const res = await fetch(`${base}/api/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ description })
  });
  return res.json();
}
