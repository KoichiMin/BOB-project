import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CreatedCompanyProfile from "./CreatedCompanyProfile";
import styled from "styled-components";

// this page is accessible once you click on the trade button on the Header. If you have an account which was validated by checking the database, it will call the CreatedCompanyProfile or else you can create a company profile 
const CompanyProfilePage = () =>{
    const navigate = useNavigate();

    const { user} = useAuth0();
    
    const [trade, setTrade] = useState(null);
    const [newTrade, setNewTrade] = useState(null);
    const [tradeDescription, setTradeDescription] = useState(null);
    const [company, setCompany] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [validate, setValidate] = useState(null);
    const [load, setLoad] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [tradeName, setTradeName] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() =>{
        // the validation is needed to check whether the email already exist inside the database. if it doesn't exist then we can conditionally render it to create a new account
        fetch(`https://bob-project-website.herokuapp.com/validate-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                setValidate(data.data)
                // setLoad(true)
                setUserInfo(data.user)
            })
            .then(() =>{
                // were trying to get all the trades inside a useState to see whether the user is going to created a new trade or not 
                fetch("https://bob-project-website.herokuapp.com/get-all-trades")
                    .then((res) => res.json())
                    .then((data) =>{
                        setTradeName(data.data)                
                    })
                    .then(() =>{
                        // fetching the background image 
                        fetch("https://api.unsplash.com/photos/x-ghf9LjrVg?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
                            .then((res) => res.json())
                            .then((data) =>{
                                console.log(data.urls.full)
                                setImage(data.urls.full)
                                setLoad(true)
                            })
                    })

            })
            
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        // this POST is add the user's company inside the database so in the future, the user won't need to create a new profile 
        fetch("https://bob-project-website.herokuapp.com/add-company", {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                trade : trade === "other" ? newTrade.trim() : trade.trim(), 
                company : company,
                description : description,
                price : price + "$",
                category : category.trim(),
                email: user.email,
                user: "employer"
            })
        }).then((res) => res.json()
        ).then((data) =>{
            console.log(data);
            // if the user is created a new trade then we will need to add that trade description inside the description database
            if(trade === "other"){
                fetch("https://bob-project-website.herokuapp.com/add-trade-description", {
                    method: 'POST',
                    headers:{
                        'Content-type':'application/json',
                    },
                    body: JSON.stringify({
                        trade : newTrade.trim(), 
                        description : tradeDescription
                    })
                })
            }
        })
        navigate("/")
    }
    // this handle is needed to control which trade the user will pick. If its other then we will know to add a textarea for a description
    const handleChange = (e) =>{
        setTrade(e.target.value)
    }

    return (
        load ?
        validate ?
        <div>
            <CreatedCompanyProfile info={userInfo} user={user}/>
        </div>
        :
        <Wrapper>
        {/* <div className="image" style={{backgroundImage: `url(${image})`}}></div> */}
        <StyledDiv style={{backgroundImage: `url(${image})`}}>
            <form className="form" onSubmit={handleSubmit}>
                <div className="create-profile">Create Profile</div>
                <div className="except-title">
                <div>
                    <label>company : </label>
                    <input required type="text" value={company} onChange = {(e) => setCompany(e.target.value)}/>
                </div>
                <div>
                    <label>price : </label>
                    <input required type="text" value={price} onChange = {(e) => setPrice(e.target.value)}/>
                </div>
                <div className="trade-option">
                <div className="type-work">
                    <label for="Work">Type of Work : </label>
                    <select  required onChange = {(e) => setCategory(e.target.value)}>
                        <option value="">Choose one</option>
                        <option  value="Interior">Interior</option>
                        <option   value="Exterior">Exterior</option>
                    </select>
                </div>
                <div className="">
                <label className="choose-trade" for="trade">Choose a trade : </label>
                <select className=""  required onChange = {handleChange}>
                    <option value="">Choose one</option>
                    {tradeName && tradeName.map((element) =>{
                        return(
                            <option value={element}>{element}</option>
                        )
                    })}
                    <option value="other">other</option>
                </select>
            
            {  trade === "other" &&  <div className="">
                    {/* <label>trade :</label> */}
                    <input required  type="text" placeholder="trade" value={newTrade} onChange = {(e) => setNewTrade(e.target.value)}/>
                    <textarea  rows="2" cols="40" value={tradeDescription} onChange = {(e) => setTradeDescription(e.target.value)} placeholder="Please write a short description of this trade"></textarea>
                </div>}
                
                </div>
                <div className="">
                    <br/>
                    <label>description : </label>
                    <textarea rows="2" cols="40" placeholder="Please write a short description of your company" required type="text"  value={description} onChange = {(e) =>setDescription(e.target.value)}/>
                </div>
                </div>
                <button className="button">Add to List</button>
                </div>
            </form>
        </StyledDiv>
        </Wrapper>           
        :
        <Render>
            <CircularProgress></CircularProgress>
        </Render>
    )

}

const Wrapper = styled.div`
    .image{
        height: 30vh;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 25% 75%;
    }

`

const StyledDiv = styled.div`
    /* height: 30vh;
    width: 100%; */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 25% 75%;
    font-family: 'Playfair Display', serif;
    background-color: #F4FDD9;
    height: 93.5vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    
    .form{
        opacity: 1;
        border-radius: 15px;
        /* border: black 1px solid; */
        background-color: white;
        height: 470px;
        width: 430px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #EDD4B2;
    }
    
    .except-title{
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .type-work{
        margin-bottom: 10px;
    }
    .choose-trade{
        margin-top: 10px;
    }
    .trade-option{
        align-items: center;
        text-align: center;
    }

    .create-profile{
        display: flex;
        justify-content: center;
        font-size: 35px;
    }

    .button{
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

    
`

const Render = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40vh;
`

export default CompanyProfilePage