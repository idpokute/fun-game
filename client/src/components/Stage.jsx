import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGame } from "../actions/game";

import Cell from "./Cell";
import Tool from "./Tool";

export default function Stage() {
  const game = useSelector((state) => {
    return state.game;
  });
  const dispatch = useDispatch();
  const { tiles, closestX, closestY } = game;

  useEffect(() => {
    if (game.gameOver === -1 || game.gameOver === 1) {
      let msg = "You lose!";
      if (game.gameOver === 1) {
        msg = "You win!";
      }

      let answer = window.confirm(msg + " Play the game again?");
      if (answer) {
        dispatch(initGame(game.userId));
      } else {
        // pause game
      }
    }
  }, [game.gameOver]);

  return (
    <div>
      {tiles.map((tiles, index) => {
        return (
          <div key={index} style={{ display: "flex" }}>
            {tiles.map((tile, sIndex) => {
              let isClosest = false;

              if (index === closestY && sIndex === closestX) {
                isClosest = true;
              }

              return (
                <Cell
                  key={`${index}-${sIndex}`}
                  row={index}
                  col={sIndex}
                  cellType={tile.cellType}
                  color={tile.color}
                  closest={isClosest}
                ></Cell>
              );
            })}
          </div>
        );
      })}
      <hr />
      Debug Tools
      <Tool />
    </div>
  );
}
