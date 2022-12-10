import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import CompanyProfilePage from "./CompanyProfilePage";
// import UserProfile from "./UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import UserProfilePage from "./UserProfilePage";
import styled from "styled-components";
import Fade from 'react-reveal/Fade';

const Profile = () =>{
    const [User, setUser] = useState(false);
    const [Employer, setEmployer] = useState(false);
    const [userChoice, setUserChoice] = useState(false);
    const [load, setLoad] = useState(false);
    const [userInfo, setUserInfo] = useState(null)

    const { user} = useAuth0();
    // this useEffect is to look into the database and see if the user has created an email. If they didn't, data.data will be false. If it's true, then I'll use and if statement to see if it's a employer or client 
    useEffect(() =>{
        fetch(`/validate-info/${user.email}`)
        .then((res) => res.json())
        .then((data) =>{
            // console.log(data.data)
            setLoad(true)
            setUserChoice(data.data)
            if(data.data === true){
                setUserInfo(data.user.user)
                if(data.user.user === 'employer'){
                    setEmployer(true)
                    console.log(Employer)
                } else{
                    setUser(true)
                    // console.log(User)
                }

            }
        })
    }, [])
    return(
        load?
            <Wrapper >
                {!userChoice ?
                <StyledDiv>
                    <Link className="link" to={"/CompanyProfile"} onClick={() => {
                        setEmployer(true)
                        setUserChoice(true)
                    }
                    }>Employer</Link>
                    <Link className="link" to={"/UserProfile"} onClick={() =>{ 
                        setUser(true)
                        setUserChoice(true)
                        }}>Client</Link>
                </StyledDiv>
                :
                User  ?
                <UserProfilePage/>
                : 
                Employer  &&
                <CompanyProfilePage/>
                }
            </Wrapper>
        :
        <Circular>
            <CircularProgress/>
        </Circular>
    )
}

const Wrapper = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 25% 75%;
    font-family: 'Playfair Display', serif;
    background-color: #F4FDD9;
    height: 93.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    
    `
    const StyledDiv = styled.div`
        display: flex;
        gap: 30px;
        justify-content: center;
        align-items: center;
        margin-top: 40vh;
        
        .link{
            background-color: #EDD4B2;
            text-decoration: none;
            color: black;
            height: 80px;
            width: 180px;
            display: flex;
            font-size: 30px;
            border-radius: 10px;
            justify-content: center;
            align-items: center;

            :hover{
                background-color: #F1DEDC;
            }
            :active{
                transform: translateY(4px);
            }
        }
    `

const Circular = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
`

export default Profile

// Employer Identification Number