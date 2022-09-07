import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

// this is the login button that's being called from the Header. Once you click it, its going to activate the loginWithRedirect so show the login page 
const LoginButton = () =>{
    const {loginWithRedirect} = useAuth0();

    return(
        <Styleddiv>
        <button className="button-23" onClick={ () => loginWithRedirect()}>Log in</button>
        </Styleddiv>
    )
};


const Styleddiv = styled.div`

.button-23 {
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
.button-23:hover{
    background-color: white;
    border: none;
}



.button-23:active {
    background-color: #F7F7F7;
    border-color: #000000;
    transform: scale(.96);
    transform: translateY(4px);
}


`
export default LoginButton