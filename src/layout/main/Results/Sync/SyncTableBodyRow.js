import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ContainingVGSelectMenu from "./ContainingVGSelectMenu";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toastErrorPopUp } from "../../../../services/CommonService";
import {
  ConfigFileExtensionContext,
  ContainingVGsContext,
  ContainingVGsProjectContext,
  EnvironmentsContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import { syncVariableGroup } from "../../../../services/VariableGroupServices/VariableGroupService";
import SyncTableBodyRowAdd from "./SyncTableBodyRowAdd";

const SyncTableBodyRow = ({
  variable,
  variableType,
  vgs,
  potentialMissingVgs,
}) => {
  const { containingVGsProject } = useContext(ContainingVGsProjectContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);
  const { syncVariables, setSyncVariables } = useContext(VariablesSyncContext);
  const { configFileExtension } = useContext(ConfigFileExtensionContext);
  const { environments } = useContext(EnvironmentsContext);

  const [modification, setModification] = useState({});
  const [localLoading, setLocalLoading] = useState(false);
  const [newVariableKey, setNewVariableKey] = useState("");

  const idPrefix = "inline-var";

  const changeSync = async (variableToBeReplaced) => {
    let newKey = document.getElementById(
      `${idPrefix}-${variableToBeReplaced}`
    ).value;
    if (syncVariables.includes(newKey)) {
      toastErrorPopUp(
        "New key is already in variables list!",
        "key-update",
        1500
      );
    } else {
      setNewVariableKey(newKey);
      let newSyncVariables = collectNewSyncVariables(
        variableToBeReplaced,
        newKey
      );
      setSyncVariables(newSyncVariables);
      let [indexOfVarToBeReplaced, newContainingVGs] =
        collectNewContainingVGs(variableToBeReplaced);
      let body = {
        projectName: containingVGsProject,
        pat: pat,
        userName: profileName,
        vgRegex: ".*",
        keyRegex: newKey,
        organizationName: organizationName,
        secretIncluded: true,
        containsKey: true,
        potentialVariableGroups: vgs,
      };
      await syncVariableGroup(
        indexOfVarToBeReplaced,
        body,
        newContainingVGs,
        setContainingVGs,
        setLocalLoading
      );
    }
    setModification({});
  };

  const collectNewContainingVGs = (variableToBeReplaced) => {
    let newContainingVGs = [];
    let indexOfVarToBeReplaced = 0;
    containingVGs.forEach((vgElement) => {
      if (vgElement.key !== variableToBeReplaced) {
        newContainingVGs.push(vgElement);
      } else {
        indexOfVarToBeReplaced = vgElement.index;
      }
    });
    return [indexOfVarToBeReplaced, newContainingVGs];
  };

  const collectNewSyncVariables = (variableToBeReplaced, newKey) => {
    let newSyncVariables = [];
    syncVariables.forEach((element) => {
      if (element === variableToBeReplaced) {
        newSyncVariables.push(newKey);
      } else {
        newSyncVariables.push(element);
      }
    });
    return newSyncVariables;
  };

  const getVariableKey = (variable) => {
    return modification.modification && modification.variable === variable ? (
      <SyncTableBodyInput idPrefix={idPrefix} variable={variable} />
    ) : (
      <>{variable}</>
    );
  };

  const getActionSection = (variable) => {
    return localLoading && variable === newVariableKey ? (
      <span>Loading...</span>
    ) : (
      getActionButtons(variable)
    );
  };

  const getActionButtons = (variable) => {
    return modification.modification && modification.variable === variable
      ? getApprovalButtons(variable)
      : getEditButton(variable);
  };

  const getApprovalButtons = (variable) => {
    return (
      <>
        <button onClick={async () => await changeSync(variable)}>
          <AiOutlineCheck />
        </button>
        <button onClick={() => setModification({})}>
          <AiOutlineClose />
        </button>
      </>
    );
  };

  const getEditButton = (variable) => {
    return (
      <abbr title={"Custom modification of variable's key"}>
        <button
          onClick={() =>
            setModification({
              variable: variable,
              modification: true,
            })
          }
        >
          <AiFillEdit />
        </button>
      </abbr>
    );
  };

  const getDisplayedVariableType = (variableType) => {
    switch (variableType) {
      case "Vsts":
        return "Variable";
      case "AzureKeyVault":
        return "Secret";
      default:
        return variableType;
    }
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>
        {localLoading && variable === newVariableKey ? (
          <>{newVariableKey}</>
        ) : (
          getVariableKey(variable)
        )}
      </td>
      <td key={v4()}>
        {containingVGsProject === "" ? (
          <>-</>
        ) : (
          <>{getDisplayedVariableType(variableType)}</>
        )}
      </td>
      {configFileExtension === "json" && (
        <td key={v4()}>
          {containingVGsProject === "" ? <>-</> : getActionSection(variable)}
        </td>
      )}

      <td key={v4()}>
        {containingVGsProject === "" ||
        (localLoading && variable === newVariableKey) ? (
          <p>-</p>
        ) : (
          <ContainingVGSelectMenu vgs={vgs} />
        )}
      </td>
      <td key={v4()}>
        {containingVGsProject === "" ||
        variableType === "AzureKeyVault" ||
        potentialMissingVgs.length === 0 || vgs.length >= environments.length ? (
          <p>-</p>
        ) : (
          <SyncTableBodyRowAdd
            variable={variable}
            potentialMissingVgs={potentialMissingVgs}
          />
        )}
      </td>
    </tr>
  );
};

SyncTableBodyRow.propTypes = {
  variable: PropTypes.string.isRequired,
  variableType: PropTypes.string.isRequired,
  vgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  potentialMissingVgs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SyncTableBodyRow;
