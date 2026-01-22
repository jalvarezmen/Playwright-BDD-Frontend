import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

interface Credentials {
  usuario: string;
  password: string;
}

/**
 * Login - Tarea para realizar el login en la aplicación
 */
export class Login implements Task {
  private constructor(private credentials: Credentials) {}

  static withCredentials(credentials: Credentials): Login {
    return new Login(credentials);
  }

  static as(role: 'admin' | 'recepcionista'): Login {
    const credentials = {
      admin: { usuario: 'admin', password: 'admin123' },
      recepcionista: { usuario: 'recepcion', password: 'recepcion123' },
    };
    return new Login(credentials[role]);
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();

    // Llenar el formulario de login
    await page.getByPlaceholder('Ingrese su usuario').fill(this.credentials.usuario);
    await page.getByPlaceholder('Ingrese su contraseña').fill(this.credentials.password);
    
    // Hacer clic en el botón de login
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    // Esperar a que la navegación se complete (cualquier URL que no sea login)
    await page.waitForURL(/^(?!.*\/login).*$/, { timeout: 10000 });
  }
}
