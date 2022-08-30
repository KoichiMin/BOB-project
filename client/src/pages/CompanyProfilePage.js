import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react";

const CompanyProfilePage = () =>{
    const { user } = useAuth0();
    // const [trades, setTrades] = useState(null)
    const [validate, setValidate] = useState(null)
    console.log(user.email)
    useEffect(() =>{
        fetch(`/validate-info/${user.email}`)
            .then((res) => res.json())
            .then((data) =>{
                console.log(data.data)
                setValidate(data.data)
            })
    }, [])

    return(
        !validate ?
        <div>
            it is false
        </div>
        :
        <div>
            hello world you can create a profile
        </div>
    )

}

export default CompanyProfilePage