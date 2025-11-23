declare module "vanta/dist/*" {
  type VantaInstance = { destroy: () => void };
  type VantaOptions = {
    el: HTMLElement;
    THREE?: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    color1?: number;
    color2?: number;
    colorMode?: string;
    quantity?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
  };

  export default function VantaBirds(options: VantaOptions): VantaInstance;
}

declare global {
  interface Window {
    THREE?: unknown;
  }
}

export {};
