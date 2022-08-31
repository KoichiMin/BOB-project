import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CreatedCompanyProfile from "./CreatedCompanyProfile";


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
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() =>{
        fetch(`/validate-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                //console.log(data.data)
                setValidate(data.data)
                setLoad(true)
                setUserInfo(data.user)
            })
            
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch("/add-company", {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                trade : trade === "other" ? newTrade.trim() : trade.trim(), 
                company : company,
                description : description,
                price : price,
                category : category.trim(),
                email: user.email
            })
        }).then((res) => res.json()
        ).then((data) =>{
            console.log(data);
            
            if(trade === "other"){
                fetch("/add-trade-description", {
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label for="trade">Choose a trade:</label>
                <select  required onChange = {handleChange}>
                    <option value="">Choose one</option>
                    <option value="plumbing">plumbing</option>
                    <option value="electrician">electrician</option>
                    <option value="handyman">handyman</option>
                    <option value="landscaping">landscaping</option>
                    <option value="masonry">masonry</option>
                    <option value="roofing">roofing</option>
                    <option value="other">other</option>
                </select>
            
            {  trade === "other" &&  <div>
                    <label>trade</label>
                    <input required  type="text" placeholder="trade" value={newTrade} onChange = {(e) => setNewTrade(e.target.value)}/>
                    <textarea  rows="4" cols="50" value={tradeDescription} onChange = {(e) => setTradeDescription(e.target.value)} placeholder="Please write a short description of this trade"></textarea>
                </div>}
                
                </div>
                <div>
                    <label>company</label>
                    <input required type="text" placeholder="company" value={company} onChange = {(e) => setCompany(e.target.value)}/>
                </div>
                <div>
                    <label>description</label>
                    <input required type="text" placeholder="description" value={description} onChange = {(e) =>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>price</label>
                    <input required type="text" placeholder="price" value={price} onChange = {(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                <label for="Work">Type of Work:</label>
                <select  required onChange = {(e) => setCategory(e.target.value)}>
                    <option value="">Choose one</option>
                    <option  value="Interior">Interior</option>
                    <option   value="Exterior">Exterior</option>
                </select>
                </div>
                <button>Add to List</button>
            </form>
        </div>
        :
        <CircularProgress></CircularProgress>
    )

}

export default CompanyProfilePage