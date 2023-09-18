import React, { useEffect, useState, useContext } from "react";
import PaginationButtons from "../PaginationButtons";

import { PaginationCounterContext, VariableGroupsContext } from "../../../../contexts/Contexts";
import AddVGTableRow from "./AddVGTableRow";
import TableHeader from "./TableHeader";

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
              <TableHeader columnList={["Project", "Variable group name"]}/>
            </thead>

            <tbody>
              {uniqueVariableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  return (
                    <AddVGTableRow key={Math.random()} variableGroup={variableGroup}/>
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
