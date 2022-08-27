import { Link } from "react-router-dom";
import styled from "styled-components"
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
const Header = () =>{
    return(
        <Wrapper>
            <div className="leftSide">
                <Link to={"/"}>logo</Link>
                {/* <div>Home</div>
                <div>Trades</div> */}
            </div>
                <LoginButton/>
                <LogoutButton/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: lightblue;
    display: flex;
    justify-content: space-around;

    .leftSide{
        display: flex;
    }
`


export default Header