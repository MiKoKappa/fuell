import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import error from '../assets/img/error.svg';
import Button from './Button';
import PrettyHeading from './PrettyHeading';
import Map from './Map';

const Background = styled(motion.div)`
min-height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-start;
@media (max-width: 576px){
    flex-direction: column-reverse;
}
`
const Wrapper = styled(motion.div)`
min-height: 100vh;
width: 80vw;
background: url(${error});
background-size: auto;
background-repeat: no-repeat;
background-position: right;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
@media (max-width: 576px){
    width: 100vw;
    background: none;
    align-items: center;
    margin: 50px 0;
}
`

const Loader = styled(motion.div)`
width: 80vw;
height: 100vh;
position: absolute;
background-color: #ececec;
display: flex;
justify-content: center;
align-items: center;
div{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
h2{
    color: #F86C10;
    font-size: 25px;
    -webkit-user-select: none;         
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    text-decoration: none;
}
div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
}
}
@media (max-width: 576px) {
    width: 100vw;
}
`
const Para = styled(motion.p)`
max-width: 25vw;
text-align: justify;
font-size: 18px;
text-shadow: 0 0 10px rgba(255,255,255,0.6);
@media (max-width: 576px) {
    max-width: 80%;
    text-align: center;
    margin: 10%;
}
`

const Dot = styled(motion.div)`
width: 15px;
height: 15px;
background-color: #F86C10;
border-radius: 50%;
margin: 0 10px;
`

const LeftWrapper = styled(motion.div)`
min-height: 100vh;
width: calc(50vw - 10vw);
background-color: #ececec;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
box-shadow: 5px 0 10px rgba(0,0,0,0.3);
padding: 0 5vw;
z-index: 1;
@media (max-width: 576px) {
    width: 90%;
    min-height: 0;
    padding: 5%;
}
`

const RightWrapper = styled(motion.div)`
min-height: 100vh;
width: 50vw;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
@media (max-width: 576px) {
    width: 100%;
    min-height: 0;
    max-height: 60vh;
}
`

const HeadingMain = styled(motion.div)`
font-size: 30px;
text-transform: uppercase;
margin: 20px 0;
font-weight: 400;
&:after{
    content: "";
    width: 10px;
    height: 20px;
    display: inline-block;
    background-color: #F86C10;
}
@media (max-width: 576px){
    font-size: 1.2rem;
}
`
const HeadingInfo = styled(motion.div)`
font-size: 30px;
text-transform: uppercase;
margin: 20px 0;
font-weight: 400;
color: #F86C10;
@media (max-width: 576px){
    font-size: 1rem;
}
`

