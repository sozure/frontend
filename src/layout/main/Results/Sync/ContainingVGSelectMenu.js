import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

const ContainingVGSelectMenu = ({ vgs }) => {
  const [vg, setVg] = useState("");

  const containsText = (element, searchText) =>
    element.variableGroupName.toLowerCase().indexOf(searchText.toLowerCase()) >
    -1;

  return (
    <>
      {vgs.length === 0 ? (
        <p>Not found</p>
      ) : (
        <SearchableSelectMenu
          containsText={containsText}
          elementKey={"variableGroupName"}
          elements={vgs}
          inputLabel={`${vgs.length} item(s) found`}
          selectedElement={vg}
          setSelectedElement={setVg}
        />
      )}
    </>
  );
};

ContainingVGSelectMenu.propTypes = {
  vgs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContainingVGSelectMenu;
