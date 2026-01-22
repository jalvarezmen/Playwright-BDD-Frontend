# language: es
Característica: Crear reserva
  Como recepcionista del hotel
  Quiero crear nuevas reservas
  Para registrar las solicitudes de los huéspedes

  Antecedentes:
    Dado que estoy autenticado como "recepcionista"
    Y estoy en la página de nueva reserva

  Escenario: Crear reserva exitosa con un huésped
    Cuando completo el formulario de reserva:
      | campo              | valor              |
      | nombre             | Juan Pérez         |
      | apellido           | García             |
      | email              | juan@example.com   |
      | telefono           | 555-1234           |
      | tipoDocumento      | DNI                |
      | numeroDocumento    | 12345678           |
      | fechaCheckIn       | 2024-03-15         |
      | fechaCheckOut      | 2024-03-17         |
      | tipoHabitacion     | Suite              |
      | numeroHuespedes    | 2                  |
    Y hago clic en "Crear Reserva"
    Entonces debería ver un mensaje de éxito "Reserva creada exitosamente"
    Y la reserva debería aparecer en el dashboard
    Y el estado de la reserva debería ser "Confirmada"

  Escenario: Crear reserva con múltiples huéspedes
    Cuando completo el formulario de reserva con 3 huéspedes
    Y todos los datos son válidos
    Y hago clic en "Crear Reserva"
    Entonces debería ver la reserva con 3 huéspedes registrados
    Y todos los huéspedes deberían tener sus datos completos

  Escenario: Validación de fechas inválidas
    Cuando intento crear una reserva con fecha de check-out anterior al check-in
    Entonces debería ver un error "La fecha de salida debe ser posterior a la de entrada"
    Y la reserva no debería ser creada

  Escenario: Validación de datos del huésped incompletos
    Cuando intento crear una reserva sin completar el email del huésped
    Entonces debería ver un error de validación en el campo email
    Y la reserva no debería ser creada
