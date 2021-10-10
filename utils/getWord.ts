export const getWord = (words: number[]) => {
  // const x = words.map((value) => {
  //   return value
  // })
  // console.log("x:",x)
  const [value, index] = words
    .map((word, ind) => [word, ind])
    .reduce((prev, current) => (current[0] > prev[0] ? current : prev));
  return { value, index };
};
