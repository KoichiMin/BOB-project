import { useEffect, useState } from "react";
import styled from "styled-components";
import InteriorButtonDisplay from "../components/InteriorButtonDisplay";
import ExteriorButtonDisplay from "../components/ExteriorButtonDisplay";
import UserProfile from "../components/UserProfile";
import Fade from 'react-reveal/Fade';
import ChatBotComponent from "../components/ChatbotComponent";


// the intro page to the website. 
const HomePage = () =>{
    const [image, setImage] = useState(null)
    const [interiorTrue, setInteriorTrue] = useState(false)
    const [exteriorTrue, setExteriorTrue] = useState(false)
    const [view, setView] = useState(true);

    useEffect(() =>{
        // this image is fetched from unsplash and set as a background image 
        fetch("https://api.unsplash.com/photos/TRCJ-87Yoh0/?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)

            })
    }, [])

    // once called it will activate the InteriorButtonDisplay so we can display the interior trades
    const handleInterior = () =>{
        setExteriorTrue(false)
        setInteriorTrue(true)
    }
    // once called it will activate the ExteriorButtonDisplay so we can display the exterior trades
    const handleExterior = () =>{
        setInteriorTrue(false)
        setExteriorTrue(true)
    }
    
    // toggle button to display or hide the chatbot component  
    const handleView = (e) =>{
        e.preventDefault();
        setView(prev => !prev)
    }


    return(
        <Wrapper id="wrapper">
            <StyledDiv image={image}>
                    <UserProfile/>
                    <div className="quote">
                    <Fade left >Love where you live…renovate</Fade>
                    </div>
                <div className="content">

                    <div className="words">Where would you like to renovate? </div>
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
                <ChatBotComponent  setView={setView} handleView={handleView}/>
                }

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
    background-image: url(${(props) => props.image});
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
        margin-top: 16vh;
        height: 100%;
    }
    .topsection{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 8vh;
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



export default HomePage;