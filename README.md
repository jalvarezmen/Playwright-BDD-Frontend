# Hotel Booking - Playwright BDD Frontend Tests

Proyecto de tests E2E con **Playwright-BDD** y **Screenplay Pattern** para el sistema de gestión hotelera.

## 🏗️ Arquitectura

Este proyecto implementa el **Screenplay Pattern**, una arquitectura de testing que promueve:
- ✅ **Tests legibles y mantenibles** - Los tests se escriben en lenguaje natural con Gherkin
- ✅ **Separación de responsabilidades** - Cada componente tiene una función clara
- ✅ **Reusabilidad** - Tasks y Questions compartidas entre múltiples tests
- ✅ **Escalabilidad** - Fácil agregar nuevos escenarios sin duplicar código

### Estructura del Proyecto

```
tests/
├── features/           # Archivos .feature con escenarios Gherkin
│   ├── login.feature
│   ├── crear-reserva.feature
│   ├── check-in.feature
│   └── check-out.feature
├── steps/              # Step definitions que conectan Gherkin con código
│   ├── common.steps.ts
│   └── fixtures.ts
├── screenplay/         # Implementación del Screenplay Pattern
│   ├── actors/         # Actor - quien ejecuta las acciones
│   ├── tasks/          # Task - acciones de alto nivel
│   ├── questions/      # Question - preguntas sobre el estado
│   └── abilities/      # Ability - capacidades del actor
└── support/            # Utilidades y fixtures
```

## 🎭 Screenplay Pattern

### 1. **Actor** - Quien ejecuta las acciones
Representa un usuario o sistema que interactúa con la aplicación.

```typescript
const usuario = Actor.named('Recepcionista')
  .can(BrowseTheWeb.using(page));
```

### 2. **Task** - Acciones de alto nivel
Representa una tarea completa que el Actor puede realizar.

```typescript
await usuario.attemptsTo(
  Login.as('recepcionista'),
  NavigateToNewReservation.now()
);
```

### 3. **Question** - Preguntas sobre el estado
Consulta información del sistema para verificaciones.

```typescript
const isLoggedIn = await usuario.asks(IsAuthenticated.now());
expect(isLoggedIn).toBeTruthy();
```

### 4. **Ability** - Capacidades del Actor
Habilidades técnicas para interactuar con el sistema.

```typescript
// BrowseTheWeb - navegar en la web con Playwright
const browser = actor.abilityTo(BrowseTheWeb);
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## 📝 Ejecutar Tests

```bash
# Generar step definitions desde features
npm run bdd:generate

# Ejecutar todos los tests
npm test

# Ejecutar tests en modo headed (ver navegador)
npm run test:headed

# Ejecutar tests en modo UI (interfaz interactiva)
npm run test:ui

# Ejecutar tests en un navegador específico
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Ejecutar tests móviles
npm run test:mobile

# Ver reporte de tests
npm run test:report

# Debug de tests
npm run test:debug
```

## 📋 Features Implementadas

### ✅ Autenticación (login.feature)
- Login exitoso como Gerente
- Login exitoso como Recepcionista
- Login fallido con credenciales incorrectas
- Validación de campos vacíos

### ✅ Crear Reserva (crear-reserva.feature)
- Crear reserva exitosa con un huésped
- Crear reserva con múltiples huéspedes
- Validación de fechas inválidas
- Validación de datos incompletos

### ✅ Check-in (check-in.feature)
- Check-in exitoso de una reserva
- Check-in con confirmación de datos
- Intentar check-in de reserva ya procesada

### ✅ Check-out (check-out.feature)
- Check-out exitoso de una reserva
- Check-out con revisión de pagos
- Check-out con pago pendiente
- Check-out sin check-in previo

## 🛠️ Configuración

### playwright.config.ts
Configuración principal de Playwright con:
- **baseURL**: `http://localhost:5175` (servidor de desarrollo frontend)
- **Proyectos**: Chromium, Firefox, WebKit, Mobile Chrome
- **Timeouts**: Configurados apropiadamente para la app
- **Screenshots/Videos**: Activados en caso de fallos

