import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

const SIZE = 320;
const CTR = SIZE / 2;

interface RingProps {
  radius: number;
  dur: number;
  dir: 1 | -1;
  symbols: string[];
}

function OrbitRing({ radius, dur, dir, symbols }: RingProps) {
  const step = 360 / Math.max(symbols.length, 1);
  return (
    <g>
      <animateTransform attributeName="transform" attributeType="XML" type="rotate" from={`0 ${CTR} ${CTR}`} to={`${dir * 360} ${CTR} ${CTR}`} dur={`${dur}s`} repeatCount="indefinite" />
      <circle cx={CTR} cy={CTR} r={radius} className="stroke-border" strokeWidth="1" strokeDasharray="1 7" fill="none" />
      {symbols.map((sym, i) => {
        const a = ((step * i - 90) * Math.PI) / 180;
        const x = CTR + radius * Math.cos(a);
        const y = CTR + radius * Math.sin(a);
        return (
          <g key={sym} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <g>
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0" to={`${-dir * 360}`} dur={`${dur}s`} repeatCount="indefinite" />
              <circle r="15" className="fill-surface stroke-brand-500" strokeWidth="1" />
              <text textAnchor="middle" dominantBaseline="central" className="fill-brand-500" fontFamily="var(--font-mono)" fontSize={8}>
                {sym}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

export interface OrbitFieldProps {
  items: string[];
  centerLabel?: string;
  centerSub?: string;
  className?: string;
}

/** Two counter-rotating rings of chips around a pulsing core (SMIL). */
export function OrbitField({ items, centerLabel, centerSub, className }: OrbitFieldProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const half = Math.ceil(items.length / 2);
  const inner = items.slice(0, half);
  const outer = items.slice(half);
  return (
    <div ref={ref} className={cn("mx-auto", className)} style={{ width: SIZE, maxWidth: "100%" }}>
      <svg width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Orbiting set">
        {inView && <OrbitRing radius={78} dur={26} dir={1} symbols={inner} />}
        {inView && <OrbitRing radius={134} dur={40} dir={-1} symbols={outer} />}
        <circle cx={CTR} cy={CTR} r="42" className="fill-surface stroke-brand-500" strokeWidth="1.5">
          <animate attributeName="r" values="40;44;40" dur="4s" repeatCount="indefinite" />
        </circle>
        {centerLabel && (
          <text x={CTR} y={CTR - 2} textAnchor="middle" className="fill-brand-600" fontFamily="var(--font-display)" fontSize={20}>
            {centerLabel}
          </text>
        )}
        {centerSub && (
          <text x={CTR} y={CTR + 14} textAnchor="middle" className="fill-fg-muted" fontFamily="var(--font-mono)" fontSize={7}>
            {centerSub}
          </text>
        )}
      </svg>
    </div>
  );
}
