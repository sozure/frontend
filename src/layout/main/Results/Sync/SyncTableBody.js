import React, { useContext } from "react";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  PaginationCounterContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import ContainingVGSelectMenu from "./ContainingVGSelectMenu";

const SyncTableBody = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { containingVGs } = useContext(ContainingVGsContext);
  const { syncVariables } = useContext(VariablesSyncContext);

  const number = 10;

  const findVGByName = (key) => {
    let result = [];
    containingVGs.forEach((element) => {
      if (element.key === key) {
        result = element.result;
      }
    });
    return result;
  };

  return (
    <>
      {containingVGs.length > 0 ? (
        syncVariables
          .slice(paginationCounter, paginationCounter + number)
          .map((variable) => {
            let actualVgs = findVGByName(variable);
            console.log(variable);
            console.log("actual vgs: " + actualVgs);
            return (
              <tr key={v4()}>
                <td key={v4()}>{variable}</td>
                <td key={v4()}>
                  {containingVGs.length === 0 ? (
                    <p>Choose project</p>
                  ) : actualVgs.length > 0 ? (
                    <ContainingVGSelectMenu containingVgs={actualVgs} />
                  ) : (
                    <p>No result found.</p>
                  )}
                </td>
              </tr>
            );
          })
      ) : (
        <></>
      )}
    </>
  );
};

export default SyncTableBody;
