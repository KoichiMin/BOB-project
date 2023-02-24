import { useEffect, useState } from "react"
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateUserProfile from "./CreateUserProfile";

const UserProfilePage = () =>{
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState(null);
    const [load, setLoad] = useState(false)
    const { user} = useAuth0();
    const navigate = useNavigate();
    const [validate, setValidate] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() =>{
        fetch(`https://bob-project.onrender.com/validate-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                setValidate(data.data)
                // setLoad(true)
                setUserInfo(data.user)
            })
            .then(() =>{
                fetch("https://api.unsplash.com/photos/IWfe63thJxk?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
                        .then((res) => res.json())
                        .then((data) =>{
                            setImage(data.urls.full)
                            setLoad(true)
                        })
                    })            
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("https://bob-project.onrender.com/add-client", {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: user.email,
                user: "client"
            })
    }).then((res) => res.json())
    .then((data) =>{
        // console.log(data)
    })
    navigate("/")
}

    return(
        load ?
        validate ?
        <div>
            <CreateUserProfile info={userInfo} User={user}/>
        </div>
        :
        <Wrapper style={{backgroundImage: `url(${image})`}}>
            <form className="form" onSubmit={handleSubmit}>
                <p>Client</p>
                <div className="info">
                    <label> Username </label>
                    <input className="input" required type="text" value={username} onChange = {(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                <button className="button">Create Account</button>
                </div>
            </form>
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
    height: 92.4vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .form{

        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        background-color: #EDD4B2;
        opacity: 1;
        border-radius: 15px;
        /* border: black 1px solid; */
        height: 200px;
        width: 430px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .input{
            outline: none;
        }
        p{
            font-size: 30px;
        }
        .info{
            margin-top: 20px;
        }

        .button{
            margin-top: 10px;
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
            font-family: "JetBrains Mono",monospace;
            height: 48px;
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
        }

        .button:focus {
            box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
        }

        .button:hover {
            box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
            transform: translateY(-2px);
        }

        .button:active {
            box-shadow: #D6D6E7 0 3px 7px inset;
            transform: translateY(2px);
        }
    }
`
const Circular = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
`


export default UserProfilePage