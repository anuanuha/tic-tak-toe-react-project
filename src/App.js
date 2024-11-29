import { useEffect, useState } from 'react';
import './App.css';
import { Square } from './Components/Square';
import { Pattern } from './Components/Pattern';
function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const[player,setPlayer]=useState("X");
  const [result, setResult] = useState({winner:"none", state:"none"})
  useEffect(()=>{
    checkwin();
    checkIfTie();
    if(player =="X"){
      setPlayer("0");
     }
     else{
      setPlayer("X")
     }
  },[board]);
  useEffect(()=>{
    if(result.state != "none"){
      alert(`Game Finished! Winning Player is : ${result.winner}`);
      restartGame();
    }
  },[result]);
  const chooseSquare=(Square)=>{
       setBoard(board.map((val,idx)=>{
        if(idx == Square && val == ""){
          return player;
        }
        return val;
       })
       )
  }
  const checkwin=()=>{
    Pattern.forEach((currPattern)=>{
     const firstPlayer = board[currPattern[0]];
     if(firstPlayer=="")return;
     let founfWinningPattern = true;
     currPattern.forEach((idx)=>{
      if(board[idx] !=firstPlayer){
        founfWinningPattern = false;
      }
     })
     if(founfWinningPattern){
            setResult({winner:player, state:"won"})
     }
     
    })
  }
  const checkIfTie=()=>{
    let filled = true;
    board.forEach((square)=>{
      if(square == ""){
        filled = false;
      }
    })
    if(filled){
      setResult({winner:"no one", state:"Tie"});
    }
  };
  const restartGame=()=>{
    setBoard(["","","","","","","","",""]);
    setPlayer("X")
  }
  return (
    <div className="App">
    <div className='board'>
      <div className='row'>
        <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
        <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
        <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
      </div>
      <div className='row'>
      <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}}/>
        <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}}/>
        <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
      </div>
      <div className='row'>
      <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}}/>
        <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}}/>
        <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
      </div>

    </div>
    </div>
  );
}

export default App;
