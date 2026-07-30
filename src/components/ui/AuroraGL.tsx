"use client";

import * as React from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

/**
 * WebGL aurora field, adapted from the React Bits "Aurora" component.
 *
 * Changes made for this codebase:
 *  - Typed, and driven by a ResizeObserver rather than a window resize
 *    listener, so it also reacts when the container alone changes size.
 *  - Device pixel ratio is capped at 1.5. The original rendered a full-screen
 *    fragment shader at native DPR, which is ~4x the fragment work on a
 *    retina display for an effect that is deliberately soft and blurred.
 *  - The render loop is paused when the element scrolls out of view or the
 *    tab is hidden, instead of running requestAnimationFrame forever.
 *  - Colour stops are converted once per change instead of allocating three
 *    Color objects on every single frame.
 *  - Honours prefers-reduced-motion by drawing one static frame and stopping.
 *  - Bails out cleanly if WebGL2 is unavailable, since the shaders are
 *    `#version 300 es`. The caller's CSS gradient backdrop then stands alone.
 */

const VERT = /* glsl */ `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uOpacity;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {                 \
  int index = 0;                                                 \
  for (int i = 0; i < 2; i++) {                                  \
     ColorStop currentColor = colors[i];                         \
     bool isInBetween = currentColor.position <= factor;         \
     index = int(mix(float(index), float(i), float(isInBetween)));\
  }                                                              \
  ColorStop currentColor = colors[index];                        \
  ColorStop nextColor = colors[index + 1];                       \
  float range = nextColor.position - currentColor.position;      \
  float lerpFactor = (factor - currentColor.position) / range;   \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  // Light-theme adaptation. The original multiplies the ramp colour by
  // intensity, which is correct over a dark page but desaturates towards
  // grey over a white one. Here the hue stays pure and intensity drives
  // alpha instead, so the effect reads as tinted light rather than haze.
  float alpha = clamp(intensity, 0.0, 1.0) * auroraAlpha * uOpacity;

  fragColor = vec4(rampColor * alpha, alpha);
}
`;

export type AuroraGLProps = {
  /** Three hex colours defining the gradient, left to right. */
  colorStops?: [string, string, string];
  /** Animation speed multiplier. */
  speed?: number;
  /** Softness of the aurora's lower edge. */
  blend?: number;
  /** Height intensity of the aurora bands. */
  amplitude?: number;
  /**
   * Peak alpha of the effect, 0–1. Applied inside the shader rather than as
   * CSS opacity so the aurora composites against the page in one pass.
   */
  opacity?: number;
  className?: string;
};

const MAX_DPR = 1.5;

export default function AuroraGL({
  colorStops = ["#A632F2", "#BD6BF5", "#FBA325"],
  speed = 0.5,
  blend = 0.55,
  amplitude = 0.9,
  opacity = 0.6,
  className,
}: AuroraGLProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Live values read inside the animation loop without restarting it.
  const settings = React.useRef({ speed, blend, amplitude, opacity });
  settings.current = { speed, blend, amplitude, opacity };

  // Serialised so the effect re-runs only when the colours actually change,
  // not on every parent render that produces a new array literal.
  const colorKey = colorStops.join(",");

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
      });
    } catch {
      // No WebGL at all — the CSS backdrop behind this is the fallback.
      return;
    }

    const gl = renderer.gl;

    // The shaders require GLSL ES 3.00, which needs a WebGL2 context.
    if (!renderer.isWebgl2) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    // The fragment shader derives UVs from gl_FragCoord, so the attribute is
    // dead weight in the vertex buffer.
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const stops = colorKey
      .split(",")
      .map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: stops },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend },
        uOpacity: { value: opacity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [
        width * renderer.dpr,
        height * renderer.dpr,
      ];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    // Belt and braces: the observer covers container-only changes, the window
    // listener covers environments where RO reporting is unreliable.
    window.addEventListener("resize", resize);
    resize();

    let frameId = 0;
    let running = false;
    let onScreen = true;

    const draw = (t: number) => {
      const { speed: s, blend: b, amplitude: a, opacity: o } = settings.current;
      program.uniforms.uTime.value = t * 0.001 * s;
      program.uniforms.uAmplitude.value = a;
      program.uniforms.uBlend.value = b;
      program.uniforms.uOpacity.value = o;
      renderer.render({ scene: mesh });
    };

    const loop = (t: number) => {
      frameId = requestAnimationFrame(loop);
      draw(t);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    // Reduced motion still gets the artwork — just frozen, not animating.
    if (reduceMotion) {
      draw(0);
    } else {
      start();
    }

    // Stop burning frames on a hero that has been scrolled past.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(container);

    const onDocumentVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onDocumentVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onDocumentVisibility);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colorKey, amplitude, blend, opacity]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
