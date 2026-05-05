import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de requête : attache le token JWT à chaque appel
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Intercepteur de réponse : gestion centralisée des erreurs
apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (status === 403) {
      console.error("Accès refusé.");
    } else if (status === 404) {
      console.error("Ressource introuvable.");
    } else if (status && status >= 500) {
      console.error("Erreur serveur. Veuillez réessayer plus tard.");
    } else if (!error.response) {
      console.error("Impossible de contacter le serveur.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
