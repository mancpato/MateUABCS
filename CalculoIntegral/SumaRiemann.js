/**
 * VISUALIZADOR DE SUMAS DE RIEMANN Y LA INTEGRAL DEFINIDA
 * Diseñado para Cálculo Diferencial e Integral.
 * Función: f(x) = 3 + 2*sin(x) + 0.4*x
 * El prompt:
 * 
 Actúa como un programador experto en p5.js con experiencia en visualización
matemática para docencia universitaria. Necesito una herramienta educativa
interactiva que correrá en editor.p5js.org.

═══════════════════════════════════════════════════════════════════════
ELEMENTO 1 — CONTEXTO
═══════════════════════════════════════════════════════════════════════

Los alumnos son estudiantes universitarios de los primeros semestres de
ingeniería y ciencias, en el curso de Cálculo Diferencial e Integral.

Ya conocen: el área de un rectángulo, la lectura de la gráfica de una
función y la notación de sumatoria.

Aún NO tienen intuición sobre: por qué una suma de áreas de rectángulos
converge al área bajo una curva, ni por qué el número de rectángulos es
determinante.

La brecha concreta que esta herramienta debe cerrar: en el pizarrón
alcanzo a dibujar cuatro o cinco rectángulos, una sola vez y de un solo
tipo. El alumno ve un caso estático y nunca ve el paso al límite. Necesito
que pueda mover el número de rectángulos y observar el proceso, no el
resultado congelado.

La herramienta se proyecta en un aula. Todo texto debe leerse desde la
última fila.

═══════════════════════════════════════════════════════════════════════
ELEMENTO 2 — CONCEPTO EXACTO
═══════════════════════════════════════════════════════════════════════

Quiero mostrar la SUMA DE RIEMANN de una función continua sobre un
intervalo cerrado, y su convergencia a la integral definida.

La función es, exactamente:

    f(x) = 3 + 2·sin(x) + 0.4·x

Su antiderivada es, exactamente:

    F(x) = 3x - 2·cos(x) + 0.2·x²

Sobre [-6, 6] la función es positiva (su mínimo vale ≈ 0.3315 en x ≈ -1.772
y su máximo ≈ 5.6685 en x ≈ 1.772) y presenta cuatro puntos críticos, en
las soluciones de cos(x) = -0.2.

Esa elección es deliberada: no quiero una función monótona. Con máximos y
mínimos, el alumno descubre que ninguna regla simple ("por la izquierda
siempre subestima") sobrevive, y que hay que razonar localmente.

La suma de Riemann con n subintervalos de igual ancho h = (b-a)/n es:

    S = h · Σ f(xᵢ*),   i = 0, 1, ..., n-1

donde el punto de muestreo xᵢ* debe poder ser el extremo IZQUIERDO, el
extremo DERECHO o el PUNTO MEDIO de cada subintervalo. Los tres son
herramientas pedagógicas distintas y quiero los tres disponibles como
opción del usuario.

*** LA OPCIÓN PRESELECCIONADA AL ABRIR LA HERRAMIENTA DEBE SER
    "EXTREMO IZQUIERDO". NO PUNTO MEDIO. ***

Lo subrayo porque sé que la tendencia por defecto de los modelos es
preseleccionar punto medio, y aquí eso rompe la herramienta: ver el
Elemento 5, Caso 2. Si tu código abre en punto medio, está mal.

═══════════════════════════════════════════════════════════════════════
ELEMENTO 3 — COMPORTAMIENTO ESPERADO
═══════════════════════════════════════════════════════════════════════

── SEPARACIÓN ENTRE VENTANA E INTERVALO ──

Hay DOS cosas distintas que no deben confundirse:

  · La VENTANA DE VISUALIZACIÓN: siempre fija, x de -6 a 6, y de -0.567
    a 6.235. Nunca cambia, pase lo que pase con los controles.

  · El INTERVALO DE INTEGRACIÓN [Xmin, Xmax]: ajustable por el usuario
    dentro de [-5, 5]. Es donde se dibujan los rectángulos.

La ventana NO debe reescalarse al mover el intervalo. La razón es
pedagógica: si la vista se reajusta, la curva parece cambiar de forma y el
alumno pierde la referencia. Con ventana fija, la curva es un telón
estable y el intervalo se lee como una VENTANA sobre ella. Es el concepto
que quiero transmitir.

Consecuencia obligatoria: y = 0 siempre visible, con las bases de los
rectángulos apoyadas sobre el eje horizontal. Una suma de Riemann en la
que no se ve la base de los rectángulos no está mostrando área.

── QUÉ DEBE VERSE EN PANTALLA ──

1. Plano cartesiano con marcas numéricas SOLO EN LOS ENTEROS:
       eje X: de -6 a 6
       eje Y: de 1 a 6
   No subdividas en decimales. Una escala con marcas cada 0.1 es
   ilegible a distancia y no aporta nada aquí. Deja margen suficiente
   para que las etiquetas de -6 y 6 se vean completas, sin cortarse
   contra el borde del lienzo.

2. La gráfica de f sobre TODA la ventana [-6, 6], con resolución fina
   (al menos un punto por píxel horizontal), como curva suave y no como
   poligonal.

   Fuera de [Xmin, Xmax]: trazo GRIS CLARO y delgado.
   Dentro de [Xmin, Xmax]: trazo de COLOR INTENSO Y CONTRASTANTE contra
   el relleno de los rectángulos, y más grueso. Debe distinguirse con
   claridad por encima del área rellena; si la curva se confunde con el
   relleno, el alumno no puede ver dónde el rectángulo sobrepasa la
   curva y dónde se queda corto, que es el contenido de la herramienta.

   Dibuja la curva DESPUÉS de los rectángulos.

3. Los n rectángulos aproximantes, con relleno semitransparente y borde
   visible.

   Si el ancho de un rectángulo en pantalla resulta menor a 3 píxeles,
   omite su borde y dibuja solo el relleno; de lo contrario los bordes se
   funden en una mancha sólida de tinta.

4. Un panel de lectura numérica DENTRO del lienzo, anclado en la ESQUINA
   SUPERIOR IZQUIERDA del área de la gráfica, sobre fondo semitransparente
   con borde.

   Esa ubicación es segura y no tapa nada: sobre x ∈ [-6, -2] la función
   nunca supera el valor 3.1552, así que la región por encima de y = 3.4
   en ese tramo está permanentemente libre de curva y de rectángulos.
   Dimensiona el panel para caber ahí.

   Contenido, una línea por dato:
       - número de rectángulos n
       - intervalo actual [Xmin, Xmax], con 2 decimales
       - aproximación (suma de Riemann), con 4 decimales
       - valor exacto de la integral, calculado con F, con 4 decimales
       - error absoluto |exacto - aproximación|, con 4 decimales

── CONTROLES (en el DOM, debajo del lienzo) ──

Dispuestos en tres renglones:

   Renglón 1:  deslizador de n (rango 1 a 200)  +  su valor numérico
               +  selector del punto de muestreo, EN EL MISMO RENGLÓN,
                  a la derecha
   Renglón 2:  deslizador de Xmin (rango -5 a 5)  +  su valor numérico
   Renglón 3:  deslizador de Xmax (rango -5 a 5)  +  su valor numérico

CADA DESLIZADOR DEBE MOSTRAR SU VALOR NUMÉRICO ACTUAL junto a su etiqueta,
actualizado en tiempo real. Un deslizador sin lectura numérica obliga a
adivinar, y aquí el valor del intervalo es información matemática, no
detalle de interfaz.

Al mover cualquier control, gráfica y cantidades numéricas se actualizan
de inmediato.

── LO QUE NO DEBE APARECER ──

NO muestres en pantalla la expresión algebraica de f(x) — ni en el título,
ni en una leyenda, ni en una etiqueta sobre la curva. La razón es
pedagógica: quiero que el alumno razone sobre la aproximación observando
la geometría, sin anclarse en la fórmula. La fórmula queda solo en los
comentarios del código, donde el profesor la consulta.

═══════════════════════════════════════════════════════════════════════
ELEMENTO 4 — RESTRICCIONES TÉCNICAS
═══════════════════════════════════════════════════════════════════════

Plataforma: p5.js, ejecutable tal cual en editor.p5js.org.
Canvas: 800 × 600 píxeles.

Sin librerías externas que requieran instalación.
Código comentado en español. Interfaz en español.

TIPOGRAFÍA: el panel de lectura en 20 px o más; las marcas de los ejes y
las etiquetas de los controles en 16 px o más. Se proyecta en un aula.

TRANSFORMACIÓN DE COORDENADAS — punto crítico:

En p5.js el eje Y crece hacia ABAJO, al contrario de la convención
matemática. Aísla la conversión del mundo matemático a coordenadas de
pantalla en una sola función documentada:

    function aPantalla(x, y) { ... }

Todo dibujo debe pasar por ella. No disperses la conversión por el código.
Esta restricción no es de estilo: es el punto donde este tipo de programa
falla más seguido, y quiero que sea auditable de un vistazo.

RELACIÓN DE ASPECTO: no fuerces 1:1. Un escalamiento distinto en x e y
multiplica todas las áreas por la misma constante, así que las razones
entre áreas —lo único que la herramienta debe comunicar— se preservan
intactas.

DESLIZADORES Xmin / Xmax: separación mínima de 0.5 unidades, empujándose
mutuamente si el usuario intenta cruzarlos. No debe ser posible dejar el
intervalo vacío o invertido.

COMENTARIO OBLIGATORIO EN EL CÓDIGO: incluye una nota explicando la
propiedad descrita en el Caso 2 del Elemento 5, para que quien reutilice
el recurso no la confunda con un error.

═══════════════════════════════════════════════════════════════════════
ELEMENTO 5 — CRITERIO DE VALIDACIÓN
═══════════════════════════════════════════════════════════════════════

Estos casos los calculé a mano ANTES de ver tu código. Si tu programa no
los reproduce, tiene un error.

CASO 1 — Valor exacto sobre el intervalo simétrico.
Sobre [-5, 5] los términos 2·sin(x) y 0.4·x son funciones IMPARES y sus
integrales se anulan por simetría. Solo sobrevive la constante:

    ∫ desde -5 hasta 5 de f(x) dx  =  3 · 10  =  30   exactamente

Más general: sobre cualquier intervalo simétrico [-a, a] el valor exacto
es 6a. El panel debe mostrar 30.0000 para [-5, 5].

CASO 2 — Degeneración del punto medio en intervalos simétricos.
Sobre [-5, 5], los puntos medios de CUALQUIER partición son simétricos
respecto al origen, así que los términos impares se cancelan y la regla
del punto medio da 30.0000 exacto para TODO n, con error 0.0000.

Esto es correcto, no es un defecto. Es la razón por la que el default debe
ser extremo izquierdo: si la herramienta abriera en punto medio sobre el
intervalo completo, el error quedaría clavado en cero y mover el
deslizador de n no mostraría nada.

CASO 3 — Orden de convergencia por la izquierda, en [-5, 5].
Usando f(-5) ≈ 2.91785 y f(0) = 3:

    n = 1  →  aproximación ≈ 29.1785   error ≈ 0.8215
    n = 2  →  aproximación ≈ 29.5892   error ≈ 0.4108
    n = 4  →  aproximación ≈ 29.7946   error ≈ 0.2054

Al duplicar n, el error se reduce a la mitad. Debe seguir ocurriendo.

CASO 4 — Intervalo asimétrico, donde el punto medio sí se comporta.
Con Xmin = -0.5 y Xmax = 5, el valor exacto es 22.6378. Los errores:

              extremo izquierdo      punto medio
    n =  4         1.0465               0.0990
    n =  8         0.4738               0.0237
    n = 16         0.2250               0.0059

Al duplicar n, el error por la izquierda se divide entre 2 y el del punto
medio entre 4. Es el contraste que quiero que el alumno pueda observar.

CASO 5 — Orientación del dibujo (Error Tipo 0).
f es positiva en todo [-6, 6]. TODOS los rectángulos deben dibujarse por
ARRIBA del eje horizontal, con su base apoyada sobre el eje y el eje
visible dentro del cuadro. Si alguno cuelga hacia abajo, o si la base
queda fuera de la ventana, la transformación de coordenadas o el rango
vertical están mal.
 * 
 */

