import { useState, useMemo } from 'react'
import { useMaterias } from './hooks/useMaterias'
import AnioSection from './components/AnioSection'
import StatsPanel from './components/StatsPanel'
import StudentProfile from './components/StudentProfile'
import { AÑOS, ESTADOS } from './utils/materias'
import './App.css'

const toArray = (val) => {
  if (val === null || val === undefined || val === '') return []
  if (Array.isArray(val)) return val.map(Number).filter(Boolean)
  if (typeof val === 'number') return val > 0 ? [val] : []
  if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(Boolean)
  return []
}

export default function App() {
  const { materias, loading, saving, error, stats, updateMateria, refresh, lastSync } = useMaterias()
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  // Compute which IDs to highlight green (dependents), red (prerequisites), and which to dim
  const { prereqs, dependents } = useMemo(() => {
    if (hoveredId === null) return { prereqs: new Set(), dependents: new Set() }

    const hovered = materias.find(m => m.id === hoveredId)
    if (!hovered) return { prereqs: new Set(), dependents: new Set() }

    // Prerequisites: what the hovered materia needs (correlativas_cursar + correlativas_rendir)
    const corrCursar = toArray(hovered.correlativas_cursar)
    const corrRendir = toArray(hovered.correlativas_rendir)
    const prereqSet = new Set([...corrCursar, ...corrRendir])

    // Dependents: materias that have hoveredId in their correlativas
    const dependentSet = new Set()
    for (const m of materias) {
      const mCursar = toArray(m.correlativas_cursar)
      const mRendir = toArray(m.correlativas_rendir)
      if (mCursar.includes(hoveredId) || mRendir.includes(hoveredId)) {
        dependentSet.add(m.id)
      }
    }

    return { prereqs: prereqSet, dependents: dependentSet }
  }, [hoveredId, materias])

  const materiasFiltradas = materias.filter(m => {
    const matchEstado = filtroEstado === 'todos' || m.estado === filtroEstado
    const matchBusqueda = m.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchBusqueda
  })

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title">
            <h1>Ingeniería en Sistemas</h1>
            <p className="header-sub">Plan de estudios · {materias.length} materias</p>
          </div>
          <div className="header-controls">
            <input
              className="search-input"
              type="text"
              placeholder="Buscar materia…"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
            <select
              className="filter-select"
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todas</option>
              {Object.entries(ESTADOS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          ⚠ {error} — mostrando datos locales.
        </div>
      )}

      {!import.meta.env.VITE_APPS_SCRIPT_URL && (
        <div className="warning-banner">
          ⚙ Sin URL de Apps Script configurada. Los cambios no se guardarán en Google Sheets. Configurá <code>VITE_APPS_SCRIPT_URL</code> en Vercel.
        </div>
      )}

      <main className="app-main">
        <div className="content-area">
          {loading ? (
            <div className="loading">Cargando materias…</div>
          ) : (
            AÑOS.map(anio => {
              const del_anio = materiasFiltradas.filter(m => m.anio === anio)
              if (!del_anio.length && (busqueda || filtroEstado !== 'todos')) return null
              const all_anio = materias.filter(m => m.anio === anio)
              return (
                <AnioSection
                  key={anio}
                  anio={anio}
                  materias={busqueda || filtroEstado !== 'todos' ? del_anio : all_anio}
                  onUpdate={updateMateria}
                  allMaterias={materias}
                  hoveredId={hoveredId}
                  prereqs={prereqs}
                  dependents={dependents}
                  onHover={setHoveredId}
                />
              )
            })
          )}
        </div>

        <aside className="sidebar">
          <StatsPanel
            stats={stats}
            lastSync={lastSync}
            saving={saving}
            onRefresh={refresh}
          />
        </aside>
      </main>

      <StudentProfile />
    </div>
  )
}
