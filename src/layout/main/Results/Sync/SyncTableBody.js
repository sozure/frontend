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
import { sendSyncListVariableGroupsRequest } from "../../../../services/VariableGroupServices/VariableGroupService";
import SyncTableBodyInput from "./SyncTableBodyInput";
import { toastErrorPopUp } from "../../../../services/CommonService";

const SyncTableBody = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { setContainingVGs } = useContext(ContainingVGsContext);
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
    let syncResult = [];
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
      syncVariables.forEach((variable) => {
        if (variable === variableToBeReplaced) {
          syncResult.push(newKey);
        } else {
          syncResult.push(variable);
        }
      });
      setSyncVariables(syncResult);
      let counter = 0;
      let result = [];
      setNewVariableKey(newKey);
      syncResult.forEach(async (variable) => {
        let body = {
          projectName: containingVGsProject,
          pat: pat,
          userName: profileName,
          vgRegex: ".*",
          keyRegex: variable,
          organizationName: organizationName,
          setLoading: setLocalLoading,
          containingVGs: result,
          index: counter,
          secretIncluded: true,
          containsKey: true,
        };
        counter++;
        await sendSyncListVariableGroupsRequest(body, true, "");
      });
      setTimeout(() => {
        setLocalLoading(false);
        setContainingVGs(result);
      }, 2000);
    }
    setModification({});
  };

  return (
    <>
      {syncVariables
        .slice(paginationCounter, paginationCounter + number)
        .map((variable) => {
          return (
            <tr key={v4()}>
              <td key={v4()}>
                {localLoading && variable === newVariableKey ? (
                  <>{newVariableKey}</>
                ) : modification.modification &&
                  modification.variable === variable ? (
                  <SyncTableBodyInput variable={variable} />
                ) : (
                  <>{variable}</>
                )}
              </td>
              <td key={v4()}>
                {containingVGsProject === "" ? <>-</> : localLoading && variable === newVariableKey ? (
                  <span>Loading...</span>
                ) : modification.modification &&
                  modification.variable === variable ? (
                  <>
                    <button onClick={async () => await changeSync(variable)}>
                      <AiOutlineCheck />
                    </button>
                    <button onClick={() => setModification({})}>
                      <AiOutlineClose />
                    </button>
                  </>
                ) : (
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
                )}
              </td>
              <td key={v4()}>
                {containingVGsProject === "" ? (
                  <p>-</p>
                ) : (
                  <ContainingVGSelectMenu variableName={variable} />
                )}
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default SyncTableBody;
