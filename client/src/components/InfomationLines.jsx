import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGame } from "../actions/game";
import styled, { css } from "styled-components";
import { TooltipBlock, SquareBlock, WrapperBlock } from "./globals";

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

export default function InfomationLines() {
  const game = useSelector((state) => {
    return state.game;
  });

  return (
    <HeaderBlock>
      <h2>RGB Alchemy</h2>

      <InfoBlock>
        <span>User ID: </span>
        <span>{game.userId}</span>
      </InfoBlock>
      <InfoBlock>
        <span>Moves left:</span>
        <span>{game.movesLeft}</span>
      </InfoBlock>
      <InfoBlock>
        <span>Target color</span>
        <WrapperBlock>
          <SquareBlock color={game.targetColor}></SquareBlock>
          <TooltipBlock>{game.targetColor.join(",")}</TooltipBlock>
        </WrapperBlock>
      </InfoBlock>
      <InfoBlock>
        <span>Closest color</span>
        <WrapperBlock>
          <SquareBlock color={game.closestColor}></SquareBlock>
          <TooltipBlock>{game.closestColor.join(",")}</TooltipBlock>
        </WrapperBlock>
        Δ={(game.diff * 100).toFixed(2)}%
      </InfoBlock>
    </HeaderBlock>
  );
}
