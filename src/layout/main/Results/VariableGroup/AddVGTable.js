import React, { useContext } from "react";
import PaginationButtons from "../PaginationButtons";

import { v4 } from 'uuid';

import { PaginationCounterContext, UniqueVariableGroupsContext } from "../../../../contexts/Contexts";
import AddVGTableRow from "./AddVGTableRow";
import TableHeader from "../TableHeader";

const AddVGTable = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { uniqueVariableGroups } = useContext(UniqueVariableGroupsContext);

  const number = 10;

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
                    <AddVGTableRow key={v4()} variableGroup={variableGroup}/>
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
