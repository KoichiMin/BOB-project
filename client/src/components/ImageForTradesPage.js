import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components";

const ImageForTradesPage = ({trade}) =>{
    const [image, setImage] = useState(null);
    useEffect(() =>{
        if(trade === "plumbing"){
            fetch('https://api.unsplash.com/photos/p5i7uyPuHto/?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU')
                .then((res) => res.json())
                .then((data) =>{
                    setImage(data.urls.full)
                    console.log(data.urls.full)
                })
        }
        if(trade === 'electrician'){
            fetch('https://api.unsplash.com/photos/3GZi6OpSDcY?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU')
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)
                console.log(data.urls.full)
            })
        }
        if(trade === 'landscaping' ){
            fetch('https://api.unsplash.com/photos/MJwb8dEQmr0?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU')
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)
                console.log(data.urls.full)
            })
        }
        if(trade === 'roofing' ){
            fetch('https://api.unsplash.com/photos/2yYPRc0QqNo?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU')
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)
                console.log(data.urls.full)
            })
        }
        if(trade !== 'roofing' && trade !== 'landscaping' && trade !== 'electrician' && trade !== "plumbing"){
            fetch('https://api.unsplash.com/photos/a0BEHFMKqTE?client_id=CuJKZwpX4x1nr-eFcRN7h2npm5sIkCeiv5mxhJNHgRU')
            .then((res) => res.json())
            .then((data) =>{
                setImage(data.urls.full)
                console.log(data.urls.full)
            })
        }
    }, [])
    return(
        <Image className="image" style={{backgroundImage: `url(${image})`}}></Image>
    )
}

const Image = styled.div`
        height: 30vh;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 25% 75%;
`

export default ImageForTradesPage