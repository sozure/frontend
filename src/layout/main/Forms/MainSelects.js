import React, { useContext } from "react";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  ActionTypeContext,
  TableTypeContext,
  PaginationCounterContext,
} from "../../../contexts/Contexts";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toastErrorPopUp } from "../../../services/CommonService";

const MainSelects = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

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

  const setCustomActionType = (value) => {
    setPaginationCounter(0);
    setActionType(value);
  };

  const getActionTypeOptions = () => {
    switch (tableType) {
      case "VG":
        return (
          <FormControl required fullWidth>
            <InputLabel>VG action type</InputLabel>
            <Select
              className="vg-action-type"
              value={actionType}
              label="VG action type"
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
          <FormControl required fullWidth>
            <InputLabel>Secret action type</InputLabel>
            <Select
              className="secret-action-type"
              label="Secret action type"
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
      case "Pipeline":
        return (
          <FormControl required fullWidth>
            <InputLabel>Pipeline action type</InputLabel>
            <Select
              displayEmpty
              className="pipeline-action-type"
              label="Pipeline action type"
              value={actionType}
              onChange={(event) => setCustomActionType(event.target.value)}
            >
              <MenuItem selected value="Build">Run build pipelines</MenuItem>
              <MenuItem value="Release">Create release</MenuItem>
            </Select>
          </FormControl>
        );
      case "Tag":
        return (
          <FormControl required fullWidth>
            <InputLabel>Tag action type</InputLabel>
            <Select
              className="tag-action-type"
              label="Tag action type"
              value={actionType}
              onChange={(event) => setCustomActionType(event.target.value)}
            >
              <MenuItem value="List">List latest tags</MenuItem>
              <MenuItem value="CreateAndBuild">
                Create tag and run build
              </MenuItem>
            </Select>
          </FormControl>
        );
      default:
        toastErrorPopUp("Invalid tableType value!", "table-type", 1500);
    }
  };

  return (
    <div className="main-select-container">
      <FormControl required fullWidth>
        <InputLabel>Select table type</InputLabel>
        <Select
          label="Select table type"
          onChange={(event) => { 
            setActionType(""); 
            setTableType(event.target.value);
          }}
          value={tableType}
        >
          <MenuItem value="KV">Secrets</MenuItem>
          <MenuItem value="VG">Variable groups</MenuItem>
          <MenuItem value="Sync">Sync configurations</MenuItem>
          <MenuItem value="Pipeline">Run pipelines</MenuItem>
          <MenuItem value="Tag">Tags</MenuItem>
        </Select>
      </FormControl>
      {getActionTypeOptions()}
    </div>
  );
};

export default MainSelects;
