import React from "react";
import './Memory.css';
import { useState, useEffect } from "react";

const TILES = ['red', 'green' , 'blue', 'yellow'];

export default function Memory() {
    const [board, setBoard] = useState(() => {
        return shuffle([...TILES, ...TILES]);
    }); 

    const [selectedTiles, setSelectedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);

    function updateClickedTiles(i){
        if(selectedTiles.length >= 2 || selectedTiles.includes(i)) return;
        setSelectedTiles([...selectedTiles, i])
    }

    useEffect(() => {
        if(selectedTiles.length < 2) return;
        if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
            setMatchedTiles([...matchedTiles, ...selectedTiles])
            setSelectedTiles([]);
        } else {
            const timerId = setTimeout(() => setSelectedTiles([]), 1000);
            return () => clearTimeout(timerId);
        }
    }, [selectedTiles]);

    const finishedGame = matchedTiles.length === board.length;

    const restartGame = () => {
        setBoard(shuffle([...TILES, ...TILES]))
        setSelectedTiles([]);
        setMatchedTiles([]);
    }

    return (
        <>
            <h1>{finishedGame ? 'You win!' : 'Memory'}</h1>
            <div className="board">
                {board.map((tile, i) => {
                    const turnedOver = selectedTiles.includes(i) || matchedTiles.includes(i);
                    const className = turnedOver ? `tile ${tile}` : 'tile'
                    return (
                        <div 
                            key = {i}
                            className={className}
                            onClick={() => updateClickedTiles(i)}
                        />
                    )
                })}
            </div>
            {finishedGame && <button onClick={() => restartGame()} >Restart </button>}
        </>
    );
}

function shuffle(array) {
    for(let i = array.length-1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i+1));

        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }

    return array;
}