// ============================================================
//  CARRERA TRACKER — Apps Script Web App
//  Pegá este código en Extensions > Apps Script de tu Sheet
//  Luego: Deploy > New deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// ============================================================

const SHEET_NAME = 'Materias'

function doGet(e) {
  const action = e.parameter.action
  if (action === 'getAll') return getAll()
  return jsonResponse({ error: 'Acción no reconocida' })
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    if (body.action === 'update') return updateMateria(body)
    return jsonResponse({ error: 'Acción no reconocida' })
  } catch (err) {
    return jsonResponse({ error: err.message })
  }
}

function getAll() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
  const data = sheet.getDataRange().getValues()
  const headers = data[0]
  const rows = data.slice(1).map(row => {
    const obj = {}
    headers.forEach((h, i) => { obj[h] = row[i] })
    return obj
  })
  return jsonResponse(rows)
}

function updateMateria(body) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
  const data = sheet.getDataRange().getValues()
  const headers = data[0]

  const idCol = headers.indexOf('id')
  const estadoCol = headers.indexOf('estado')
  const notaCursadaCol = headers.indexOf('nota_cursada')
  const notaFinalCol = headers.indexOf('nota_final')

  for (let i = 1; i < data.length; i++) {
    if (Number(data[i][idCol]) === Number(body.id)) {
      if (body.estado !== undefined) sheet.getRange(i + 1, estadoCol + 1).setValue(body.estado)
      if (body.nota_cursada !== undefined) sheet.getRange(i + 1, notaCursadaCol + 1).setValue(body.nota_cursada)
      if (body.nota_final !== undefined) sheet.getRange(i + 1, notaFinalCol + 1).setValue(body.nota_final)
      return jsonResponse({ ok: true })
    }
  }
  return jsonResponse({ error: `Materia con id ${body.id} no encontrada` })
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
}

