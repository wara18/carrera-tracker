import { useState } from 'react'
import MateriaCard from './MateriaCard'
import { ESTADOS } from '../utils/materias'

const ORDINAL = ['', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto']

export default function AnioSection({ anio, materias, onUpdate, allMaterias, hoveredId, prereqs, dependents, onHover, readOnly }) {
  const [collapsed, setCollapsed] = useState(true)

  const aprobadas = materias.filter(m => m.estado === 'aprobada').length
  const total = materias.length

  return (
    <section className={`anio-section${collapsed ? ' collapsed' : ''}`}>
      <div className="anio-header" onClick={() => setCollapsed(c => !c)}>
        <h2 className="anio-title">
          <span className="anio-num">{anio}°</span>
          <span className="anio-label">{ORDINAL[anio]} Año</span>
        </h2>
        <div className="anio-progress">
          <div className="anio-bar">
            <div
              className="anio-bar-fill"
              style={{ width: `${(aprobadas / total) * 100}%` }}
            />
          </div>
          <span className="anio-pct">{aprobadas}/{total}</span>
        </div>
        <span className="anio-toggle-icon">⌄</span>
      </div>

      <div className="cuatris">
        {['1C', '2C', 'Anual'].map(cuatri => {
          const grupo = materias.filter(m => m.cuatrimestre === cuatri)
          if (!grupo.length) return null
          return (
            <div key={cuatri} className="cuatri-grupo">
              <span className="cuatri-title">
                {cuatri === '1C' ? '1° Cuatrimestre' : cuatri === '2C' ? '2° Cuatrimestre' : 'Anual'}
              </span>
              <div className="cards-list">
                {grupo.map((m, i) => (
                  <MateriaCard
                    key={m.id}
                    materia={m}
                    onUpdate={onUpdate}
                    allMaterias={allMaterias}
                    style={{ '--i': i }}
                    hoveredId={hoveredId}
                    isHovered={hoveredId === m.id}
                    isPrereq={prereqs.has(m.id)}
                    isDependent={dependents.has(m.id)}
                    isDimmed={hoveredId !== null && hoveredId !== m.id && !prereqs.has(m.id) && !dependents.has(m.id)}
                    onHover={onHover}
                    readOnly={readOnly}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
