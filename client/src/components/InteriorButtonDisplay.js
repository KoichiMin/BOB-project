import { useEffect, useState } from "react";
import {CircularProgress} from "@mui/material"
import styled from "styled-components";

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
                        <StyledButton>{element}</StyledButton>
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

const StyledButton = styled.button`
    border: none;
`


export default InteriorButtonDisplay;