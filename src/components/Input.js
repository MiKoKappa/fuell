import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled(motion.div)`
display: flex;
width: 100%;
margin: 10px;
`

const Icon = styled(motion.i)`
padding: 10px;
background: #F86C10;
color: white;
min-width: 30px;
text-align: center;
`
const InputField = styled(motion.input)`
width: 100%;
padding: 10px;
outline: none;
transition: all ease 0.5s;
border: 2px solid rgba(0,0,0,0.3);
border-left: none;
font-family: "Montserrat";
&:focus{
    border: 2px solid #F86C10;
    border-left: none;
}
@media (max-width: 576px) {
    max-width: 50%;
}
`


export default function Input({val, changeVal, icon, placeholder, regexp}) {
    const handleChange = (event) => { if(!event.target.value || !regexp || regexp.test(event.target.value)){changeVal(event.target.value);} }
    return (
        <Wrapper>
            <Icon className={icon}></Icon>
            <InputField placeholder={placeholder} value={val} onChange={handleChange} />
        </Wrapper>
    )
}
