import React, { useEffect, useRef } from "react";

const ChatBubble = ({ text, side }) => {
  const style = "chat-bubble col-md-12";
  const sideStyle = side;

  return <div className={style + " " + sideStyle}>{text}</div>;
};

const ChatBox = ({ data, sender }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [data]);

  if (data.length === 0)
    return (
      <div ref={chatContainerRef} className="chat-box">
        <p>No messages yet</p>
      </div>
    );

  return (
    <div ref={chatContainerRef} className="chat-box">
      {data.map((message, i) => (
        <ChatBubble
          key={i}
          text={message.message}
          side={sender === message.sender ? "right" : "left"}
        />
      ))}
    </div>
  );
};

export default ChatBox;
