import { useEffect, useState, useCallback } from 'react'

// Encode: solo guardamos los campos variables, no la estructura completa
export function encodeMaterias(materias) {
  const slim = materias.map(m => ({
    i: m.id,
    e: m.estado,
    c: m.nota_cursada === '' ? null : m.nota_cursada,
    f: m.nota_final   === '' ? null : m.nota_final,
  }))
  return btoa(unescape(encodeURIComponent(JSON.stringify(slim))))
}

export function decodeMaterias(hash) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(hash))))
  } catch {
    return null
  }
}

// Devuelve { isReadOnly, shareUrl, copyLink }
export function useShareLink(materias) {
  const [copied, setCopied] = useState(false)

  // ¿Estamos en modo lectura? (hay ?share= en la URL)
  const params = new URLSearchParams(window.location.search)
  const shareParam = params.get('share')
  const isReadOnly = Boolean(shareParam)

  // Decodificar si es modo lectura
  const sharedData = isReadOnly ? decodeMaterias(shareParam) : null

  const getShareUrl = useCallback(() => {
    if (!materias.length) return ''
    const encoded = encodeMaterias(materias)
    const url = new URL(window.location.href)
    url.search = `?share=${encoded}`
    url.hash = ''
    return url.toString()
  }, [materias])

  const copyLink = useCallback(async () => {
    const url = getShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      prompt('Copiá este link:', url)
    }
  }, [getShareUrl])

  return { isReadOnly, sharedData, copyLink, copied }
}
