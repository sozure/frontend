import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { sendAddRequest } from "../../../../services/VariableGroupServices/VariableGroupInlineService";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import {
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";

const SyncTableBodyRowAdd = ({ variable, potentialMissingVgs }) => {
  const [modification, setModification] = useState({});
  const [actualVg, setActualVg] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [potMissingVgs, setPotMissingVgs] = useState(potentialMissingVgs);

  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { profileName } = useContext(ProfileNameContext);

  const idPrefix = "inline-add";

  const containsVGText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const addSync = async (variableToBeReplaced) => {
    let newValueOfVariable = document.getElementById(
      `${idPrefix}-${variableToBeReplaced}`
    ).value;

    let body = {
      organization: organizationName,
      project: projectName,
      pat: pat,
      userName: profileName,
      variableGroupFilter: actualVg,
      keyFilter: variable,
      containsSecrets: false,
      key: variable,
      value: newValueOfVariable,
    };

    await sendAddRequest(body, setLocalLoading);
    
    setModification({});
  };

  return (
    <>
      {localLoading ? (
        <>Loading...</>
      ) : !(modification.modification && modification.key === variable) ? (
        <Button
          variant="contained"
          id="add_variable"
          onClick={() => {
            setModification({
              key: variable,
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
            elements={potMissingVgs}
            inputLabel={`${potMissingVgs.length} item(s) found`}
            selectedElement={actualVg}
            setSelectedElement={setActualVg}
          />
          <SyncTableBodyInput idPrefix={idPrefix} variable={variable} optionalValue={""} />
          <button onClick={async () => await addSync(variable)}>
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
