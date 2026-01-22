import { Question } from './Question';
import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * GetReservationStatus - Pregunta para obtener el estado de una reserva
 */
export class GetReservationStatus implements Question<string> {
  private constructor(private reservationId?: string) {}

  static now(): GetReservationStatus {
    return new GetReservationStatus();
  }

  static forReservation(id: string): GetReservationStatus {
    return new GetReservationStatus(id);
  }

  async answeredBy(actor: Actor): Promise<string> {
    const browser = actor.abilityTo(BrowseTheWeb);
    const page = browser.getPage();
    
    // Si tenemos un ID específico, buscar esa reserva
    if (this.reservationId) {
      const statusElement = page.locator(
        `[data-reservation-id="${this.reservationId}"] [data-testid="reservation-status"]`
      ).first();
      
      if (await statusElement.isVisible()) {
        return await statusElement.textContent() || '';
      }
    }
    
    // Buscar el estado de la última reserva creada
    const lastStatus = page.locator('[data-testid="reservation-status"]').last();
    if (await lastStatus.isVisible()) {
      return await lastStatus.textContent() || '';
    }
    
    return '';
  }
}
