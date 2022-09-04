// import SearchBar from "../components/SearchBar";
// import { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InteriorButtonDisplay from "../components/InteriorButtonDisplay";
import ExteriorButtonDisplay from "../components/ExteriorButtonDisplay";
import UserProfile from "../components/UserProfile";
import ChatBot from 'react-simple-chatbot'
import Fade from 'react-reveal/Fade';

const HomePage = () =>{
    const [image, setImage] = useState(null)
    const [interiorTrue, setInteriorTrue] = useState(false)
    const [exteriorTrue, setExteriorTrue] = useState(false)
    const [view, setView] = useState(true);

    useEffect(() =>{
        fetch("https://api.unsplash.com/photos/TRCJ-87Yoh0/?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
            .then((res) => res.json())
            .then((data) =>{
                // console.log(data.urls.full)
                setImage(data.urls.full)

            })
    }, [])

    const handleInterior = () =>{
        setExteriorTrue(false)
        setInteriorTrue(true)
    }
    
    const handleExterior = () =>{
        setInteriorTrue(false)
        setExteriorTrue(true)
    }
    
    const handleView = (e) =>{
        e.preventDefault();
        setView(prev => !prev)
    }

    const steps = [
        { id: '0', message: 'Welcome to the BOB project!', trigger: '1',},

        { id: "1", message: "Please enter your name!", trigger: "waiting1", },

        { id: "waiting1", user: true, trigger: "Name", },
    
        { id: "Name", message: "Hi {previousValue}, Do you need immediate assistance?", trigger: "issues", },

        { id: "issues",
        options: 
        [
            { value: "Yes", label: "Yes", trigger: "Yes" },   
            { value: "No", label: "No", trigger: "No" },        
        ],
        },
        { id: "Yes", message:" We will contact our emergency team and send someone right away!", end: true},

        { id: "No", message:"Please use the dropdown at the center of the page to place a reservation", trigger: "secondlast"},

        { id: "secondlast", message:"You may also call our assistance line (514)239-7212 to get more info. Thank You. ", end: true },

    ];


    return(
        <Wrapper id="wrapper">
            <StyledDiv style={{backgroundImage: `url(${image})`}}>
                    <UserProfile/>
                    <div className="quote">
                    <Fade left >Love where you live…renovate</Fade>
                    </div>
                <div className="content">

                    <div className="words">Click on the type of work environment </div>
                    <div className="topsection">
                        <button className="center-button" onClick={() =>handleInterior()}>Interior</button>
                        <button className="center-button" onClick={() =>handleExterior()}>Exterior</button>
                    </div>
                    <MidDiv>       
                        {interiorTrue && <InteriorButtonDisplay activate={interiorTrue}/>}
                        {exteriorTrue && <ExteriorButtonDisplay activate={exteriorTrue}/>}
                    </MidDiv>
                </div>    

                {  !view &&  
                <ChatbotDiv>
                    <ChatBot className="chatbot" steps={steps}/>
                    <button onClick={handleView}>Hide ChatBot</button>
                </ChatbotDiv>}

                {view && 
                <BottomDiv>
                    <button className="bottom-button" onClick={handleView}>Emergency!<br></br>Ask BOB for help</button>
                </BottomDiv>}
            </StyledDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* overflow: hidden; */
    
    .quote{
        
        font-family: 'Playfair Display', serif;
        color: black;
        font-size: 60px;
        /* margin-right: 3vw;
        margin-bottom: 20vh; */
        font-weight: bold;
        background-color: #E1DABD;
        padding: 14px 0 34px;
        align-items: center;
        display: flex;
        justify-content: center;
        div{
            width: fit-content;

        }
    }

`


const StyledDiv = styled.div`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    /* border: 1px solid black; */
    min-height: calc(100vh - 60px);
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    position: relative;
    overflow: hidden;

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 32px 0;

    }
    .words{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        margin-top: 15vh;
        height: 100%;
    }
    .topsection{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 12vh;
        gap: 10px;
        .center-button{
            border: none;
            height: 5vh;
            width: 7vw;
            border-radius: 10px;
            font-size: 20px;
        }
        .center-button:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        }
        .center-button:active{
            transform: translateY(4px);
        }
    }

`
const MidDiv = styled.div`
    display: flex;
    height: 40vh;
    justify-content: center;
    align-items: center;


`

const BottomDiv = styled.div`
    position: absolute;
    bottom: 35px;
    left: 30px;
    .bottom-button{
            border: none;
            height: 8vh;
            width: 12vw;
            border-radius: 200px;
            font-size: 20px;
        }
        .bottom-button:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        background-color: red;
        color: white;
        }
        .bottom-button:active{
            transform: translateY(4px);
        }
`
const ChatbotDiv = styled.div`
position: absolute;
bottom: 0;

.chatbot{
    div{
        /* background-color: #E1DABD; */


    }
}

`


export default HomePage;