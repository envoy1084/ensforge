import { Handler } from "vocs/server";

const colors = {
  background: "#111111",
  border: "#303030",
  ember: "#d95712",
  flame: "#ff8a1f",
  forge: "#ffb21c",
  muted: "#a3a3a3",
  pattern: "#242424",
  text: "#fafafa",
};

const dimensions = {
  height: 630,
  width: 1200,
};

const gridStep = 48;
const verticalLines = Array.from(
  { length: Math.ceil(dimensions.width / gridStep) },
  (_, index) => index * gridStep,
);
const horizontalLines = Array.from(
  { length: Math.ceil(dimensions.height / gridStep) },
  (_, index) => index * gridStep,
);

const getTitleSize = (title: string) => {
  if (title.length < 22) return 72;
  if (title.length < 44) return 62;
  return 52;
};

export default function handler(request: Request) {
  const fallbackLogo = new URL("/brand/wordmark-dark.svg", request.url).href;

  return Handler.og(({ description, logo, title }) => (
    <div
      style={{
        alignItems: "center",
        backgroundColor: colors.background,
        color: colors.text,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <svg
        aria-hidden
        fill="none"
        height={dimensions.height}
        style={{ left: 0, position: "absolute", top: 0 }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        width={dimensions.width}
      >
        <title>Forge grid</title>
        {verticalLines.map((position) => (
          <line
            key={`vertical-${position}`}
            stroke={colors.pattern}
            strokeWidth={1}
            x1={position}
            x2={position}
            y1={0}
            y2={dimensions.height}
          />
        ))}
        {horizontalLines.map((position) => (
          <line
            key={`horizontal-${position}`}
            stroke={colors.pattern}
            strokeWidth={1}
            x1={0}
            x2={dimensions.width}
            y1={position}
            y2={position}
          />
        ))}
        <circle cx="1060" cy="-10" r="250" stroke={colors.ember} strokeOpacity="0.18" />
        <circle cx="1060" cy="-10" r="185" stroke={colors.flame} strokeOpacity="0.3" />
        <circle cx="1060" cy="-10" r="120" fill={colors.forge} fillOpacity="0.06" />
      </svg>

      <div
        style={{
          border: `1px solid ${colors.border}`,
          display: "flex",
          inset: 36,
          position: "absolute",
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          maxWidth: 1000,
          padding: "80px 96px",
          position: "relative",
          textAlign: "center",
        }}
      >
        <img
          alt=""
          height="44"
          src={logo ?? fallbackLogo}
          style={{ height: 44, objectFit: "contain" }}
        />

        <div
          style={{
            display: "flex",
            fontSize: getTitleSize(title),
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          {title}
        </div>

        {description ? (
          <div
            style={{
              color: colors.muted,
              display: "flex",
              fontSize: 26,
              lineHeight: 1.42,
              maxWidth: 900,
              textWrap: "balance",
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          alignItems: "center",
          bottom: 56,
          color: colors.muted,
          display: "flex",
          fontSize: 18,
          gap: 12,
          left: 64,
          letterSpacing: "0.08em",
          position: "absolute",
        }}
      >
        <div
          style={{
            backgroundColor: colors.forge,
            borderRadius: 999,
            display: "flex",
            height: 9,
            width: 9,
          }}
        />
        ensforge.com
      </div>

      <div
        style={{
          bottom: 36,
          display: "flex",
          height: 3,
          left: 36,
          position: "absolute",
          right: 36,
        }}
      >
        <div style={{ backgroundColor: colors.ember, display: "flex", flex: 1 }} />
        <div style={{ backgroundColor: colors.flame, display: "flex", flex: 1 }} />
        <div style={{ backgroundColor: colors.forge, display: "flex", flex: 1 }} />
      </div>
    </div>
  )).fetch(request);
}
