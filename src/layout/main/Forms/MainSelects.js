import React, { useContext } from "react";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  ActionTypeContext,
  TableTypeContext,
} from "../../../contexts/Contexts";

const MainSelects = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);

  return (
    <div>
      {tableType === "VG" ? (
        <select
          className="action_type"
          value={actionType}
          onChange={(event) => {
            let newActionType = event.target.value;
            if (newActionType) {
              setOnAdd(false);
              setOnDelete(false);
              setOnUpdate(false);
            }
            setActionType(event.target.value);
          }}
        >
          <option value="List">List variables</option>
          <option value="Add">Add variables</option>
          <option value="Delete">Delete variables</option>
          <option value="Update">Update variables</option>
        </select>
      ) : (
        <select
          className="action_type"
          value={actionType}
          onChange={(event) => setActionType(event.target.value)}
        >
          <option value="List">List secrets</option>
          <option value="Copy">Copy secrets</option>
          <option value="Delete">Delete secrets</option>
        </select>
      )}
      <br />

      <select
        id="change_type_select"
        onChange={(event) => setTableType(event.target.value)}
      >
        <option value="KV">Secrets</option>
        <option value="VG">Variable groups</option>
      </select>
    </div>
  );
};

export default MainSelects;
