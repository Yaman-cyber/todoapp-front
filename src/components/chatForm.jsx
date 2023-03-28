import React from "react";

const ChatForm = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group row my-3">
        <div className="col-10">
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={value}
          />
        </div>
        <div className="col-2">
          <button type="submit" class="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