// Controles del DOM
let sliderN, spanN, selMetodo;
let sliderXmin, spanXmin;
let sliderXmax, spanXmax;

// Variables para evitar el cruce de los límites de integración
let prevXmin = -5;
let prevXmax = 5;

function setup() {
  // Lienzo especificado
  createCanvas(800, 600);
  
  // -------------------------------------------------------------
  // CREACIÓN DE CONTROLES (DOM) DEBAJO DEL CANVAS
  // -------------------------------------------------------------
  
  // Renglón 1: n y método de aproximación
  let row1 = createDiv().style('margin-top', '15px').style('font-family', 'sans-serif').style('font-size', '16px');
  let labelN = createSpan('Número de rectángulos (n): ').parent(row1);
  sliderN = createSlider(1, 200, 4, 1).parent(row1).style('width', '200px');
  spanN = createSpan(' 4').parent(row1).style('margin-right', '40px').style('font-weight', 'bold');
  
  selMetodo = createSelect().parent(row1).style('font-size', '16px');
  selMetodo.option('Extremo Izquierdo');
  selMetodo.option('Extremo Derecho');
  selMetodo.option('Punto Medio');
  // SELECCIÓN POR DEFECTO OBLIGATORIA (Elemento 2)
  selMetodo.selected('Extremo Izquierdo');
  
  // Renglón 2: Xmin
  let row2 = createDiv().style('margin-top', '10px').style('font-family', 'sans-serif').style('font-size', '16px');
  let labelXmin = createSpan('Inicio del intervalo (Xmin): ').parent(row2);
  sliderXmin = createSlider(-5, 5, -5, 0.01).parent(row2).style('width', '200px');
  spanXmin = createSpan(' -5.00').parent(row2).style('font-weight', 'bold');
  
  // Renglón 3: Xmax
  let row3 = createDiv().style('margin-top', '10px').style('font-family', 'sans-serif').style('font-size', '16px');
  let labelXmax = createSpan('Fin del intervalo (Xmax):   ').parent(row3);
  sliderXmax = createSlider(-5, 5, 5, 0.01).parent(row3).style('width', '200px');
  spanXmax = createSpan(' 5.00').parent(row3).style('font-weight', 'bold');
  
  // Asignar eventos de input para controlar la colisión de deslizadores
  sliderXmin.input(forzarSeparacionLimites);
  sliderXmax.input(forzarSeparacionLimites);
}

