function ButtonArea({ text, setArea }) {
    return (
        <button className="button-area" onClick={(e) => setArea(text)}>{text.replace(/_/g, " ")}</button>
    );
}

export default ButtonArea;