### tsconfig.json
TypeScript configurado con:
- **Paths aliases**: `@screenplay/*`, `@support/*`, `@features/*`
- **Strict mode**: Activado para mejor type checking
- **ES2020**: Target moderno para compatibilidad

## 📚 Ejemplo de Uso

### 1. Escribir un Feature (Gherkin)
```gherkin
# tests/features/login.feature
Característica: Autenticación de usuarios
  
  Escenario: Login exitoso como Gerente
    Dado que estoy en la página de login
    Cuando ingreso mis credenciales como "gerente"
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver el dashboard principal
```

### 2. Implementar Tasks
```typescript
// tests/screenplay/tasks/Login.ts
export class Login implements Task {
  static as(role: 'gerente' | 'recepcionista'): Login {
    return new Login(CREDENTIALS[role]);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.abilityTo(BrowseTheWeb).getPage();
    await page.fill('input[name="usuario"]', this.credentials.usuario);
    await page.fill('input[name="password"]', this.credentials.password);
    await page.click('button[type="submit"]');
  }
}
```

### 3. Implementar Questions
```typescript
// tests/screenplay/questions/IsOnDashboard.ts
export class IsOnDashboard implements Question<boolean> {
  async answeredBy(actor: Actor): Promise<boolean> {
    const page = actor.abilityTo(BrowseTheWeb).getPage();
    return page.url().includes('/dashboard');
  }
}
```

### 4. Conectar con Step Definitions
```typescript
// tests/steps/common.steps.ts
Given('que estoy en la página de login', async ({ actor }) => {
  await actor.attemptsTo(NavigateToLoginPage.now());
});

When('ingreso mis credenciales como {string}', async ({ actor }, role) => {
  await actor.attemptsTo(Login.as(role));
});

Then('debería ver el dashboard principal', async ({ actor, expect }) => {
  const isOnDashboard = await actor.asks(IsOnDashboard.now());
  expect(isOnDashboard).toBeTruthy();
});
```

## 🔗 Enlaces

- **Frontend App**: http://localhost:5175
- **Frontend Repo**: c:\Users\USER\Documents\hotel-booking-frontend
- **Playwright Docs**: https://playwright.dev
- **Playwright-BDD**: https://vitalets.github.io/playwright-bdd
- **Screenplay Pattern**: https://serenity-js.org/handbook/design/screenplay-pattern

## 👥 Credenciales de Prueba

```
Gerente:
  usuario: gerente
  password: gerente123

Recepcionista:
  usuario: recepcionista
  password: recepcion123
```

## 📦 Dependencias Principales

- `@playwright/test` - Framework de testing E2E
- `playwright-bdd` - Integración BDD con Gherkin
- `typescript` - Lenguaje de programación

## 🧪 Buenas Prácticas

1. **Mantener features simples** - Un escenario por funcionalidad
2. **Rehusar Tasks y Questions** - Evitar duplicación
3. **Nombres descriptivos** - Los nombres deben explicar qué hacen
4. **Un Actor por test** - No compartir Actors entre tests
5. **Disponer recursos** - Siempre llamar `actor.dispose()` después del test
6. **Assertions claras** - Usar mensajes descriptivos en `expect()`

## 📝 Próximos Pasos

1. Ejecutar `npm run bdd:generate` para generar archivos de glue code
2. Implementar las Tasks y Questions restantes (marcadas con /* */)
3. Agregar selectores específicos basados en data-testid
4. Ejecutar tests contra el frontend en desarrollo
5. Agregar más escenarios según las historias de usuario

---

**Nota**: Este proyecto está diseñado para trabajar con el frontend en `c:\Users\USER\Documents\hotel-booking-frontend`. Asegúrate de que el servidor de desarrollo esté corriendo en `http://localhost:5175` antes de ejecutar los tests.
