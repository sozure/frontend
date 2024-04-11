import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const SearchableSelectMenu = ({
  inputLabel,
  elements,
  elementKey,
  containsText,
  selectedElement,
  setSelectedElement,
}) => {
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => elements.filter((element) => containsText(element, searchText)),
    [containsText, elements, searchText]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="search-select-label">{inputLabel}</InputLabel>
      <Select
        // Disables auto focus on MenuItems and allows TextField to be in focus
        MenuProps={{ autoFocus: false }}
        labelId="search-select-label"
        id="search-select"
        value={selectedElement}
        label={inputLabel}
        onChange={(e) => setSelectedElement(e.target.value)}
        onClose={() => setSearchText("")}
        // This prevents rendering empty string in Select's value
        // if search text would exclude currently selected option.
        renderValue={() => selectedElement}
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
        {displayedOptions.map((option) => (
          <MenuItem
            key={v4()}
            value={typeof option === "object" ? option[elementKey] : option}
          >
            {typeof option === "object" ? option[elementKey] : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SearchableSelectMenu.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(PropTypes.string).isRequired,
  elementKey: PropTypes.string.isRequired,
  containsText: PropTypes.func.isRequired,
  selectedElement: PropTypes.string.isRequired,
  setSelectedElement: PropTypes.func.isRequired,
};

export default SearchableSelectMenu;
