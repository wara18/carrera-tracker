import { useMemo } from 'react'

const toArray = (val) => {
  if (val === null || val === undefined || val === '') return []
  if (Array.isArray(val)) return val.map(Number).filter(Boolean)
  if (typeof val === 'number') return val > 0 ? [val] : []
  if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(Boolean)
  return []
}

const CUATRI_LABEL = { '1C': '1° Cuatri', '2C': '2° Cuatri', 'Anual': 'Anual' }
const ANIO_LABEL   = ['', '1°', '2°', '3°', '4°', '5°']

export default function ProximasMaterias({ materias }) {
  const disponibles = useMemo(() => {
    return materias.filter(m => {
      if (m.estado !== 'falta_cursar') return false
      const corr = toArray(m.correlativas_cursar)
      // Sin correlativas también cuenta (año 1 sin cursar aún)
      return corr.every(id => {
        const dep = materias.find(x => x.id === id)
        return dep && (dep.estado === 'cursada' || dep.estado === 'aprobada')
      })
    })
  }, [materias])

  // Group by anio
  const byAnio = useMemo(() => {
    const map = {}
    for (const m of disponibles) {
      if (!map[m.anio]) map[m.anio] = []
      map[m.anio].push(m)
    }
    return map
  }, [disponibles])

  return (
    <div className="proximas-panel">
      <div className="proximas-header">
        <span className="proximas-title">Disponibles para cursar</span>
        <span className="proximas-count">{disponibles.length}</span>
      </div>

      {disponibles.length === 0 ? (
        <div className="proximas-empty">
          No hay materias nuevas desbloqueadas aún.
        </div>
      ) : (
        <div className="proximas-body">
          {Object.entries(byAnio).map(([anio, mats]) => (
            <div key={anio} className="proximas-grupo">
              <span className="proximas-anio-label">{ANIO_LABEL[anio]} Año</span>
              {mats.map(m => (
                <div key={m.id} className="proxima-item">
                  <div className="proxima-item-left">
                    <span className="proxima-num">{m.id}</span>
                    <span className="proxima-nombre">{m.nombre}</span>
                  </div>
                  <span className="proxima-cuatri">{CUATRI_LABEL[m.cuatrimestre]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
