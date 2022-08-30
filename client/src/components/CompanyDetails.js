import { useNavigate } from "react-router-dom"
import ReservationPage from "../pages/ReservationPage";


const CompanyDetails = ({info}) =>{
    // const navigate = useNavigate();

    // const handleSelect = (e) =>{
    //     e.preventDefault();
    //     navigate("/reservaton/${info.company}")
    // }
    {/* <button onClick={(e) =>{
        e.preventDefault();
    navigate(`/reservaton/${info.company}`) 
    }}>select</button> */}

    return(
        <div>
            <div>{info.company}</div>
            <div>{info.description}</div>
            <div>{info.price}</div>
            <ReservationPage companyInfo={info}/>
        </div>
    )
}

export default CompanyDetails