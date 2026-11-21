# Formularios que convierten

Aplica a `ContactForm` (campos configurables en la sección `contact` de `page.ts`, textos en `site.labels`). Lo técnico (labels, errores, `aria-*`) está en el piso de calidad de landing-design; acá va lo que mueve la conversión.

## Cada campo cuesta

| Campos  | Efecto estimado en la tasa de completado |
| ------- | ---------------------------------------- |
| 3       | Lo esperado                              |
| 4 a 6   | Entre 10 y 25% menos                     |
| 7 o más | Entre 25 y 50% menos                     |

Por cada campo, preguntá: ¿hace falta **antes** de poder ayudar? ¿se puede obtener de otra forma? ¿se puede preguntar después, por WhatsApp o en la llamada?

## Campo por campo

- **Nombre:** un solo campo "Nombre". Separar nombre y apellido solo si se usa.
- **Email:** un solo campo, sin confirmación, con `type="email"` y `autocomplete="email"`.
- **Teléfono:** opcional si se puede. Si es obligatorio, explicá por qué ("Para coordinar la visita"). `type="tel"`.
- **Mensaje:** opcional, con una guía de qué contar ("Contanos qué necesitás y en qué zona estás").
- **Selector de servicio:** si hay menos de 5 opciones, botones de radio; con una opción "Otro".
- **Orden:** lo fácil primero (nombre, email) y lo sensible al final (teléfono).
- **Una columna** siempre, salvo campos cortos y relacionados.

## Botón de envío

- Fórmula: acción + lo que obtiene. "Pedir presupuesto", "Reservar mi turno", "Enviar consulta". Nunca solo "Enviar".
- Justo después del último campo, alineado con los campos y con el estilo `primary`.

## Alrededor del formulario

- **Arriba:** qué recibe el visitante y cuándo ("Te mandamos el presupuesto en el día").
- **Cerca del botón:** un reductor de ansiedad verdadero ("No compartimos tus datos", "Te respondemos en horario de atención").
- **Alternativa:** WhatsApp o teléfono al lado, para quien no quiere completar formularios (la variante `split` de `contact` ya lo resuelve).

## Errores y estados

- Mensajes específicos con la corrección: "Revisá el email, por ejemplo nombre@gmail.com"; nunca "Dato inválido".
- Nunca se borra lo que el visitante escribió.
- Éxito: la página `/thank-you` confirma qué pasa ahora y cuándo. Es el final de la experiencia (regla pico-final): agradecé y dejá un próximo paso útil (seguir en Instagram, guardar el WhatsApp).

## Medición

`conversions.ts` registra los envíos. Para diagnosticar, compará las vistas de la sección `contact` con los envíos. Si muchos empiezan y pocos envían, el problema está en los campos o en los errores.
