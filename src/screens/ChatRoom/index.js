import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { socket } from '../../config/web-sockets';
import Header from '../../components/Header';
import Messages from '../../components/Messages';
import { history } from '../../config/network';
import {
    ChatContainer,
    StyledContainer,
    ChatBox,
    StyledButton,
    SendIcon
} from './styles';
import { Button, Input } from 'antd';

function ChatRoom(props) {
    const { username, room, joinData } = props;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (Object.keys(joinData).length > 0) {
            setMessages([joinData])
            socket.on('message', (message, error) => {
                setMessages(msgs => [...msgs, message]);
            });
        }
        else {
            history.push('/join')
        }
    }, [joinData]);

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleClick = (e) => {
        sendMessage(message);
    }

    const sendMessage = (message) => {
        
        if (message) {
            socket.emit('sendMessage', { user: username, message, room }, (error) => {
                if (error) {
                    alert(error)
                    history.push('/join');
                }
            });
            setMessage('')
        } else {
            alert("Message can't be empty")
        }
    }

    return (
        <ChatContainer>
            <Header room={room} />
            <StyledContainer>
                <ChatBox>
                    <Messages
                        messages={messages}
                        username={username}
                    />
                    <Input type='text' placeholder='type your message' value={message} onChange={handleChange} />
                    
                    <SendIcon onClick={handleClick}>
                        <i className='fa fa-paper-plane' />
                    </SendIcon>
                </ChatBox>
            </StyledContainer>
        </ChatContainer>
    )
};
export default ChatRoom;