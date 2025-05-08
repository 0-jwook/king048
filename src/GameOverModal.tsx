import styled from "@emotion/styled";

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal = ({ onClose }: GameOverModalProps) => {
  return (
    <>
      <StyledBackground>
        <div>
          <Styledfont>GameOver💥</Styledfont>
          <StyledButton onClick={onClose}>재시작</StyledButton>
        </div>


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

const Styledfont = styled.div`
font-family: Pretendard,serif;
    font-size: 30px;
`

const StyledButton = styled.button`
background-color: #AD7A3F;
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 5px;
`

export default GameOverModal