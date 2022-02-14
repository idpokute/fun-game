import styled, { css } from "styled-components";

// export const ColorBox = styled.span`
//   background: rgb(
//     ${(props) => props.rgb[0]},
//     ${(props) => props.rgb[1]},
//     ${(props) => props.rgb[2]}
//   );
//   width: 20px;
//   height: 20px;
// `;

// export const ColorCircle = styled.span`
//   background: rgb(
//     ${(props) => props.rgb[0]},
//     ${(props) => props.rgb[1]},
//     ${(props) => props.rgb[2]}
//   );
//   width: 20px;
//   height: 20px;
//   border-radius: 20px;
// `;

const baseStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
`;

export const TooltipBlock = styled.div`
  display: none;
  color: white;
  position: absolute;
  background-color: #aaa;
  padding: 2px 3px;
  z-index: 1;
  top: 20px;
  left: 20px;
  font-size: 0.7em;
  transform: translate3d(0, 0, 0);
`;

export const WrapperBlock = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 4px;
`;

export const EmptyBlock = styled.div`
  ${baseStyle}
`;

export const SquareBlock = styled.div`
  ${baseStyle}
  box-shadow: 0 0 0 2px #aaa;
  background-color: black;

  ${(props) =>
    props.color &&
    css`
      background-color: rgb(
        ${props.color[0]},
        ${props.color[1]},
        ${props.color[2]}
      );
    `}

  ${(props) =>
    props.closest &&
    css`
      border: 2px solid red;
    `}

  &:hover + ${TooltipBlock} {
    display: block;
  }
`;

export const CircleBlock = styled.div`
  ${baseStyle}
  border-radius: 50%;
  box-shadow: 0 0 0 2px #aaa;
  background-color: black;

  ${(props) =>
    props.color &&
    css`
      background-color: rgb(
        ${props.color[0]},
        ${props.color[1]},
        ${props.color[2]}
      );
    `}

  &:hover + ${TooltipBlock} {
    display: block;
  }
`;
