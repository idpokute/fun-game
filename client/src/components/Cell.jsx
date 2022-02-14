import React from "react";
import gameSlice from "../reducers/game";
import { useDispatch, useSelector } from "react-redux";

import {
  TooltipBlock,
  CircleBlock,
  EmptyBlock,
  WrapperBlock,
  SquareBlock,
} from "./globals";

// We will use these colors in Phase 1.
const defaultColors = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
];

export default function Cell({ cellType, row, col, color, closest }) {
  const dispatch = useDispatch();
  const game = useSelector((state) => {
    return state.game;
  });

  const disableDrag = (e) => {
    e.preventDefault();
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragStart = (e) => {
    if (game.step < defaultColors.length) {
      e.preventDefault();
      return;
    }
    // console.log("onDragStart");
    let color = e.target.getAttribute("color").split(",");
    dispatch(gameSlice.actions.setSelectedColor(color));
  };

  const onDrop = (e) => {
    console.log("called onDrop", e);
    const { row, col } = e.target.dataset;
    setColor(row, col, game.selectedColor);
  };

  const setColor = (r, c, color) => {
    if (game.gameOver === -1 || game.gameOver === 1) return;
    dispatch(gameSlice.actions.setSource(r, c, color));
  };

  const hClickCell = () => {
    if (game.step < defaultColors.length) {
      let c = defaultColors[game.step];
      if (c) {
        setColor(row, col, c);
      }
    }
  };

  const displayCell = () => {
    switch (cellType) {
      case "source":
        return (
          <>
            <CircleBlock
              color={color}
              data-row={row}
              data-col={col}
              onClick={() => {
                hClickCell();
              }}
              onDragStart={disableDrag}
              onDrop={onDrop}
              onDragOver={onDragOver}
            ></CircleBlock>
            <TooltipBlock>{color.join(",")}</TooltipBlock>
          </>
        );
      case "tile":
        return (
          <>
            <SquareBlock
              color={color}
              onClick={() => {
                hClickCell();
              }}
              closest={closest ? "1" : ""}
              draggable
              onDragStart={onDragStart}
            ></SquareBlock>
            <TooltipBlock>{color.join(",")}</TooltipBlock>
          </>
        );
      default:
        return <EmptyBlock></EmptyBlock>;
    }
  };

  return <WrapperBlock>{displayCell()}</WrapperBlock>;
}
