# Snake Game

Classic Snake Game built with React and Vite. Control the snake, eat items, and avoid collisions to achieve the highest score!

## Features
- Classic snake gameplay
- Responsive controls
- Modern UI with React
- Easy to run locally

## 🔗[LIVE DEMO](https://snake-game-flame-mu-28.vercel.app/)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/CyberRonin901/Snake-Game.git
   cd Snake-Game
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser to play.

## Project Structure

```
Snake_Game/
├── public/
│   └── App.css
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Box.jsx
│   │   └── ControlBtns.jsx
│   └── Game/
│       ├── config.js
│       ├── createBoardData.js
│       ├── directionConstrains.js
│       ├── generateItemLoc.js
│       └── moveSnake.js
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## License

This project is licensed under the [MIT License](LICENSE).