const InfoDiv = styled(motion.div)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
`

const Expand = styled(motion.button)`
width: 40px;
height: 40px;
position: absolute;
top: calc(50vh - 20px);
left: calc(50vw);
outline: none;
border: none;
background-color: #F86C10;
border-radius: 0 25% 25% 0;
color: white;
box-shadow: 5px 0 10px rgba(0,0,0,0.2);
z-index: 1;
@media (max-width: 576px){
    display: none;
}
`

export default function ResultsPage({lang, query}) {
    const [maximized, setMaximized] = useState(false);
    const [info, setInfo] = useState({});
    useEffect(() => {
        axios.get(`https://www.mapquestapi.com/directions/v2/route?unit=k&key=${process.env.REACT_APP_API_KEY}&from=${query.startSpot}&to=${query.endSpot}`)
        .then((response)=>setTimeout(()=>{setInfo(response.data)},Math.random()*1000+500));
    }, [query])
    return (
        <Background initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        <AnimatePresence>
        {!info.info?
        <Loader initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div>
        <motion.h2 initial={{y:-10}} animate={{y:10}} transition={{yoyo: Infinity, duration: 0.5}}>{lang?"Ładowanie":"Loading"}</motion.h2>
                <div>
                    <Dot initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{yoyo: Infinity, delay: 0, duration: 0.5}} />
                    <Dot initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{yoyo: Infinity, delay: 0.25, duration: 0.5}} />
                    <Dot initial={{scale: 0, opacity: 0}} animate={{scale: 1, opacity: 1}} transition={{yoyo: Infinity, delay: 0.4, duration: 0.5}} />
                </div>
            </div>
        </Loader>
        : info.info.statuscode !== 0 || info.route.formattedTime==="00:00:00" ?<Wrapper initial={{opacity: 0, x: '20vw'}} animate={{opacity: 1, x: 0}} transition={{duration: 1, type: "spring", stiffness: 50}}>
            <motion.div initial={{opacity: 0, x: '-20vw'}} animate={{opacity: 1, x: 0}} transition={{duration: 1, type: "spring", stiffness: 50, delay: 1}}>
            <PrettyHeading main={"ERROR"} secondary={lang?"UPSSS":"WHOOPS"} sign={":/"}/>
            <Para>{lang?"Coś poszło nie tak! Trasa nie odnaleziona, sprawdź czy zostały podane odpowiednie dane!":"Something went wrong! Route not found, check if data is correct!"}</Para>
            <Button link={"/data"} text={lang?"PODAJ INNE DANE":"SUPPLY OTHER DATA"}/>
            </motion.div>    
        </Wrapper>:<>
        <Expand initial={{opacity: 0, x: "-20vw"}} animate={maximized?{opacity: 1, x: "-50vw", transition:{duration: 0.2, ease: "easeIn"}}:{opacity: 1, x: 0, transition:{duration: 1, type: 'spring', stiffness: 30, delay: 0.5}}} onClick={()=> setMaximized(!maximized)}><motion.i initial={{opacity: 0}}  animate={maximized?{rotate: 180, opacity: 1}:{rotate: 0, opacity: 1}} className="fas fa-arrow-left"></motion.i></Expand>
        <LeftWrapper initial={{opacity: 0, x: "-20vw"}} animate={maximized?{opacity: 1, x: '-50vw', transition:{duration: 1, delay: 0.5}}:{opacity: 1, x: 0, transition:{duration: 1, type: 'spring', stiffness: 30}}}>
            <motion.div style={{width: '100%'}} initial={{opacity: 0, x: '-20vw'}} animate={maximized?{opacity: 0, x: 0, transition:{duration: 0.5, ease: "easeOut"}}:{opacity: 1, x: 0, transition:{duration: 0.5, ease: "easeOut"}}} transition={{duration: 1, type: "spring", stiffness: 50, delay: 1}}>
            <PrettyHeading main={lang?"WYNIKI":"RESULTS"} secondary={lang?"INFORMACJE O TRASIE":"ROUTE INFORMATION"} sign={""}/>
            <InfoDiv>
                <HeadingMain>{lang?"Całkowity dystans":"Total length"} </HeadingMain>
                <HeadingInfo>{info.route.distance} km</HeadingInfo>
            </InfoDiv>
            <InfoDiv>
                <HeadingMain>{lang?"Szanowany czas":"Estimated time"} </HeadingMain>
                <HeadingInfo>{info.route.formattedTime}</HeadingInfo>
            </InfoDiv>
            <InfoDiv>
                <HeadingMain>{lang?"Ilość paliwa":"Fuel used"} </HeadingMain>
                <HeadingInfo>{((info.route.distance/100)*query.fuelUsage).toFixed(2)} L</HeadingInfo>
            </InfoDiv>
            <InfoDiv>
                <HeadingMain>{lang?"Całkowity koszt":"Total cost"} </HeadingMain>
                <HeadingInfo>{(((info.route.distance/100)*query.fuelUsage)*query.fuelPrice).toFixed(2)}</HeadingInfo>
            </InfoDiv>
            <div style={{margin: '20px 0'}}>
            <Button link={"/data"} text={lang?"OBLICZ INNĄ TRASĘ":"CALCULATE OTHER ROUTE"}/>
            </div>
            </motion.div>
        </LeftWrapper>
        <RightWrapper initial={{opacity: 0, x: '20vw', transition:{duration: 1, type: 'spring', stiffness: 30}}} animate={maximized?{width:'100vw', x: '-17vw', opacity: 1, transition:{duration: 1}}:{width:'50vw', x: 0, opacity: 1, transition:{duration: 1}}}>
            <Map query={query} />
        </RightWrapper>
        </>}
        </AnimatePresence>
        </Background>
    )
}
