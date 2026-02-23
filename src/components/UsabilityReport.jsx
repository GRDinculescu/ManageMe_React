import { useEffect, useMemo, useState } from "react";

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatMinuteLabel(minuteTimestamp) {
  const date = new Date(minuteTimestamp);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getMinuteTimestamp(dateLike) {
  const date = new Date(dateLike);
  date.setSeconds(0, 0);
  return date.getTime();
}

function LineChart({ points }) {
  const width = 640;
  const height = 220;
  const padding = 28;

  const maxY = Math.max(1, ...points.map((point) => point.count));
  const stepX =
    points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  const polylinePoints = points
    .map((point, index) => {
      const x = padding + index * stepX;
      const y =
        height -
        padding -
        (point.count / maxY) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-xl bg-slate-900 p-3">
      <h3 className="text-sm font-semibold text-sky-300 mb-2">
        Clicks por minuto (ultimos 30 min)
      </h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#334155"
          strokeWidth="1"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          stroke="#334155"
          strokeWidth="1"
        />
        <polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={polylinePoints}
        />
      </svg>
      <p className="text-xs text-gray-400 mt-1">
        Eje X: tiempo (minuto a minuto). Eje Y: numero de clicks.
      </p>
    </div>
  );
}

function PieChart({ recentCount, previousCount }) {
  const total = recentCount + previousCount;
  const recentPercentage = total === 0 ? 0 : (recentCount / total) * 100;

  return (
    <div className="rounded-xl bg-slate-900 p-3">
      <h3 className="text-sm font-semibold text-sky-300 mb-2">
        Grafico de sectores
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <div
          className="w-36 h-36 rounded-full border border-slate-700"
          style={{
            background: `conic-gradient(#38bdf8 0% ${recentPercentage}%, #22c55e ${recentPercentage}% 100%)`,
          }}
        />
        <div className="text-sm">
          <p>
            <span className="inline-block w-3 h-3 rounded-sm bg-sky-400 mr-2" />
            Ultima hora: <strong>{recentCount}</strong>
          </p>
          <p className="mt-2">
            <span className="inline-block w-3 h-3 rounded-sm bg-green-500 mr-2" />
            Horas anteriores: <strong>{previousCount}</strong>
          </p>
          <p className="mt-3 text-gray-400">
            Ultima hora = {recentPercentage.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UsabilityReport({ clickEvents }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  const minuteRows = useMemo(() => {
    const map = new Map();

    for (const clickAt of clickEvents) {
      const minuteTimestamp = getMinuteTimestamp(clickAt);
      map.set(minuteTimestamp, (map.get(minuteTimestamp) || 0) + 1);
    }

    return [...map.entries()]
      .map(([minuteTimestamp, count]) => ({
        minuteTimestamp,
        label: formatMinuteLabel(minuteTimestamp),
        count,
      }))
      .sort((a, b) => b.minuteTimestamp - a.minuteTimestamp);
  }, [clickEvents]);

  const totalClicks = clickEvents.length;
  const activeMinutes = minuteRows.length;
  const averagePerActiveMinute =
    activeMinutes === 0 ? 0 : totalClicks / activeMinutes;
  const maxPerMinute =
    minuteRows.length > 0 ? Math.max(...minuteRows.map((row) => row.count)) : 0;

  const currentMinuteCount = useMemo(() => {
    const currentMinute = getMinuteTimestamp(now);
    const row = minuteRows.find((item) => item.minuteTimestamp === currentMinute);
    return row ? row.count : 0;
  }, [minuteRows, now]);

  const recentHourCount = useMemo(() => {
    return clickEvents.filter((clickAt) => now - new Date(clickAt).getTime() <= 60 * 60 * 1000).length;
  }, [clickEvents, now]);
  const previousHoursCount = totalClicks - recentHourCount;

  const linePoints = useMemo(() => {
    const minuteMap = new Map(
      minuteRows.map((row) => [row.minuteTimestamp, row.count])
    );
    const currentMinute = getMinuteTimestamp(now);
    const points = [];

    for (let i = 29; i >= 0; i -= 1) {
      const minuteTimestamp = currentMinute - i * 60 * 1000;
      points.push({
        minuteTimestamp,
        count: minuteMap.get(minuteTimestamp) || 0,
      });
    }

    return points;
  }, [minuteRows, now]);

  return (
    <section className="bg-gray-800 rounded-2xl mx-5 p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Informe de usabilidad (clicks)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-sm text-gray-400">Total clicks</p>
          <p className="text-2xl font-bold">{totalClicks}</p>
        </div>
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-sm text-gray-400">Clicks en minuto actual</p>
          <p className="text-2xl font-bold">{currentMinuteCount}</p>
        </div>
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-sm text-gray-400">Maximo clicks por minuto</p>
          <p className="text-2xl font-bold">{maxPerMinute}</p>
        </div>
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-sm text-gray-400">Media por minuto activo</p>
          <p className="text-2xl font-bold">{averagePerActiveMinute.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <PieChart recentCount={recentHourCount} previousCount={previousHoursCount} />
        <LineChart points={linePoints} />
      </div>

      <div className="rounded-xl bg-slate-900 p-3 overflow-auto max-h-64">
        <h3 className="text-sm font-semibold text-sky-300 mb-2">
          Tabla de clicks por minuto
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-300 border-b border-slate-700">
              <th className="py-2 pr-2">Fecha y hora (minuto)</th>
              <th className="py-2">Numero de clicks</th>
            </tr>
          </thead>
          <tbody>
            {minuteRows.length > 0 ? (
              minuteRows.map((row) => (
                <tr key={row.minuteTimestamp} className="border-b border-slate-800">
                  <td className="py-2 pr-2">{row.label}</td>
                  <td className="py-2">{row.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 text-gray-400" colSpan={2}>
                  Aun no hay clicks registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
