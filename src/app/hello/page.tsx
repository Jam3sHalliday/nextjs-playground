"use client"
import { useState } from "react";
import ServerComponent from "../rsc/page";


const Hello = () => {
    const [text, setText] = useState('default');

    return (
        <div>
            Hello components
            <ServerComponent text={text} />

            <button className="px-4 border border-black rounded-xl" onClick={() => setText('text set by hello component')}>
                Click
            </button>
        </div>
    )
}

export default Hello;
