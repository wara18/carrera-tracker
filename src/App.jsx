import { useState, useMemo } from 'react'
import { useMaterias } from './hooks/useMaterias'
import { useShareLink, decodeMaterias } from './hooks/useShareLink'
import AnioSection from './components/AnioSection'
import StatsPanel from './components/StatsPanel'
import StudentProfile from './components/StudentProfile'
import ProximasMaterias from './components/ProximasMaterias'
import ShareButton from './components/ShareButton'
import { AÑOS, ESTADOS, MATERIAS_DEFAULT } from './utils/materias'
import './App.css'

const toArray = (val) => {
  if (val === null || val === undefined || val === '') return []
  if (Array.isArray(val)) return val.map(Number).filter(Boolean)
  if (typeof val === 'number') return val > 0 ? [val] : []
  if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(Boolean)
  return []
}

// Si hay ?share= en la URL, reconstruir materias desde el hash
function buildSharedMaterias() {
  const params = new URLSearchParams(window.location.search)
  const shareParam = params.get('share')
  if (!shareParam) return null
  const slim = decodeMaterias(shareParam)
  if (!slim) return null
  return MATERIAS_DEFAULT.map(def => {
    const s = slim.find(x => x.i === def.id)
    if (!s) return { ...def, estado: 'falta_cursar', nota_cursada: '', nota_final: '' }
    return {
      ...def,
      estado:       s.e || 'falta_cursar',
      nota_cursada: s.c ?? '',
      nota_final:   s.f ?? '',
    }
  })
}

export default function App() {
  const { materias: materiasLive, loading, saving, error, stats, updateMateria, refresh, lastSync } = useMaterias()
  const { isReadOnly, copyLink, copied } = useShareLink(materiasLive)

  // En modo lectura usamos los datos del hash, no los del hook
  const sharedMaterias = useMemo(() => buildSharedMaterias(), [])
  const materias = isReadOnly ? (sharedMaterias || materiasLive) : materiasLive

  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  const { prereqs, dependents } = useMemo(() => {
    if (hoveredId === null) return { prereqs: new Set(), dependents: new Set() }
    const hovered = materias.find(m => m.id === hoveredId)
    if (!hovered) return { prereqs: new Set(), dependents: new Set() }
    const corrCursar = toArray(hovered.correlativas_cursar)
    const corrRendir = toArray(hovered.correlativas_rendir)
    const prereqSet = new Set([...corrCursar, ...corrRendir])
    const dependentSet = new Set()
    for (const m of materias) {
      const mCursar = toArray(m.correlativas_cursar)
      const mRendir = toArray(m.correlativas_rendir)
      if (mCursar.includes(hoveredId) || mRendir.includes(hoveredId)) dependentSet.add(m.id)
    }
    return { prereqs: prereqSet, dependents: dependentSet }
  }, [hoveredId, materias])

  const materiasFiltradas = materias.filter(m => {
    const matchEstado = filtroEstado === 'todos' || m.estado === filtroEstado
    const matchBusqueda = m.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchBusqueda
  })

  // Stats para modo lectura (recalcular desde sharedMaterias)
  const sharedStats = useMemo(() => {
    if (!isReadOnly) return stats
    const notas = materias
      .filter(m => m.estado === 'aprobada' && m.nota_final !== '' && !isNaN(Number(m.nota_final)))
      .map(m => Number(m.nota_final))
    return {
      total:     materias.length,
      aprobadas: materias.filter(m => m.estado === 'aprobada').length,
      cursadas:  materias.filter(m => m.estado === 'cursada').length,
      libres:    materias.filter(m => m.estado === 'libre').length,
      falta:     materias.filter(m => m.estado === 'falta_cursar').length,
      promedio:  notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : null,
    }
  }, [isReadOnly, materias, stats])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title">
            <h1>Ingeniería en Sistemas</h1>
            <p className="header-sub">Plan de estudios · {materias.length} materias</p>
          </div>
          <div className="header-controls">
            {!isReadOnly && (
              <>
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
              </>
            )}
            <ShareButton materias={materiasLive} />
          </div>
        </div>
      </header>

      {isReadOnly && (
        <div className="readonly-banner">
          👁 Estás viendo el estado académico en modo solo lectura.
        </div>
      )}

      {error && !isReadOnly && (
        <div className="error-banner">
          ⚠ {error} — mostrando datos locales.
        </div>
      )}

      {!import.meta.env.VITE_APPS_SCRIPT_URL && !isReadOnly && (
        <div className="warning-banner">
          ⚙ Sin URL de Apps Script configurada. Los cambios no se guardarán en Google Sheets. Configurá <code>VITE_APPS_SCRIPT_URL</code> en Vercel.
        </div>
      )}

      <main className="app-main">
        <div className="content-area">
          {loading && !isReadOnly ? (
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
                  onUpdate={isReadOnly ? () => {} : updateMateria}
                  allMaterias={materias}
                  hoveredId={hoveredId}
                  prereqs={prereqs}
                  dependents={dependents}
                  onHover={setHoveredId}
                  readOnly={isReadOnly}
                />
              )
            })
          )}
        </div>

        <aside className="sidebar">
          <StatsPanel
            stats={sharedStats}
            lastSync={isReadOnly ? null : lastSync}
            saving={isReadOnly ? false : saving}
            onRefresh={isReadOnly ? null : refresh}
          />
          <ProximasMaterias materias={materias} />
        </aside>
      </main>

      {!isReadOnly && <StudentProfile />}
    </div>
  )
}
