import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const CommonFormElements = ({
  setUserName,
  userName,
  setSelectedLimit,
  selectedLimit,
  setFrom,
  from,
  setTo,
  to,
}) => {
  const potentialLimits = [10, 20, 50, 100];

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From date"
          value={from}
          onChange={(newValue) => setFrom(newValue)}
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
      <Input
        type="text"
        id="user"
        name="user"
        placeholder="User"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
    </div>
  );
};

export default CommonFormElements;
