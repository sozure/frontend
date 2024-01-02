import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  PaginationCounterContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import ContainingVGSelectMenu from "./ContainingVGSelectMenu";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const SyncTableBody = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { containingVGs } = useContext(ContainingVGsContext);
  const { syncVariables, setSyncVariables } = useContext(VariablesSyncContext);

  const [modification, setModification] = useState({});
  const [newVariableName, setNewVariableName] = useState("");

  const number = 10;

  useEffect(() => {
    if(modification.modification){
      setNewVariableName(modification.variable);
    }
  }, [modification])

  const changeSync = (variableToBeReplaced) => {
    let result = [];
    syncVariables.forEach(variable => {
      if(variable === variableToBeReplaced){
        result.push(newVariableName);
      } else {
        result.push(variable);
      }
    });
    setSyncVariables(result);
    setModification({});
  }

  return (
    <>
      {syncVariables
        .slice(paginationCounter, paginationCounter + number)
        .map((variable) => {
          return (
            <tr key={v4()}>
              <td key={v4()}>
                {modification.modification &&
                modification.variable === variable ? (
                  <input
                    type="text"
                    key={v4()}
                    id={variable}
                    name={v4()}
                    value={newVariableName}
                    onChange={(event) => setNewVariableName(event.target.value)}
                  />
                ) : (
                  <>{variable}</>
                )}
              </td>
              <td key={v4()}>
                {modification.modification &&
                modification.variable === variable ? (
                  <>
                    <button onClick={() => changeSync(variable)}>
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
                {containingVGs.length === 0 ? (
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
