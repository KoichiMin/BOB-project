// import { useNavigate } from "react-router-dom"
import ReservationPage from "../pages/ReservationPage";
import styled from "styled-components";
import { Divider } from "@mui/material";

const CompanyDetails = ({info}) =>{
    // this component is getting mapped by the tradesPage component. The goal is to set up all the info on the individual company 
    return(
        <Wrapper>
            <div className="company">{info.company}</div>
            <Divider className="divider"/>
            <div>{info.description}</div>
            <div className="price">{info.price}</div>
            <ReservationPage companyInfo={info}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    .company{
        font-size: 20px;

    }
    .divider{
        background-color: black;
        width: 40%;
    }
    .price{
        font-size: 20px;
        font-weight: 500;
    }
`


export default CompanyDetails