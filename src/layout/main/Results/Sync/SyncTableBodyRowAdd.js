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
import { getToastOnClose, toastErrorPopUp } from "../../../../services/CommonService";
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
  const toastMs = getToastOnClose();

  const containsVGText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const add = async (newValueOfVariable) => {
    let body = {
      organization: organizationName,
      project: projectName,
      pat: pat,
      userName: profileName,
      variableGroupFilter: actualVg,
      keyFilter: ".*",
      containsSecrets: false,
      key: variable,
      value: newValueOfVariable,
    };

    await sendAddRequest(
      body,
      variable,
      actualVg,
      containingVGsProject,
      containingVGs,
      setContainingVGs,
      setModification,
      setLocalLoading
    );
  };

  const addSync = async (variableToBeReplaced) => {
    let newValueOfVariable = document.getElementById(
      `${idPrefix}-${variableToBeReplaced}`
    ).value;

    if (actualVg !== "" && newValueOfVariable !== "") {
      await add(newValueOfVariable);
    } else {
      toastErrorPopUp("Fill every field!", "inline-add", toastMs);
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
          elementKey={"missing_variableGroupName"}
          containsText={containsVGText}
          elements={potentialMissingVgs}
          inputLabel={`${potentialMissingVgs.length} item(s) found`}
          selectedElement={actualVg}
          setSelectedElement={setActualVg}
        />
        {actualVg !== "" && (
          <>
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
        )}
      </>
    );
  };

  return <>{localLoading ? <>Loading...</> : getAddSection()}</>;
};

SyncTableBodyRowAdd.propTypes = {
  variable: PropTypes.string.isRequired,
  potentialMissingVgs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SyncTableBodyRowAdd;
