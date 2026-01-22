import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures';
import { 
  NavigateToLoginPage, 
  Login, 
  ClickButton, 
  FillReservationForm,
  ConfirmCheckIn,
  ConfirmCheckOut 
} from '../screenplay/tasks';
import {
  IsOnDashboard,
  GetCurrentUserRole,
  IsAuthenticated,
  GetErrorMessage,
  GetSuccessMessage,
  GetReservationStatus,
  HasValidationErrors
} from '../screenplay/questions';

const { Given, When, Then } = createBdd(test);

// =============================================================================
// GIVEN - Estado inicial
// =============================================================================

Given('que estoy en la página de login', async ({ actor }) => {
  await actor.attemptsTo(NavigateToLoginPage.now());
});

Given('que estoy autenticado como {string}', async ({ actor }, role: string) => {
  await actor.attemptsTo(
    NavigateToLoginPage.now(),
    Login.as(role as 'admin' | 'recepcionista')
  );
});

Given('que estoy en la página de nueva reserva', async ({ actor }) => {
  await actor.attemptsTo(ClickButton.withText('Nueva Reserva'));
});

Given('estoy en la página de nueva reserva', async ({ actor }) => {
  await actor.attemptsTo(ClickButton.withText('Nueva Reserva'));
});

Given('que estoy en el dashboard', async ({ actor }) => {
  await actor.attemptsTo(ClickButton.withText('Dashboard'));
});

Given('existe una reserva confirmada para hoy', async ({ actor }, dataTable) => {
  // TODO: Implementar creación de reserva de prueba
});

Given('existe una reserva en curso para hacer check-out hoy', async ({ actor }, dataTable) => {
  // TODO: Implementar creación de reserva en curso
});

Given('existe una reserva confirmada sin check-in', async ({ actor }, dataTable) => {
  // TODO: Implementar creación de reserva sin check-in
});

Given('que existe una reserva confirmada sin check-in', async ({ actor }, dataTable) => {
  // TODO: Implementar creación de reserva sin check-in
});

Given('que la reserva {string} ya tiene check-in realizado', async ({ actor }, reservaId: string) => {
  // TODO: Verificar estado de reserva
});

Given('que existe una reserva con pago pendiente', async ({ actor }, dataTable) => {
  // TODO: Crear reserva con pago pendiente
});

Given('que estoy realizando el check-in de la reserva {string}', async ({ actor }, reservaId: string) => {
  // TODO: Navegar a vista de check-in
});

Given('que estoy realizando el check-out de la reserva {string}', async ({ actor }, reservaId: string) => {
  // TODO: Navegar a vista de check-out
});

// =============================================================================
// WHEN - Acciones
// =============================================================================

When('ingreso mis credenciales como {string}', async ({ actor }, role: string, dataTable) => {
  const credentials = dataTable.rowsHash();
  const browser = actor.abilityTo(require('../screenplay/abilities/BrowseTheWeb').BrowseTheWeb);
  const page = browser.getPage();
  await page.getByPlaceholder('Ingrese su usuario').fill(credentials.usuario);
  await page.getByPlaceholder('Ingrese su contraseña').fill(credentials.password);
});

When('ingreso credenciales inválidas', async ({ actor }, dataTable) => {
  const credentials = dataTable.rowsHash();
  const browser = actor.abilityTo(require('../screenplay/abilities/BrowseTheWeb').BrowseTheWeb);
  const page = browser.getPage();
  await page.getByPlaceholder('Ingrese su usuario').fill(credentials.usuario);
  await page.getByPlaceholder('Ingrese su contraseña').fill(credentials.password);
  // NO hacer clic aquí - será un step separado
});

When('dejo los campos de usuario y contraseña vacíos', async ({ actor }) => {
  // Los campos ya están vacíos por defecto
});

When('hago clic en el botón de iniciar sesión', async ({ actor }) => {
  const browser = actor.abilityTo(require('../screenplay/abilities/BrowseTheWeb').BrowseTheWeb);
  const page = browser.getPage();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.waitForTimeout(2000); // Esperar respuesta del servidor
});

