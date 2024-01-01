import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ContainingVGsContext } from "../../../../contexts/Contexts";

const ContainingVGSelectMenu = ({ variableName }) => {
  const [vg, setVg] = useState("");
  const [vgs, setVgs] = useState([]);
  const { containingVGs } = useContext(ContainingVGsContext);

  useEffect(() => {
    let result = [];
    containingVGs.forEach((element) => {
      if (element.key === variableName) {
        result = element.result;
      }
    });
    setVgs(result);
  }, [variableName, containingVGs, setVgs]);

  return (
    <>
      {vgs.length === 0 ? (
        <p>Not found</p>
      ) : (
        <FormControl fullWidth>
          <InputLabel>Containing variable groups</InputLabel>
          <Select
            id="containingVGs"
            value={vg}
            label="Containing variable groups"
            onChange={(event) => setVg(event.target.value)}
          >
            {vgs.map((vg) => {
              return (
                <MenuItem
                  value={vg.variableGroupName}
                  key={vg.variableGroupName}
                >
                  {vg.variableGroupName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </>
  );
};

ContainingVGSelectMenu.propTypes = {
  containingVGs: PropTypes.arrayOf(PropTypes.object),
};

export default ContainingVGSelectMenu;
