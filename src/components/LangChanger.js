import React from 'react'
import styled from "styled-components";
import {motion} from "framer-motion";

const Switcher = styled(motion.div)`
background-color: #F86C10;
width: 40px;
height: 20px;
display: flex;
flex-direction: row;
align-items: center;
padding: 0 5px;
border-radius: 25px;
margin: 0 10px;
pointer-events: all;
`
const Dot = styled(motion.div)`
background-color: white;
width: 25px;
height: 10px;
border-radius: 25px;
pointer-events: all;
`
const Wrapper = styled(motion.div)`
display: flex;
flex-direction: row;
color: #F86C10;
font-size: 15px;
pointer-events: all;
`
const dotvariants = {
    off: { x: 0 },
    on: { x: 15 }
}

export default function LangChanger({lang, handleLangChange}) {

    return (
        <Wrapper>
            <span>ENG</span>
            <Switcher onClick={handleLangChange}>
                <Dot variants={dotvariants} initial={lang?"on":"off"} animate={lang?"on":"off"} onClick={handleLangChange}/>
            </Switcher>
            <span>PL</span>
        </Wrapper>
    )
}
