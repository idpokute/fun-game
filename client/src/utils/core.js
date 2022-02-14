export const getDiffColors = (color1, color2) => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;

  return (
    (1 / 255) *
    (1 / Math.sqrt(3)) *
    Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
    )
  );
};

export const getClosestPos = (tiles, targetColor) => {
  let min = Number.MAX_SAFE_INTEGER;
  let x = -1;
  let y = -1;

  for (let i = 1; i < tiles.length - 1; i++) {
    for (let j = 1; j < tiles[0].length - 1; j++) {
      const diff = getDiffColors(tiles[i][j].color, targetColor);
      if (diff < min) {
        min = diff;
        y = i;
        x = j;
      }
    }
  }

  // // [row, col]
  return [y, x];
};

export const getStepedColor = (color, d, max) => {
  return color.map((c) => Math.round(c * ((max + 1 - d) / (max + 1))));
};
// console.log(getStepedColor([255, 0, 0], 1, 4));
// console.log(getStepedColor([255, 0, 0], 4, 4));

export const getMixedColor = (colors) => {
  const result = colors.reduce(
    (acc, curr) => {
      for (let i = 0; i < 3; i++) {
        acc[i] += curr[i];
      }
      return acc;
    },
    [0, 0, 0]
  );
  const f = 255 / Math.max(result[0], result[1], result[2], 255);
  return result.map((v) => v * f);
};
// console.log(
//   getMixedColor([
//     [255, 0, 0],
//     [0, 255, 0],
//   ])
// );
