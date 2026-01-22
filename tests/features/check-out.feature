# language: es
Característica: Check-out de reservas
  Como recepcionista del hotel
  Quiero realizar el check-out de reservas
  Para registrar la salida de los huéspedes y liberar habitaciones

  Antecedentes:
    Dado que estoy autenticado como "recepcionista"
    Y existe una reserva en curso para hacer check-out hoy
      | idReserva  | R-002           |
      | huesped    | Carlos Ramírez  |
      | habitacion | 205             |
      | checkIn    | hace 3 días     |
      | checkOut   | hoy             |
      | estadoPago | Pagado          |

  Escenario: Check-out exitoso de una reserva
    Dado que estoy en el dashboard
    Cuando busco la reserva "R-002" en la lista de check-outs de hoy
    Y hago clic en el botón "Check-out" de la reserva
    Y confirmo el check-out
    Entonces debería ver un mensaje "Check-out realizado exitosamente"
    Y el estado de la reserva debería cambiar a "Completada"
    Y la habitación 205 debería estar disponible
    Y la reserva debería desaparecer de la lista de check-outs pendientes

  Escenario: Check-out con revisión de pagos
    Dado que estoy realizando el check-out de la reserva "R-002"
    Cuando reviso el estado del pago
    Entonces debería ver que el pago está "Completado"
    Y puedo proceder con el check-out

  Escenario: Check-out con pago pendiente
    Dado que existe una reserva con pago pendiente
      | idReserva  | R-003          |
      | huesped    | Ana López      |
      | estadoPago | Pendiente      |
    Cuando intento hacer check-out de "R-003"
    Entonces debería ver una advertencia "El pago está pendiente"
    Y debería poder ver el monto total
    Y puedo procesar el pago antes del check-out

  Escenario: Intentar check-out de una reserva sin check-in
    Dado que existe una reserva confirmada sin check-in
      | idReserva  | R-004        |
      | estado     | Confirmada   |
    Cuando intento hacer check-out de "R-004"
    Entonces debería ver un mensaje de error "No se puede hacer check-out sin check-in previo"
    Y el check-out no debería procesarse
