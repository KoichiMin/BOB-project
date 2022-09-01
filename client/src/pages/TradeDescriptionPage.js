import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

// this page is to show all the trades with their description
const TradeDescriptionPage = () =>{
    const [tradesInfo, setTradeInfo] = useState(null)

    useEffect(() =>{
        fetch("/get-all-description")
            .then((res) => res.json())
            .then((data) =>{
                setTradeInfo(data.data)
                
            })
    }, [])
    return (
        <div>
            {
                tradesInfo ? 
                tradesInfo.map((element) =>{
                    return(
                        <div>
                            <Link to={`/trades/${element.trade}`}>{element.trade}</Link>
                            <div>{element.description}</div>
                        </div>
                    )
                })
                :
                <CircularProgress/>
            }
        </div>
    )
}

export default TradeDescriptionPage