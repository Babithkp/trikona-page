"use client";

import dynamic from "next/dynamic";

/**
 * The home hero's backdrop.
 *
 * The WebGL layer is loaded lazily and client-only, so `ogl` never enters the
 * server bundle and never blocks first paint — the CSS gradient and dot grid
 * below render immediately, and the aurora fades in over them once ready. If
 * WebGL2 is unavailable the component renders nothing and this static layer
 * is simply what the visitor sees.
 */
const AuroraGL = dynamic(() => import("@/components/ui/AuroraGL"), {
  ssr: false,
});

export default function HeroAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] overflow-hidden"
    >
      {/* Static base: present before (and instead of) the WebGL layer. */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(166,50,242,0.16) 0%, rgba(251,163,37,0.10) 38%, transparent 70%)",
        }}
      />

      {/* Aurora. Alpha is controlled inside the shader (see `opacity`) rather
          than with a CSS opacity or blend mode, both of which washed the brand
          hues out to grey against the white page. */}
      <div className="absolute inset-x-0 top-0 h-[34rem]">
        <AuroraGL
          className="size-full"
          colorStops={["#A632F2", "#C77BF0", "#FBA325"]}
          speed={0.35}
          blend={0.85}
          amplitude={0.8}
          opacity={0.52}
        />
      </div>

      {/* Scrim: keeps the sticky header and hero copy fully legible over the
          densest part of the aurora, which sits along the top edge. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas via-canvas/60 to-transparent" />

      {/* Melts the whole field back into the page background. */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-canvas" />

      <div className="absolute inset-0 bg-dots opacity-50 mask-fade-edges" />
    </div>
  );
}
