function generateItemLoc(rowNum, colNum, snake){
   let randRow;
   let randCol;
   let snakeBody = [];
   for(let a of snakeBody){
      snakeBody.push(structuredClone(a));
   }

   do{
      randRow = Math.floor(Math.random() * rowNum);
      randCol = Math.floor(Math.random() * colNum);
   } while(isOverlap(snake, randRow, randCol));
   return [randRow, randCol];
}

function isOverlap(snake, randRow, randCol){
   for(let i=0; i<snake.body.length; i++){
      if(snake.body[i][0] === randRow || snake.body[i][1] === randCol){
         return true;
      }
   }
   return false;
}

export default generateItemLoc;