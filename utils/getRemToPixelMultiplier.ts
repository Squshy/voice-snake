export const getRemToPixelMultiplier = (width: number): number => {
  if (width < 748) return 1;
  else return 2 
};
