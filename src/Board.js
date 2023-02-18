import React, { useState, useEffect } from "react"

const BoardCell = ({ player, handleClick }) => {
    return (
        <div
            className = "BoardCell"
            onClick = {handleClick}
            style = {(player === null) ? {cursor: "pointer"} : {}}
        >
            { player ?? "" }
        </div>
    )
}

const Board = () => {
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [cells, setCells] = useState([])
    const [winner, setWinner] = useState(null)

    useEffect (() => {
        handleRestart()   
    }, [])

    function handleCellClick (cell_index) {
        if (cells[cell_index] === null) {
            var new_cells = cells.map((v,i) => (i === cell_index) ? currentPlayer : v)
            setCells(new_cells)
            
            for (let i = 0; i < 3; i++) {
                let valid_row_cells = 0
                let valid_col_cells = 0
                let valid_diag1_cells = 0
                let valid_diag2_cells = 0
                for (let j = 0; j < 3; j++) {
                    valid_row_cells += (new_cells[i * 3 + j] === currentPlayer)
                    valid_col_cells += (new_cells[i + j * 3] === currentPlayer)
                    valid_diag1_cells += (new_cells[j * 3 + j] === currentPlayer)
                    valid_diag2_cells += (new_cells[j * 3 + (2 - j)] === currentPlayer)
                }
                if ([valid_row_cells, valid_col_cells, valid_diag1_cells, valid_diag2_cells].includes(3)) {
                    setWinner(currentPlayer)
                    break
                }
            }

            setCurrentPlayer((currentPlayer === 'X') ? 'O' : 'X')
        }
    }

    function handleRestart () {
        setCurrentPlayer(['O','X'][Math.floor(Math.random() * 2)])
        setCells(Array(9).fill().map(() => null))
        setWinner(null)
    }

    return (
        <div className="Board">
            {
                (winner === null)
                    ? (
                        (cells.includes(null))
                            ? (<h1>Current player ({currentPlayer})</h1>)
                            : (<h1>There's no winners.</h1>)
                    )
                    : (<h1>Player ({winner}) has won!</h1>)
            }
            {
                ((winner !== null) || (!cells.includes(null))) &&
                <>
                    <button onClick={handleRestart}>Restart</button>
                    <br/>
                    <br/>
                    <br/>
                </>
            }
            {
                cells.map((_,i) => <BoardCell
                    key = {i}
                    player = {cells[i]}
                    handleClick = {() => handleCellClick(i)}
                />)
            }
        </div>
    )
}

export default Board