import { Button } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { sendAddRequest } from "../../../../services/VariableGroupServices/VariableGroupInlineService";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

const SyncTableBodyRowAdd = ({ key, potentialMissingVgs }) => {
  const [modification, setModification] = useState({});
  const [actualVg, setActualVg] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const idPrefix = "inline-add";

  const containsVGText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const addSync = async (variableToBeReplaced) => {
    let newValueOfVariable = document.getElementById(
      `${idPrefix}-${variableToBeReplaced}`
    ).value;

    let body = {};
    await sendAddRequest(body);
    setModification({});
  };

  return (
    <>
      {localLoading ? (
        <>Loading...</>
      ) : !(modification.modification && modification.key === key) ? (
        <Button
          variant="contained"
          id="add_variable"
          onClick={() => {
            setModification({
              key: key,
              modification: true,
            });
          }}
        >
          Add
        </Button>
      ) : (
        <>
          <SearchableSelectMenu
            containsText={containsVGText}
            elements={potentialMissingVgs}
            inputLabel={`${potentialMissingVgs.length} item(s) found`}
            selectedElement={actualVg}
            setSelectedElement={setActualVg}
          />
          <SyncTableBodyInput idPrefix={idPrefix} variable={key} />
          <button onClick={async () => await addSync(key)}>
            <AiOutlineCheck />
          </button>
          <button onClick={() => setModification({})}>
            <AiOutlineClose />
          </button>
        </>
      )}
    </>
  );
};

export default SyncTableBodyRowAdd;
