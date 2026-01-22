import { Actor } from '../actors/Actor';

/**
 * Question - Interfaz base para preguntas en el Screenplay Pattern
 * 
 * Una Question representa una consulta sobre el estado del sistema.
 * Retorna un valor que puede ser verificado en assertions.
 * Ejemplos: IsLoggedIn, CurrentUserRole, ReservationStatus
 */
export interface Question<T> {
  /**
   * Ejecuta la pregunta usando las habilidades del Actor
   * @param actor - El Actor que hará la pregunta
   * @returns El resultado de la pregunta
   */
  answeredBy(actor: Actor): Promise<T>;
}
