import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * HasValidationErrors - Pregunta para verificar si hay errores de validación visibles
 */
export class HasValidationErrors implements Question<boolean> {
  static now(): HasValidationErrors {
    return new HasValidationErrors();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Esperar un momento para que aparezcan las validaciones
    await page.waitForTimeout(1000);
    
    // Buscar indicadores de validación comunes con mayor timeout
    const validationSelectors = [
      '[aria-invalid="true"]',
      '.error',
      '.is-invalid',
      '.field-error',
      '[role="alert"]',
      '.text-red-500',
      '.text-red-600',
      'input:invalid',
      'input[aria-invalid="true"]',
      'text=/requerido|obligatorio|campo vacío|necesario/i',
    ];
    
    for (const selector of validationSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        const isVisible = await page.locator(selector).first().isVisible({ timeout: 3000 }).catch(() => false);
        if (isVisible) {
          return true;
        }
      }
    }
    
    return false;
  }
}
