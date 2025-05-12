import styled from "@emotion/styled";

interface GameOverModalProps {
  onClose: () => void,
  score: number
  highScore: number
}

const GameOverModal = ({onClose, score, highScore}: GameOverModalProps,) => {
  return (
    <>
      <StyledBackground>
        <ModalContainer>
          <Styledfont istitle>GameOver💥</Styledfont>
          <Styledfont>점수 : {score}</Styledfont>
          <Styledfont>최고점수 : {highScore}</Styledfont>
          <StyledButton onClick={onClose}>재시작</StyledButton>
        </ModalContainer>
      </StyledBackground>
    </>
  )
}


const StyledBackground = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Styledfont = styled.p<{ istitle?: boolean }>`
    font-family: Pretendard, serif;
    font-size: ${({istitle}) =>
            (istitle ? '30px' : '15px')};
    margin: 0;
    padding: 0;
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: #eee4da;
    padding: 30px;
    border-radius: 5px;
`

const StyledButton = styled.button`
    background-color: #AD7A3F;
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 5px;
    margin: 0;
    padding: 0;

`

export default GameOverModal