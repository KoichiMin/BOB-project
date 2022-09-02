import { Link } from "react-router-dom";
import styled from "styled-components"
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
const Header = () =>{
    const { user } = useAuth0();

    return(
        <Wrapper>
            <div className="leftSide">
                <Link to={"/"}>logo</Link>
                {user &&
                <Link to={"/profile"}>profile</Link>
                }
                <Link to={"/trade/description"}>trades</Link>
            </div>
            {user ?
                <LogoutButton/>
                :
                <LoginButton/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #D4DCFF;
    display: flex;
    justify-content: space-around;

    .leftSide{
        display: flex;
        gap: 20px;
        text-decoration: none;
    }
`


export default Header