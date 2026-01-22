import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * IsOnDashboard - Pregunta para verificar si estamos en el dashboard
 */
export class IsOnDashboard implements Question<boolean> {
  static now(): IsOnDashboard {
    return new IsOnDashboard();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Verificar si estamos en el dashboard buscando el heading Dashboard
    const dashboardHeading = page.locator('h1:has-text("Dashboard")');
    const isVisible = await dashboardHeading.isVisible({ timeout: 3000 }).catch(() => false);
    return isVisible;
  }
}
