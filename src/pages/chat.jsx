import React, { useState, useEffect, useRef } from "react";
import Chatlist from "../components/chatList";
import ChatBox from "../components/chatBox";
import ChatForm from "../components/chatForm";
import { addMessage, getChat, getChats } from "../services/chatService";

const Chat = ({ user }) => {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchChats = async () => {
    const { data } = await getChats();

    setList(data.chats);
  };

  const fetchMessages = async (chatId) => {
    const { data } = await getChat(chatId);

    setMessages(data.messages);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleChangeMessaage = ({ target: input }) => {
    setMessage(input.value);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);

    fetchMessages(item._id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let allMessages = [...messages];
    let newMessage = { chatId: selectedItem._id, message, sender: user._id };
    allMessages.push(newMessage);

    const response = await addMessage(newMessage);

    setMessages(allMessages);
    setMessage("");
  };

  return (
    <React.Fragment>
      <div className="row">
        <Chatlist
          data={list}
          selectedItem={selectedItem}
          onItemSelect={handleSelect}
        />
        <div className="col-md-9">
          <h1 className="text-center my-5">Chat Box</h1>
          {!selectedItem && <div className="chat-box">Select a user</div>}
          {selectedItem && <ChatBox data={messages} sender={user._id} />}
          <ChatForm
            value={message}
            onChange={handleChangeMessaage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;
