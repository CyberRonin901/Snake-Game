import { DIRECTIONS } from "./config";

function restrictDirection(newDirection, originalDirection){
   if (newDirection === originalDirection) return true;
   else if (
      (newDirection === DIRECTIONS.right && originalDirection === DIRECTIONS.left)
      || (newDirection === DIRECTIONS.left && originalDirection === DIRECTIONS.right)
   ) return true;
   else if (
      (newDirection === DIRECTIONS.up && originalDirection === DIRECTIONS.down)
      || (newDirection === DIRECTIONS.down && originalDirection === DIRECTIONS.up)
   ) return true;
   return false;
}

export default restrictDirection;