import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MatUiSelect = ({
  collection,
  inputLabel,
  id,
  selectValue,
  setSelectValue,
  allOption,
}) => {
  return (
    <FormControl required fullWidth>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        id={id}
        value={selectValue}
        label={inputLabel}
        onChange={(event) => setSelectValue(event.target.value)}
      >
        {allOption && (
          <MenuItem value={"All"} key={"All"}>
            {"All"}
          </MenuItem>
        )}
        {collection.map((element) => (
          <MenuItem value={element} key={element} disabled={element === "Choose one"}>
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MatUiSelect;
