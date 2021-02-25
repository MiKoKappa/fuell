import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const Bar = styled(motion.div)`
width: calc(100% - 10vw);
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0 5vw;
position: fixed;
bottom: 0;
min-height: 10px;
background-color: #F86C10;
z-index: 10;
@media (max-width: 576px) {
    position: static;
}
`
const MiniHeading = styled(motion.h3)`
color: white;
font-size: 10px;
`


export default function BottomBar({lang}) {
    return (
        <Bar>
            <MiniHeading>{lang?"Stworzone z":"Developed with"} <i style={{color: "black"}} className="fas fa-heart"></i> {lang?"przez Mikołaja Tkaczyka":"by Mikołaj Tkaczyk"}</MiniHeading>
            <MiniHeading>{lang?"Mapy oraz trasy z":"Maps and routes from"} Mapquest ©</MiniHeading>
        </Bar>
    )
}
