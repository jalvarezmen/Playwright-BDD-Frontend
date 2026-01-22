import { Ability } from '../abilities/Ability';
import { Task } from '../tasks/Task';
import { Question } from '../questions/Question';

/**
 * Actor - Clase principal del Screenplay Pattern
 * 
 * Representa un usuario o sistema que interactúa con la aplicación.
 * El Actor puede tener Abilities (habilidades), ejecutar Tasks (tareas) 
 * y hacer Questions (preguntas) sobre el estado del sistema.
 */
export class Actor {
  private abilities: Map<string, Ability> = new Map();

  constructor(private name: string) {}

  /**
   * Obtiene el nombre del Actor
   */
  getName(): string {
    return this.name;
  }

  /**
   * Otorga una habilidad al Actor
   * @param ability - La habilidad a otorgar
   */
  can(ability: Ability): this {
    const abilityName = ability.constructor.name;
    this.abilities.set(abilityName, ability);
    return this;
  }

  /**
   * Ejecuta una tarea
   * @param task - La tarea a ejecutar
   */
  async attemptsTo(...tasks: Task[]): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  /**
   * Hace una pregunta y retorna la respuesta
   * @param question - La pregunta a hacer
   */
  async asks<T>(question: Question<T>): Promise<T> {
    return await question.answeredBy(this);
  }

  /**
   * Obtiene una habilidad específica del Actor
   * @param abilityType - El tipo de habilidad a obtener
   */
  abilityTo<T extends Ability>(abilityType: new (...args: any[]) => T): T {
    const abilityName = abilityType.name;
    const ability = this.abilities.get(abilityName);
    
    if (!ability) {
      throw new Error(
        `${this.name} does not have the ability to ${abilityName}. ` +
        `Make sure to grant this ability using actor.can(new ${abilityName}())`
      );
    }
    
    return ability as T;
  }

  /**
   * Libera todas las habilidades y recursos del Actor
   */
  async dispose(): Promise<void> {
    for (const ability of this.abilities.values()) {
      if (ability.discard) {
        await ability.discard();
      }
    }
    this.abilities.clear();
  }

  /**
   * Crea un nuevo Actor
   * @param name - El nombre del Actor
   */
  static named(name: string): Actor {
    return new Actor(name);
  }
}
