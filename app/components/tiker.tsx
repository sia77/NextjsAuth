"use client"; 

import { useState, useEffect } from 'react';

const CHARACTERS = ['/', '-', '\\', '|']; 

export default function Ticker() {    
    const [tikerChar, setTikerChar] = useState(CHARACTERS[0]);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {            
            setCharIndex(prevIndex => (prevIndex + 1) % CHARACTERS.length);
        }, 150);
        
        return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
        setTikerChar(CHARACTERS[charIndex]);
    }, [charIndex]);

    return (
        <span id="tiker" className="inline-block w-[1ch] text-center">
            {tikerChar}
        </span>
    );
}