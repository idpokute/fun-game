import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initGame } from "./actions/game";
import InfomationLines from "./components/InfomationLines";
import Stage from "./components/Stage";
import styled, { css } from "styled-components";

const AppBlock = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();

  const onStart = () => {
    setStart(!start);
    dispatch(initGame());
  };

  useEffect(() => {
    onStart();
  }, []);

  return (
    <AppBlock>
      {start ? (
        <>
          <InfomationLines></InfomationLines>
          <Stage />
        </>
      ) : (
        <>
          <button onClick={onStart}>Start</button>
        </>
      )}
    </AppBlock>
  );
}

export default App;
