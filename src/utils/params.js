export const API_ROOT = window.location.href.includes(
  "https://dmvboardgames.com/",
)
  ? `${import.meta.env.VITE_API_ROOT}`
  : import.meta.env.VITE_LOCAL_API_ROOT;
