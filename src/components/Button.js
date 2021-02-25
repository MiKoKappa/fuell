import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Buttn = styled(motion.button)`
background-color: #F86C10;
color: white;
border: none;
padding: 10px 30px;
margin: 10px 0;
font-weight: bold;
@media (max-width: 576px){
    margin: 10px 20%;
}
`

export default function Button({text, link}) {
    return (
        <>
        {
        link?
        <Link to={"/fuell"+link}>
        <Buttn whileHover={{scale: 1.1, boxShadow: "0 0 5px rgba(0,0,0,0.3)"}}>
           {text} <i className="fas fa-arrow-right"></i>
        </Buttn>
        </Link>
        :
        <Buttn whileHover={{scale: 1.1, boxShadow: "0 0 5px rgba(0,0,0,0.3)"}}>
           {text} <i className="fas fa-arrow-right"></i>
        </Buttn>
        }
        </>
    )
}
