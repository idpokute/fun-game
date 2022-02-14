import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGame, restartGame } from "../actions/game";
import { ColorBox } from "./globals";

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
    // <DndProvider backend={HTML5Backend}>
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
                >
                  {/* {Object.keys(tile).map((key, i) => (
                    <span key={i}>
                      {key}: {tile[key]}
                    </span>
                  ))} */}
                </Cell>
              );
            })}
          </div>
        );
      })}
      <hr />
      Debug Tools
      <Tool />
    </div>
    // </DndProvider>
  );
}
