import { useShareLink } from '../hooks/useShareLink'

export default function ShareButton({ materias }) {
  const { isReadOnly, copyLink, copied } = useShareLink(materias)

  if (isReadOnly) {
    return (
      <div className="share-readonly-badge">
        <span className="share-eye">👁</span>
        Solo lectura
      </div>
    )
  }

  return (
    <button
      className={`share-btn ${copied ? 'share-btn--copied' : ''}`}
      onClick={copyLink}
      title="Compartir estado académico"
    >
      {copied ? '✓ Link copiado' : '⤴ Compartir'}
    </button>
  )
}
