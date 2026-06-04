# Carrera Tracker

Seguimiento de tu carrera universitaria sincronizado con Google Sheets.

---

## Setup en 4 pasos

### 1. Google Sheets + Apps Script

1. Creá un Google Sheet nuevo (nombre libre)
2. Abrí **Extensions > Apps Script**
3. Borrá el código que hay y pegá el contenido de `apps-script.js`
4. Guardá (Ctrl+S)
5. En el menú de Apps Script, ejecutá la función **`setupSheet`** una sola vez
   - Te va a pedir permisos → aceptá
   - Esto crea la hoja `Materias` con las 54 materias ya cargadas
6. Hacé deploy: **Deploy > New deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copiá la URL que te da (termina en `/exec`)

### 2. Configurar la URL en el proyecto

Creá un archivo `.env.local` en la raíz del proyecto:

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_ID/exec
```

### 3. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/carrera-tracker.git
git push -u origin main
```

### 4. Deploy en Vercel

1. Importá el repo desde [vercel.com](https://vercel.com)
2. En **Environment Variables** agregá:
   - Key: `VITE_APPS_SCRIPT_URL`
   - Value: la URL de Apps Script
3. Deploy ✅

---

## Uso

- **Clic en ✎** en cualquier materia para editar estado y notas
- **Estado**: Aprobada / Cursada / Libre / Falta cursar
- **Nota cursada** y **Nota final**: se guardan automáticamente en Sheets
- El **promedio** se calcula con las notas finales de materias aprobadas
- El **gráfico** muestra el progreso general

---

## Stack

- React + Vite
- Chart.js + react-chartjs-2
- Google Apps Script (API)
- Vercel (hosting)
