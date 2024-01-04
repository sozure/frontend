import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ContainingVGsContext,
  PipelineConnectedVGsContext,
} from "../../../../contexts/Contexts";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

const ContainingVGSelectMenu = ({ variableName }) => {
  const { containingVGs } = useContext(ContainingVGsContext);
  const { pipelineConnectedVGs } = useContext(PipelineConnectedVGsContext);
  const [vgs, setVgs] = useState([]);
  const [vg, setVg] = useState("");

  const containsText = (element, searchText) =>
    element.variableGroupName.toLowerCase().indexOf(searchText.toLowerCase()) >
    -1;

  useEffect(() => {
    let result = [];
    console.log(containingVGs);
    console.log(pipelineConnectedVGs);
    containingVGs.forEach((element) => {
      if (element.key === variableName) {
        element.result.forEach((element) => {
          if (pipelineConnectedVGs.includes(element.variableGroupName)) {
            result.push(element);
          }
        });
      }
    });
    setVgs(result);
  }, [variableName, containingVGs, pipelineConnectedVGs, setVgs]);

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
  variableName: PropTypes.string,
};

export default ContainingVGSelectMenu;
