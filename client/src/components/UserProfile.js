import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const UserProfile = () =>{
    const { user, isAuthenticated, isLoading} = useAuth0();
    // console.log(isAuthenticated);
    //console.log(user)
    // useEffect(() =>{
    //     fetch("/send-info", {
    //         method: 'POST',
    //         headers : {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({data: user})
    //     })
    //     .then(res => res.json())
    //     .then((data) =>{
    //         //console.log(data)
    //     })
    // }, [])
    
    if(isLoading){
        return <div>Loading!</div>
    }
    return(
        isAuthenticated && (
            <div>
                <img src={user.picture} alt="the user profile"/>
                <h2>{user.nickname}</h2>
                <p>{user.email}</p>
            </div>
        )
    )
};

export default UserProfile