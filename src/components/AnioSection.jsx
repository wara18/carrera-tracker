import MateriaCard from './MateriaCard'
import { ESTADOS } from '../utils/materias'

const ORDINAL = ['', 'Primer', 'Segundo', 'Tercer', 'Cuarto', 'Quinto']

export default function AnioSection({ anio, materias, onUpdate, allMaterias }) {
  const aprobadas = materias.filter(m => m.estado === 'aprobada').length
  const total = materias.length

  return (
    <section className="anio-section">
      <div className="anio-header">
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
                {grupo.map(m => (
                  <MateriaCard
                    key={m.id}
                    materia={m}
                    onUpdate={onUpdate}
                    allMaterias={allMaterias}
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
