import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * GetSuccessMessage - Pregunta para obtener mensajes de éxito mostrados
 */
export class GetSuccessMessage implements Question<string> {
  static now(): GetSuccessMessage {
    return new GetSuccessMessage();
  }

  async answeredBy(actor: Actor): Promise<string> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Esperar a que aparezcan mensajes de éxito
    await page.waitForTimeout(1500);
    
    // Buscar mensajes de éxito comunes (toasts, alerts, etc.)
    const successSelectors = [
      '[role="status"]',
      '.success-message',
      '.alert-success',
      '[data-testid="success-message"]',
      '[data-sonner-toast]', // Sonner toast library
      '.toast-success',
      '.text-green-500',
      '.text-green-600',
      'text=/éxito|exitosa|exitoso|completado|creado|registrado|confirmado/i',
    ];
    
    for (const selector of successSelectors) {
      const successElement = page.locator(selector).first();
      if (await successElement.isVisible({ timeout: 5000 }).catch(() => false)) {
        return await successElement.textContent() || '';
      }
    }
    
    return '';
  }
}
