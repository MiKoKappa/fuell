import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import car from '../assets/img/Car.svg'
import Button from './Button'
import PrettyHeading from './PrettyHeading'

const Wrapper = styled(motion.div)`
min-height: 100vh;
background: url(${car});
background-size: 60vw;
background-repeat: no-repeat;
background-position: right;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0 10vw;
@media (max-width: 576px) {
    background: none;
    align-items: center;
    margin: 50px 0;
}
`
const Para = styled(motion.p)`
max-width: 30vw;
text-align: justify;
font-size: 18px;
text-shadow: 0 0 10px rgba(255,255,255,0.6);
@media (max-width: 576px) {
    max-width: 80%;
    text-align: center;
    margin: 10%;
}
`

const CarImage = styled(motion.div)`
display: none;
@media (max-width: 576px) {
    display: block;
    min-height: 40vh;
    background: url(${car});
    background-size: 80vw;
    background-repeat: no-repeat;
    background-position: center;
}
`

// const Card = styled(motion.div)`
// background-color: white;
// border-radius: 25px;
// box-shadow: 0 0 10px rgba(0,0,0,0.2);
// padding: 5%;
// `

const variants = {
    hidden: {opacity: 0, x: 100},
    visible: {opacity: 1, x: 0},
    out: {opacity: 0, x: 100}
}

export default function MainPage({lang}) {
    return (
        <Wrapper key="mainpage" variants={variants} initial={"hidden"} animate={"visible"} exit={"out"} transition={{duration: 1, type: "spring", stiffness: 50}}>
            <motion.div variants={variants} initial={"hidden"} animate={"visible"} transition={{duration: 1, type: "spring", stiffness: 50, delay: 1}}>
            <CarImage />
            <PrettyHeading main={"FUELL"} secondary={lang?"Czym jest":"What is"} sign={"?"}/>
            <Para>{lang?"FUELL to aplikacja React.JS, która pomaga obliczyć koszty paliwa przy podróży z punktu A do punktu B. Bez znaczenia czy chcesz się dowiedzieć ile będzie kosztować Twoja wycieczka turystyczna czy też jesteś profesjonalnym kierowcą, FUELL da Ci to, czego szukasz!":"FUELL is a React.JS app that helps calculate the cost of gas required to travel from point A to B. Whether you just want to know how affordable your sightseeing tour will be or you are a profesional bus driver, this app will tell you everything you need to know!"}</Para>
            <Button link={"/data"} text={lang?"OBLICZ SWOJĄ TRASĘ":"CALCULATE YOUR ROUTE"}/>
            </motion.div>
        </Wrapper>
    )
}
