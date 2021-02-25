import React from 'react';
import styled from "styled-components";
import './LangChanger';
import LangChanger from './LangChanger';
import {motion} from "framer-motion"
import { Link } from 'react-router-dom';

const Bar = styled(motion.div)`
width: calc(100% - 10vw);
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0 5vw;
position: absolute;
z-index: 10;
pointer-events:none;
`

const Header = styled(motion.h2)`
color: #F86C10;
font-size: 35px;
-webkit-user-select: none;         
-moz-user-select: none; 
-ms-user-select: none; 
user-select: none; 
text-decoration: none;
pointer-events: all;
`

const variants = {
    hidden: {opacity: 0, y: -100},
    visible: {opacity: 1, y: 0}
}

export default function Navbar({lang, handleLangChange}) {
    return (
        <Bar variants={variants} initial={"hidden"} animate={"visible"}>
            <Link to="/fuell/" style={{textDecoration: 'none'}}>
            <Header whileHover={{scale: 1.1, textShadow: "0 0 5px rgba(0,0,0,0.1)"}}><i className="fas fa-gas-pump"></i> FU<span style={{fontStyle: 'italic'}}>E</span>LL</Header>
            </Link>
            <LangChanger style={{pointerEvents: 'all'}} lang={lang} handleLangChange={handleLangChange}/>
        </Bar>
    )
}
