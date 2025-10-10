import { useState } from "react";
import ColorBtn from "./components/ColorBtn";
import "./App.css";

function App() {
    const [color, setColor] = useState("#030712");

    const colors = [
        "#6ab04c",
        "#eb4d4b",
        "#3b3b98",
        "#ff793f",
        "#0984e3",
        "#f78fb3"
    ];

    return (
        <main
            className="w-full h-screen duration-350"
            style={{ backgroundColor: color }}
        >
            <h1 className="text-white text-6xl text-center px-72 py-48">
                Click a color below to change the background color!
            </h1>
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center gap-4 bg-gray-300 rounded-full px-3 py-3">
                <ColorBtn color="#6ab04c" setColor={setColor} />
                <ColorBtn color="#eb4d4b" setColor={setColor} />
                <ColorBtn color="#3b3b98" setColor={setColor} />
                <ColorBtn color="#ff793f" setColor={setColor} />
                <ColorBtn color="#0984e3" setColor={setColor} />
                <ColorBtn color="#f78fb3" setColor={setColor} />
            </div>
        </main>
    );
}

export default App;
