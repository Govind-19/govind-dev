import * as React from "react";

/**
 * Post diagrams — hand-authored inline SVG, no runtime, no images.
 *
 * House rules, so a later one matches these two:
 *  - box strokes and arrows in var(--color-muted); label text inherits
 *    currentColor (the figure sets it to --color-tag, same as <pre>)
 *  - rust (--color-accent) is spent on exactly ONE thing per figure: the
 *    element the argument turns on
 *  - dashed = "may never arrive"; solid = guaranteed
 *  - every svg carries role="img" + aria-label saying what it shows
 *  - viewBox is sized for the content and CSS scales it. side-by-side
 *    panels are separate <svg>s so they stack, not shrink, on a phone.
 */

const MUTED = "var(--color-muted)";
const ACCENT = "var(--color-accent)";
const PAPER = "var(--color-paper)";

function Arrowhead({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 8 8"
        refX="8"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
      </marker>
    </defs>
  );
}

/** panel chrome shared by the two halves of the webhook figure */
function PanelHead({ title }: { title: string }) {
  return (
    <>
      <text x="4" y="13" fontSize="11.5" letterSpacing="0.3">
        {title}
      </text>
      <line x1="4" y1="21" x2="276" y2="21" stroke="var(--color-line)" />
    </>
  );
}

function Box({
  x,
  y,
  w,
  h,
  label,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={PAPER}
        stroke={accent ? ACCENT : MUTED}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        fontSize="12"
        textAnchor="middle"
        fill={accent ? ACCENT : "currentColor"}
      >
        {label}
      </text>
    </>
  );
}

/**
 * Figure 1 — the browser moves off the path.
 * Same three objects in both panels; the only difference is whether the
 * browser is a link in the chain or a bystander beside it.
 */
export function WebhookPathDiagram() {
  return (
    <figure className="diagram">
      <div className="diagram-row">
        <div className="diagram-panel">
          <svg
            viewBox="0 0 280 226"
            role="img"
            aria-label="What I pictured: razorpay posts the webhook to the frontend, which forwards it to my backend. The browser is a link in the chain, so one closed tab breaks it."
          >
            <Arrowhead id="dgm-webhook-a" />
            <PanelHead title="what i pictured" />

            <Box x={10} y={42} w={140} h={38} label="razorpay" />
            <line
              x1="80"
              y1="80"
              x2="80"
              y2="106"
              stroke={MUTED}
              markerEnd="url(#dgm-webhook-a)"
            />
            <text x="90" y="97" fontSize="10.5" fill={MUTED}>
              webhook, i thought
            </text>

            <Box x={10} y={110} w={140} h={38} label="the browser" accent />
            <text x="166" y="124" fontSize="11" fill={MUTED}>
              one closed tab
            </text>
            <text x="166" y="138" fontSize="11" fill={MUTED}>
              breaks the chain
            </text>

            <line
              x1="80"
              y1="148"
              x2="80"
              y2="174"
              stroke={MUTED}
              markerEnd="url(#dgm-webhook-a)"
            />
            <text x="90" y="165" fontSize="10.5" fill={MUTED}>
              then to my server
            </text>

            <Box x={10} y={178} w={140} h={38} label="my backend" />
          </svg>
        </div>

        <div className="diagram-panel">
          <svg
            viewBox="0 0 280 226"
            role="img"
            aria-label="What actually happens: razorpay's servers POST straight to my backend, server to server. The browser sits off the path entirely."
          >
            <Arrowhead id="dgm-webhook-b" />
            <PanelHead title="what actually happens" />

            <Box x={10} y={42} w={140} h={38} label="razorpay servers" />

            {/* one hop, interrupted only where its label sits */}
            <line x1="80" y1="80" x2="80" y2="104" stroke={MUTED} />
            <text x="80" y="118" fontSize="11" textAnchor="middle">
              POST
            </text>
            <text x="80" y="132" fontSize="11" textAnchor="middle" fill={MUTED}>
              server → server
            </text>
            <line
              x1="80"
              y1="142"
              x2="80"
              y2="174"
              stroke={MUTED}
              markerEnd="url(#dgm-webhook-b)"
            />

            <Box x={10} y={178} w={140} h={38} label="my backend" />

            {/* the same box as the left panel, now with nothing attached */}
            <Box x={164} y={110} w={110} h={38} label="the browser" accent />
            <text
              x="219"
              y="164"
              fontSize="10.5"
              textAnchor="middle"
              fill={MUTED}
            >
              not on the path
            </text>
          </svg>
        </div>
      </div>
      <figcaption>
        the webhook never touches the browser — which is the entire reason it
        survives the tab closing.
      </figcaption>
    </figure>
  );
}

