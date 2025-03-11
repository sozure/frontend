import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";

import { Input, TextField, Stack } from "@mui/material";
import MatUISelect from "../../MatUISelect";
import dayjs from "dayjs";

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
    <>
      <Stack direction="row" gap={2} width="400px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs("2025-02-11")}
            label="From date"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            textField={<TextField />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs("2025-03-11")}
            label="To date"
            value={to}
            onChange={(newValue) => {
              setTo(newValue);
            }}
            textField={<TextField />}
          />
        </LocalizationProvider>
      </Stack>
      <MatUISelect
        collection={potentialLimits}
        inputLabel={"Limit"}
        id={"limit"}
        selectValue={selectedLimit}
        setSelectValue={setSelectedLimit}
        allOption={false}
        required={true}
      />

      <Input
        sx={{ width: "400px" }}
        type="text"
        id="user"
        name="user"
        placeholder="User"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
    </>
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