/**
 * Función que previene que los límites del intervalo se crucen o 
 * dejen un intervalo muy pequeño (menor a 0.5 unidades).
 */
function forzarSeparacionLimites() {
  let xmin = sliderXmin.value();
  let xmax = sliderXmax.value();
  
  if (xmax - xmin < 0.5) {
    if (xmin !== prevXmin) {
      // Si el usuario movió Xmin hacia la derecha empujando a Xmax
      sliderXmax.value(xmin + 0.5);
    } else if (xmax !== prevXmax) {
      // Si el usuario movió Xmax hacia la izquierda empujando a Xmin
      sliderXmin.value(xmax - 0.5);
    }
  }
  
  prevXmin = sliderXmin.value();
  prevXmax = sliderXmax.value();
}

/**
 * Función matemática a integrar
 */
function f(x) {
  return 3 + 2 * Math.sin(x) + 0.4 * x;
}

/**
 * Antiderivada analítica exacta para el cálculo del error
 */
function F(x) {
  return 3 * x - 2 * Math.cos(x) + 0.2 * x * x;
}

/**
 * TRANSFORMACIÓN DE COORDENADAS MATEMÁTICAS A PANTALLA
 * Esta es la única función que convierte del mundo matemático a los píxeles del canvas.
 * - Ventana en X: fija de -6 a +6.
 * - Ventana en Y: fija de -0.567 a +6.235. (Y crece hacia abajo en pantalla)
 */
