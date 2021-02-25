import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
@media (max-width: 576px) {
    margin: 5%;
}
`
const MainHeading = styled(motion.h1)`
color: #F86C10;
font-size: 100px;
margin: 0;
@media (max-width: 576px){
    font-size: 3rem;
}
`

const SecondaryHeading = styled(motion.h2)`
font-size: 40px;
text-transform: uppercase;
margin: 0 0 -20px 0;
font-weight: 400;
&:after{
    content: "";
    width: 10px;
    height: 30px;
    display: inline-block;
    background-color: #F86C10;
}
@media (max-width: 576px){
    font-size: 1.5rem;
    margin: 0;
}
`

const BackIcon = styled(motion.h3)`
position: absolute;
margin: 0;
top: -100px;
left: 200px;
z-index: -1;
font-size: 250px;
color: rgba(0,0,0,0.2);
@media (max-width: 576px){
    font-size: 6rem;
    top: -3rem;
    left: 8rem;
}
`
const BackWrapper = styled(motion.div)`
position: relative;
width:0;
height:0;
`

export default function PrettyHeading({main, secondary, sign}) {
    return (
        <Wrapper>
            <BackWrapper>
            <BackIcon initial={{opacity: 0}} animate={{opacity: 0.5, y: 30}} transition={{yoyo: Infinity, duration: 2, delay: 2}}>{sign}</BackIcon>
            </BackWrapper>
            <SecondaryHeading>{secondary} </SecondaryHeading>
            <MainHeading>{main}</MainHeading>
        </Wrapper>
    )
}
