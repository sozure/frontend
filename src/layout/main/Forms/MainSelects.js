import React, { useContext } from "react";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  ActionTypeContext,
  TableTypeContext,
} from "../../../contexts/Contexts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toastErrorPopUp } from "../../../services/CommonService";

const MainSelects = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);

  const handleActionTypeChange = (e) => {
    e.preventDefault();
    let newActionType = e.target.value;
    if (newActionType) {
      setOnAdd(false);
      setOnDelete(false);
      setOnUpdate(false);
    }
    setActionType(e.target.value);
  };

  const getActionTypeOptions = () => {
    switch (tableType) {
      case "VG":
        return (
          <FormControl fullWidth>
            <InputLabel>Action type</InputLabel>
            <Select
              className="action_type"
              value={actionType}
              label="Action type"
              onChange={handleActionTypeChange}
            >
              <MenuItem value="List">List variables</MenuItem>
              <MenuItem value="Add">Add variables</MenuItem>
              <MenuItem value="Delete">Delete variables</MenuItem>
              <MenuItem value="Update">Update variables</MenuItem>
            </Select>
          </FormControl>
        );
      case "KV":
        return (
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
        );
      case "Sync":
        return <></>;
      case "Build":
        return <></>;
      case "Tag&Build":
        return <></>;
      default:
        toastErrorPopUp("Invalid tableType value!", "table-type", 1500);
    }
  };

  return (
    <div className="main-select-container">
      <FormControl fullWidth>
        <InputLabel>Select table type</InputLabel>
        <Select
          label="Select table type"
          onChange={(event) => setTableType(event.target.value)}
          value={tableType}
        >
          <MenuItem value="KV">Secrets</MenuItem>
          <MenuItem value="VG">Variable groups</MenuItem>
          <MenuItem value="Sync">Sync configurations</MenuItem>
          <MenuItem value="Build">Run build pipelines</MenuItem>
          <MenuItem value="Tag&Build">Create tag and run build</MenuItem>
        </Select>
      </FormControl>
      {getActionTypeOptions()}
    </div>
  );
};

export default MainSelects;
