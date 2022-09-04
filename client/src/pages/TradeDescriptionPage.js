import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";

// this page is to show all the trades with their description
const TradeDescriptionPage = () =>{
    const [tradesInfo, setTradeInfo] = useState(null)
    const [image, setImage] = useState(null);
    useEffect(() =>{
        fetch("https://api.unsplash.com/photos/VLPUm5wP5Z0?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data.urls.full)
                setImage(data.urls.full)

            }).then(() =>{
                fetch("/get-all-description")
                    .then((res) => res.json())
                    .then((data) =>{
                        setTradeInfo(data.data)
                        
                    })


            })
    }, [])
    return (
        <Wrapper>
            <div className="image" style={{backgroundImage: `url(${image})`}}><span className="title">Trade Description</span></div>
            {/* <div>trade Description</div> */}
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

    .title{
        font-size: 40px;
        padding-left: 43vw;
        margin-top: 20vh;
        display: flex;
        align-items: flex-end;
    }

    .image{
        height: 30vh;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 25% 75%;
    }
`

const StyledDiv = styled.div`
    width: 40vw;
    /* border: 1px solid black; */
    background-color: #EDD4B2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    font-family: 'Playfair Display', serif;
    border-radius: 20px;

    :hover{
        background-color: #ABC798;
    }

    :active{
        transform: translateY(4px);
    }

    .link{
        text-decoration: none;
        color: black;
        text-align: center;
    }
    .trade-title{
        font-size: 20px;
    }
`

export default TradeDescriptionPage