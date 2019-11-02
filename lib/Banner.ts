export function createBannerFromString(str) {
  const parts = str.split(",");
  const name = parts[0].split(" ")[0];

  const baseColor = parts[0].split(" ")[1];

  parts.shift();

  let layers: [BannerLayer, McColor][] = [];

  parts.forEach(ele => {
    layers.push(ele.split(":"));
  });

  return new Banner(name, baseColor, layers);
}

export class Banner {
  constructor(
    readonly name: string,
    readonly baseColor: McColor,
    readonly layers: [BannerLayer, McColor][]
  ) {}
}

export enum McColor {
  BLACK,
  DARK_BLUE,
  DARK_GREEN,
  DARK_AQUA,
  DARK_RED,
  DARK_PURPLE,
  GOLD,
  GRAY,
  DARK_GRAY,
  BLUE,
  GREEN,
  AQUA,
  RED,
  LIGHT_PURPLE,
  YELLOW,
  WHITE
}

export enum BannerLayer {
  FLOWER = "flo",
  TRIANGLE_BOTTOM = "bt",
  HALF_HORIZONTAL = "hh",
  RHOMBUS_MIDDLE = "mr",
  CIRCLE_MIDDLE = "mc",
  CREEPER = "cre",
  SKULL = "sku",
  STRIPE_SMALL = "ss",
  GRADIENT = "gra",
  BRICKS = "bri",
  STRIPE_MIDDLE = "sc",
  BORDER = "bo",
  STRIPE_TOP = "ts",
  STRIPE_BOTTOM = "bts"
}
