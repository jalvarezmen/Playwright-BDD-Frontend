# language: es
Característica: Autenticación de usuarios
  Como empleado del hotel
  Quiero poder autenticarme en el sistema
  Para acceder a las funcionalidades según mi rol

  Escenario: Login exitoso como Gerente
    Dado que estoy en la página de login
    Cuando ingreso mis credenciales como "admin"
      | usuario  | admin      |
      | password | admin123   |
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver el dashboard principal
    Y mi rol debería ser "Gerente"

  Escenario: Login exitoso como Recepcionista
    Dado que estoy en la página de login
    Cuando ingreso mis credenciales como "recepcionista"
      | usuario  | recepcion    |
      | password | recepcion123 |
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver el dashboard principal
    Y mi rol debería ser "Recepcionista"

  Escenario: Login fallido con credenciales incorrectas
    Dado que estoy en la página de login
    Cuando ingreso credenciales inválidas
      | usuario  | usuario_invalido |
      | password | password_invalido |
    Y hago clic en el botón de iniciar sesión
    Entonces no debería estar autenticado

  Escenario: Validación de campos vacíos
    Dado que estoy en la página de login
    Cuando dejo los campos de usuario y contraseña vacíos
    Y hago clic en el botón de iniciar sesión
    Entonces debería ver validaciones en los campos requeridos
