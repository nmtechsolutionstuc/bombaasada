const WHATSAPP_BASE = "https://api.whatsapp.com/send?phone=543865643467";
export const INSTAGRAM_URL = "https://instagram.com/bombaasada";
export const INSTAGRAM_HANDLE = "@bombaasada";

export function whatsappLink(message?: string): string {
  if (!message) return WHATSAPP_BASE;
  return `${WHATSAPP_BASE}&text=${encodeURIComponent(message)}`;
}
