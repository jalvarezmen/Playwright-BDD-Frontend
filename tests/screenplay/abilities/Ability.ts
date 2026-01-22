/**
 * Ability - Interfaz base del Screenplay Pattern
 * 
 * Representa capacidades que un Actor puede tener para interactuar con el sistema.
 * Ejemplos: BrowseTheWeb, CallAnApi, AccessDatabase
 */
export interface Ability {
  /**
   * Método para liberar recursos cuando el Actor termina su trabajo
   */
  discard?(): Promise<void>;
}
