export const MATERIAS_DEFAULT = [
  // ── AÑO 1 ──────────────────────────────────────────────────────────────
  { id: 1,  nombre: "Álgebra y Geometría Analítica I",         anio: 1, cuatrimestre: "1C",    correlativas_cursar: [],             correlativas_rendir: [] },
  { id: 2,  nombre: "Análisis Matemático I",                   anio: 1, cuatrimestre: "1C",    correlativas_cursar: [],             correlativas_rendir: [] },
  { id: 3,  nombre: "Algoritmo y Estructura de Datos I",       anio: 1, cuatrimestre: "1C",    correlativas_cursar: [],             correlativas_rendir: [] },
  { id: 4,  nombre: "Informática I",                           anio: 1, cuatrimestre: "1C",    correlativas_cursar: [],             correlativas_rendir: [] },
  { id: 5,  nombre: "Álgebra y Geometría Analítica II",        anio: 1, cuatrimestre: "2C",    correlativas_cursar: [1],            correlativas_rendir: [1] },
  { id: 6,  nombre: "Análisis Matemático II",                  anio: 1, cuatrimestre: "2C",    correlativas_cursar: [2],            correlativas_rendir: [2] },
  { id: 7,  nombre: "Algoritmo y Estructura de Datos II",      anio: 1, cuatrimestre: "2C",    correlativas_cursar: [3],            correlativas_rendir: [3] },
  { id: 8,  nombre: "Física I",                                anio: 1, cuatrimestre: "2C",    correlativas_cursar: [1],            correlativas_rendir: [1, 2] },
  { id: 9,  nombre: "Informática II",                          anio: 1, cuatrimestre: "2C",    correlativas_cursar: [4],            correlativas_rendir: [4] },

  // ── AÑO 2 ──────────────────────────────────────────────────────────────
  { id: 10, nombre: "Programación I",                          anio: 2, cuatrimestre: "1C",    correlativas_cursar: [7],            correlativas_rendir: [7, 9] },
  { id: 11, nombre: "Análisis Matemático III",                 anio: 2, cuatrimestre: "1C",    correlativas_cursar: [5, 6],         correlativas_rendir: [5, 6] },
  { id: 12, nombre: "Física II",                               anio: 2, cuatrimestre: "1C",    correlativas_cursar: [8],            correlativas_rendir: [8] },
  { id: 13, nombre: "Sistemas de Información I",               anio: 2, cuatrimestre: "1C",    correlativas_cursar: [9],            correlativas_rendir: [9] },
  { id: 14, nombre: "Computación I",                           anio: 2, cuatrimestre: "1C",    correlativas_cursar: [7, 9],         correlativas_rendir: [7, 9] },
  { id: 15, nombre: "Inglés I",                                anio: 2, cuatrimestre: "1C",    correlativas_cursar: [],             correlativas_rendir: [] },
  { id: 16, nombre: "Programación II",                         anio: 2, cuatrimestre: "2C",    correlativas_cursar: [10],           correlativas_rendir: [10] },
  { id: 17, nombre: "Probabilidad y Estadística",              anio: 2, cuatrimestre: "2C",    correlativas_cursar: [11],           correlativas_rendir: [11] },
  { id: 18, nombre: "Sistemas de Información II",              anio: 2, cuatrimestre: "2C",    correlativas_cursar: [13],           correlativas_rendir: [13] },
  { id: 19, nombre: "Inglés II",                               anio: 2, cuatrimestre: "2C",    correlativas_cursar: [15],           correlativas_rendir: [15] },
  { id: 20, nombre: "Análisis Matemático IV",                  anio: 2, cuatrimestre: "2C",    correlativas_cursar: [11],           correlativas_rendir: [11] },
  { id: 21, nombre: "Computación II",                          anio: 2, cuatrimestre: "2C",    correlativas_cursar: [14],           correlativas_rendir: [14] },

  // ── AÑO 3 ──────────────────────────────────────────────────────────────
  { id: 22, nombre: "Programación III",                        anio: 3, cuatrimestre: "1C",    correlativas_cursar: [16],           correlativas_rendir: [16] },
  { id: 23, nombre: "Liderazgo, Negociación y Trabajo en Equipo", anio: 3, cuatrimestre: "1C", correlativas_cursar: [15],           correlativas_rendir: [19] },
  { id: 24, nombre: "Arquitectura Avanzada de Hardware I",     anio: 3, cuatrimestre: "1C",    correlativas_cursar: [12, 21],       correlativas_rendir: [12, 21] },
  { id: 25, nombre: "Base de Datos I",                         anio: 3, cuatrimestre: "1C",    correlativas_cursar: [18, 21],       correlativas_rendir: [18, 21] },
  { id: 26, nombre: "Análisis y Producción de Textos para la Comunicación", anio: 3, cuatrimestre: "1C", correlativas_cursar: [19], correlativas_rendir: [19] },
  { id: 27, nombre: "Cálculo Numérico",                        anio: 3, cuatrimestre: "1C",    correlativas_cursar: [17, 21],       correlativas_rendir: [17, 20] },
  { id: 28, nombre: "Organización y Gestión Empresarial",      anio: 3, cuatrimestre: "1C",    correlativas_cursar: [18],           correlativas_rendir: [18] },
  { id: 29, nombre: "Programación IV",                         anio: 3, cuatrimestre: "2C",    correlativas_cursar: [22],           correlativas_rendir: [22] },
  { id: 30, nombre: "Proyectos de Sistemas y Gerenciamiento",  anio: 3, cuatrimestre: "2C",    correlativas_cursar: [23, 26],       correlativas_rendir: [23, 26] },
  { id: 31, nombre: "Base de Datos II",                        anio: 3, cuatrimestre: "2C",    correlativas_cursar: [25],           correlativas_rendir: [25] },
  { id: 32, nombre: "Arquitectura Avanzada de Hardware II",    anio: 3, cuatrimestre: "2C",    correlativas_cursar: [24],           correlativas_rendir: [24] },
  { id: 33, nombre: "Redes de Datos I",                        anio: 3, cuatrimestre: "2C",    correlativas_cursar: [27],           correlativas_rendir: [27] },

  // ── AÑO 4 ──────────────────────────────────────────────────────────────
  { id: 34, nombre: "Programación V",                          anio: 4, cuatrimestre: "1C",    correlativas_cursar: [29],           correlativas_rendir: [29] },
  { id: 35, nombre: "Inteligencia Artificial",                 anio: 4, cuatrimestre: "1C",    correlativas_cursar: [30],           correlativas_rendir: [30] },
  { id: 36, nombre: "Seminario de Actualización Tecnológica",  anio: 4, cuatrimestre: "1C",    correlativas_cursar: [31],           correlativas_rendir: [31] },
  { id: 37, nombre: "Seguridad Informática",                   anio: 4, cuatrimestre: "1C",    correlativas_cursar: [30, 32],       correlativas_rendir: [30, 32] },
  { id: 38, nombre: "Ingeniería de Software I",                anio: 4, cuatrimestre: "1C",    correlativas_cursar: [32],           correlativas_rendir: [32] },
  { id: 39, nombre: "Redes de Datos II",                       anio: 4, cuatrimestre: "1C",    correlativas_cursar: [33],           correlativas_rendir: [33] },
  { id: 40, nombre: "Programación VI",                         anio: 4, cuatrimestre: "2C",    correlativas_cursar: [34],           correlativas_rendir: [34] },
  { id: 41, nombre: "Economía y Evaluación de Proyectos",      anio: 4, cuatrimestre: "2C",    correlativas_cursar: [35],           correlativas_rendir: [35] },
  { id: 42, nombre: "Seminario de Innovación y Prototipado",   anio: 4, cuatrimestre: "2C",    correlativas_cursar: [36, 37],       correlativas_rendir: [36, 37] },
  { id: 43, nombre: "Proyectos y Desarrollos Telemáticos",     anio: 4, cuatrimestre: "2C",    correlativas_cursar: [39],           correlativas_rendir: [39] },
  { id: 44, nombre: "Sistemas Operativos Avanzados",           anio: 4, cuatrimestre: "2C",    correlativas_cursar: [39],           correlativas_rendir: [39] },
  { id: 45, nombre: "Investigación Operativa",                 anio: 4, cuatrimestre: "2C",    correlativas_cursar: [35],           correlativas_rendir: [35] },
  { id: 46, nombre: "Ingeniería de Software II",               anio: 4, cuatrimestre: "2C",    correlativas_cursar: [38],           correlativas_rendir: [38] },

  // ── AÑO 5 ──────────────────────────────────────────────────────────────
  { id: 47, nombre: "Modelos y Simulación de Sistemas",        anio: 5, cuatrimestre: "1C",    correlativas_cursar: [45],           correlativas_rendir: [45] },
  { id: 48, nombre: "Calidad de Software",                     anio: 5, cuatrimestre: "1C",    correlativas_cursar: [44, 46],       correlativas_rendir: [44, 46] },
  { id: 49, nombre: "Legislación y Ética Profesional",         anio: 5, cuatrimestre: "1C",    correlativas_cursar: [41, 42],       correlativas_rendir: [41, 42] },
  { id: 50, nombre: "Auditoría y Peritaje de Sistemas Informáticos", anio: 5, cuatrimestre: "1C", correlativas_cursar: [40, 46],    correlativas_rendir: [40, 46] },
  { id: 51, nombre: "Reingeniería de Procesos",                anio: 5, cuatrimestre: "2C",    correlativas_cursar: [46],           correlativas_rendir: [46] },
  { id: 52, nombre: "Servicios Web",                           anio: 5, cuatrimestre: "2C",    correlativas_cursar: [45],           correlativas_rendir: [45] },
  { id: 53, nombre: "Práctica Profesional Supervisada",        anio: 5, cuatrimestre: "Anual", correlativas_cursar: [40,41,42,43,44,45,46], correlativas_rendir: [47,48,49,50,51,52] },
  { id: 54, nombre: "Trabajo Final Integrador",                anio: 5, cuatrimestre: "Anual", correlativas_cursar: [40,41,42,43,44,45,46], correlativas_rendir: [53] },
]

export const ESTADOS = {
  aprobada:     { label: "Aprobada",       color: "var(--aprobada)",    bg: "var(--aprobada-bg)" },
  cursada:      { label: "Cursada",        color: "var(--cursada)",     bg: "var(--cursada-bg)" },
  libre:        { label: "Libre",          color: "var(--libre)",       bg: "var(--libre-bg)" },
  falta_cursar: { label: "Falta cursar",   color: "var(--falta)",       bg: "var(--falta-bg)" },
}

export const AÑOS = [1, 2, 3, 4, 5]
