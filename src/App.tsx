import {useEffect, useState} from 'react'
import './App.css'
import styled from "styled-components";

const SIZE : number = 4;

const Makeboard  = () : number[][] =>{
  const board : number[][]  = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
  addRandomTile(board);
  addRandomTile(board)
  return board;
}

const moveLeft = (board : number[][]) : number[][] => {
  return board.map(row => {
    const newRow : number[] = row.filter(tile => tile !== 0)
    for(let i = 0; i < newRow.length; i++){
      if(newRow[i] === newRow[i+1]){
        newRow[i] *= 2
        newRow[i+1] = 0;
      }
    }
    const combined = newRow.filter(tile => tile !== 0)
    while(combined.length < board.length){
      combined.push(0)
    }
    return combined;
  });
}

const addRandomTile= (board : number[][]) : number[][] | undefined =>{
  const emptyTiles : {x : number, y : number}[] = [];
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      if(board[i][j] === 0){
        emptyTiles.push({x : i, y : j});
      }
    }
  }
  if(emptyTiles.length === 0) return;

  const {x, y} = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  board[x][y] = Math.random() < 0.9 ? 2 : 4
  return board;
}

const moveRight = (board : number[][]):number[][] => {
  const newboard =  board.map(row => row.slice().reverse());
  return moveLeft(newboard).map(row => row.reverse());
}


const App = () => {
  const [board, setBoard] = useState(Makeboard());
  useEffect(() => {
    const handleKeyDown = (e : KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newBoard = moveLeft(board)
        setBoard(addRandomTile(newBoard)!)
      }

      if(e.key === 'ArrowRight'){
        const newBoard = moveRight(board)
        setBoard(addRandomTile(newBoard)!)
      }

    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [board]);

  return (
    <div>
      <div className="board">
        {board.map((row, x) => (
          <StyledRow className="row" key={x}>
            {row.map((tile, y) => (
              <div className="tile" key={y}>
                {/*{tile !== 0 ? tile : ''}*/}
                {tile}
              </div>
            ))}
          </StyledRow>
        ))}
      </div>
    </div>
  )
}

const StyledRow = styled.div`
  display: flex;
    gap: 10px;
`;


export default App
