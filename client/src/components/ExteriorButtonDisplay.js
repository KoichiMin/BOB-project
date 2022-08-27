import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
                        <Link to={`/trades/${element}`}>{element}</Link>
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

`

// const StyledButton = styled.button`
//     border: none;
// `

export default ExteriorButtonDisplay;