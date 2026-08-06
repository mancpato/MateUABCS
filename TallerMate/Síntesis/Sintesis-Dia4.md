# Síntesis · Día 4 — Interactividad y escenarios de uso en el aula

Este día casi no produce código nuevo: es diseño de clase. Se trabaja con la herramienta que ya se tiene desde el Día 1 o 2 — no hace falta construir nada desde cero. El producto del día es una actividad concreta de 10 a 15 minutos, diseñada por escrito, lista para dar en clase.

## Dos decisiones, y son independientes entre sí

**Decisión 1 — El tipo de interactividad.** ¿Qué hace el alumno con la herramienta?

**Decisión 2 — El escenario de uso.** ¿Quién manipula la herramienta en el aula, y qué se evalúa?

Ninguna se deduce de la otra: la misma herramienta con el mismo tipo de interactividad puede usarse como demo magistral (el profesor la manipula al frente) o como laboratorio de exploración (cada alumno la manipula con una guía). Cambia solo cómo se organiza la actividad alrededor de ella. Por eso son decisiones pedagógicas, no técnicas — ninguna la puede tomar la IA.

## Los cuatro tipos de interactividad

| Tipo | Qué hace el alumno | Qué comprende |
|---|---|---|
| **Deslizadores de parámetros** | Mueve una constante | El efecto de un parámetro sobre la familia de soluciones (ej. Taylor: deslizador para el grado n) |
| **Animación paso a paso** | Avanza un algoritmo con un botón | La secuencia lógica de un procedimiento (ej. Newton-Raphson animado) |
| **Respuesta al clic** | Señala un punto del plano | Cómo cambia el comportamiento según la posición (ej. campo de pendientes con solución al hacer clic) |
| **Comparación simultánea** | Observa dos métodos a la vez, con el **mismo control** | Las diferencias entre dos enfoques (ej. Euler vs. Runge-Kutta para la misma ecuación) |

El ejercicio de práctica fue: identificar cuál tipo tiene ya la herramienta principal, elegir un tipo distinto para añadir, y redactar el prompt con la **Estrategia 4** del Día 2 ("sin modificar la funcionalidad existente, añade [qué hace, con qué variables interactúa, qué controla el usuario]"). Cuando no era obvio qué tipo añadir, la ruta más corta suele ser comparación simultánea sobre lo que ya existe.

## Los tres escenarios de uso en el aula

| Escenario | Quién manipula | Qué se evalúa | Tiempo típico |
|---|---|---|---|
| **Demo magistral aumentada** | El profesor | Nada formalmente; es apoyo a la explicación | 10-15 min, dentro de la clase |
| **Laboratorio de exploración guiada** | El alumno, siguiendo preguntas | Las respuestas y argumentos del alumno | 10-15 min + puesta en común |
| **Co-creación con IA** | El alumno, con ayuda de la IA | La especificación y validación que demuestra el alumno — **no el código** | 20-30 min o tarea |

**Demo magistral** es la más cercana a la práctica docente habitual y la más fácil de adoptar de inmediato. Es correcta cuando el concepto es nuevo y el tiempo es corto (el alumno no tiene con qué explorar todavía).

**Laboratorio de exploración guiada** exige una guía de preguntas en tres niveles, y no es opcional — sin ella, el alumno mueve controles sin rumbo:
1. **Observación directa** — "¿qué pasa con la curva cuando mueves k de 0 a 2?" (concreto, no "¿qué pasa cuando mueves el parámetro?").
2. **Generalización** — "¿puedes formular una regla general sobre cómo el parámetro afecta el resultado?"
3. **Conexión teórica** — "¿esta regla que observaste coincide con lo que predice la fórmula que vimos en clase? ¿Por qué?"

El orden no es negociable: si se empieza por la teoría, el alumno recita la fórmula sin mirar la pantalla.

**Co-creación con IA** es el escenario más ambicioso: se pide al alumno modificar o extender una herramienta existente usando el mismo flujo prompt → código → validación practicado toda la semana. **Requisito previo obligatorio:** el alumno necesita haber visto, aunque sea de forma simplificada, la anatomía del artefacto (las zonas del Día 1) — de lo contrario no sabrá qué pedirle a la IA cuando algo falle.

## El criterio que resume el día

**No se evalúa que el alumno opere la herramienta. Se evalúa que comprenda el concepto.** Un alumno que mueve el deslizador hasta que "se ve bien" operó la herramienta. Uno que predice qué va a pasar antes de mover el deslizador, y luego lo comprueba, comprendió el concepto.

## Producto del día

Una ficha de diseño de actividad completa, con: concepto matemático, herramienta a usar, tipo de interactividad, escenario elegido, **la justificación** de por qué ese escenario y no otro sirve mejor a ese concepto en ese momento del curso, la sección específica del escenario elegido (dos a cinco campos según cuál sea), y cómo se va a evaluar la comprensión (no la operación).

## Qué llevar al Día 5

1. La herramienta principal, funcionando, con el enlace a la mano.
2. El caso de validación, para decirlo **en voz alta** durante la presentación (ejemplo: *"para n=4, calculé a mano que el área debía ser 18, y la herramienta lo confirma"*).
3. La ficha de diseño del Día 4 — no se vuelve a llenar, se lleva completa con la retroalimentación anotada.

No hay tarea adicional para el Día 5.

## Términos clave del día

- **Tipo de interactividad** — la mecánica que ejecuta el alumno: deslizador, animación, clic, comparación.
- **Escenario de uso** — quién manipula la herramienta y qué se evalúa: demo, laboratorio, co-creación.
- **Ficha de Diseño de Actividad (Doc42)** — el documento donde se cruzan ambas decisiones; es insumo directo de la presentación del Día 5.
