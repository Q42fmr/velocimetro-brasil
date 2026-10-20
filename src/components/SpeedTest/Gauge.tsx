import { GAUGE_STOPS, valueToFraction } from "@/lib/speedtest/gauge";
import styles from "./Gauge.module.css";

const CX = 150;
const CY = 140;
const R = 110;
const SWEEP = 240; // graus
const START = -SWEEP / 2;

function point(angleDeg: number, radius: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(a), CY - radius * Math.cos(a)];
}

const [sx, sy] = point(START, R);
const [ex, ey] = point(START + SWEEP, R);
const ARC = `M ${sx} ${sy} A ${R} ${R} 0 1 1 ${ex} ${ey}`;

const TICKS = GAUGE_STOPS.map((stop, i) => {
  const angle = START + (SWEEP * i) / (GAUGE_STOPS.length - 1);
  const [x1, y1] = point(angle, R - 10);
  const [x2, y2] = point(angle, R + 2);
  const [lx, ly] = point(angle, R + 22);
  return { stop, x1, y1, x2, y2, lx, ly };
});

interface Props {
  /** Mbps (0 esconde o preenchimento). */
  value: number;
  /** Cor do arco/ponteiro (token CSS). */
  color: string;
  /** Texto central. */
  readout: string;
  unit: string;
  caption: string;
}

/** Velocímetro semicircular com escala não linear (0–1000 Mbps). Decorativo: o valor está no texto. */
export function Gauge({ value, color, readout, unit, caption }: Props) {
  const fraction = valueToFraction(value);
  const angle = START + SWEEP * fraction;
  return (
    <div className={styles.gauge}>
      <svg viewBox="0 0 300 200" className={styles.svg} aria-hidden="true" focusable="false">
        <path d={ARC} className={styles.track} />
        <path d={ARC} className={styles.fill} pathLength={1} style={{ strokeDashoffset: 1 - fraction, stroke: color }} />
        {TICKS.map((t) => (
          <g key={t.stop}>
            <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={styles.tick} />
            <text x={t.lx} y={t.ly} className={styles.tickLabel} textAnchor="middle" dominantBaseline="middle">
              {t.stop}
            </text>
          </g>
        ))}
        {/* Ponteiro: círculo que percorre o arco (não cruza o texto central). */}
        <g className={styles.pointer} style={{ transform: `rotate(${angle}deg)` }}>
          <circle cx={CX} cy={CY - R} r={9} style={{ stroke: color }} />
        </g>
      </svg>
      <div className={styles.readout}>
        <span className={styles.value}>{readout}</span>
        <span className={styles.unit}>{unit}</span>
        <span className={styles.caption}>{caption}</span>
      </div>
    </div>
  );
}
