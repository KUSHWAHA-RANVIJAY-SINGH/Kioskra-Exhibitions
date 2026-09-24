export interface BoothConfigState {
  shape: "square" | "l-shape" | "open-three";
  width: number;
  depth: number;
  height: number;
  color: string;
  flooring: "carpet" | "wooden" | "raised-platform";
  features: {
    led: boolean;
    counter: boolean;
    lounge: boolean;
    shelves: boolean;
    plants: boolean;
    touchScreen: boolean;
  };
  tier: "octanorm" | "basic" | "premium" | "luxury";
}
