export function createBannerFromString(str){
  const parts = str.split(',');
  const name = parts[0].split(' ')[0];

  const baseColor = parts[0].split(' ')[1];

  parts.shift()

  let layers: [BannerLayer, McColor][] = []

  parts.forEach(ele => {
    layers.push(ele.split(':'))
  });

  return new Banner(name, baseColor, layers);
}

export class Banner{
  constructor(readonly name: string, readonly baseColor: McColor, readonly layers: [BannerLayer, McColor][]){}
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
  FLO = 'flo',
  BT = 'bt',
  HH = 'hh',
  MR = 'mr',
  MC = 'mc',
  CREEPER = 'cre',
  SKULL = 'sku',
  STRIPES = 'ss',
  GRADIENT = 'gra',
  BRICKS = 'bri',
  SC = 'sc',
  BO = 'bo',
  ts = 'ts',
  bts = 'bts',
}