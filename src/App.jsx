import { useEffect, useState, useRef } from "react";
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
   const [boardBoxes, setBoardBoxes] = useState(()=> {
      return createBoxArray(rowNum, colNum, initialSnake);
   });
   const [score, setScore] = useState(0);
   const [scoreItem, setScoreItem] = useState(()=>{
      return generateItemLoc(rowNum, colNum, initialSnake);
   });
   const [firstStart, setFirstStart] = useState(true);

   const snakeRef = useRef(snake);
   const scoreItemRef = useRef(scoreItem);

   useEffect(()=>{
      snakeRef.current = snake;
   }, [snake]);
   
   useEffect(()=>{
      scoreItemRef.current = scoreItem;
   }, [scoreItem]);

   useEffect(()=>{
      let interval;
      if(isPlaying){
         interval = setInterval(updateBoard, 500);
         document.addEventListener("keydown", handleKeyDown);
      } else{ 
         clearInterval(interval);
      }

      return ()=> {
         document.removeEventListener("keydown", handleKeyDown);
         clearInterval(interval);
      };
   }, [isPlaying]);

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
      const {newHead, newBody, collided, self_collided, increase} = moveSnake(structuredClone(snakeRef.current), rowNum, colNum, scoreItemRef.current);
      if(collided){
         setPlaying(false);
         return;
      }
      else if(increase){
         const itemLoc = generateItemLoc(rowNum, colNum, structuredClone(snakeRef.current));
         setScore(s => s + 1);
         setScoreItem(itemLoc);
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
         newBody.forEach(box => {
            newBoard[box[0]][box[1]].color = COLORS.body;
         });
         newBoard[scoreItemRef.current[0]][scoreItemRef.current[1]].color = COLORS.scoreItem;
         newBoard[newHead[0]][newHead[1]].color = COLORS.head;
         return newBoard;
      });
      if(self_collided) setPlaying(false);
   }

   function updateDirection(newDirection){
      if(!restrictDirection(newDirection, snakeRef.current.direction)) return;
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
      {!isPlaying && ( 
         <>
            <h1 
               style={
                  {color: (!firstStart ? "red" : null)}
               }
            >
               {firstStart ? "Snake Game" : "GAME OVER"}
            </h1>
            <Button 
               variant="contained" 
               color={firstStart ? "success" : "warning"}
               size="large" 
               onClick={resetGame}
            >
               {firstStart ? "Start" : "Retry"}
            </Button> 
         </>
      )}
      <h2>Score: {score}</h2>
      <Board boardBoxes={boardBoxes} />
      <ControlBtns onClick={updateDirection} />
   </>
   )
}

export default App;