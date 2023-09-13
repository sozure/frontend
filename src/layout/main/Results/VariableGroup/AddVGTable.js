import React, { useEffect, useState, useContext } from "react";
import PaginationButtons from "../PaginationButtons";

import { PaginationCounterContext, VariableGroupsContext } from "../../../../contexts/Contexts";

const AddVGTable = () => {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const [ uniqueVariableGroups, setUniqueVariableGroups ] = useState([]);

  const number = 10;

  useEffect(() => {
    let helperList = [];
    let helperList2 = [];
    variableGroups.forEach((element) => {
      let variableGroupName = element.variableGroupName;
      if (!helperList.includes(variableGroupName)) {
        helperList.push(variableGroupName);
        helperList2.push({
          variableGroupName: variableGroupName,
          project: element.project,
        });
      }
    });
    setUniqueVariableGroups(helperList2);
  }, [variableGroups]);

  return (
    <div>
      {uniqueVariableGroups.length === 0 ? (
        <h2>No variable groups found.</h2>
      ) : (
        <>
          <h2>
            Add variable to these variable groups (Found variable groups:{" "}
            {uniqueVariableGroups.length}).
          </h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Variable group name</th>
              </tr>
            </thead>

            <tbody>
              {uniqueVariableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>{variableGroup.project}</td>
                      <td key={Math.random()}>
                        {variableGroup.variableGroupName}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <PaginationButtons collection={uniqueVariableGroups} />
        </>
      )}
    </div>
  );
};

export default AddVGTable;
