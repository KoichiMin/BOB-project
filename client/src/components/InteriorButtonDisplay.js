import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {CircularProgress} from "@mui/material"
import styled from "styled-components";
import Fade from 'react-reveal/Fade';
import axios from 'axios'
//  being called in the Homepage so that when its clicked it will display all the interior trades 
const InteriorButtonDisplay = ({activate}) =>{
    const [trades, setTrades] = useState([])
    const fetchData =  () =>{
        axios.get("https://bob-project-website.herokuapp.com/get-Interior/trades")
        .then((data) =>{
            setTrades(data.data.data);
            console.log(data.data)
        })
    }
    useEffect(() =>{
            // this fetch is to get all the trades that have an interior category in their CompanyInfo
        // fetch("/copy-Interior/trades")
        //     .then((res) => res.json())
        //     .then((data) =>{
        //         setTrades(data.data.data);
        //         console.log(data.data.data)
        //         // console.log(trades)
        //     })
        fetchData()

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
        /* border: 1px solid black; */
    }
    
    a{
        text-decoration: none;
        color: black;
        /* font-weight: bold; */
        font-size: 18px;
        font-family: 'Playfair Display', serif;
    }

`



export default InteriorButtonDisplay;