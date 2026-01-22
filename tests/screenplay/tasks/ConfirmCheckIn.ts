import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * ConfirmCheckIn - Tarea para confirmar el check-in de una reserva
 */
export class ConfirmCheckIn implements Task {
  static now(): ConfirmCheckIn {
    return new ConfirmCheckIn();
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();

    // Esperar a que aparezcan los botones
    await page.waitForTimeout(1000);
    
    // Buscar y hacer clic en el botón de confirmar check-in
    await page.getByRole('button', { name: /confirmar|check.*in/i }).first().click({ timeout: 30000 });
    
    // Esperar a que se procese la confirmación
    await page.waitForTimeout(2000);
  }
}
