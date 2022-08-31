import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import CompanyDetails from "../components/CompanyDetails";

const TradesPage = () =>{
    const {trade} = useParams()
    const [companies, setCompanies] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() =>{
        fetch(`/get-description/${trade}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data.data[0]);
                setDescription(data.data[0].description);
            })
            .then(() =>{
                fetch(`/get-companies/${trade}`)
                    .then((res) => res.json())
                    .then((data) =>{
                        console.log(data.data);
                        setCompanies(data.data);
                    })

            })
            


    }, [])
    

    return (
        <Wrapper>
            <div>{trade}</div>
            <div>{description}</div>
            {   
            companies ?
                companies.map((element) =>{
                    return(
                        <CompanyDetails  info={element}/>
                    ) 
                })
                :                   
            <CircularProgress/>
            }
        </Wrapper>
    )
}


const Wrapper = styled.div`
`

export default TradesPage;