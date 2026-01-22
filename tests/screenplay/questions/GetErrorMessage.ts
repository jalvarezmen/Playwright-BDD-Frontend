import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * GetErrorMessage - Pregunta para obtener mensajes de error mostrados
 */
export class GetErrorMessage implements Question<string> {
  static now(): GetErrorMessage {
    return new GetErrorMessage();
  }

  async answeredBy(actor: Actor): Promise<string> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Esperar un momento para que aparezcan los mensajes
    await page.waitForTimeout(2000);
    
    // Buscar mensajes de error comunes con mayor timeout
    const errorSelectors = [
      '[role="alert"]',
      '.error-message',
      '.alert-error',
      '.error',
      '[data-testid="error-message"]',
      '[data-sonner-toast][data-type="error"]',
      '.toast-error',
      '.text-red-500',
      '.text-red-600',
      'p.text-red-500',
      'div.text-red-500',
      'p.text-red-600',
      'div.text-red-600',
    ];
    
    // Primero intentar con selectores específicos
    for (const selector of errorSelectors) {
      const errorElement = page.locator(selector).first();
      if (await errorElement.isVisible({ timeout: 3000 }).catch(() => false)) {
        const text = await errorElement.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
    }
    
    // Si no encuentra nada, buscar cualquier texto que indique error
    const textPatterns = [
      'text=/error|incorrecto|incorrecta|inválido|inválida|no se puede/i',
      'text=/usuario.*contraseña/i',
      'text=/credencial/i',
    ];
    
    for (const pattern of textPatterns) {
      const textElement = page.locator(pattern).first();
      if (await textElement.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await textElement.textContent();
        if (text && text.trim()) {
          return text.trim();
        }
      }
    }
    
    return '';
  }
}
