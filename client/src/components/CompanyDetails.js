

const CompanyDetails = ({info}) =>{

    return(
        <div>
            <div>{info.company}</div>
            <div>{info.description}</div>
            <div>{info.price}</div>
            <button>select</button>
        </div>
    )
}

export default CompanyDetails