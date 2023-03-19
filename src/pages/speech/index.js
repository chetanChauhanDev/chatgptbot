import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";

const Speech = () => {
  const [value, setValue] = React.useState("");
  const { speak, speaking, supported } = useSpeechSynthesis();
  const [result, setResult] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  const onMouseEnd = () => {
    stop();
    sendToGpt();
  };

  const sendToGpt = async (val) => {
    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: value ? value : "introduce yourself",
      }),
    })
      .then((res) => res.json())
      .then((dat) => {
        speak({ text: dat });
        setResult(dat);
      })
      .catch((err) => {
        speak({ text: "something went wrong check console" });
        console.log("error occured ", err);
      });
  };
  return (
    <div className="speech">
      <span>
        {supported
          ? "your browser support speech synthesis"
          : `your browser doesn't support speech synthesis `}
      </span>
      <br />
      <div className="group">
        <h2>Chatgpt Demo by chetan chauhan</h2>
        <br />
      </div>
      <Grid container direction="row" spacing={1}>
        <Grid item spacing={4}>
          <div className="group">
            <textarea
              rows="10"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>
          <div className="group">
            <Button
              variant="contained"
              onClick={() => {
                sendToGpt();
              }}
            >
              Speech
            </Button>
            <Button
              variant="contained"
              onMouseDown={listen}
              onMouseUp={onMouseEnd}
            >
              🎤
            </Button>
          </div>
        </Grid>
        <Grid item spacing={4}>
          <div className="">
            <textarea
              readOnly
              value={result}
              style={{ height: "400px", width: "400px" }}
            ></textarea>
          </div>

          {listening && <div>Go ahead I'm listening</div>}
          <br />
          {speaking ? "bot is speaking" : "bot is silent"}
        </Grid>

        <Grid item spacing={4}>
          <div className=" robot-area">
            <img
              src={
                speaking
                  ? "https://media.tenor.com/oRn9cRw2Rc4AAAAi/jaehee-jaehee-kang.gif"
                  : "silent-removebg.png"
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Speech;
