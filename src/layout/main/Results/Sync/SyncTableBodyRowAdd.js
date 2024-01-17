import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { sendAddRequest } from "../../../../services/VariableGroupServices/VariableGroupInlineService";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import { toastErrorPopUp } from "../../../../services/CommonService";
import PropTypes from "prop-types";

const SyncTableBodyRowAdd = ({ variable, potentialMissingVgs }) => {
  const [modification, setModification] = useState({});
  const [actualVg, setActualVg] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const { containingVGsProject } = useContext(ContainingVGsProjectContext);
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);

  const idPrefix = "inline-add";

  const containsVGText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const syncVGs = async () => {
    let newContainingVGs = [];
    containingVGs.forEach((vgElement) => {
      if (vgElement.key === variable) {
        vgElement.result.push({
          project: containingVGsProject,
          variableGroupName: actualVg,
          variableGroupType: "Vsts",
        });
      }
      newContainingVGs.push(vgElement);
    });
    await setContainingVGs(newContainingVGs);
    setModification({});
  };

  const add = async (newValueOfVariable) => {
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
  };

  const addSync = async (variableToBeReplaced) => {
    let newValueOfVariable = document.getElementById(
      `${idPrefix}-${variableToBeReplaced}`
    ).value;

    if (actualVg !== "" && newValueOfVariable !== "") {
      await add(newValueOfVariable);
      await syncVGs();
    } else {
      toastErrorPopUp("Fill every field!", "inline-add", 1500);
    }
  };

  const getAddSection = () => {
    if (!(modification.modification && modification.key === variable)) {
      return (
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
      );
    }
    return (
      <>
        <SearchableSelectMenu
          containsText={containsVGText}
          elements={potentialMissingVgs}
          inputLabel={`${potentialMissingVgs.length} item(s) found`}
          selectedElement={actualVg}
          setSelectedElement={setActualVg}
        />
        <SyncTableBodyInput
          idPrefix={idPrefix}
          variable={variable}
          optionalValue={""}
        />
        <button onClick={async () => await addSync(variable)}>
          <AiOutlineCheck />
        </button>
        <button onClick={() => setModification({})}>
          <AiOutlineClose />
        </button>
      </>
    );
  };

  return (
    <>
      {localLoading ? (
        <>Loading...</>
      ) : getAddSection()}
    </>
  );
};

SyncTableBodyRowAdd.propTypes = {
  variable: PropTypes.string.isRequired,
  potentialMissingVgs: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default SyncTableBodyRowAdd;
