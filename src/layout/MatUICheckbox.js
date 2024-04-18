import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const MatUICheckbox = ({ id, name, label, value, setValue }) => {
  return (
    <FormGroup>
      {label === undefined ? (
        <FormControlLabel
          control={
            value === undefined ? (
              <Checkbox
                id={id}
                name={name}
                onChange={(e) => setValue(e.target.checked)}
              />
            ) : (
              <Checkbox
                id={id}
                name={name}
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
              />
            )
          }
        ></FormControlLabel>
      ) : (
        <FormControlLabel
          control={
            value === undefined ? (
              <Checkbox
                id={id}
                name={name}
                onChange={(e) => setValue(e.target.checked)}
              />
            ) : (
              <Checkbox
                id={id}
                name={name}
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
              />
            )
          }
          label={label}
        ></FormControlLabel>
      )}
    </FormGroup>
  );
};

MatUICheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
};

export default MatUICheckbox;
