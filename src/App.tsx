import {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import GameOverModal from "./GameOverModal.tsx";

const SIZE : number = 4;


const Makeboard  = () : number[][] =>{
  const board : number[][]  = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
  addRandomTile(board);
  addRandomTile(board)
  return board;
}

const addRandomTile= (board : number[][]) : number[][] | undefined=>{
  const emptyTiles : {x : number, y : number}[] = [];
  for(let i : number = 0; i < board.length; i++){
    for(let j : number = 0; j < board[i].length; j++){
      if(board[i][j] === 0){
        emptyTiles.push({x : i, y : j});
      }
    }
  }
  if(emptyTiles.length === 0) return;

  const {x, y} : {x:number, y : number} = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[x][y] = Math.random() < 0.9 ? 2 : 4
  return board;
}

const moveLeft = (board : number[][]) : { newBoard: number[][] ,scoreData : number} => {
  let scoreData : number = 0
  const newBoard = board.map(row => {
    const newRow : number[] = row.filter(tile => tile !== 0)
    for(let i: number = 0; i < newRow.length; i++){
      if(newRow[i] === newRow[i+1]){
        newRow[i] *= 2
        scoreData += newRow[i]
        newRow[i+1] = 0;
      }
    }
    const combined : number[] = newRow.filter(tile => tile !== 0)
    while(combined.length < board.length){
      combined.push(0)
    }
    return combined;
  });
  return {newBoard, scoreData};
}

const moveRight = (board : number[][]): { newBoard: number[][] ,scoreData : number} => {
  const reversed : number[][] =  board.map(row => row.slice().reverse());
  const {newBoard, scoreData} = moveLeft(reversed);
  return { newBoard : newBoard.map(row => row.reverse()),
    scoreData
  };
}

const transpose = (board : number[][]) : number[][] => {
  return board[0].map((_, i) => board.map(row => row[i]));
}

const moveUp = (board : number[][]) : { newBoard: number[][] ,scoreData : number} => {
  const transposedBoard : number[][] = transpose(board);
  const {newBoard, scoreData} = moveLeft(transposedBoard);
  return {newBoard : transpose(newBoard), scoreData}
}

const moveDown = (board : number[][]) : { newBoard: number[][] ,scoreData : number} => {
  const transposedBoard : number[][] = transpose(board);
  const {newBoard, scoreData} = moveRight(transposedBoard);
  return {newBoard : newBoard, scoreData};
}

const isGameOver = (board : number[][]) : boolean => {
  for(let i : number = 0; i < board.length; i++){
    for(let j : number = 0; j < board[i].length; j++){
      if(board[i][j] === 0) return false;
      if(i > 0 && board[i][j] === board[i-1][j]) return false;
      if(j > 0 && board[i][j] === board[i][j-1]) return false;
    }
  }
  return true;
}

const App = () => {
  const [board, setBoard] = useState<number[][]>(Makeboard());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => {
      let result: { newBoard: number[][]; scoreData: number } | null = null;

      if (e.key === 'ArrowLeft') result = moveLeft(board);
      else if (e.key === 'ArrowRight') result = moveRight(board);
      else if (e.key === 'ArrowUp') result = moveUp(board);
      else if (e.key === 'ArrowDown') result = moveDown(board);
      else return;

      const moved : boolean= JSON.stringify(board) !== JSON.stringify(result.newBoard)
      if(!moved) return;

      const addTileNewBoard : number[][] | undefined = addRandomTile(result.newBoard)
      setBoard(addTileNewBoard!)
      setScore(score + result.scoreData)
      setGameOver(isGameOver(result.newBoard))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board]);


  const handleCloseModal = () => {
    setGameOver(false);
    setBoard(Makeboard());
  };

  return (
    <Root>
      <StyledScore>점수 : {score}</StyledScore>
      <StyledBoard className="board">
        {board.map((row : number[], x : number) => (
          <StyledRow className="row" key={x}>
            {row.map((tile : number, y : number) => (
              <StyledTile number={tile} className="tile" key={y}>
                <StyledTileLetter>{tile !== 0 ? tile : ''}</StyledTileLetter>
              </StyledTile>
            ))}
          </StyledRow>
        ))}
      </StyledBoard>
      {gameOver && <GameOverModal onClose={handleCloseModal} />}
      {/*<GameOverModal onClose={handleCloseModal}/>*/}
    </Root>
  )
}

const Root = styled.div`
    width: 100vw; 
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const StyledScore = styled.p`
    font-family: Pretendard, serif;
    font-size: 30px;
    margin: 0;
    padding: 0;
`

const StyledRow = styled.div`
    display: flex;
`;

const getColor = (number : number) => {
  if(number === 0) return 'rgba(238, 228, 218, 0.35)';
  if(number === 2) return '#eee4da';
  if(number === 4) return '#ede0c8';
  if(number === 8) return '#f2b179';
  if(number === 16) return '#f59563';
  if(number === 32) return '#f67c5f';
  if(number === 64) return '#f65e3b';
  if(number === 128) return '#edcf72';
  if(number === 256) return '#edcc61';
  if(number === 512) return '#9c0';
  if(number === 1024) return '#33b5e5';
  if(number === 2048) return '#09c';
  if(number === 4096) return '#a6c';
  if(number === 8192) return '#93c';
  if(number === 16384) return '#82c';
  if(number === 32768) return '#5a6';
  if(number === 65536) return '#363';
  if(number === 131072) return '#000';
}

const StyledTile = styled.div<{number : number}>`
    background-color: ${({number}) => getColor(number) };
    width: 100px;
    height: 100px;
    //border: 1px solid black;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledBoard = styled.div`
    padding: 5px;
    //border: 1px solid black;
    background-color: #bbada0;
    border-radius: 5px;
`

const StyledTileLetter = styled.p`
    color: black;
    font-family: Pretendard,serif;
    font-size: 40px;
`

export default App
