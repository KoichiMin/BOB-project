import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";

// Can be called if the user clicks on the trades button on the Header. This page is to show all the trades with their description
const TradeDescriptionPage = () =>{
    const [tradesInfo, setTradeInfo] = useState(null)
    const [image, setImage] = useState(null);
    useEffect(() =>{
        // fetching an image with the unsplash api
        fetch("https://api.unsplash.com/photos/VLPUm5wP5Z0?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)
            }).then(() =>{
                fetch("https://bob-project.onrender.com/get-all-description")
                    .then((res) => res.json())
                    .then((data) =>{
                        setTradeInfo(data.data)       
                    })
            })
    }, [])

    return (
        <Wrapper>
            <div className="image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="except-image">
                <div className="title">Trade Description</div>
                <div className="MidSection">
                {
                    tradesInfo ? 
                    tradesInfo.map((element) =>{
                        return(
                            <StyledDiv>
                                <Link className="link" to={`/trades/${element.trade}`}>
                                <div className="trade-title">{element.trade}</div>
                                <div>{element.description}</div>
                                </Link>
                            </StyledDiv>
                        )
                    })
                    :
                    <CircularProgress/>
                }
                </div>
            </div>    
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    /* flex-direction: column; */
    gap: 20px;
    /* width: 60vw; */
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #F4FDD9;
    height: auto;


    .image{
        height: 30vh;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 25% 75%;
    }

    .except-image{
        display: flex;
        flex-direction: column;
        
        align-items: center;
    }

    .MidSection{
        display: flex;
        width: 90vw;
        gap: 20px;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .title{
        font-size: 40px;
        margin-bottom: 5vh;
    }
`

const StyledDiv = styled.div`
    width: 620px;
    height: 220px;
    /* border: 1px solid black; */
    background-color: #EDD4B2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    font-family: 'Playfair Display', serif;
    border-radius: 20px;

    :hover{
        background-color: #F1DEDC;
    }

    :active{
        transform: translateY(4px);
    }

    .link{
        text-decoration: none;
        color: black;
        text-align: center;
        font-size: 18px;
    }
    .trade-title{
        font-size: 30px;
        padding-bottom: 7px;
    }
`

export default TradeDescriptionPage