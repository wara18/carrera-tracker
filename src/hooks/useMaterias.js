import { useState, useEffect, useCallback } from 'react'
import { MATERIAS_DEFAULT } from '../utils/materias'

const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL

// Solo tomar estado y notas de Sheets — el resto siempre del default local
const mergeWithRemote = (def, remote) => ({
  ...def,
  estado:       remote?.estado       || 'falta_cursar',
  nota_cursada: remote?.nota_cursada ?? '',
  nota_final:   remote?.nota_final   ?? '',
})

export function useMaterias() {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [lastSync, setLastSync] = useState(null)

  const fetchMaterias = useCallback(async () => {
    if (!SCRIPT_URL) {
      setMaterias(MATERIAS_DEFAULT.map(m => mergeWithRemote(m, null)))
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`${SCRIPT_URL}?action=getAll`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const merged = MATERIAS_DEFAULT.map(def => {
        const remote = data.find(d => Number(d.id) === def.id)
        return mergeWithRemote(def, remote)
      })
      setMaterias(merged)
      setLastSync(new Date())
    } catch (e) {
      setError(e.message)
      setMaterias(MATERIAS_DEFAULT.map(m => mergeWithRemote(m, null)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMaterias()
  }, [fetchMaterias])

  const updateMateria = useCallback(async (id, fields) => {
    setMaterias(prev =>
      prev.map(m => (m.id === id ? { ...m, ...fields } : m))
    )

    if (!SCRIPT_URL) return

    try {
      setSaving(true)
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'update', id, ...fields }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setLastSync(new Date())
    } catch (e) {
      setError(`Error al guardar: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }, [])

  const stats = {
    total: materias.length,
    aprobadas: materias.filter(m => m.estado === 'aprobada').length,
    cursadas:  materias.filter(m => m.estado === 'cursada').length,
    libres:    materias.filter(m => m.estado === 'libre').length,
    falta:     materias.filter(m => m.estado === 'falta_cursar').length,
    promedio: (() => {
      const notas = materias
        .filter(m => m.estado === 'aprobada' && m.nota_final !== '' && !isNaN(Number(m.nota_final)))
        .map(m => Number(m.nota_final))
      return notas.length ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : null
    })(),
  }

  return { materias, loading, saving, error, stats, updateMateria, refresh: fetchMaterias, lastSync }
}
