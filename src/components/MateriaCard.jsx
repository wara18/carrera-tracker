import { useState } from 'react'
import { ESTADOS } from '../utils/materias'

export default function MateriaCard({ materia, onUpdate, allMaterias }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    estado: materia.estado || 'falta_cursar',
    nota_cursada: materia.nota_cursada ?? '',
    nota_final: materia.nota_final ?? '',
  })

  const estado = ESTADOS[form.estado] || ESTADOS.falta_cursar

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

  const getNombreById = (id) => {
    const m = allMaterias.find(x => x.id === id)
    return m ? `${id}. ${m.nombre}` : `${id}`
  }

  return (
    <div className={`materia-card ${editing ? 'editing' : ''}`} style={{ '--estado-color': estado.color, '--estado-bg': estado.bg }}>
      <div className="card-header">
        <span className="materia-num">{materia.id}</span>
        <span className="materia-nombre">{materia.nombre}</span>
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
          {materia.correlativas_cursar.length > 0 && (
            <div className="correlativas">
              <span className="corr-label">Para cursar:</span>
              <span>{materia.correlativas_cursar.map(getNombreById).join(', ')}</span>
            </div>
          )}
          {materia.correlativas_rendir.length > 0 && (
            <div className="correlativas">
              <span className="corr-label">Para rendir:</span>
              <span>{materia.correlativas_rendir.map(getNombreById).join(', ')}</span>
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
