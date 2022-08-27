// import SearchBar from "../components/SearchBar";
// import { User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import InteriorButtonDisplay from "../components/InteriorButtonDisplay";
import ExteriorButtonDisplay from "../components/ExteriorButtonDisplay";
import UserProfile from "../components/UserProfile";

const HomePage = () =>{
    const [image, setImage] = useState(null)
    const [interiorTrue, setInteriorTrue] = useState(false)
    const [exteriorTrue, setExteriorTrue] = useState(false)


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


    return(
        <Wrapper>
            <StyledDiv style={{backgroundImage: `url(${image})`}}>
                <div className="topsection">
                    <UserProfile/>
                    <button onClick={() =>handleInterior()}>Interior</button>
                    <button onClick={() =>handleExterior()}>Exterior</button>
                </div>
                <MidDiv>       
                    {interiorTrue && <InteriorButtonDisplay activate={interiorTrue}/>}
                    {exteriorTrue && <ExteriorButtonDisplay activate={exteriorTrue}/>}
                </MidDiv>
                <BottomDiv>
                    <button>Emergency!<br></br>Ask BOB for help</button>
                </BottomDiv>
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
    overflow: hidden;

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


export default HomePage;