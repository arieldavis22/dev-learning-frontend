import React from "react";
import { useTimer } from "react-compound-timer";


function PomodoroTimer() {
    const {
        value,
        controls: { setTime, start, stop }
    } = useTimer({ 
        initialTime: 1500000, 
        direction: "backward",
        startImmediately: false,
        checkpoints: [
            {
                time: 0,
                callback: () => setTime(300000)
            }
        ]});

    return (
        <div className="App">
        <h1>Timer</h1>
        <h2>{value.m}:{value.s}</h2>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={() => setTime(1500000)}>Reset</button>
        </div>
    );
}

export default PomodoroTimer;
