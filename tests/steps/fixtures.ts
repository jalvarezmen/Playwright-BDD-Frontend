import { test as base } from 'playwright-bdd';
import { expect as playwrightExpect } from '@playwright/test';
import { Actor, BrowseTheWeb } from '../screenplay';

type Fixtures = {
  actor: Actor;
  expect: typeof playwrightExpect;
};

export const test = base.extend<Fixtures>({
  actor: async ({ page }, use) => {
    // Crear un actor con la habilidad de navegar en la web
    const actor = Actor.named('Usuario de Prueba').can(BrowseTheWeb.using(page));
    
    // Usar el actor en los tests
    await use(actor);
    
    // Limpiar recursos después del test
    await actor.dispose();
  },
  expect: async ({}, use) => {
    await use(playwrightExpect);
  },
});

export { playwrightExpect as expect };
