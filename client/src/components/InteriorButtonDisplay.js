import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {CircularProgress} from "@mui/material"
import styled from "styled-components";
import Fade from 'react-reveal/Fade';
const InteriorButtonDisplay = ({activate}) =>{
    const [trades, setTrades] = useState([])
    useEffect(() =>{
        fetch("/get-Interior/trades")
            .then((res) => res.json())
            .then((data) =>{
                setTrades(data.data);
            })
    }, [activate])

    return(
        <Wrapper>
            {    trades ?
                trades.map((element) =>{
                    return(
                        <Fade left>
                        <Link to={`/trades/${element}`}>{element}</Link>
                        </Fade>
                    ) 
                })
                :                   
                <CircularProgress/>
            }
            
        </Wrapper>
    )
    
}

const Wrapper = styled.div`
    display: flex;
    width: 336px;
    flex-wrap: wrap;
    gap: 12px;
    grid-auto-flow: column;
    justify-content: center;
    
    div{
        background-color:#E1DABD;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        border-radius: 50%;
        width: 100px;
        border: 1px solid black;
    }
    
    a{
        text-decoration: none;

    }

`



export default InteriorButtonDisplay;