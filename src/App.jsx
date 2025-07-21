import { useEffect, useState } from "react";
import ControlBtns from "./components/ControlBtns";
import Board from "./components/Board";

import createBoxArray from "./Game/createBoardData";
import {rowNum, colNum, initialSnake, DIRECTIONS, COLORS} from "./Game/config";
import moveSnake from "./Game/moveSnake";
import Button from "@mui/material/Button";
import restrictDirection from "./Game/directionConstrains";
import generateItemLoc from "./Game/generateItemLoc";

function App(){
   const [isPlaying, setPlaying] = useState(false);
   const [snake, setSnake] = useState(initialSnake);
   const [boardBoxes, setBoardBoxes] = useState(createBoxArray(rowNum, colNum, initialSnake));
   const [score, setScore] = useState(0);
   const [scoreItem, setScoreItem] = useState(generateItemLoc(rowNum, colNum, initialSnake));
   const [fistStart, setFirstStart] = useState(true);

   useEffect(()=>{
      let interval;
      if(isPlaying){
         interval = setInterval(updateBoard, 300);
         document.addEventListener("keydown", handleKeyDown);
      }
      if(!isPlaying) clearInterval(interval);

      return ()=> {
         document.removeEventListener("keydown", handleKeyDown);
         clearInterval(interval);
      };
   }, [snake, isPlaying]);

   function handleKeyDown(event){
      switch(event.key){
         case 'w':
         case 'ArrowUp':{
            updateDirection(DIRECTIONS.up);
            event.preventDefault();
            break;
         }
         case 's':
         case 'ArrowDown':{
            updateDirection(DIRECTIONS.down);
            event.preventDefault();
            break;
         }
         case 'a':
         case 'ArrowLeft':{
            updateDirection(DIRECTIONS.left);
            event.preventDefault();
            break;
         }
         case 'd':
         case 'ArrowRight':{
            updateDirection(DIRECTIONS.right);
            event.preventDefault();
            break;
         }
      }
   };

   function updateBoard() {
      if (!isPlaying) return;
      const {newHead, newBody, collided, increase} = moveSnake(structuredClone(snake), rowNum, colNum, scoreItem);
      if(collided){
         setPlaying(false);
         return;
      } 
      else if(increase){
         setScore(s => s + 1);
         setScoreItem(()=>{
            return generateItemLoc(rowNum, colNum, snake);
         });
      }
      setSnake(prev => {
         return ({
            ...prev,
            head: newHead,
            body: newBody,
         })
      });
      setBoardBoxes(prev => {
         let newBoard = prev.map(row => row.map(box => ({ ...box, color: "" })));
         newBoard[scoreItem[0]][scoreItem[1]].color = COLORS.scoreItem;
         newBoard[newHead[0]][newHead[1]].color = COLORS.head;
         newBody.forEach(box => {
            newBoard[box[0]][box[1]].color = COLORS.body;
         });
         return newBoard;
      });

   }

   function updateDirection(newDirection){
      if(!restrictDirection(newDirection, snake.direction)) return;
      setSnake(prev =>{
         return {
            ...prev,
            direction: newDirection
         }
      })
   }

   function resetGame(){
      setScore(0);
      setFirstStart(false);
      setScoreItem(()=> generateItemLoc(rowNum, colNum, initialSnake));
      setSnake(initialSnake);
      setPlaying(true);
   }

   return(
   <>
      {(!isPlaying && fistStart) 
         && <>
            <h1>Snake Game</h1>
            <Button variant="contained" color="success" size="large" onClick={resetGame}>Start</Button> 
         </>
      }
      {(!isPlaying && !fistStart) 
         && <>
            <h1 style={{color: "red"}}>GAME OVER</h1>
            <Button variant="contained" color="warning" size="large" onClick={resetGame}>Retry</Button>
         </>
      }
      <h2>Score: {score}</h2>
      <Board boardBoxes={boardBoxes} />
      <ControlBtns onClick={updateDirection} />
   </>
   )
}

export default App;