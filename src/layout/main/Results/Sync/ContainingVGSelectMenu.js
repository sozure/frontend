import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ContainingVGsContext } from "../../../../contexts/Contexts";

const ContainingVGSelectMenu = ({ variableName }) => {
  const { containingVGs } = useContext(ContainingVGsContext);

  const [vg, setVg] = useState("");
  const [vgs, setVgs] = useState([]);
  const [searchText, setSearchText] = useState("");

  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const displayedOptions = useMemo(
    () => vgs.filter((vg) => containsText(vg.variableGroupName, searchText)),
    [searchText, vgs]
  );

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
          <InputLabel id="search-select-label">Variable groups</InputLabel>
          <Select
            // Disables auto focus on MenuItems and allows TextField to be in focus
            MenuProps={{ autoFocus: false }}
            labelId="search-select-label"
            id="search-select"
            value={vg}
            label="Variable groups"
            onChange={(e) => setVg(e.target.value)}
            onClose={() => setSearchText("")}
            // This prevents rendering empty string in Select's value
            // if search text would exclude currently selected option.
            renderValue={() => vg}
          >
            {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
            <ListSubheader>
              <TextField
                size="small"
                // Autofocus on textfield
                autoFocus
                placeholder="Type to search..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    // Prevents auto-selecting item while typing (default Select behavior)
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            {displayedOptions.map((option, i) => (
              <MenuItem key={i} value={option.variableGroupName}>
                {option.variableGroupName}
              </MenuItem>
            ))}
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
