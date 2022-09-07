import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import CompanyDetails from "../components/CompanyDetails";
import ImageForTradesPage from "../components/ImageForTradesPage";

// Called once the user clicked on a trade inside the HomePage. The page will display all the companies connected to the trade and also show a description of the trade.
const TradesPage = () =>{
    const {trade} = useParams()
    const [companies, setCompanies] = useState(null);
    const [description, setDescription] = useState(null);
    const [changeHeight, setChangeHeight] = useState(false)

    useEffect(() =>{
        // fetching the description of the trade 
        fetch(`/get-description/${trade}`)
            .then((res) => res.json())
            .then((data) =>{
                setDescription(data.data[0].description);
            })
            .then(() =>{
                // fetching all the companies connected to the trade 
                fetch(`/get-companies/${trade}`)
                    .then((res) => res.json())
                    .then((data) =>{
                        console.log(data.data);
                        setCompanies(data.data);
                        if(data.data.length > 1){
                            setChangeHeight(true)
                            console.log(changeHeight)
                        }
                    })

            })
    }, [])
    

    return (
        <Wrapper changeHeight={changeHeight}>
            <ImageForTradesPage trade={trade}/>
            <div className="except-image">
                <div className="left-section">
                    <div className="title">{trade}</div>
                    <div className="description">{description}</div>
                </div>
                <MidSection>
                {   
                companies ?
                    companies.map((element) =>{
                        return(
                <StyledDiv>
                            <CompanyDetails  info={element}/>
                </StyledDiv>
                        ) 
                    })
                    :                   
                <CircularProgress/>
                }
                </MidSection>
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F4FDD9;
    height: ${(props) => (props.changeHeight ?  " 100%" : "93.5vh" )};
    font-family: 'Playfair Display', serif;
    /* .except-image{
        display: flex;

    } */

    .left-section{
        display: flex;
        flex-direction: column;
        align-items: center;

        .title{
            font-size: 40px;
            margin-top: 10px;
        }
        .description{
            font-size: 20px;
            width: 40vw ;
            margin: 10px;
        }
    }
`

const MidSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledDiv = styled.div`
    width: 40vw;
    margin: 10px;
    background-color: #EDD4B2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    font-family: 'Playfair Display', serif;
    border-radius: 20px;


`


export default TradesPage;