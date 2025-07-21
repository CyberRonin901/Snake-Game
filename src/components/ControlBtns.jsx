import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { DIRECTIONS } from '../Game/config';

function ControlBtns({onClick}){
   function handleClick(e){
      e.stopPropagation();
      onClick(e.target.value);
   }

   return(
      <>
      <div className="control-btns">
         <Button variant="contained" className="btn up" value={DIRECTIONS.up} onClickCapture={handleClick}>
            <ArrowUpwardIcon />
         </Button>
         <Button variant="contained" className="btn down" value={DIRECTIONS.down} onClickCapture={handleClick}>
            <ArrowDownwardIcon />
         </Button>
         <Button variant="contained" className="btn left" value={DIRECTIONS.left} onClickCapture={handleClick}>
            <ArrowBackIcon />
         </Button>
         <Button variant="contained" className="btn right" value={DIRECTIONS.right} onClickCapture={handleClick}>
            <ArrowForwardIcon />
         </Button>
      </div>
      </>
   )
}

export default ControlBtns;