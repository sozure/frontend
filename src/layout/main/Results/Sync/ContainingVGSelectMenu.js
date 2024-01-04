import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ContainingVGsContext } from "../../../../contexts/Contexts";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

const ContainingVGSelectMenu = ({ variableName }) => {
  const { containingVGs } = useContext(ContainingVGsContext);
  const [vgs, setVgs] = useState([]);
  const [vg, setVg] = useState("");

  const containsText = (element, searchText) =>
    element.variableGroupName.toLowerCase().indexOf(searchText.toLowerCase()) >
    -1;

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
        <SearchableSelectMenu
          containsText={containsText}
          elementKey={"variableGroupName"}
          elements={vgs}
          inputLabel={"Variable groups"}
          selectedElement={vg}
          setSelectedElement={setVg}
        />
      )}
    </>
  );
};

ContainingVGSelectMenu.propTypes = {
  variableName: PropTypes.string
};

export default ContainingVGSelectMenu;
