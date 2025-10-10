function ColorBtn({ color, setColor }) {
    return (
        <button
            className="w-12 h-12 rounded-full shadow-sm shadow-gray-700"
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
        ></button>
    );
}

export default ColorBtn;
