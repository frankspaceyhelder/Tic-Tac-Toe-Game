import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/tictactoe O.png';
import cross_icon from '../Assets/tictactoe X (1).png';

export const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [count, setCount] = useState(0);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [isDraw, setIsDraw] = useState(false);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = (newBoard) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner(newBoard[a]);
                setWinningLine(combination);
                return;
            }
        }

        if (!newBoard.includes(null)) {
            setIsDraw(true);
        }
    };

    const handleClick = (index) => {
        if (board[index] || winner || isDraw) return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? 'X' : 'O';
        setBoard(newBoard);
        setCount(count + 1);

        checkWinner(newBoard);
    };

    const renderIcon = (cell) => {
        if (cell === 'X') {
            return <img src={cross_icon} alt="X" />;
        } else if (cell === 'O') {
            return <img src={circle_icon} alt="O" />;
        }
        return null;
    };

    const drawWinningLine = () => {
        if (winningLine.length === 0) return null;

        const [start, , end] = winningLine;
        const direction = getLineDirection(start, end);

        return <div className={`line ${direction}`} />;
    };

   const getLineDirection = (start, end) => {
    if (start === 0 && end === 2) return 'horizontal-top';
    if (start === 3 && end === 5) return 'horizontal-middle';
    if (start === 6 && end === 8) return 'horizontal-bottom';
    if (start === 0 && end === 6) return 'vertical-left';
    if (start === 1 && end === 7) return 'vertical-middle';
    if (start === 2 && end === 8) return 'vertical-right';
    if (start === 0 && end === 8) return 'diagonal-main';
    if (start === 2 && end === 6) return 'diagonal-anti';

    return '';
};


    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe Game in <span>React</span></h1>
            <div className="board">
                {board.map((cell, index) => (
                    <div key={index} className="boxes" onClick={() => handleClick(index)}>
                        {renderIcon(cell)}
                    </div>
                ))}
                {drawWinningLine()}
            </div>
            <div className="status">
                {winner && <h2>{winner} Wins!</h2>}
                {isDraw && !winner && <h2>It's a Draw!</h2>}
            </div>
            <button className="reset" onClick={() => {
                setBoard(Array(9).fill(null));
                setCount(0);
                setWinner(null);
                setWinningLine([]);
                setIsDraw(false);
            }}>Reset</button>
        </div>
    );
};