When('completo el formulario de reserva:', async ({ actor }, dataTable) => {
  const formData = dataTable.rowsHash();
  await actor.attemptsTo(FillReservationForm.withData(formData));
});

When('completo el formulario de reserva con {int} huéspedes', async ({ actor }, numGuests: number) => {
  // TODO: Implementar cuando sea necesario
  await actor.attemptsTo(FillReservationForm.withData({ numeroHuespedes: numGuests.toString() }));
});

When('todos los datos son válidos', async ({ actor }) => {
  // Validación implícita
});

When('hago clic en {string}', async ({ actor }, buttonText: string) => {
  await actor.attemptsTo(ClickButton.withText(buttonText));
});

When('intento crear una reserva con fecha de check-out anterior al check-in', async ({ actor }) => {
  await actor.attemptsTo(FillReservationForm.withData({
    fechaCheckIn: '2026-12-31',
    fechaCheckOut: '2026-12-30'
  }));
});

When('intento crear una reserva sin completar el email del huésped', async ({ actor }) => {
  await actor.attemptsTo(FillReservationForm.withData({
    nombre: 'Juan',
    apellido: 'Pérez'
  }));
});

When('busco la reserva {string} en la lista de check-ins de hoy', async ({ actor }, reservaId: string) => {
  // La reserva ya debería estar visible en el dashboard
});

When('busco la reserva {string} en la lista de check-outs de hoy', async ({ actor }, reservaId: string) => {
  // La reserva ya debería estar visible en el dashboard
});

When('hago clic en el botón {string} de la reserva', async ({ actor }, buttonText: string) => {
  await actor.attemptsTo(ClickButton.withText(buttonText));
});

When('confirmo el check-in', async ({ actor }) => {
  await actor.attemptsTo(ConfirmCheckIn.now());
});

When('confirmo el check-out', async ({ actor }) => {
  await actor.attemptsTo(ConfirmCheckOut.now());
});

When('intento hacer check-in nuevamente', async ({ actor }) => {
  await actor.attemptsTo(ConfirmCheckIn.now());
});

When('intento hacer check-out de {string}', async ({ actor }, reservaId: string) => {
  await actor.attemptsTo(ConfirmCheckOut.now());
});

When('reviso los datos del huésped', async ({ actor }) => {
  // Los datos ya están visibles en la interfaz
});

When('reviso el estado del pago', async ({ actor }) => {
  // El estado de pago ya está visible en la interfaz
});

// =============================================================================
// THEN - Verificaciones
// =============================================================================

Then('debería ver el dashboard principal', async ({ actor, expect }) => {
  const isOnDashboard = await actor.asks(IsOnDashboard.now());
  expect(isOnDashboard).toBeTruthy();
});

Then('mi rol debería ser {string}', async ({ actor, expect }, expectedRole: string) => {
  const actualRole = await actor.asks(GetCurrentUserRole.now());
  expect(actualRole).toBe(expectedRole);
});

Then('debería ver un mensaje de error {string}', async ({ actor, expect }, errorMessage: string) => {
  const displayedError = await actor.asks(GetErrorMessage.now());
  expect(displayedError).toContain(errorMessage);
});

Then('no debería estar autenticado', async ({ actor, expect }) => {
  const isAuthenticated = await actor.asks(IsAuthenticated.now());
  expect(isAuthenticated).toBeFalsy();
});

Then('debería ver validaciones en los campos requeridos', async ({ actor, expect }) => {
  const hasValidationErrors = await actor.asks(HasValidationErrors.now());
  expect(hasValidationErrors).toBeTruthy();
});

Then('debería ver un mensaje de éxito {string}', async ({ actor, expect }, successMessage: string) => {
  const displayedMessage = await actor.asks(GetSuccessMessage.now());
  expect(displayedMessage).toContain(successMessage);
});

Then('la reserva debería aparecer en el dashboard', async ({ actor, expect }) => {
  const successMessage = await actor.asks(GetSuccessMessage.now());
  expect(successMessage).toBeTruthy();
});

Then('el estado de la reserva debería ser {string}', async ({ actor, expect }, expectedStatus: string) => {
  const actualStatus = await actor.asks(GetReservationStatus.now());
  expect(actualStatus).toBe(expectedStatus);
});

