import styled from "styled-components"

const Header = () =>{
    return(
        <Wrapper>
            <div className="leftSide">
                <div>logo</div>
                <div>Home</div>
                <div>Trades</div>
            </div>
                <div>sign in</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: lightblue;
    display: flex;
    justify-content: space-around;

    .leftSide{
        display: flex;
    }
`


export default Header