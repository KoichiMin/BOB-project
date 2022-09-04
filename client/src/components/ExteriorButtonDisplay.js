import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';

const ExteriorButtonDisplay = ({activate}) =>{
    const [trades, setTrades] = useState([])
    useEffect(() =>{
        fetch("/get-Exterior/trades")
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
                        <Fade right>
                        <Link  to={`/trades/${element}`}>{element}</Link>
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
    gap: 12px;

    div{
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        border-radius: 50%;
        width: 100px;
        border: 1px solid black;
    }

`


export default ExteriorButtonDisplay;