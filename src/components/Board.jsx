import Box from "./Box.jsx";

function Board({ boardBoxes }) {
   return (
      <div id="board">
         {boardBoxes.map(row => {
            const divRow = row.map(box => {
               return (
                  <Box
                     key={box.coordinate}
                     coordinate={box.coordinate}
                     color={box.color}
                  />
               )
            })
            return [...divRow];
         })}
      </div>
   )
}

export default Board;