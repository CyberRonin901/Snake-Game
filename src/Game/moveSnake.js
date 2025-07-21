// coordinates using => [RowNumber, ColumnNumber]
// Origin => top left
// Left to right, Top to bottom => increase
// Right => ColNum increase
// Left => ColNum decrease
// Up => RowNum decrease
// Down => RowNum increase

import { DIRECTIONS } from "./config";

function moveSnake(snake, rowNum, colNum, scoreItem) {
   const { direction } = snake;
   let newHead = [];
   let increase = false;

   switch (direction) {
      case DIRECTIONS.right: {
         newHead = [snake.head[0], snake.head[1] + 1];
         if (newHead[1] >= colNum) {
            return { collided: true };
         };
         break;
      }
      case DIRECTIONS.left: {
         newHead = [snake.head[0], snake.head[1] - 1];
         if (newHead[1] < 0) {
            return { collided: true };
         };
         break;
      }
      case DIRECTIONS.up: {
         newHead = [snake.head[0] - 1, snake.head[1]];
         if (newHead[0] < 0) {
            return { collided: true };
         };
         break;
      }
      case DIRECTIONS.down: {
         newHead = [snake.head[0] + 1, snake.head[1]];
         if (newHead[0] >= rowNum) {
            return { collided: true };
         };
         break;
      }
   }

   let collided = false;
   if(checkSelfCollision(snake.body, newHead)){
      collided = true;
   }
   if(JSON.stringify(newHead) === JSON.stringify(scoreItem)){
      increase = true;
   }

   let newBody = snake.body;
   if(!increase) newBody.pop();
   newBody.unshift(snake.head);
   return {newHead, newBody, increase, collided};
}

function checkSelfCollision(body, newHead){
   for(let i=0; i < body.length - 1 ; i++){
      if(body[i][0] === newHead[0] && body[i][1] === newHead[1]){
         return true;
      }
   }
   return false;
}

export default moveSnake;