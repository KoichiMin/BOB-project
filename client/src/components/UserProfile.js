import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// called on the Homepage. I didn't want to show anything but I wanted it to be called so it can post the info inside the database 
const UserProfile = () =>{
    const { user, isAuthenticated, isLoading} = useAuth0();
        useEffect(() =>{
            if(isAuthenticated){
                fetch("/send-info", {
                    method: 'POST',
                    headers : {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({data: user})
                })
                .then(res => res.json())
                .then((data) =>{
                    // console.log(data)
                })       
            }

        }, [isAuthenticated])
    
    if(isLoading){
        return <div></div>
    }
    return(
        isAuthenticated && (
            <div>
                {/* <img src={user.picture} alt="the user profile"/>
                <h2>{user.nickname}</h2>
                <p>{user.email}</p> */}
            </div>
        )
    )
};

export default UserProfile