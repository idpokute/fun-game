import { createSlice, current } from "@reduxjs/toolkit";
import { initGame, setColor } from "../actions/game";

const getDiffColors = (color1, color2) => {
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

const getClosestPos = (tiles, targetColor) => {
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

const getStepedColor = (color, d, max) => {
  return color.map((c) => Math.round(c * ((max + 1 - d) / (max + 1))));
};
// console.log(getStepedColor([255, 0, 0], 1, 4));
// console.log(getStepedColor([255, 0, 0], 4, 4));

const getMixedColor = (colors) => {
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

// [row, col]
const velocity = [
  [1, 0], // top to bottom
  [0, -1], // right to left
  [-1, 0], // bottom to top
  [0, 1], // left to right
];

const initialState = {
  userId: "",
  width: 0,
  height: 0,
  movesLeft: 0,
  step: 0,
  targetColor: [],
  closestColor: [0, 0, 0],
  closestX: 0,
  closestY: 0,
  diff: 0,
  tiles: [],
  selectedColor: [0, 0, 0],
  gameOver: 0, // -1: lose, 0: playing, 1: win
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // clearPost(state, action) {
    //   state.data = [];
    // },
    setSelectedColor(state, action) {
      state.selectedColor = action.payload;
    },
    checkGameOver(state) {
      if (state.diff <= 0.1) {
        state.gameOver = 1;
      } else {
        if (state.movesLeft < 1) {
          state.gameOver = -1;
        }
      }
    },

    setSource: {
      reducer(state, action) {
        const { row, col, color } = action.payload;
        if (state.tiles[row][col].cellType !== "source") return;

        // Change Source Color
        state.tiles[row][col].color = color;

        // Set velocity based on flow direction
        let velocity_index = -1;

        if (row === 0) {
          velocity_index = 0;
        } else if (row === state.height + 1) {
          velocity_index = 2;
        } else if (col === 0) {
          velocity_index = 3;
        } else if (col === state.width + 1) {
          velocity_index = 1;
        }

        let i = 1;
        let max = -1;
        if (row === 0 || row === state.height + 1) {
          max = state.height;
        } else if (col === 0 || col === state.width + 1) {
          max = state.width;
        }

        let currRow = row;
        let currCol = col;
        while (i <= max) {
          currRow += velocity[velocity_index][0];
          currCol += velocity[velocity_index][1];

          let c1 = [0, 0, 0];
          let c2 = [0, 0, 0];
          let c3 = [0, 0, 0];
          let c4 = [0, 0, 0];
          let mixed;

          if (velocity_index === 0) {
            // console.log("top - bottom");
            c1 = getStepedColor(
              state.tiles[0][currCol].color,
              i,
              state.height + 1
            );
            c2 = getStepedColor(
              state.tiles[state.height + 1][currCol].color,
              state.height + 1 - i,
              state.height + 1
            );
            c3 = getStepedColor(
              state.tiles[currRow][0].color,
              col,
              state.width + 1
            );
            c4 = getStepedColor(
              state.tiles[currRow][state.width + 1].color,
              state.width + 1 - col,
              state.width + 1
            );
          } else if (velocity_index === 1) {
            // console.log("right - left");
            c1 = getStepedColor(
              state.tiles[0][currCol].color,
              row,
              state.height + 1
            );
            c2 = getStepedColor(
              state.tiles[state.height + 1][currCol].color,
              state.height + 1 - row,
              state.height + 1
            );
            c3 = getStepedColor(
              state.tiles[currRow][0].color,
              state.width + 1 - i,
              state.width + 1
            );
            c4 = getStepedColor(
              state.tiles[currRow][state.width + 1].color,
              i,
              state.width + 1
            );
          } else if (velocity_index === 2) {
            // console.log("bottom - top");
            c1 = getStepedColor(
              state.tiles[0][currCol].color,
              state.height + 1 - i,
              state.height + 1
            );
            c2 = getStepedColor(
              state.tiles[state.height + 1][currCol].color,
              i,
              state.height + 1
            );
            c3 = getStepedColor(
              state.tiles[currRow][0].color,
              col,
              state.width + 1
            );
            c4 = getStepedColor(
              state.tiles[currRow][state.width + 1].color,
              state.width + 1 - col,
              state.width + 1
            );
          } else if (velocity_index === 3) {
            c1 = getStepedColor(
              state.tiles[0][currCol].color,
              row,
              state.height + 1
            );
            c2 = getStepedColor(
              state.tiles[state.height + 1][currCol].color,
              state.height + 1 - row,
              state.height + 1
            );
            c3 = getStepedColor(
              state.tiles[currRow][0].color,
              i,
              state.width + 1
            );
            c4 = getStepedColor(
              state.tiles[currRow][state.width + 1].color,
              state.width + 1 - i,
              state.width + 1
            );
          }

          mixed = getMixedColor([c1, c2, c3, c4]);
          state.tiles[currRow][currCol].color = mixed;

          i++;
        }
        const [crow, ccol] = getClosestPos(state.tiles, state.targetColor);
        state.closestX = ccol;
        state.closestY = crow;
        state.closestColor = state.tiles[crow][ccol].color;
        const diff = getDiffColors(state.targetColor, state.closestColor);
        state.diff = diff;

        state.step++;
        let left = state.movesLeft;
        left--;
        state.movesLeft = left;
      },
      prepare(row, col, color) {
        row = parseInt(row);
        col = parseInt(col);

        return {
          payload: {
            row,
            col,
            color,
          },
        };
      },
    },
  },
  extraReducers: (builder) =>
    // initialize game using data
    builder.addCase(initGame.fulfilled, (state, action) => {
      state.step = 0;
      state.gameOver = 0;

      for (const property in action.payload) {
        if (property === "userId") {
          state.userId = action.payload[property];
        } else if (property === "width") {
          state.width = action.payload[property];
        } else if (property === "height") {
          state.height = action.payload[property];
        } else if (property === "maxMoves") {
          state.movesLeft = action.payload[property];
        } else if (property === "target") {
          state.targetColor = action.payload[property];
        }
      }
      // initialize two dimension array
      state.tiles = Array(state.height + 2)
        .fill()
        .map((a) => Array(state.width + 2));

      for (let i = 0; i < state.height + 2; i++) {
        for (let j = 0; j < state.width + 2; j++) {
          const obj = {
            cellType: "tile",
            color: [0, 0, 0], // default color
          };

          if (i === 0 || i === state.height + 1) {
            if (j === 0 || j === state.width + 1) {
              obj.cellType = "empty";
            } else {
              obj.cellType = "source";
            }
          } else {
            if (j === 0 || j === state.width + 1) {
              obj.cellType = "source";
            }
          }

          state.tiles[i][j] = obj;
        }
      }
      state.closestX = 1;
      state.closestY = 1;
      state.closestColor = state.tiles[state.closestY][state.closestX].color;

      const diff = getDiffColors(state.targetColor, state.closestColor);
      state.diff = diff;
    }),
});

export default gameSlice;