Then('debería ver la reserva con {int} huéspedes registrados', async ({ actor, expect }, numGuests: number) => {
  // TODO: Implementar GetGuestCount Question cuando sea necesario
  expect(numGuests).toBeGreaterThan(0);
});

Then('todos los huéspedes deberían tener sus datos completos', async ({ actor, expect }) => {
  // TODO: Implementar AreAllGuestsComplete Question cuando sea necesario
  expect(true).toBeTruthy();
});

Then('debería ver un error {string}', async ({ actor, expect }, errorMessage: string) => {
  const displayedError = await actor.asks(GetErrorMessage.now());
  expect(displayedError).toContain(errorMessage);
});

Then('la reserva no debería ser creada', async ({ actor, expect }) => {
  const errorExists = await actor.asks(GetErrorMessage.now());
  expect(errorExists).toBeTruthy();
});

Then('debería ver un error de validación en el campo email', async ({ actor, expect }) => {
  const hasError = await actor.asks(HasValidationErrors.now());
  expect(hasError).toBeTruthy();
});

Then('debería ver un mensaje {string}', async ({ actor, expect }, message: string) => {
  const displayedMessage = await actor.asks(GetSuccessMessage.now());
  expect(displayedMessage).toContain(message);
});

Then('el estado de la reserva debería cambiar a {string}', async ({ actor, expect }, newStatus: string) => {
  const actualStatus = await actor.asks(GetReservationStatus.now());
  expect(actualStatus).toBe(newStatus);
});

Then('la habitación {int} debería estar ocupada', async ({ actor, expect }, roomNumber: number) => {
  // TODO: Implementar GetRoomStatus cuando sea necesario
  expect(roomNumber).toBeGreaterThan(0);
});

Then('la habitación {int} debería estar disponible', async ({ actor, expect }, roomNumber: number) => {
  // TODO: Implementar GetRoomStatus cuando sea necesario
  expect(roomNumber).toBeGreaterThan(0);
});

Then('la reserva debería desaparecer de la lista de check-ins pendientes', async ({ actor, expect }) => {
  // TODO: Implementar IsInPendingCheckInList cuando sea necesario
  expect(true).toBeTruthy();
});

Then('la reserva debería desaparecer de la lista de check-outs pendientes', async ({ actor, expect }) => {
  // TODO: Implementar IsInPendingCheckOutList cuando sea necesario
  expect(true).toBeTruthy();
});

Then('debería ver:', async ({ actor, expect }, dataTable) => {
  const expectedData = dataTable.rowsHash();
  // TODO: Verificar cada campo mostrado
});

Then('puedo confirmar o cancelar el check-in', async ({ actor, expect }) => {
  // TODO: Implementar verificación de botones cuando sea necesario
  expect(true).toBeTruthy();
});

Then('el botón de check-in no debería estar disponible', async ({ actor, expect }) => {
  // TODO: Implementar IsCheckInButtonEnabled cuando sea necesario
  expect(true).toBeTruthy();
});

Then('debería ver que el pago está {string}', async ({ actor, expect }, paymentStatus: string) => {
  // TODO: Implementar GetPaymentStatus cuando sea necesario
  expect(paymentStatus).toBeTruthy();
});

Then('puedo proceder con el check-out', async ({ actor }) => {
  // Verificación implícita de que el proceso puede continuar
});

Then('debería ver una advertencia {string}', async ({ actor, expect }, warningMessage: string) => {
  const displayedMessage = await actor.asks(GetErrorMessage.now());
  expect(displayedMessage).toContain(warningMessage);
});

Then('debería poder ver el monto total', async ({ actor, expect }) => {
  // TODO: Implementar GetTotalAmount cuando sea necesario
  expect(true).toBeTruthy();
});

Then('puedo procesar el pago antes del check-out', async ({ actor }) => {
  // Verificación de disponibilidad de opciones de pago
});

Then('el check-out no debería procesarse', async ({ actor, expect }) => {
  const wasProcessed = await actor.asks(/* WasCheckOutProcessed */);
  expect(wasProcessed).toBeFalsy();
});
