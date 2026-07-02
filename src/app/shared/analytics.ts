import { track } from '@vercel/analytics';

/**
 * Evento de conversão primário da landing: clique em CTA de WhatsApp.
 * `source` identifica qual CTA converteu (hero | header | float | cta_final | servico-x).
 * Os eventos aparecem em Vercel > Analytics > Events.
 */
export function trackWhatsAppClick(source: string): void {
  track('whatsapp_click', { source });
}

export function trackEmailClick(source: string): void {
  track('email_click', { source });
}