/**
 * Figure 2 — two independent arrivals, one idempotent door.
 * Dashed marks the leg that may never arrive; rust marks the join, which is
 * what the section is actually about.
 */
export function TwoPathsDiagram() {
  return (
    <figure className="diagram">
      <div className="diagram-solo">
        <svg
          viewBox="0 0 320 308"
          role="img"
          aria-label="Two paths into one door: the user's browser calls verify-payment, drawn dashed because it only arrives if the tab is still open, while razorpay's servers post payment.captured, drawn solid because it always arrives. Both converge on one idempotent activation where whichever lands first does the work."
        >
          <Arrowhead id="dgm-paths" />

          <Box x={8} y={26} w={130} h={38} label="user's browser" />
          <Box x={182} y={26} w={130} h={38} label="razorpay servers" />

          <line
            x1="73"
            y1="64"
            x2="73"
            y2="92"
            stroke={MUTED}
            strokeDasharray="4 4"
            markerEnd="url(#dgm-paths)"
          />
          <text x="79" y="82" fontSize="10.5" fill={MUTED}>
            on success
          </text>

          <line
            x1="247"
            y1="64"
            x2="247"
            y2="92"
            stroke={MUTED}
            markerEnd="url(#dgm-paths)"
          />
          <text x="253" y="82" fontSize="10.5" fill={MUTED}>
            on capture
          </text>

          <rect
            x="8"
            y="96"
            width="130"
            height="70"
            fill={PAPER}
            stroke={MUTED}
          />
          <text x="73" y="116" fontSize="10.5" textAnchor="middle" fill={MUTED}>
            PATH 1
          </text>
          <text x="73" y="136" fontSize="11.5" textAnchor="middle">
            verify-payment
          </text>
          <text x="73" y="155" fontSize="10.5" textAnchor="middle" fill={MUTED}>
            needs the tab open
          </text>

          <rect
            x="182"
            y="96"
            width="130"
            height="70"
            fill={PAPER}
            stroke={MUTED}
          />
          <text
            x="247"
            y="116"
            fontSize="10.5"
            textAnchor="middle"
            fill={MUTED}
          >
            PATH 2
          </text>
          <text x="247" y="136" fontSize="11.5" textAnchor="middle">
            payment.captured
          </text>
          <text
            x="247"
            y="155"
            fontSize="10.5"
            textAnchor="middle"
            fill={MUTED}
          >
            server → server
          </text>

          {/* both legs land on the same node; only one of them is guaranteed */}
          <polyline
            points="73,166 73,196 160,196"
            fill="none"
            stroke={MUTED}
            strokeDasharray="4 4"
          />
          <polyline
            points="247,166 247,196 160,196"
            fill="none"
            stroke={MUTED}
          />
          <line
            x1="160"
            y1="196"
            x2="160"
            y2="230"
            stroke={MUTED}
            markerEnd="url(#dgm-paths)"
          />

          <rect
            x="22"
            y="234"
            width="276"
            height="66"
            fill={PAPER}
            stroke={ACCENT}
          />
          <text
            x="160"
            y="256"
            fontSize="12.5"
            textAnchor="middle"
            fill={ACCENT}
          >
            activate the subscription
          </text>
          <text
            x="160"
            y="274"
            fontSize="10.5"
            textAnchor="middle"
            fill={MUTED}
          >
            idempotent — whichever lands first
          </text>
          <text
            x="160"
            y="288"
            fontSize="10.5"
            textAnchor="middle"
            fill={MUTED}
          >
            does the work; the other finds it done
          </text>
        </svg>
      </div>
      <figcaption>
        path 1 is for the user, path 2 is for the truth. both open the same
        door, so it has to be safe to open twice.
      </figcaption>
    </figure>
  );
}
