# language: es
Característica: Check-in de reservas
  Como recepcionista del hotel
  Quiero realizar el check-in de reservas confirmadas
  Para registrar la llegada de los huéspedes

  Antecedentes:
    Dado que estoy autenticado como "recepcionista"
    Y existe una reserva confirmada para hoy
      | idReserva  | R-001           |
      | huesped    | María González  |
      | habitacion | 101             |
      | checkIn    | hoy             |
      | checkOut   | +2 días         |

  @skip
  Escenario: Check-in exitoso de una reserva
    Dado que estoy en el dashboard
    Cuando busco la reserva "R-001" en la lista de check-ins de hoy
    Y hago clic en el botón "Check-in" de la reserva
    Y confirmo el check-in
    Entonces debería ver un mensaje "Check-in realizado exitosamente"
    Y el estado de la reserva debería cambiar a "En Curso"
    Y la habitación 101 debería estar ocupada
    Y la reserva debería desaparecer de la lista de check-ins pendientes

  Escenario: Check-in con confirmación de datos
    Dado que estoy realizando el check-in de la reserva "R-001"
    Cuando reviso los datos del huésped
    Entonces debería ver:
      | campo      | valor          |
      | nombre     | María González |
      | habitacion | 101            |
      | checkIn    | hoy            |
      | checkOut   | +2 días        |
    Y puedo confirmar o cancelar el check-in

  @skip
  Escenario: Intentar check-in de una reserva ya procesada
    Dado que la reserva "R-001" ya tiene check-in realizado
    Cuando intento hacer check-in nuevamente
    Entonces debería ver un mensaje "Esta reserva ya tiene check-in registrado"
    Y el botón de check-in no debería estar disponible
