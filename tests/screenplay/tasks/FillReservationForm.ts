import { Task } from './Task';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

interface ReservationData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaCheckIn: string;
  fechaCheckOut: string;
  tipoHabitacion: string;
  numeroHuespedes: string;
}

/**
 * FillReservationForm - Tarea para completar el formulario de reserva
 */
export class FillReservationForm implements Task {
  private constructor(private data: Partial<ReservationData>) {}

  static withData(data: Partial<ReservationData>): FillReservationForm {
    return new FillReservationForm(data);
  }

  async performAs(actor: Actor): Promise<void> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();

    // Esperar a que el formulario esté listo
    await page.waitForTimeout(1500);

    // PASO 1: Llenar datos del huésped
    if (this.data.nombre) {
      const nombreInput = page.getByRole('textbox', { name: /nombre/i });
      await nombreInput.fill(this.data.nombre, { timeout: 15000 });
    }
    if (this.data.apellido) {
      const apellidoInput = page.getByRole('textbox', { name: /apellido/i });
      await apellidoInput.fill(this.data.apellido, { timeout: 15000 });
    }
    if (this.data.numeroDocumento) {
      const docInput = page.getByRole('textbox', { name: /número.*documento/i });
      await docInput.fill(this.data.numeroDocumento, { timeout: 15000 });
    }
    if (this.data.email) {
      const emailInput = page.getByRole('textbox', { name: /correo.*electrónico/i });
      await emailInput.fill(this.data.email, { timeout: 15000 });
    }
    if (this.data.telefono) {
      const telefonoInput = page.getByRole('textbox', { name: /teléfono/i });
      await telefonoInput.fill(this.data.telefono, { timeout: 15000 });
    }
    
    // Solo avanzar al paso 2 si hay datos de fechas o huéspedes, Y si hay datos básicos completos
    const needsStep2 = this.data.fechaCheckIn || this.data.fechaCheckOut || this.data.numeroHuespedes;
    const hasBasicData = this.data.nombre && this.data.apellido && this.data.email;
    
    if (needsStep2 && hasBasicData) {
      // Hacer clic en Siguiente para ir al paso de fechas
      const siguienteButton = page.getByRole('button', { name: /siguiente/i });
      if (await siguienteButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await siguienteButton.click();
        await page.waitForTimeout(2000);
      }
      
      // PASO 2: Llenar fechas y huéspedes
      if (this.data.fechaCheckIn) {
        // Buscar campo de fecha con atributo date
        const checkInInput = page.locator('input[type="date"]').first().or(page.getByRole('textbox', { name: /check.*in|entrada/i }));
        await checkInInput.fill(this.data.fechaCheckIn, { timeout: 15000 });
      }
      if (this.data.fechaCheckOut) {
        const checkOutInput = page.locator('input[type="date"]').nth(1).or(page.getByRole('textbox', { name: /check.*out|salida/i }));
        await checkOutInput.fill(this.data.fechaCheckOut, { timeout: 15000 });
      }
      if (this.data.numeroHuespedes) {
        const huespedesInput = page.locator('input[type="number"]').or(page.getByRole('textbox', { name: /huéspedes/i })).or(page.getByRole('spinbutton'));
        await huespedesInput.fill(this.data.numeroHuespedes, { timeout: 15000 });
      }
    }
    
    // Esperar un momento después de llenar el formulario
    await page.waitForTimeout(1000);
  }
}
