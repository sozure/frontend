import React, { useState } from "react";
import PropTypes from "prop-types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ContainingVGSelectMenu = ({ containingVgs }) => {
  const [vg, setVg] = useState("");
  return (
    <FormControl fullWidth>
      <InputLabel>Containing variable groups</InputLabel>
      <Select
        id="containingVGs"
        value={vg}
        label="Containing variable groups"
        onChange={(event) => setVg(event.target.value)}
      >
        {containingVgs.map((vg) => {
          return (
            <MenuItem value={vg.variableGroupName} key={vg.variableGroupName}>
              {vg.variableGroupName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

ContainingVGSelectMenu.propTypes = {
  containingVGs: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ContainingVGSelectMenu;
