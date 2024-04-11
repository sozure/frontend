import React, { useContext } from "react";
import PaginationButtons from "../PaginationButtons";

import { v4 } from "uuid";

import {
  PaginationCounterContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";
import AddVGTableRow from "./AddVGTableRow";
import TableHeader from "../TableHeader";

const AddVGTable = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { variableGroups } = useContext(VariableGroupsContext);

  const number = 5;

  return (
    <div>
      {variableGroups.length === 0 ? (
        <h2>No variable groups found.</h2>
      ) : (
        <>
          <h2>
            Add variable to these variable groups (Found variable groups:{" "}
            {variableGroups.length}).
          </h2>
          <table>
            <TableHeader columnList={["Project", "Variable group name"]} />

            <tbody>
              {variableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  return (
                    <AddVGTableRow key={v4()} variableGroup={variableGroup} />
                  );
                })}
            </tbody>
          </table>
          <PaginationButtons collection={variableGroups} />
        </>
      )}
    </div>
  );
};

export default AddVGTable;
