// import { useNavigate } from "react-router-dom"
import ReservationPage from "../pages/ReservationPage";


const CompanyDetails = ({info}) =>{

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