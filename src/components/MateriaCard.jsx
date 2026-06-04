import { useState } from 'react'
import { ESTADOS } from '../utils/materias'

const puedeUsarParaCursar = (m) => m && (m.estado === 'cursada' || m.estado === 'aprobada')
const puedeUsarParaRendir = (m) => m && m.estado === 'aprobada'

const toArray = (val) => {
  if (val === null || val === undefined || val === '') return []
  if (Array.isArray(val)) return val.map(Number).filter(Boolean)
  if (typeof val === 'number') return val > 0 ? [val] : []
  if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(Boolean)
  return []
}

function CorrelativaTag({ id, allMaterias, tipo }) {
  const m = allMaterias.find(x => x.id === id)
  const cumple = tipo === 'cursar' ? puedeUsarParaCursar(m) : puedeUsarParaRendir(m)
  return (
    <span className={`corr-tag ${cumple ? 'corr-ok' : 'corr-falta'}`} title={m?.nombre}>
      {cumple ? '✓' : '✗'} {id}. {m?.nombre ?? id}
    </span>
  )
}

export default function MateriaCard({
  materia,
  onUpdate,
  allMaterias,
  style,
  isHovered,
  isPrereq,
  isDependent,
  isDimmed,
  onHover,
}) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    estado: materia.estado || 'falta_cursar',
    nota_cursada: materia.nota_cursada ?? '',
    nota_final: materia.nota_final ?? '',
  })

  const estado = ESTADOS[form.estado] || ESTADOS.falta_cursar

  const corrCursar = toArray(materia.correlativas_cursar)
  const corrRendir = toArray(materia.correlativas_rendir)

  const puedeCursar = corrCursar.every(id => puedeUsarParaCursar(allMaterias.find(x => x.id === id)))
  const puedeRendir = corrRendir.every(id => puedeUsarParaRendir(allMaterias.find(x => x.id === id)))

  const faltanParaCursar = corrCursar.filter(id => !puedeUsarParaCursar(allMaterias.find(x => x.id === id)))
  const faltanParaRendir = corrRendir.filter(id => !puedeUsarParaRendir(allMaterias.find(x => x.id === id)))

  const showWarningCursar = (form.estado === 'cursada' || form.estado === 'aprobada' || form.estado === 'libre') && !puedeCursar
  const showWarningRendir = form.estado === 'aprobada' && !puedeRendir

  const handleSave = () => {
    onUpdate(materia.id, form)
    setEditing(false)
  }

  const handleCancel = () => {
    setForm({
      estado: materia.estado || 'falta_cursar',
      nota_cursada: materia.nota_cursada ?? '',
      nota_final: materia.nota_final ?? '',
    })
    setEditing(false)
  }

  // Build highlight class
  let highlightClass = ''
  if (isHovered) highlightClass = 'tree-hovered'
  else if (isPrereq) highlightClass = 'tree-prereq'
  else if (isDependent) highlightClass = 'tree-dependent'
  else if (isDimmed) highlightClass = 'tree-dimmed'

  return (
    <div
      className={`materia-card ${editing ? 'editing' : ''} ${highlightClass}`}
      style={{ '--estado-color': estado.color, '--estado-bg': estado.bg, ...style }}
      onMouseEnter={() => onHover(materia.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="card-header">
        <span className="materia-num">{materia.id}</span>
        <span className="materia-nombre">
          {materia.nombre}
          {isPrereq && <span className="tree-pill tree-pill-prereq">necesaria</span>}
          {isDependent && <span className="tree-pill tree-pill-dependent">se desbloquea</span>}
        </span>
        <div className="card-right">
          <span className="cuatri-badge">{materia.cuatrimestre}</span>
          <span className="estado-badge" style={{ color: estado.color, background: estado.bg }}>
            {estado.label}
          </span>
          <button className="edit-btn" onClick={() => setEditing(!editing)} title="Editar">
            {editing ? '✕' : '✎'}
          </button>
        </div>
      </div>

      {!editing && (materia.nota_cursada !== '' || materia.nota_final !== '') && (
        <div className="card-notas">
          {materia.nota_cursada !== '' && <span>Cursada: <strong>{materia.nota_cursada}</strong></span>}
          {materia.nota_final !== '' && <span>Final: <strong>{materia.nota_final}</strong></span>}
        </div>
      )}

      {editing && (
        <div className="card-edit">
          <div className="edit-row">
            <label>Estado</label>
            <select value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}>
              {Object.entries(ESTADOS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div className="edit-row">
            <label>Nota cursada</label>
            <input
              type="number" min="1" max="10" step="0.1"
              value={form.nota_cursada}
              onChange={e => setForm(f => ({ ...f, nota_cursada: e.target.value }))}
              placeholder="—"
            />
          </div>
          <div className="edit-row">
            <label>Nota final</label>
            <input
              type="number" min="1" max="10" step="0.1"
              value={form.nota_final}
              onChange={e => setForm(f => ({ ...f, nota_final: e.target.value }))}
              placeholder="—"
            />
          </div>

          {showWarningCursar && (
            <div className="corr-warning">
              ⚠ Falta regularizar para poder cursar:
              <div className="corr-tags">
                {faltanParaCursar.map(id => <CorrelativaTag key={id} id={id} allMaterias={allMaterias} tipo="cursar" />)}
              </div>
            </div>
          )}
          {showWarningRendir && (
            <div className="corr-warning">
              ⚠ Falta aprobar para poder rendir:
              <div className="corr-tags">
                {faltanParaRendir.map(id => <CorrelativaTag key={id} id={id} allMaterias={allMaterias} tipo="rendir" />)}
              </div>
            </div>
          )}

          {corrCursar.length > 0 && (
            <div className="corr-section">
              <span className="corr-label">Para cursar</span>
              <div className="corr-tags">
                {corrCursar.map(id => <CorrelativaTag key={id} id={id} allMaterias={allMaterias} tipo="cursar" />)}
              </div>
            </div>
          )}
          {corrRendir.length > 0 && (
            <div className="corr-section">
              <span className="corr-label">Para rendir</span>
              <div className="corr-tags">
                {corrRendir.map(id => <CorrelativaTag key={id} id={id} allMaterias={allMaterias} tipo="rendir" />)}
              </div>
            </div>
          )}

          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Guardar</button>
            <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
