export const checkForWin = (score: number, maxScore: number): boolean => {
  if (score + 1 >= maxScore + 1) {
    return true;
  }
  return false;
};
