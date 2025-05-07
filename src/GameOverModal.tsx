import styled from "@emotion/styled";

const GameOverModal = () => {
  return (
    <>
      <StyledBackground>
        <div>GameOver💥</div>
      </StyledBackground>
    </>
  )
}


const StyledBackground = styled.div`
  width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`
export default GameOverModal