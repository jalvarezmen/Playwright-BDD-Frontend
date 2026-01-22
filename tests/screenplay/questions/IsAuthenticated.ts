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
    
    // Verificar si estamos en una página protegida (no en login)
    const url = page.url();
    const isNotOnLogin = !url.includes('/login') && url !== '/';
    
    // Verificar si hay un token en localStorage (si la app lo usa)
    const hasToken = await page.evaluate(() => {
      return localStorage.getItem('token') !== null;
    });
    
    return isNotOnLogin || hasToken;
  }
}
