import { useState, useRef } from 'react'

const DEFAULT_NAME = 'Tu nombre'

export default function StudentProfile() {
  const [name, setName] = useState(() => localStorage.getItem('student_name') || '')
  const [photo, setPhoto] = useState(() => localStorage.getItem('student_photo') || null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const [expanded, setExpanded] = useState(false)
  const fileRef = useRef()

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setPhoto(dataUrl)
      localStorage.setItem('student_photo', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveName = () => {
    const trimmed = draft.trim()
    setName(trimmed)
    localStorage.setItem('student_name', trimmed)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveName()
    if (e.key === 'Escape') { setEditing(false); setDraft(name) }
  }

  const displayName = name || DEFAULT_NAME

  return (
    <div className={`student-float ${expanded ? 'student-float--expanded' : ''}`}>
      {/* Collapsed: just the avatar bubble */}
      {!expanded && (
        <button
          className="student-avatar-btn"
          onClick={() => setExpanded(true)}
          title={displayName}
        >
          {photo
            ? <img src={photo} alt={displayName} className="student-avatar-img" />
            : <span className="student-avatar-initials">{getInitials(displayName)}</span>
          }
          <span className="student-online-dot" />
        </button>
      )}

      {/* Expanded panel */}
      {expanded && (
        <div className="student-panel">
          <button className="student-close-btn" onClick={() => setExpanded(false)} title="Cerrar">✕</button>

          {/* Photo area */}
          <div className="student-photo-area">
            <div className="student-avatar-lg" onClick={() => fileRef.current.click()} title="Cambiar foto">
              {photo
                ? <img src={photo} alt={displayName} className="student-avatar-img" />
                : <span className="student-avatar-initials student-avatar-initials--lg">{getInitials(displayName)}</span>
              }
              <div className="student-photo-overlay">
                <span>📷</span>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
          </div>

          {/* Name */}
          <div className="student-name-area">
            {editing ? (
              <div className="student-name-edit">
                <input
                  autoFocus
                  className="student-name-input"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu nombre completo"
                  maxLength={48}
                />
                <div className="student-name-actions">
                  <button className="student-btn-save" onClick={handleSaveName}>Guardar</button>
                  <button className="student-btn-cancel" onClick={() => { setEditing(false); setDraft(name) }}>✕</button>
                </div>
              </div>
            ) : (
              <button className="student-name-display" onClick={() => { setDraft(name); setEditing(true) }} title="Editar nombre">
                <span className="student-name-text">{displayName}</span>
                <span className="student-name-edit-icon">✎</span>
              </button>
            )}
            <p className="student-career">Ingeniería en Sistemas</p>
          </div>
        </div>
      )}
    </div>
  )
}

function getInitials(str) {
  return str
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
    || '?'
}
