import {useState} from 'react'
import './App.css'
import styled from "styled-components";

const SIZE : number = 4;

const Makeboard  = () : number[][] =>{
  const board : number[][]  = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
  addRandomTile(board);
  addRandomTile(board)
  return board;
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


const App = () => {
  const [board, setBoard] = useState(Makeboard());


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
