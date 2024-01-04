import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProfileNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import ContainingVGSelectMenu from "./ContainingVGSelectMenu";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { syncVariableGroup } from "../../../../services/VariableGroupServices/VariableGroupService";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { toastErrorPopUp } from "../../../../services/CommonService";

const SyncTableBody = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);
  const { syncVariables, setSyncVariables } = useContext(VariablesSyncContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);

  const { containingVGsProject } = useContext(ContainingVGsProjectContext);

  const [modification, setModification] = useState({});
  const [localLoading, setLocalLoading] = useState(false);
  const [newVariableKey, setNewVariableKey] = useState("");
  const number = 10;

  const changeSync = async (variableToBeReplaced) => {
    let newKey = document.getElementById(
      `inline-var-${variableToBeReplaced}`
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

  const getVariableKey = (variable) => {
    return modification.modification && modification.variable === variable ? (
      <SyncTableBodyInput variable={variable} />
    ) : (
      <>{variable}</>
    );
  };

  return (
    <tbody>
      {syncVariables
        .slice(paginationCounter, paginationCounter + number)
        .map((variable) => {
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
                  getActionSection(variable)
                )}
              </td>
              <td key={v4()}>
                {containingVGsProject === "" ||
                (localLoading && variable === newVariableKey) ? (
                  <p>-</p>
                ) : (
                  <ContainingVGSelectMenu variableName={variable} />
                )}
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default SyncTableBody;
