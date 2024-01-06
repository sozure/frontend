import React, { useContext, useEffect } from "react";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  PaginationCounterContext,
  PipelineConnectedVGsContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import SyncTableBodyRow from "./SyncTableBodyRow";

const SyncTableBody = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { containingVGs } = useContext(ContainingVGsContext);
  const { syncVariables } = useContext(VariablesSyncContext);
  const { pipelineConnectedVGs } = useContext(PipelineConnectedVGsContext);

  const number = 10;

  const collectPotentialMissingVgs = (variableType, vgsNames) => {
    let potentialMissingVgs = [];
    pipelineConnectedVGs.forEach((element) => {
      if (
        (element.Type === variableType || variableType === "Unknown") &&
        !vgsNames.includes(element.Name)
      ) {
        potentialMissingVgs.push(element.Name);
      }
    });
    return potentialMissingVgs;
  };

  const collectVgs = (variableKey, pipelineConnectedVGsNames) => {
    let vgs = [];
    let vgsNames = [];
    let variableType = "";
    containingVGs.forEach((element) => {
      if (element.key === variableKey) {
        variableType = element.variableGroupType;
        element.result.forEach((element) => {
          if (pipelineConnectedVGsNames.includes(element.variableGroupName)) {
            vgs.push(element);
            vgsNames.push(element.variableGroupName);
          }
        });
      }
    });
    return {
      vgs: vgs,
      vgsNames: vgsNames,
      variableType: variableType,
    };
  };

  const collectPipelineConnectedVGsNames = () => {
    let pipelineConnectedVGsNames = [];
    pipelineConnectedVGs.forEach((element) => {
      pipelineConnectedVGsNames.push(element.Name);
    });
    return pipelineConnectedVGsNames;
  };

  return (
    <tbody>
      {syncVariables
        .slice(paginationCounter, paginationCounter + number)
        .map((variable) => {
          let pipelineConnectedVGsNames = collectPipelineConnectedVGsNames();
          let resultObj = collectVgs(variable, pipelineConnectedVGsNames);
          let variableType = resultObj["variableType"];
          let vgs = resultObj["vgs"];
          let vgsNames = resultObj["vgsNames"];
          let potentialMissingVgs = collectPotentialMissingVgs(
            variableType,
            vgsNames
          );
          return (
            <SyncTableBodyRow
              key={v4()}
              vgs={vgs}
              potentialMissingVgs={potentialMissingVgs}
              variable={variable}
              variableType={variableType}
            />
          );
        })}
    </tbody>
  );
};

export default SyncTableBody;
