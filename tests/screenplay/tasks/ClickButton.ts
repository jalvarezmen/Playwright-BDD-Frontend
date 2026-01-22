import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * ClickButton - Tarea para hacer clic en un botón
 */
export class ClickButton implements Task {
  private constructor(private buttonText: string) {}

  static withText(text: string): ClickButton {
    return new ClickButton(text);
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();

    // Esperar a que el botón esté disponible
    await page.waitForTimeout(500);
    
    // Buscar botón por texto usando getByRole (más robusto)
    await page.getByRole('button', { name: new RegExp(this.buttonText, 'i') }).first().click({ timeout: 30000 });
    
    // Esperar después del clic
    await page.waitForTimeout(1000);
  }
}
