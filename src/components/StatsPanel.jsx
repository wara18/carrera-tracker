import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function StatsPanel({ stats, lastSync, saving, onRefresh }) {
  const chartData = {
    labels: ['Aprobadas', 'Cursadas', 'Libre', 'Falta cursar'],
    datasets: [{
      data: [stats.aprobadas, stats.cursadas, stats.libres, stats.falta],
      backgroundColor: ['#d8f3dc', '#dbeafe', '#fef3c7', '#f3f4f6'],
      borderColor: ['#2d6a4f', '#1d5fa6', '#b45309', '#9ca3af'],
      borderWidth: 2,
      hoverOffset: 4,
    }],
  }

  const chartOptions = {
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} (${Math.round(ctx.raw / stats.total * 100)}%)`,
        },
      },
    },
  }

  const pct = Math.round((stats.aprobadas / stats.total) * 100)

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <h2 className="stats-title">Progreso</h2>
        <div className="stats-actions">
          {saving && <span className="sync-badge saving">Guardando…</span>}
          {lastSync && !saving && (
            <span className="sync-badge">
              Sync {lastSync.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button className="refresh-btn" onClick={onRefresh} title="Recargar desde Sheets">↻</button>
        </div>
      </div>

      <div className="stats-body">
        <div className="chart-wrapper">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="chart-center">
            <span className="pct-num">{pct}%</span>
            <span className="pct-label">completado</span>
          </div>
        </div>

        <div className="stats-grid">
          <StatItem color="var(--aprobada)" bg="var(--aprobada-bg)" label="Aprobadas" value={stats.aprobadas} total={stats.total} />
          <StatItem color="var(--cursada)"  bg="var(--cursada-bg)"  label="Cursadas"  value={stats.cursadas}  total={stats.total} />
          <StatItem color="var(--libre)"    bg="var(--libre-bg)"    label="Libre"     value={stats.libres}    total={stats.total} />
          <StatItem color="var(--falta)"    bg="var(--falta-bg)"    label="Falta"     value={stats.falta}     total={stats.total} />
        </div>

        {stats.promedio && (
          <div className="promedio">
            <span className="promedio-label">Promedio general</span>
            <span className="promedio-value">{stats.promedio}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function StatItem({ color, bg, label, value, total }) {
  return (
    <div className="stat-item" style={{ '--c': color, '--bg': bg }}>
      <span className="stat-dot" style={{ background: color }} />
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-pct">{Math.round(value / total * 100)}%</span>
    </div>
  )
}
