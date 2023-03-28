import React from "react";

import ListGroup from "./common/listGroup";

const Chatlist = ({ data, selectedItem, onItemSelect }) => {
  return (
    <div className="col-md-3 bg-light">
      <h1 className="text-center my-5">Chat List</h1>
      <ListGroup
        selectedItem={selectedItem}
        onItemSelect={onItemSelect}
        items={data}
      />
    </div>
  );
};

export default Chatlist;
