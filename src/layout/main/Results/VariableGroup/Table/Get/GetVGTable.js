import "../../../../../../CSS/style.css";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  PaginationCounterContext,
  VariablesContext,
} from "../../../../../../contexts/Contexts";
import PaginationButtons from "../../../PaginationButtons";
import TableHeader from "../../../TableHeader";
import GetVGTableRow from "./GetVGTableRow";

function GetVGTable() {
  const { variables } = useContext(VariablesContext);
  const { paginationCounter, setPaginationCounter } = useContext(
    PaginationCounterContext
  );
  const [partOfVariableGroups, setPartOfVariableGroups] = useState([]);

  const number = 5;

  useEffect(() => {
    if (variables.length !== 0) {
      let tempPartOfVariableGroups = variables.slice(
        paginationCounter,
        paginationCounter + number
      );

      if (tempPartOfVariableGroups.length === 0) {
        let decreasedPaginationCounter =
          paginationCounter - number <= 0 ? 0 : paginationCounter - number;
        setPaginationCounter(decreasedPaginationCounter);
      }

      setPartOfVariableGroups(tempPartOfVariableGroups);
    }
  }, [variables, paginationCounter, setPaginationCounter]);

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupKey === variableGroup.variableGroupKey &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  return (
    <div className="form">
      {(variables === null) |
      (variables === undefined) |
      (variables.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>Matched variables (Found variables: {variables.length})</h2>
          <br />
          <table className="matched-variables-table">
            <TableHeader
              columnList={[
                "Project",
                "Variable group name",
                "Variable key",
                "Variable value",
                "Operation",
              ]}
            />

            <tbody>
              {partOfVariableGroups.map((variableGroup) => {
                let variableGroupName = variableGroup.variableGroupName;
                let variableGroupKey = variableGroup.variableGroupKey;
                let variableGroupValue = variableGroup.variableGroupValue;
                let isSecretVariableGroup = variableGroup.secretVariableGroup;
                let project = variableGroup.project;
                let keyVaultName = variableGroup.keyVaultName;
                let index = findIndexOfVariableGroup(variables, variableGroup);
                return (
                  <GetVGTableRow
                    key={v4()}
                    variableGroup={variableGroup}
                    variableGroupKey={variableGroupKey}
                    variableGroupName={variableGroupName}
                    variableGroupValue={variableGroupValue}
                    project={project}
                    isSecretVariableGroup={isSecretVariableGroup}
                    keyVaultName={keyVaultName}
                    index={index}
                  />
                );
              })}
            </tbody>
          </table>
          <br />
          <PaginationButtons collection={variables} />
        </>
      )}
    </div>
  );
}

export default GetVGTable;
