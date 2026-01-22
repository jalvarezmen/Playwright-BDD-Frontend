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
    await page.waitForTimeout(1000);

    // Llenar cada campo si está presente en los datos - usar múltiples estrategias
    if (this.data.nombre) {
      const nombreInput = page.locator('input').filter({ hasText: /nombre/i }).or(page.getByLabel(/nombre/i)).or(page.getByPlaceholder(/nombre/i)).first();
      await nombreInput.fill(this.data.nombre, { timeout: 15000 }).catch(() => console.log('Campo nombre no encontrado'));
    }
    if (this.data.apellido) {
      const apellidoInput = page.locator('input').filter({ hasText: /apellido/i }).or(page.getByLabel(/apellido/i)).or(page.getByPlaceholder(/apellido/i)).first();
      await apellidoInput.fill(this.data.apellido, { timeout: 15000 }).catch(() => console.log('Campo apellido no encontrado'));
    }
    if (this.data.email) {
      const emailInput = page.locator('input[type="email"]').or(page.getByLabel(/email|correo/i)).or(page.getByPlaceholder(/email|correo/i)).first();
      await emailInput.fill(this.data.email, { timeout: 15000 }).catch(() => console.log('Campo email no encontrado'));
    }
    if (this.data.telefono) {
      const telefonoInput = page.locator('input[type="tel"]').or(page.getByLabel(/tel[eé]fono/i)).or(page.getByPlaceholder(/tel[eé]fono/i)).first();
      await telefonoInput.fill(this.data.telefono, { timeout: 15000 }).catch(() => console.log('Campo teléfono no encontrado'));
    }
    if (this.data.numeroDocumento) {
      const docInput = page.locator('input').filter({ hasText: /documento/i }).or(page.getByLabel(/documento/i)).or(page.getByPlaceholder(/documento/i)).first();
      await docInput.fill(this.data.numeroDocumento, { timeout: 15000 }).catch(() => console.log('Campo documento no encontrado'));
    }
    if (this.data.fechaCheckIn) {
      const checkInInput = page.locator('input[type="date"]').first().or(page.getByLabel(/check.*in|entrada|llegada/i)).first();
      await checkInInput.fill(this.data.fechaCheckIn, { timeout: 15000 }).catch(() => console.log('Campo fecha check-in no encontrado'));
    }
    if (this.data.fechaCheckOut) {
      const checkOutInput = page.locator('input[type="date"]').nth(1).or(page.getByLabel(/check.*out|salida/i)).first();
      await checkOutInput.fill(this.data.fechaCheckOut, { timeout: 15000 }).catch(() => console.log('Campo fecha check-out no encontrado'));
    }
    if (this.data.numeroHuespedes) {
      const huespedesInput = page.locator('input[type="number"]').or(page.getByLabel(/hu[eé]spedes/i)).or(page.getByPlaceholder(/hu[eé]spedes/i)).first();
      await huespedesInput.fill(this.data.numeroHuespedes, { timeout: 15000 }).catch(() => console.log('Campo huéspedes no encontrado'));
    }
    
    // Esperar un momento después de llenar el formulario
    await page.waitForTimeout(500);
  }
}
