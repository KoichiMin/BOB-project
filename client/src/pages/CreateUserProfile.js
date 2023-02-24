import { useEffect, useState } from "react"
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CreateUserProfile = ({info, User}) =>{
    const [image, setImage] = useState(null);
    const [reservation, setReservation] = useState(null);
    const { user} = useAuth0();
    const navigate = useNavigate();
    useEffect(() =>{
        fetch("https://api.unsplash.com/photos/4HG3Ca3EzWw?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU")
                .then((res) => res.json())
                .then((data) =>{
                    // console.log(data.urls.full)
                    setImage(data.urls.full)
                }) 
                .then(() =>{
                    fetch(`https://bob-project.onrender.com/get-reservation/${user.email}`)
                        .then((res) => res.json())
                        .then((data) =>{
                            setReservation(data.user)
                            // console.log(reservation)
                        })
                })
    }, [])

    const DeleteOne = (company) =>{
        // company.preventDefault()
        fetch(`https://bob-project.onrender.com/delete-reservation/${company}`, {
            method: "DELETE"
        })
            .then((res) => {
                // console.log(res)
                return res.json()
            })
            .then((data) =>{
                // console.log(data);
            })
            .catch(err =>{
                // console.log(err.message);
            })
            // window.location.reload();
            navigate("/");
    }
    // hello 
    return(
        <Wrapper>
            <div className="image" style={{backgroundImage: `url(${image})`}}></div>
            <div>
                <div className="name">{info.username}</div>
            </div>
            <div className="reservations">
            { reservation ?
            reservation.map((element) =>{
                return(
                    <div className="singleReservation" >
                        <div>{element.company}</div>
                        <div>{element.price}</div>
                        <div className="paragraph">{element.description}</div>
                        <button className="remove" onClick={()=> DeleteOne(element.price)}>Remove reservation</button>
                    </div>
                )

            })
            :
            <CircularProgress/>
            }
            </div>
            
        </Wrapper>
    )
}

const Wrapper = styled.div`
    /* height: ; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F4FDD9;
    /* font-size: 25px; */

    .name{
        font-size: 25px;
        margin-bottom: 5vh;
    }

    .image{
        height: 30vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 70% 65%;
    }

    .reservations{
        /* margin-left: 50px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 80vw;
        .singleReservation{
            border-radius: 20px;
            background-color: #EDD4B2;
            font-size: 20px;
            width: 1100px;
            height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /* border: 1px solid black; */
            .paragraph{
                width: 70vw;                
            }
            .remove{
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
                height: 5vh;
                width: 180px;
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
                        }
                    }
                }
`

export default CreateUserProfile