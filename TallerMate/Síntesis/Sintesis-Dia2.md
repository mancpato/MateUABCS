# Síntesis · Día 2 — Validar, iterar, terminar

El Día 1 produjo una herramienta. El Día 2 aporta cómo **desconfiar de ella hasta comprobar que está bien**, y cómo decirle a la IA exactamente qué corregir cuando algo falla. Es el día más técnico-operativo de la semana.

## La premisa incómoda del día

Un programa puede correr perfectamente, verse profesional, tener una interfaz limpia — **y estar matemáticamente equivocado**. La IA no comete errores de sintaxis: comete errores de significado. **La ausencia de mensajes de error no es evidencia de corrección matemática.** Son dos cosas distintas, y confundirlas es el malentendido más peligroso del taller.

## Los tres errores matemáticos frecuentes de la IA

| Error | Cómo se manifiesta | Cómo se detecta |
|---|---|---|
| **1. Escala incorrecta** | La forma se ve bien, los números no (ej. el eje Y no alcanza el valor máximo real de la función y la curva se sale del lienzo, aunque el cálculo interno siga siendo correcto) | Verificar un valor puntual a mano contra el eje |
| **2. Confusión de notación** | Se pidió sin²(x) y la IA escribió `sin(x**2)` en vez de `sin(x)**2` — funciones distintas, ambas corren sin error | Comparar la fórmula del código, símbolo por símbolo, contra la notación original |
| **3. Fallo en casos límite** | Funciona en el centro del rango y falla en la frontera (ej. un parámetro k que al llegar a 0 debería producir segmentos horizontales y en cambio desaparecen o hay una división por cero) | Probar deliberadamente los valores frontera de cada parámetro, no solo el rango cómodo |

No son los únicos errores posibles, pero son los que aparecen con frecuencia suficiente para revisarlos cada vez que se recibe código nuevo.

## El protocolo de validación, en tres pasos

1. **Elegir el caso de prueba ANTES de generar el código** (es el Elemento 5 del Día 1 — no se improvisa después de ver el resultado).
2. **Calcular el resultado esperado a mano** — no una intuición, un número exacto.
3. **Comparar y decidir:** si coincide, pasa esa validación (se repite con un segundo caso, idealmente uno en la frontera); si no coincide, hay un error real; si coincide pero "se ve raro", **se confía en el cálculo, no en la intuición visual** — probablemente se descubrió algo que tampoco se sabía.

Un solo caso puede pasar por casualidad. El mínimo son **dos**: uno central y uno en la frontera.

## Las cuatro estrategias de iteración — qué escribirle a la IA cuando algo falla

"Está mal, arréglalo" es la peor instrucción posible: obliga a la IA a adivinar con la misma lógica que produjo el error. La regla general es **describir el síntoma con precisión, no pedir una solución genérica**.

| Síntoma | Estrategia | Qué debe incluir el prompt |
|---|---|---|
| Mensaje de error explícito en consola | **1** | El mensaje de error **completo**, sin parafrasear, con número de línea |
| Corre bien pero el resultado matemático no es el esperado | **2** | Qué aparece + qué debería aparecer + **el caso de validación** (valor calculado a mano) |
| Corre bien, es correcto, pero confunde al alumno (falta claridad, no hay error matemático) | **3** | La mejora pedagógica concreta + la frase *"ajústalo sin cambiar la lógica matemática ni el cálculo existente"* |
| Ya está terminada y se quiere agregar algo nuevo | **4** | *"Sin modificar la funcionalidad existente"* + descripción precisa de qué hace lo nuevo, con qué variables interactúa, qué controla el usuario |

**Dos advertencias que no se pueden omitir:**
- En la Estrategia 3, sin la frase "sin cambiar la lógica matemática", la IA suele interpretar la mejora como permiso para tocar también el cálculo.
- **Después de aplicar la Estrategia 4, se revalida TODO, no solo lo nuevo.** Al integrar una característica, la IA reescribe el archivo completo y puede alterar en silencio algo que ya funcionaba.

Iterar no es fracasar. Ninguna de las cuatro estrategias implica que el prompt original estuvo mal hecho — lo que distingue a un buen director es saber qué decirle a la IA cuando el primer intento no basta.

## Los cinco criterios de "herramienta terminada" (el piso, no el techo)

1. **Corre sin errores en el navegador** — pestaña nueva, sin tocar nada 30 segundos, probar cada control una vez.
2. **Validada con al menos un caso verificable a mano** — debe poder decirse sin dudar cuál fue el caso de prueba y el resultado esperado. Si hay titubeo, el criterio no está cumplido, sin importar qué tan bien se vea.
3. **Tiene al menos un elemento de interactividad** — una gráfica estática, aunque correcta, no cumple la premisa del taller.
4. **Título y comentarios que otro profesor entienda** — se prueba mostrándosela a alguien de otra área; debe identificar el concepto y el parámetro principal en menos de un minuto.
5. **Se sabe cómo compartirla con los alumnos** — se genera el enlace o archivo y se abre en modo incógnito (simula al alumno sin sesión iniciada).

Si un criterio falla, no se descarta la herramienta: se identifica qué falta, se aplica la estrategia de iteración correspondiente (normalmente 2 si falla el criterio 2, o 3 si faltan interactividad/claridad), y **se vuelve a pasar la lista completa**, no solo el criterio que había fallado — una modificación puede haber roto algo que antes sí funcionaba.

## Producto del día

Dos herramientas terminadas y validadas, cada una con su rúbrica de cinco criterios llena y su caso de validación documentado por escrito ("si el parámetro ___ vale ___, el resultado exacto es ___").

## Tarea entre Día 2 y Día 3

Especificación de un **generador de ejercicios** simple de la materia propia: no una herramienta visual, algo que produzca ejercicios distintos del mismo tipo, con sus soluciones (ej. "derivadas de polinomios de grado 3, con coeficientes enteros"). No se construye todavía, solo se especifica.

## Términos clave del día

- **Protocolo de validación matemática** — los tres pasos: elegir caso, calcular a mano, comparar.
- **Estrategias de iteración 1–4** — el vocabulario compartido para pedirle correcciones a la IA el resto del taller.
- **Rúbrica de herramienta terminada** — los cinco criterios mínimos (Doc33), que se reutilizan el Día 5 y como estándar del repositorio.
