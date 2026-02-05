import { useRef, useState } from 'react'
import './App.css'
import { Settings, Game } from '.'
function App() {
  const [currentPage, setCurrentPage] = useState('mainMenu')

  const mainMenu = () =>
    <>
      <button onClick={() => setCurrentPage('game')} >Start</button>
      <button onClick={() => setCurrentPage('settings')} >Settings</button>

    </>



  return (
    <div className="App">
      {currentPage === 'mainMenu' ? mainMenu() :
        currentPage === 'settings' ? openSettings({ setCurrentPage }) :
          currentPage === 'game' ? <GameUi /> : null}
    </div>
  )
}



function openSettings({ setCurrentPage }) {
  return (
    <>
      <div> <label htmlFor="rows"></label>
        <input type="number" id="rows" min="1" defaultValue={Settings.getRows()} onChange={(e) => Settings.setRows(parseInt(e.target.value))} /></div>
      <div> <label htmlFor="cols"></label>
        <input type="number" id="cols" min="1" defaultValue={Settings.getCols()} onChange={(e) => Settings.setCols(parseInt(e.target.value))} /></div>
      <button onClick={() => setCurrentPage('mainMenu')}>Back to Main Menu</button>
    </>


  )
}

function GameUi() {
  const gameRef = useRef(null)

  if (!gameRef.current) {
    gameRef.current = new Game(Settings.getRows(), Settings.getCols())
  }

  const game = gameRef.current
  const [grid, setGrid] = useState(game.grid.grid)
  return (<>
    <div> {grid.map((row, rIndex) => (
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }} key={rIndex}>{row.map((cell, cIndex) => (
        <div style={{ border: "solid 1px white", borderRadius: "50%", width: "30px", height: "30px", backgroundColor: cell === 1 ? "red" : cell === 2 ? "yellow" : "transparent" }}
          key={cIndex}
          onClick={() => {
            if (game.gameOver) return;
            game.makeMove(cIndex, setGrid);
          }}
        >

        </div>
      ))}</div>
    ))}</div>
              {game.gameOver && gameOver( game.winnerMessage , () => {
      const newGrid = game.resetGame()
      setGrid(structuredClone(newGrid))
    })}

  </>)

}

function gameOver(winnerMessage , resetGame) {
  return (
    <>
    <div>{winnerMessage}</div>
    <button onClick={() => {
      resetGame();
    }}>Restart Game</button>
    </>
  )
}

export default App
