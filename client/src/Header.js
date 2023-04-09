import { Link } from "react-router-dom";
import styled from "styled-components"
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Hamburger from 'hamburger-react'

// the Header for the whole website. Offers multiple links to be clicked to redirect the user to different pages 
const Header = () =>{
    const { user } = useAuth0();
    const [isOpen, setIsOpen] = useState(true);
    const [toggle, setToggle] = useState(false)
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    
    useEffect(() =>{
        const handleResize = () => {
            if (window.innerWidth > 940) {
                setIsOpen(true);
                setToggle(false);
            } else {
                setToggle(true);
            }
            
        };
    
        window.addEventListener("resize", handleResize);   
        // return () => window.removeEventListener("resize", handleResize);
    }, [])
    return(
        !toggle ? 
        <Wrapper>
            <div className="leftSide">
                <Link className="link" to={"/"}>home</Link>
                <Link className="link" to={"/trade/description"}>trades</Link>
                {user &&
                <Link className="link" to={"/profile"}>profile</Link>
                }
            </div>
        
            <a href="/">
            <div className="scroll-down"></div>
            </a>

            {user ?
                <LogoutButton/>
                :
                <LoginButton/>}
        </Wrapper>
        :
        <>
        <Wrap>
            <Hamburger className="hamburger"  onToggle={() => toggleDropdown()} />
        </Wrap>
        {!isOpen &&
        <Wrapper >
            <div className="leftSide">
            <Link className="link" to={"/"}>home</Link>
            <Link className="link" to={"/trade/description"}>trades</Link>
            {user &&
            <Link className="link" to={"/profile"}>profile</Link>
            }
        </div>

        <a href="/">
        <div className="scroll-down"></div>
        </a>

        {user ?
            <LogoutButton/>
            :
            <LoginButton/>}
        </Wrapper>   }
        </>
    )
}

const Wrap = styled.div`
    position: relative;
    background-color: #F1DEDC;
    height: 60px;
    scroll-behavior: smooth;

    .hamburger{
        margin-right:80%
    }
`

const Wrapper = styled.div`
    position: relative;
    background-color: #F1DEDC;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    scroll-behavior: smooth;

    .leftSide{
        display: flex;
        gap: 20px;
        text-decoration: none;
    }





    .link {
        background-color:#F1DEDC;
        border: 1px solid #222222;
        border-radius: 8px;
        box-sizing: border-box;
        color: #222222;
        cursor: pointer;
        display: inline-block;
        font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        margin: 0;
        outline: none;
        padding: 13px 23px;
        position: relative;
        text-align: center;
        text-decoration: none;
        width: auto;
    }
    .link:hover{
        background-color: #F7F7F7;
        border: none;
    }

    .link:active {
        background-color: #F7F7F7;
        border-color: #000000;
        transform: scale(.96);
        transform: translateY(4px);
    }


    
`


export default Header