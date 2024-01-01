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

  return (
    <>
      {syncVariables
        .slice(paginationCounter, paginationCounter + number)
        .map((variable) => {
          return (
            <tr key={v4()}>
              <td key={v4()}>{variable}</td>
              <td key={v4()}>
                {containingVGs.length === 0 ? (
                  <p>-</p>
                ) : (<ContainingVGSelectMenu variableName={variable} />)}
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default SyncTableBody;
