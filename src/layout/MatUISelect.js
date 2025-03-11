import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import PropTypes from "prop-types";

const MatUISelect = ({
  id,
  collection,
  inputLabel,
  selectValue,
  setSelectValue,
  allOption,
  required,
}) => {
  return (
    <>
      {required !== undefined && required ? (
        <Box width="150px">
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
              <MenuItem
                value={element}
                key={element}
                disabled={element === "Choose one"}
              >
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
      ) : (
        <Box width="150px">
        <FormControl fullWidth>
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
              <MenuItem
                value={element}
                key={element}
                disabled={element === "Choose one"}
              >
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
      )}
    </>
  );
};

MatUISelect.propTypes = {
  id: PropTypes.any.isRequired,
  collection: PropTypes.any.isRequired,
  inputLabel: PropTypes.any.isRequired,
  selectValue: PropTypes.any.isRequired,
  setSelectValue: PropTypes.func.isRequired,
  allOption: PropTypes.bool,
  required: PropTypes.bool,
};

export default MatUISelect;
