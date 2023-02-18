import styled from "styled-components"
import ChatBot from 'react-simple-chatbot'
// 

const ChatBotComponent = ({setView, handleView}) =>{
    

    const steps = [
        { id: '0', message: 'Welcome to the BOB project!', trigger: '1',},

        { id: "1", message: "Please enter your name!", trigger: "waiting1", },

        { id: "waiting1", user: true, trigger: "Name", },
    
        { id: "Name", message: "Hi {previousValue}, Do you need immediate assistance?", trigger: "issues", },

        { id: "issues",
        options: 
        [
            { value: "Yes", label: "Yes", trigger: "Yes" },   
            { value: "No", label: "No", trigger: "No" },        
        ],
        },
        { id: "Yes", message:" We will contact our emergency team and send someone right away!", end: true},

        { id: "No", message:"Please use the dropdown at the center of the page to place a reservation", trigger: "secondlast"},

        { id: "secondlast", message:"You may also call our assistance line (514)239-7212 to get more info. Thank You. ", end: true },

    ];



    return(
        <ChatbotDiv>
                    <ChatBot className="chatbot" steps={steps}/>
                    <button onClick={handleView}>Hide ChatBot</button>
        </ChatbotDiv>
    )
}

const ChatbotDiv = styled.div`
position: absolute;
bottom: 0;

.chatbot{
    div{
        /* background-color: #E1DABD; */


    }
}
`
export default ChatBotComponent