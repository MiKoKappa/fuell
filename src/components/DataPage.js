import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components"
import {AnimatePresence, motion} from "framer-motion"
import topography from "../assets/img/topography.svg"
import PrettyHeading from './PrettyHeading'
import Button from "./Button"
import Input from './Input'
import axios from "axios"

const Background = styled(motion.div)`
min-height: 100vh;
background-image: url(${topography});
background-size: auto;
background-repeat: repeat;
background-position: right;
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
@media (max-width: 576px){
    flex-direction: column;
}
`

const LeftWrapper = styled(motion.div)`
min-height: 100vh;
width: calc(50vw - 20vw);
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0 10vw;
@media (max-width: 576px) {
    width: 100vw;
    padding: 0;
    min-height: 70vh;
    justify-content: flex-end;
}
`
const RightWrapper = styled(motion.div)`
min-height: 100vh;
width: calc(50vw - 20vw);
background-color: #ececec;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
box-shadow: -5px 0 10px rgba(0,0,0,0.3);
padding: 0 10vw;
@media (max-width: 576px){
    width: 90%;
    padding: 5%;
}
`
const Heading = styled(motion.div)`
font-size: 40px;
text-transform: uppercase;
margin: 20px 0;
font-weight: 400;
&:after{
    content: "";
    width: 10px;
    height: 30px;
    display: inline-block;
    background-color: #F86C10;
}
`

const Para = styled(motion.p)`
max-width: 30vw;
text-align: justify;
font-size: 18px;
text-shadow: 0 0 10px rgba(255,255,255,0.6);
@media (max-width: 576px) {
    max-width: 100%;
    text-align: center;
    margin: 10%;
}
`

const ErrorDiv = styled(motion.div)`
position: absolute;
width: 100vw;
height: 100vh;
background: radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 75%);
z-index: 10;
display: flex;
justify-content: center;
align-items: center;
div{
    width: 40%;
    background-color: #ececec;
    padding: 2rem;
    div{
        padding: 0;
        padding-right: 1rem;
        div{
            display: inline-block;
        }
    }
}
`

const ButtonWrapper = styled(motion.div)`
margin: 10px auto;
@media (max-width: 576px){
    margin: 0;
    width: 100%;
}
`

export default function DataPage({lang, query, setQuery}) {
    const [startSpot,setStartSpot] = useState(query.startSpot);
    const [endSpot,setEndSpot] = useState(query.endSpot);
    const [fuelUsage,setFuelUsage] = useState(query.fuelUsage);
    const [fuelPrice,setFuelPrice] = useState(query.fuelPrice);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((data)=>{
            axios.get(`https://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_GEO_KEY}&query=${data.coords.latitude},${data.coords.longitude}&limit=1`)
            .then((response)=>{setStartSpot(`${response.data.data[0].county}, ${response.data.data[0].region}, ${response.data.data[0].country_code}`)})
            .catch((error)=>setIsError(!isError));
        })
    }, [])

    const unpolishText = (text) => {
        const dict = {
            ą:"a",
            ć:"c",
            ę:"e",
            ł:"l",
            ń:"n",
            ó:"o",
            ś:"s",
            ż:"z",
            ź:"z"
        };
        let result = "";
        for (let i = 0; i < text.length; i++) {
            if(text[i].toLowerCase() in dict){
                result += dict[text[i].toLowerCase()];
            }
            else{
                result += text[i]
            }
        }
        return result
    }

    return (
        <>
        <AnimatePresence>
        {isError?<ErrorDiv initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0, duration: 0.5}}} exit={{opacity: 0, transition: {delay: 0.5, duration: 0.5}}}>
            <motion.div initial={{opacity: 0, y: "-100px"}} animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.5}}} exit={{opacity: 0, y: "-100px", transition: {delay: 0, duration: 0.5}}}>
                <Heading>Error</Heading>
                <Para>{lang?"Wystąpił problem z wczytaniem Twojej lokalizacji. Proszę wprowadzić ją ręcznie.":"There was an error getting your localization. Please provide it manually."}</Para>
                <div onClick={()=>{setIsError(false)}}>
                    <Button text="OK"/>
                </div>
                
            </motion.div>
        </ErrorDiv>:""}
        </AnimatePresence>
        <Background key="datapage" initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0, duration: 0.5}}} exit={{opacity: 0, transition: {delay: 0.5, duration: 0.5}}}>
        <LeftWrapper initial={{opacity: 0, x: '-20vw'}} animate={{opacity: 1, x: 0, transition:{delay: 0.5, duration: 1, type: 'spring', stiffness: 50}}} exit={{opacity: 0, x: '-20vw', transition:{delay: 0, duration: 1, type: 'spring', stiffness: 50}}}>
            <PrettyHeading main={lang?"DANE":"DATA"} secondary={lang?"Wszystkie":"All the"} sign={"#"}/>
            <Para>{lang?"Podaj informacje o punkcie startowym oraz końcowym, cenie paliwa, spalaniu i dowiedź się całej reszty!":"Supply your route start and end points, petrol and usage info and start rolling!"}</Para>
        </LeftWrapper>
        <RightWrapper initial={{opacity: 0, x: '20vw'}} animate={{opacity: 1, x: 0, transition:{delay: 0.5, duration: 1, type: 'spring', stiffness: 50}}} exit={{opacity: 0, x: '20vw', transition:{delay: 0, duration: 1, type: 'spring', stiffness: 50}}}>
            <Heading>start </Heading>
            <Input val={startSpot} changeVal={setStartSpot} icon={"fas fa-map-marker"} placeholder={lang?"Punkt startowy":"Start point"}/>
            <Heading>{lang?"koniec":"finish"} </Heading>
            <Input val={endSpot} changeVal={setEndSpot} icon={"fas fa-map-marker-alt"} placeholder={lang?"Punkt końcowy":"Finish point"}/>
            <Heading>{lang?"paliwo":"fuel data"} </Heading>
            <Input val={fuelUsage} changeVal={setFuelUsage} icon={"fas fa-gas-pump"} placeholder={lang?"Zużycie paliwa (na 100km)":"Fuel usage (per 100km)"} regexp={/^[0-9\b.,]+$/}/>
            <Input val={fuelPrice} changeVal={setFuelPrice} icon={"fas fa-money-bill-wave"} placeholder={lang?"Cena paliwa (za 1L)":"Fuel price (per 1L)"} regexp={/^[0-9\b.,]+$/}/>
            <ButtonWrapper>
                <AnimatePresence>
                {startSpot&&endSpot&&fuelUsage&&fuelPrice?
                <motion.div onClick={()=>setQuery({startSpot: unpolishText(startSpot), endSpot: unpolishText(endSpot), fuelUsage: fuelUsage, fuelPrice: fuelPrice})} initial={{opacity: 0, y: 50}} animate={{opacity: 1, y:0}} exit={{opacity: 0, y: 50}}>
                    <Button link={"/results"} text={lang?"OBLICZ":"CALCULATE"}/>
                </motion.div>:""
                }
                </AnimatePresence>
            </ButtonWrapper>
        </RightWrapper>
        </Background>
        </>
    )
}
