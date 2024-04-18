import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

import { Input, TextField } from "@mui/material";
import MatUISelect from "../../MatUISelect";

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
          textField={<TextField />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To date"
          value={to}
          onChange={(newValue) => {
            setTo(newValue);
          }}
          textField={<TextField />}
        />
      </LocalizationProvider>
      <MatUISelect
        collection={potentialLimits}
        inputLabel={"Select result table limit"}
        id={"limit"}
        selectValue={selectedLimit}
        setSelectValue={setSelectedLimit}
        allOption={false}
      />
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

CommonFormElements.propTypes = {
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setSelectedLimit: PropTypes.func.isRequired,
  selectedLimit: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  setTo: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
};

export default CommonFormElements;
