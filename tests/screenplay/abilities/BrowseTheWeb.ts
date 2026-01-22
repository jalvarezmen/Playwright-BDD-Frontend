import { Page } from '@playwright/test';
import { Ability } from './Ability';

/**
 * BrowseTheWeb - Habilidad para navegar en la web usando Playwright
 * 
 * Proporciona acceso al objeto Page de Playwright para realizar acciones
 * de navegación y manipulación del DOM.
 */
export class BrowseTheWeb implements Ability {
  private constructor(private page: Page) {}

  /**
   * Crea una nueva instancia de BrowseTheWeb
   * @param page - Instancia de Page de Playwright
   */
  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /**
   * Obtiene el objeto Page de Playwright
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Navega a una URL específica
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Libera recursos (cierra la página)
   */
  async discard(): Promise<void> {
    // Playwright se encarga de cerrar las páginas automáticamente
    // pero podemos agregar lógica personalizada aquí si es necesario
  }
}
