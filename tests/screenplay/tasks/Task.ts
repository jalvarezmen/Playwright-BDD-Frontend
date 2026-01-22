import { Actor } from '../actors/Actor';

/**
 * Task - Interfaz base para tareas en el Screenplay Pattern
 * 
 * Una Task representa una acción de alto nivel que un Actor puede realizar.
 * Ejemplos: Login, CreateReservation, SearchRoom
 */
export interface Task {
  /**
   * Ejecuta la tarea usando las habilidades del Actor
   * @param actor - El Actor que ejecutará la tarea
   */
  performAs(actor: Actor): Promise<void>;
}
