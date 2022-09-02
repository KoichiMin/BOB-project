// import SearchBar from "../components/SearchBar";
// import { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InteriorButtonDisplay from "../components/InteriorButtonDisplay";
import ExteriorButtonDisplay from "../components/ExteriorButtonDisplay";
import UserProfile from "../components/UserProfile";
import ChatBot from 'react-simple-chatbot'


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
        <Wrapper>
            <StyledDiv style={{backgroundImage: `url(${image})`}}>
                    <UserProfile/>
                <div className="topsection">
                    <button onClick={() =>handleInterior()}>Interior</button>
                    <button onClick={() =>handleExterior()}>Exterior</button>
                </div>
                <MidDiv>       
                    {interiorTrue && <InteriorButtonDisplay activate={interiorTrue}/>}
                    {exteriorTrue && <ExteriorButtonDisplay activate={exteriorTrue}/>}
                </MidDiv>

                {  !view &&  
                <ChatbotDiv>
                    <ChatBot className="chatbot" steps={steps}/>
                    <button onClick={handleView}>Hide ChatBot</button>
                </ChatbotDiv>}

                {view && 
                <BottomDiv>
                    <button onClick={handleView}>Emergency!<br></br>Ask BOB for help</button>
                </BottomDiv>}
            </StyledDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* overflow: hidden; */
`


const StyledDiv = styled.div`
    height: 97.75vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    opacity: 0.8;
    position: relative;
    /* overflow: hidden; */

    .topsection{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 45vh;
        gap: 10px;
    }

`
const MidDiv = styled.div`
    display: flex;
    height: 30vh;
    justify-content: center;
    align-items: center;

`

const BottomDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5vw;

`
const ChatbotDiv = styled.div`
position: absolute;
bottom: 0;

.chatbot{
    /* background: red; */
}

`


export default HomePage;