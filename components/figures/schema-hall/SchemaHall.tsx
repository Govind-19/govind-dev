"use client";

import { useEffect, useRef } from "react";
import { HALL_DATA, HALL_READOUT, HALL_SVG } from "./art.generated";
import { mountSchemaHall } from "./live.mjs";
import "./schema-hall.css";

const KEYS = [
  { mark: "lit", label: "Open drawer: one school's PostgreSQL schema, the same 15+ module tables in each" },
  { mark: "raised", label: "Top floors: the React frontend" },
  { mark: "raised", label: "Columns: the shared Express API" },
  { mark: "raised", label: "Base and steps: Docker and Nginx on DigitalOcean" },
  { mark: "dim", label: "Carriage and key: one request's connection, scoped to one school" },
];

/**
 * The schema hall: the Maahita school ERP drawn as an architect's model.
 * The art is generated at author time by scripts/figures/schema-hall/build.mjs;
 * this component only places it and runs the motion.
 */
export default function SchemaHall() {
  const stage = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!stage.current) return;
    return mountSchemaHall(stage.current, readout.current, HALL_DATA);
  }, []);

  return (
    <figure className="hall iso-figure !my-0">
      <div className="iso-plate">
        <div className="iso-plate-corners" aria-hidden="true">
          <span className="iso-plate-corner" data-corner="fig">
            Fig 1
          </span>
          <span className="iso-plate-corner" data-corner="title">
            Schema hall
          </span>
          <span className="iso-plate-corner" data-corner="hint">
            Hover or tap a bay
          </span>
          <span
            ref={readout}
            className="iso-plate-corner"
            data-corner="readout"
            data-readout=""
          >
            {HALL_READOUT}
          </span>
        </div>
        <div
          ref={stage}
          className="iso-stage"
          tabIndex={0}
          role="slider"
          aria-label="Schema hall: arrow keys move the connection between schools"
          aria-valuemin={1}
          aria-valuemax={HALL_DATA.bays.length}
          aria-valuenow={3}
          // static art built at author time from our own build script
          dangerouslySetInnerHTML={{ __html: HALL_SVG }}
        />
      </div>
      <figcaption className="iso-legend">
        <span className="iso-keys">
          {KEYS.map((k) => (
            <span key={k.label} className="iso-key">
              <svg className="iso-swatch" data-mark={k.mark} viewBox="0 0 16 10" aria-hidden="true">
                <path d="M1 5h14" />
              </svg>
              {k.label}
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
