import React, { useContext } from "react";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  ActionTypeContext,
  TableTypeContext,
} from "../../../contexts/Contexts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MainSelects = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);

  return (
    <div className="main-select-container">
      {tableType === "VG" ? (
        <FormControl fullWidth>
          <InputLabel>Action type</InputLabel>
          <Select
            className="action_type"
            value={actionType}
            label="Action type"
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
            <MenuItem value="List">List variables</MenuItem>
            <MenuItem value="Add">Add variables</MenuItem>
            <MenuItem value="Delete">Delete variables</MenuItem>
            <MenuItem value="Update">Update variables</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel>Set action type</InputLabel>
          <Select
            className="action-type"
            label="Set action type"
            value={actionType}
            onChange={(event) => setActionType(event.target.value)}
          >
            <MenuItem value="List">List secrets</MenuItem>
            <MenuItem value="Copy">Copy secrets</MenuItem>
            <MenuItem value="Delete">Delete secrets</MenuItem>
            <MenuItem value="Recover">Recover secrets</MenuItem>
          </Select>
        </FormControl>
      )}

      <FormControl fullWidth>
        <InputLabel>Select table type</InputLabel>
        <Select
          label="Select table type"
          onChange={(event) => setTableType(event.target.value)}
          value={tableType}
        >
          <MenuItem value="KV">Secrets</MenuItem>
          <MenuItem value="VG">Variable groups</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default MainSelects;
