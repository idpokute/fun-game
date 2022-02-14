import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGame, restartGame } from "../actions/game";

export default function Tool() {
  const game = useSelector((state) => {
    return state.game;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(initGame())}>Re-Start</button>
      <button onClick={() => dispatch(initGame(game.userId))}>
        Play Again
      </button>
    </div>
  );
}
