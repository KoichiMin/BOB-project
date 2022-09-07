import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";

// called inside the CompanyDetails so the modal can be displayed. Once shown, the user can now place a reservation
const ReservationPage = ({companyInfo}) =>{

    // this is how the control the display of the modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    // once clicked it will display the modal
    const openModal = () => {
        setIsOpen(true)
    }

    // if clicked the modal will be closed 
    const closeModal = () => {
        setIsOpen(false);
        setConfirmed(false);
        
    }
    // once the user places a reservation, a new modal will show that the reservation was accomplished. This button will helped the user close the modal and get back to the Homepage
    const finalCloseModal = () => {
        setIsOpen(false);
        setConfirmed(false);
        navigate("/");
    }

    // this will activated once the form is being submitted. Just changing the useState setConfirmed
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmed(true)
    
    }
    return(
        
        <>
            <StyledButton onClick={openModal} >select</StyledButton>
            <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Place Reservation"
            >
            {confirmed === false ?
            
            <Wrapper>
                <StyledTitle>Reservation</StyledTitle>
                    <InputContainer>
                    <h1 className="company-title">{companyInfo.company}</h1>
                    <h1>{companyInfo.description}</h1>
                    <h1>Price per Hour: {companyInfo.price}</h1>
                    </InputContainer>
                    <form onSubmit={handleSubmit}>

                    <InputContainer>
                        <StyledLabel>Full Name</StyledLabel>
                        <StyledInput required={true} type="text" placeholder="Card Holder Name"></StyledInput>
                    </InputContainer>

                    <InputContainer>
                        <StyledLabel>Phone Number</StyledLabel>
                        <StyledInput required={true} type="text" placeholder="Card Number"></StyledInput>
                    </InputContainer>


                    <ButtonContainer>
                        <StyledConfirmButton type="submit">Place Reservation</StyledConfirmButton>
                        <StyledCancelButton onClick={closeModal}>Cancel</StyledCancelButton>
                    </ButtonContainer>

                    </form>
            </Wrapper>
                : confirmed === true &&
                <>
                <ConfirmedDiv>
                    <StyledLabel>Thank you for placing a reservation!</StyledLabel>
                    <StyledCloseButton onClick={finalCloseModal}>close</StyledCloseButton>
                </ConfirmedDiv>
                </>
                }
            </Modal>
        </>
    )
}

const StyledButton = styled.button`

    align-items: center;
    appearance: none;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: 'Playfair Display', serif;
    height: 3vh;
    width: 7vw;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;


:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
}

:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
    }
`

const StyledTitle = styled.h1`
    color:#CBC4A8;
    margin-top:2vh;
    margin-bottom: 2vh;
    font-size: 2vw;
    font-family: 'Playfair Display', serif;

    `
const Wrapper = styled.div`
    width:30vw;
    height: 50vh;
    font-family: 'Playfair Display', serif;
    .company-title{
        font-size: 25px;
        margin-bottom: 2vh;
    }
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2vw;
    margin-bottom: 2vh;
`
const StyledLabel = styled.label`
    font-size: large;
    margin-bottom: 1vh;
`

const StyledInput = styled.input`
    color:grey;
    border:solid 1px;
    padding-top:0.2vh;
    padding-bottom:0.2vh;
    width: 25.3vw;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 3vh;
`
const StyledConfirmButton = styled.button`
    background-color: #CBC4A8;
    border-width: 0;
    border-radius: 2vw;
    margin-right: 2vw;
    padding:1vh 2vw;
    color:white;
    font-weight: bold;
    
    &:hover,
    &:focus,
    &:active {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
        }
`
const StyledCancelButton = styled.button`
    background-color: lightgray;
    border-width: 0;
    border-radius: 2vw;
    margin-left: 2vw;
    padding:1vh 2vw;
    color:white;
    font-weight: bold;
    &:hover{
        cursor: pointer;
    }
`

const StyledCloseButton = styled.button`
    background-color: #0d47a1;
    border: none;
    border-radius: 5px;
    width: 80px;
    color:white;
    margin-top: 10px;
    font-size: 18px;
    &:hover{
        cursor: pointer;
    }
`
const ConfirmedDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .closeButton{
        background-color: #d32f2f;
    }
`

export default ReservationPage