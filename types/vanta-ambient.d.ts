declare module "vanta/dist/vanta.birds.min.js" {
  type VantaOptions = Record<string, unknown>;
  type VantaInstance = { destroy: () => void };

  const VantaBirds: (options: VantaOptions) => VantaInstance;
  export default VantaBirds;
}

declare module "vanta/dist/vanta.birds.min" {
  import VantaBirds from "vanta/dist/vanta.birds.min.js";
  export default VantaBirds;
}
