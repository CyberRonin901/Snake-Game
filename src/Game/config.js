export const rowNum = 18;
export const colNum = 20;  // column number also in CSS grid

export const DIRECTIONS = Object.freeze({
   up: "up",
   down: "down",
   left: "left",
   right: "right",
});

export const initialSnake = {
   head: [0,4], // (row,col)
   body: [[0, 3],[0, 2],[0, 1],[0, 0]],
   direction: 'right',
};

export const COLORS = Object.freeze({
   head: "#78C841",
   body: "#06923E",
   scoreItem: "#FF7A30",
});