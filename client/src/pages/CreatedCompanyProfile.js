
import { useEffect } from "react";


const CreatedCompanyProfile = ({info, user}) =>{
        
    
    return(
        <div>
            <img src={user.picture} alt="the user profile"/>
            <div>{info.company}</div>
            <div>{info.email}</div>
            <div>{info.trade}</div>
            <div>{info.price}</div>
        </div>
    )
}

export default CreatedCompanyProfile