// ============================================================
//  Función de setup: ejecutala UNA VEZ para crear/poblar la hoja
// ============================================================
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)

  const headers = ['id', 'nombre', 'anio', 'cuatrimestre', 'estado', 'nota_cursada', 'nota_final', 'correlativas_cursar', 'correlativas_rendir']
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setFontWeight('bold')
    .setBackground('#f3f4f6')

  const materias = [
    [1,'Álgebra y Geometría Analítica I',1,'1C','falta_cursar','','','',''],
    [2,'Análisis Matemático I',1,'1C','falta_cursar','','','',''],
    [3,'Algoritmo y Estructura de Datos I',1,'1C','falta_cursar','','','',''],
    [4,'Informática I',1,'1C','falta_cursar','','','',''],
    [5,'Álgebra y Geometría Analítica II',1,'2C','falta_cursar','','','1','1'],
    [6,'Análisis Matemático II',1,'2C','falta_cursar','','','2','2'],
    [7,'Algoritmo y Estructura de Datos II',1,'2C','falta_cursar','','','3','3'],
    [8,'Física I',1,'2C','falta_cursar','','','1','1,2'],
    [9,'Informática II',1,'2C','falta_cursar','','','4','4'],
    [10,'Programación I',2,'1C','falta_cursar','','','7','7,9'],
    [11,'Análisis Matemático III',2,'1C','falta_cursar','','','5,6','5,6'],
    [12,'Física II',2,'1C','falta_cursar','','','8','8'],
    [13,'Sistemas de Información I',2,'1C','falta_cursar','','','9','9'],
    [14,'Computación I',2,'1C','falta_cursar','','','7,9','7,9'],
    [15,'Inglés I',2,'1C','falta_cursar','','','',''],
    [16,'Programación II',2,'2C','falta_cursar','','','10','10'],
    [17,'Probabilidad y Estadística',2,'2C','falta_cursar','','','11','11'],
    [18,'Sistemas de Información II',2,'2C','falta_cursar','','','13','13'],
    [19,'Inglés II',2,'2C','falta_cursar','','','15','15'],
    [20,'Análisis Matemático IV',2,'2C','falta_cursar','','','11','11'],
    [21,'Computación II',2,'2C','falta_cursar','','','14','14'],
    [22,'Programación III',3,'1C','falta_cursar','','','16','16'],
    [23,'Liderazgo, Negociación y Trabajo en Equipo',3,'1C','falta_cursar','','','15','19'],
    [24,'Arquitectura Avanzada de Hardware I',3,'1C','falta_cursar','','','12,21','12,21'],
    [25,'Base de Datos I',3,'1C','falta_cursar','','','18,21','18,21'],
    [26,'Análisis y Producción de Textos para la Comunicación',3,'1C','falta_cursar','','','19','19'],
    [27,'Cálculo Numérico',3,'1C','falta_cursar','','','17,21','17,20'],
    [28,'Organización y Gestión Empresarial',3,'1C','falta_cursar','','','18','18'],
    [29,'Programación IV',3,'2C','falta_cursar','','','22','22'],
    [30,'Proyectos de Sistemas y Gerenciamiento',3,'2C','falta_cursar','','','23,26','23,26'],
    [31,'Base de Datos II',3,'2C','falta_cursar','','','25','25'],
    [32,'Arquitectura Avanzada de Hardware II',3,'2C','falta_cursar','','','24','24'],
    [33,'Redes de Datos I',3,'2C','falta_cursar','','','27','27'],
    [34,'Programación V',4,'1C','falta_cursar','','','29','29'],
    [35,'Inteligencia Artificial',4,'1C','falta_cursar','','','30','30'],
    [36,'Seminario de Actualización Tecnológica',4,'1C','falta_cursar','','','31','31'],
    [37,'Seguridad Informática',4,'1C','falta_cursar','','','30,32','30,32'],
    [38,'Ingeniería de Software I',4,'1C','falta_cursar','','','32','32'],
    [39,'Redes de Datos II',4,'1C','falta_cursar','','','33','33'],
    [40,'Programación VI',4,'2C','falta_cursar','','','34','34'],
    [41,'Economía y Evaluación de Proyectos',4,'2C','falta_cursar','','','35','35'],
    [42,'Seminario de Innovación y Prototipado',4,'2C','falta_cursar','','','36,37','36,37'],
    [43,'Proyectos y Desarrollos Telemáticos',4,'2C','falta_cursar','','','39','39'],
    [44,'Sistemas Operativos Avanzados',4,'2C','falta_cursar','','','39','39'],
    [45,'Investigación Operativa',4,'2C','falta_cursar','','','35','35'],
    [46,'Ingeniería de Software II',4,'2C','falta_cursar','','','38','38'],
    [47,'Modelos y Simulación de Sistemas',5,'1C','falta_cursar','','','45','45'],
    [48,'Calidad de Software',5,'1C','falta_cursar','','','44,46','44,46'],
    [49,'Legislación y Ética Profesional',5,'1C','falta_cursar','','','41,42','41,42'],
    [50,'Auditoría y Peritaje de Sistemas Informáticos',5,'1C','falta_cursar','','','40,46','40,46'],
    [51,'Reingeniería de Procesos',5,'2C','falta_cursar','','','46','46'],
    [52,'Servicios Web',5,'2C','falta_cursar','','','45','45'],
    [53,'Práctica Profesional Supervisada',5,'Anual','falta_cursar','','','40,41,42,43,44,45,46','47,48,49,50,51,52'],
    [54,'Trabajo Final Integrador',5,'Anual','falta_cursar','','','40,41,42,43,44,45,46','53'],
  ]

  sheet.getRange(2, 1, materias.length, headers.length).setValues(materias)
  sheet.setFrozenRows(1)
  sheet.autoResizeColumns(1, headers.length)

  SpreadsheetApp.getUi().alert('✅ Hoja "Materias" creada y poblada correctamente.')
}
