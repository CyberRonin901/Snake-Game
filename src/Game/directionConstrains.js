import { DIRECTIONS } from "./config";

function restrictDirection(newDirection, originalDirection){
   if (newDirection === originalDirection) return false;
   else if (
      (newDirection === DIRECTIONS.right && originalDirection === DIRECTIONS.left)
      || (newDirection === DIRECTIONS.left && originalDirection === DIRECTIONS.right)
   ) return false;
   else if (
      (newDirection === DIRECTIONS.up && originalDirection === DIRECTIONS.down)
      || (newDirection === DIRECTIONS.down && originalDirection === DIRECTIONS.up)
   ) return false;

   return true;
}

export default restrictDirection;