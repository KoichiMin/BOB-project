// import { useNavigate } from "react-router-dom"
import ReservationPage from "../pages/ReservationPage";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const CompanyDetails = ({info}) =>{
    // this component is getting mapped by the tradesPage component. The goal is to set up all the info on the individual company 
    const { user} = useAuth0();
    const [load, setLoad] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    useEffect(() =>{
        if(user !== undefined){
            fetch(`/validate-info/${user.email}`)
                .then((res) => res.json())
                .then((data) =>{
                    if(data.data === false){
                        setLoad(true)
                        
                    }
                    else{
                        if(data.user.user === 'client' && data.user.user !== undefined){
                            setEnableButton(true);
                            setLoad(true)
                        } else{
                            setLoad(true)
                        }

                    }
                })
        } 
        
        else{
            setLoad(true);

        }
    }, []) 

    return(
        load ?
        <Wrapper>
            <div className="company">{info.company}</div>
            <Divider className="divider"/>
            <div>{info.description}</div>
            <div className="price">{info.price}</div>
            {enableButton ?
            <ReservationPage companyInfo={info}/>
            :
            <button className="button" disabled>Must login as a Client</button>
            }
        </Wrapper>
        :
        <Circular>
            <CircularProgress/>
        </Circular>
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
    .button{
    opacity: 0.5;
    align-items: center;
    appearance: none;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Playfair Display', serif;
    height: 3vh;
    width: 20vw;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
        

:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
    opacity: 0.5;
}

:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
    }
    }
`

const Circular = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export default CompanyDetails