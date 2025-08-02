import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const btnRef = useRef(null)
    const isWinning = dice.every(die => die.isHeld && die.value === dice[0].value)

    useEffect(() => {
        if (isWinning) {
            btnRef.current.focus()
        }
    }, [isWinning])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        if (isWinning) {
            setDice(generateAllNewDice())
            return
        }
        setDice(oldDice => oldDice.map(die => (
            die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )))
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die => (
            die.id === id ? { ...die, isHeld: !die.isHeld } : die
        )))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main>
            {isWinning && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {isWinning ? <p aria-live="polite" className="winning">You won! Press "New Game" to play again.</p>
            : <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={btnRef} className="roll-dice" onClick={rollDice}>{isWinning ? "New game" : "Roll"}</button>
        </main>
    )
}