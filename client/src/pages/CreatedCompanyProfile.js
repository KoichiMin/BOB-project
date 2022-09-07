import styled from "styled-components"
import ImageForTradesPage from "../components/ImageForTradesPage";

// once the user has created an account. This will automatically be called and show the user's account profile
const CreatedCompanyProfile = ({info, user}) =>{

    return(
        <Wrapper>
            <div>
                <ImageForTradesPage trade={info.trade}/>
            </div>
        <StyledDiv>
            <div className="title">Profile</div>
            <img className="profile-image" src={user.picture} alt="the user profile"/>
            <div>{info.company}</div>
            <div>{info.email}</div>
            <div>{info.trade}</div>
            <div>{info.price}</div>
        </StyledDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-color: #F4FDD9;
font-family: 'Playfair Display', serif;

.profile-image{

}
`

const StyledDiv = styled.div`
    height: 63.5vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 25px;

    .title{
        font-size: 40px;
        margin-bottom: 10vh;
    }
    
`

export default CreatedCompanyProfile
