import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * IsAuthenticated - Pregunta para verificar si el usuario está autenticado
 */
export class IsAuthenticated implements Question<boolean> {
  static now(): IsAuthenticated {
    return new IsAuthenticated();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Esperar un momento para que la navegación se complete
    await page.waitForTimeout(1000);
    
    // Verificar si estamos en la página de login
    const url = page.url();
    const isOnLogin = url.includes('/login') || url === 'http://localhost:5174/';
    
    // Si estamos en login, definitivamente no estamos autenticados
    if (isOnLogin) {
      // Verificar que efectivamente vemos el formulario de login
      const loginFormVisible = await page.getByPlaceholder('Ingrese su usuario').isVisible({ timeout: 2000 }).catch(() => false);
      if (loginFormVisible) {
        return false;
      }
    }
    
    // Si no estamos en login y vemos elementos del dashboard, estamos autenticados
    const dashboardVisible = await page.getByRole('button', { name: 'Dashboard' }).isVisible({ timeout: 2000 }).catch(() => false);
    return dashboardVisible;
  }
}
