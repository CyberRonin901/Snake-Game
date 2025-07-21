import { COLORS } from "./config";

function createBoxArray(rowNum, colNum, initialSnake){
   let boxes = [];
   for(let row=0 ; row < (rowNum) ; row++){
      let currentRow = [];
      for(let col=0 ; col < (colNum) ; col++){
         currentRow.push(
            { 
               coordinate: [row, col],
               color: "",
            }
         )
      }
      boxes.push(currentRow);
   }
   boxes[initialSnake.head[0]][initialSnake.head[1]].color = COLORS.head;
   initialSnake.body.forEach(box => {
      boxes[box[0]][box[1]].color = COLORS.body;
   });
   return boxes;
}

export default createBoxArray;