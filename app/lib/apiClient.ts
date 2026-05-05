import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur de réponse : intercepte toutes les réponses avant ton code
apiClient.interceptors.response.use(
  // Cas succès : on laisse passer la réponse sans la modifier
  (response) => response,

  // Cas erreur : on centralise la gestion ici
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // Non authentifié — à terme, rediriger vers la page de connexion
      console.error("Non authentifié. Veuillez vous connecter.");
    } else if (status === 403) {
      console.error("Accès refusé.");
    } else if (status === 404) {
      console.error("Ressource introuvable.");
    } else if (status && status >= 500) {
      console.error("Erreur serveur. Veuillez réessayer plus tard.");
    } else if (!error.response) {
      // Pas de réponse = problème réseau ou serveur injoignable
      console.error("Impossible de contacter le serveur.");
    }

    // On rejette l'erreur pour que le code appelant puisse aussi la gérer si besoin
    return Promise.reject(error);
  }
);

export default apiClient;
