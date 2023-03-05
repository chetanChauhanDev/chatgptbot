import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
const Speech = () => {
    const [value, setValue] = React.useState("");
    const { speak } = useSpeechSynthesis();

    const sendToGpt = async (val) => {
        await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: value
            }
            )
        })
        .then((res) => res.json()).then((dat) => 
        speak({ text: dat })
        )
          
    }
    return (
        <div className="speech">
            <div className="group">
                <h2>Text To Speech Converter Using React Js</h2>
            </div>
            <div className="group">
                <textarea
                    rows="10"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
            </div>
            <div className="group">
                <button onClick={() => {
                   //sendToGpt();
                   speak({ text: "value" })
                }}>
                    Speech
                </button>
            </div>
        </div>
    );
};
export default Speech;
