export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <button 
            style={styles}
            onClick={props.hold}
            className="die"
            aria-pressed={props.isHeld}
            aria-label={`Die showing ${props.value}, ${props.isHeld ?
                 "held" : "not held"}`}
        >{props.value}</button>
    )
}