import "../../../../CSS/style.css";
import React, { useContext, useState } from "react";

import {
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  SingleModificationContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import { sendDeleteRequest2, sendUpdateRequest2 } from "../../../../services/VariableGroupService";

function OtherVGTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { pat } = useContext(PATContext);
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { organizationName } = useContext(OrganizationContext);

  const [singleNewValue, setSingleNewValue] = useState("");

  const number = 10;

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  const sendUpdate = (variableGroup) => {
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    sendUpdateRequest2(
      message,
      singleNewValue,
      variableGroup.variableGroupValue
    );
    variableGroup.variableGroupValue = singleNewValue;
    setOnSingleModificationBack();
  };

  const startUpdate = (row) => {
    let model = { row: row, operation: "update", modification: true };
    setOnSingleModification(model);
  };

  const cancelUpdate = () => {
    setOnSingleModificationBack();
  };

  const sendDelete = (variableGroup, index) => {
    console.log("Send deletion!");
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false
    }
    sendDeleteRequest2(message, variableGroup.variableGroupValue);
    variableGroups.splice(index, 1);
    setOnSingleModificationBack();
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack();
  };

  const setOnSingleModificationBack = () => {
    let model = { row: 0, operation: "", modification: false };
    setOnSingleModification(model);
  };

  return (
    <div>
      {(variableGroups === null) |
      (variableGroups === undefined) |
      (variableGroups.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>Matched variables (Found variables: {variableGroups.length}).</h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Variable group name</th>
                <th>Variable Key</th>
                <th>Variable value</th>
                <th>Operations</th>
              </tr>
            </thead>

            <tbody>
              {variableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  let variableGroupName = variableGroup.variableGroupName;
                  let variableGroupValue = variableGroup.variableGroupValue;
                  let isSecretVariableGroup = variableGroup.secretVariableGroup;
                  let project = variableGroup.project;
                  let keyVaultName = variableGroup.keyVaultName;
                  let index = findIndexOfVariableGroup(
                    variableGroups,
                    variableGroup
                  );
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>
                        {project.length > 11
                          ? `${project.slice(0, 11)}...`
                          : project}
                      </td>

                      {isSecretVariableGroup ? (
                        <td
                          key={Math.random()}
                        >{`${variableGroupName} (${keyVaultName})`}</td>
                      ) : (
                        <td key={Math.random()}>{variableGroupName}</td>
                      )}

                      <td key={Math.random()}>
                        {variableGroup.variableGroupKey}
                      </td>

                      <td key={Math.random()}>
                        {onSingleModification.modification &&
                        onSingleModification.operation === "update" &&
                        onSingleModification.row === index ? (
                          <input
                            type="text"
                            id="single_update"
                            name="single_update"
                            placeholder={"New variable's value"}
                            value={singleNewValue}
                            onChange={(event) =>
                              setSingleNewValue(event.target.value)
                            }
                          />
                        ) : (
                          <span
                            className={isSecretVariableGroup ? "error" : ""}
                          >
                            {isSecretVariableGroup ? (
                              "Secret variable, can't show it's value."
                            ) : variableGroupValue.length > 60 ? (
                              <button onClick={() => alert(variableGroupValue)}>
                                Show long variable value
                              </button>
                            ) : (
                              variableGroupValue
                            )}
                          </span>
                        )}
                      </td>
                      <td key={Math.random()}>
                        {isSecretVariableGroup |
                        (variableGroup.variableGroupValue.length > 60) ? (
                          <span className={"error"}>
                            Can't change variable.
                          </span>
                        ) : (
                          <div className="tableButtons">
                            {onSingleModification.operation === "deletion" &&
                            onSingleModification.row === index ? (
                              <></>
                            ) : (
                              <div>
                                {onSingleModification.modification &&
                                onSingleModification.row === index ? (
                                  <>
                                    <button
                                      onClick={() => sendUpdate(variableGroup)}
                                    >
                                      Save changes
                                    </button>
                                    <button onClick={() => cancelUpdate()}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button onClick={() => startUpdate(index)}>
                                    Update
                                  </button>
                                )}
                              </div>
                            )}

                            {onSingleModification.operation === "update" &&
                            onSingleModification.row === index ? (
                              <></>
                            ) : (
                              <div>
                                {onSingleModification.modification &&
                                onSingleModification.row === index ? (
                                  <>
                                    <button onClick={() => sendDelete(variableGroup, index)}>
                                      Approve deletion
                                    </button>
                                    <button onClick={() => cancelDelete()}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button onClick={() => startDelete(index)}>
                                    Delete
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <PaginationButtons collection={variableGroups} />
        </>
      )}
    </div>
  );
}

export default OtherVGTable;