function aPantalla(x, y) {
  let px = map(x, -6, 6, 0, width);
  let py = map(y, -0.567, 6.235, height, 0);
  return { x: px, y: py };
}

/* ======================================================================================
   COMENTARIO OBLIGATORIO - PROPIEDAD DEL PUNTO MEDIO EN INTERVALOS SIMÉTRICOS
   ======================================================================================
   NOTA PARA DOCENTES: 
   En el "Caso 2" (f(x) sobre un intervalo simétrico como [-5, 5] con Punto Medio), 
   la herramienta arrojará un error de EXACTAMENTE 0.0000 para CUALQUIER valor de n.
   
   Esto NO es un error de programación. La función f(x) = 3 + 2*sin(x) + 0.4*x está
   compuesta por una constante (3) y dos funciones IMPARES (2*sin(x) y 0.4*x). 
   En cualquier partición regular de un intervalo simétrico [-a, a], los puntos medios 
   también son simétricos respecto al origen. Al evaluarlos, las partes impares se anulan 
   algebraicamente a cero exacto en cada par de rectángulos opuestos. Por ello, la regla 
   del punto medio extrae la integral real de forma matemáticamente perfecta para este 
   caso particular, congelando el error sin importar el ancho del rectángulo.
   ====================================================================================== */

function draw() {
  background(255);
  
  // Leer los valores actuales de los controles
  let n = sliderN.value();
  let a = sliderXmin.value();
  let b = sliderXmax.value();
  let metodo = selMetodo.value();
  
  // Actualizar textos de los deslizadores en la interfaz (DOM)
  spanN.html(` ${n}`);
  spanXmin.html(` ${a.toFixed(2)}`);
  spanXmax.html(` ${b.toFixed(2)}`);
  
  // -------------------------------------------------------------
  // 1. DIBUJO DE EJES CARTESIANOS Y MARCAS (Solo enteros)
  // -------------------------------------------------------------
  stroke(0);
  strokeWeight(1.5);
  
  // Eje horizontal (Y=0)
  let pEjeX_izq = aPantalla(-6, 0);
  let pEjeX_der = aPantalla(6, 0);
  line(pEjeX_izq.x, pEjeX_izq.y, pEjeX_der.x, pEjeX_der.y);
  
  // Eje vertical (X=0)
  let pEjeY_inf = aPantalla(0, -0.567);
  let pEjeY_sup = aPantalla(0, 6.235);
  line(pEjeY_inf.x, pEjeY_inf.y, pEjeY_sup.x, pEjeY_sup.y);
  
  // Marcas numéricas
  fill(0);
  noStroke();
  textSize(16);
  textFont('sans-serif');
  
  // Marcas en el eje X (-6 a 6)
  for (let i = -6; i <= 6; i++) {
    let p = aPantalla(i, 0);
    stroke(0); strokeWeight(2);
    line(p.x, p.y - 4, p.x, p.y + 4);
    noStroke();
    
    if (i !== 0) {
      // Prevención de corte en los bordes del lienzo
      if (i === -6) {
        textAlign(LEFT, TOP);
        text(i, p.x + 4, p.y + 8);
      } else if (i === 6) {
        textAlign(RIGHT, TOP);
        text(i, p.x - 4, p.y + 8);
      } else {
        textAlign(CENTER, TOP);
        text(i, p.x, p.y + 8);
      }
    }
  }
  
  // Marcas en el eje Y (1 a 6)
  textAlign(RIGHT, CENTER);
  for (let i = 1; i <= 6; i++) {
    let p = aPantalla(0, i);
    stroke(0); strokeWeight(2);
    line(p.x - 4, p.y, p.x + 4, p.y);
    noStroke();
    text(i, p.x - 8, p.y);
  }
  
  // -------------------------------------------------------------
  // 2. CÁLCULO Y DIBUJO DE RECTÁNGULOS (Suma de Riemann)
  // -------------------------------------------------------------
  let h = (b - a) / n;
  let suma = 0;
  
  for (let i = 0; i < n; i++) {
    let x_izq = a + i * h;
    let x_der = a + (i + 1) * h;
    let x_muestra;
    
    if (metodo === 'Extremo Izquierdo') {
      x_muestra = x_izq;
    } else if (metodo === 'Extremo Derecho') {
      x_muestra = x_der;
    } else {
      x_muestra = a + (i + 0.5) * h; // Punto Medio
    }
    
    let altura_y = f(x_muestra);
    suma += altura_y * h;
    
    // Coordenadas para dibujar (Base siempre en Y=0)
    let p_inf_izq = aPantalla(x_izq, 0);
    let p_sup_der = aPantalla(x_der, altura_y);
    
    let anchoPixel = p_sup_der.x - p_inf_izq.x;
    let altoPixel = p_inf_izq.y - p_sup_der.y; // En pantalla, origen Y es arriba
    
    // Si el grosor es muy angosto, quitar borde
    if (anchoPixel < 3) {
      noStroke();
    } else {
      stroke(0, 100, 200); 
      strokeWeight(1);
    }
    
    // Relleno semitransparente azul claro para contrastar el rojo de la función
    fill(0, 150, 255, 110);
    rect(p_inf_izq.x, p_sup_der.y, anchoPixel, altoPixel);
  }
  
  // -------------------------------------------------------------
  // 3. DIBUJO DE LA CURVA (Trazada al final para superponerse)
  // -------------------------------------------------------------
  noFill();
  let resolucion_x = 0.02; // Suficientemente fino para ser suave y no poligonal
  
  // Tramo 1: Fuera del intervalo por la izquierda (Gris claro)
  if (a > -6) {
    stroke(170);
    strokeWeight(2);
    beginShape();
    for (let x = -6; x <= a; x += resolucion_x) {
      let p = aPantalla(x, f(x));
      vertex(p.x, p.y);
    }
    let pFinal = aPantalla(a, f(a));
    vertex(pFinal.x, pFinal.y);
    endShape();
  }
  
  // Tramo 2: Dentro del intervalo [Xmin, Xmax] (Color intenso contrastante - Rojo oscuro)
  stroke(220, 0, 0);
  strokeWeight(3.5);
  beginShape();
  for (let x = a; x <= b; x += resolucion_x) {
    let p = aPantalla(x, f(x));
    vertex(p.x, p.y);
  }
  let pFinalInt = aPantalla(b, f(b));
  vertex(pFinalInt.x, pFinalInt.y);
  endShape();
  
  // Tramo 3: Fuera del intervalo por la derecha (Gris claro)
  if (b < 6) {
    stroke(170);
    strokeWeight(2);
    beginShape();
    for (let x = b; x <= 6; x += resolucion_x) {
      let p = aPantalla(x, f(x));
      vertex(p.x, p.y);
    }
    let pFinalExt = aPantalla(6, f(6));
    vertex(pFinalExt.x, pFinalExt.y);
    endShape();
  }
  
  // -------------------------------------------------------------
  // 4. PANEL DE LECTURA NUMÉRICA (Esquina Superior Izquierda)
  // -------------------------------------------------------------
  let exacta = F(b) - F(a);
  let error_abs = abs(exacta - suma);
  
  // Caja de fondo semitransparente anclada
  fill(255, 255, 255, 230);
  stroke(100);
  strokeWeight(1.5);
  rect(15, 15, 340, 160, 5); 
  
  // Textos numéricos (Leíbles desde la última fila: 20px)
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  textFont('sans-serif');
  let interlineado = 28;
  
  text(`Rectángulos (n): ${n}`, 30, 25);
  text(`Intervalo: [${a.toFixed(2)}, ${b.toFixed(2)}]`, 30, 25 + interlineado);
  
  // Cifras con 4 decimales
  text(`Aproximación: ${suma.toFixed(4)}`, 30, 25 + interlineado * 2);
  text(`Integral exacta: ${exacta.toFixed(4)}`, 30, 25 + interlineado * 3);
  
  // Remarque del error para que resalte visualmente
  fill(180, 0, 0);
  text(`Error absoluto: ${error_abs.toFixed(4)}`, 30, 25 + interlineado * 4);
}