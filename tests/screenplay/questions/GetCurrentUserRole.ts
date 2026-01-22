import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * GetCurrentUserRole - Pregunta para obtener el rol del usuario actual
 */
export class GetCurrentUserRole implements Question<string> {
  static now(): GetCurrentUserRole {
    return new GetCurrentUserRole();
  }

  async answeredBy(actor: Actor): Promise<string> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Buscar el rol en diferentes ubicaciones posibles
    const selectors = [
      'text=/Administrador|Gerente|Recepcionista/i',
      '[data-testid="user-role"]',
      '.user-role',
      'p:has-text("Administrador")',
      'p:has-text("Recepcionista")'
    ];
    
    for (const selector of selectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
        const text = await element.textContent() || '';
        if (text.includes('Administrador')) return 'Gerente';
        if (text.includes('Recepcionista')) return 'Recepcionista';
        return text;
      }
    }
    
    return '';
  }
}
