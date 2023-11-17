import React, { useContext, useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChangesContext, LoadingContext } from "../../../contexts/Contexts";
import { getChangesByDate, getChangesByMaxLimit } from "../../../services/ChangesService";

export const ModificationsForm = () => {
  const potentialLimits = [10, 20, 50, 100];
  const [entityType, setEntityType] = useState("");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { setChanges } = useContext(ChangesContext);

  const { setLoading } = useContext(LoadingContext);

  const sendRequest = () => {
    if (entityType === "" || from === "" || to === "") {
      alert("Fill every field!");
    } else {
      let body = {
        from: from,
        to: to,
        limit: selectedLimit,
        changeTypes: [0, 1, 2],
      };
      getChangesByMaxLimit(body, setLoading, setChanges);
    }
  };
  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select entity type of modification</InputLabel>
        <Select
          id="entityType"
          value={entityType}
          label="Select entity type"
          onChange={(event) => setEntityType(event.target.value)}
        >
          <MenuItem value={"env_Variables"} key={"env_Variables"}>
            {"Env. variables"}
          </MenuItem>
          <MenuItem value={"secrets"} key={"secrets"}>
            {"Secrets"}
          </MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From date"
          value={from}
          onChange={(newValue) => {
            setFrom(newValue);
          }}
          textField={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To date"
          value={to}
          onChange={(newValue) => {
            setTo(newValue);
          }}
          textField={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel>Select result table limit</InputLabel>
        <Select
          id="limit"
          value={selectedLimit}
          label="Select limit"
          onChange={(event) => setSelectedLimit(event.target.value)}
        >
          {potentialLimits.map((limit) => (
            <MenuItem value={limit} key={limit}>
              {limit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        id="changes_search_button"
        onClick={sendRequest}
      >
        Search
      </Button>
    </div>
  );
};
