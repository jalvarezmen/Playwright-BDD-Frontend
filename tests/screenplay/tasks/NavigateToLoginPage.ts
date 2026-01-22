import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * NavigateToLoginPage - Tarea para navegar a la página de login
 */
export class NavigateToLoginPage implements Task {
  static now(): NavigateToLoginPage {
    return new NavigateToLoginPage();
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    await browser.navigateTo('/');
  }
}
