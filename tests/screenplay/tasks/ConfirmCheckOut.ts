import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * ConfirmCheckOut - Tarea para confirmar el check-out de una reserva
 */
export class ConfirmCheckOut implements Task {
  static now(): ConfirmCheckOut {
    return new ConfirmCheckOut();
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();

    // Esperar a que aparezcan los botones
    await page.waitForTimeout(1000);
    
    // Buscar y hacer clic en el botón de confirmar check-out
    await page.getByRole('button', { name: /confirmar|check.*out/i }).first().click({ timeout: 30000 });
    
    // Esperar a que se procese la confirmación
    await page.waitForTimeout(2000);
  }
}
