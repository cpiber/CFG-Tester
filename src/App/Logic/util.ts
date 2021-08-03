export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export type EClampVal = number | string | null;
export function extendedClamp(r: EClampVal, def = 0, min?: number, max?: number) {
  const val = r === null || isNaN(+r) ? def : +r;

  switch (arguments.length) {
    case 3:
      return Math.max(val, min!);
    case 4:
      if (min === undefined)
        return Math.min(val, max!);
      return clamp(val, min, max!);
    default:
      return val;
  }
}