import React, { useContext, useEffect, useState } from "react";

import { v4 } from "uuid";

import AddVGTableRow from "./AddVGTableRow";
import PaginationButtons from "../../../PaginationButtons";
import {
  PaginationCounterContext,
  VariableGroupsContext,
  VGChangeExceptionsContext,
} from "../../../../../../contexts/Contexts";
import TableHeader from "../../../TableHeader";
import { getFilteredVariableGroupsByExceptions } from "../../../../../../services/HelperFunctions/ExceptionHelperFunctions";

const AddVGTable = () => {
  const { paginationCounter, setPaginationCounter } = useContext(
    PaginationCounterContext
  );
  const { variableGroups } = useContext(VariableGroupsContext);
  const { vgChangeExceptions } = useContext(VGChangeExceptionsContext);

  const [
    filteredVariableGroupsByExceptions,
    setFilteredVariableGroupsByExceptions,
  ] = useState([variableGroups]);

  const number = 5;

  const [partOfVariableGroups, setPartOfVariableGroups] = useState([]);

  useEffect(() => {
    if (filteredVariableGroupsByExceptions.length !== 0) {
      let tempPartOfVariableGroups = filteredVariableGroupsByExceptions.slice(
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
  }, [
    filteredVariableGroupsByExceptions,
    paginationCounter,
    setPaginationCounter,
  ]);

  useEffect(() => {
    if (variableGroups.length !== 0) {
      let filteredVariableGroups = getFilteredVariableGroupsByExceptions(
        variableGroups,
        vgChangeExceptions
      );
      setFilteredVariableGroupsByExceptions(filteredVariableGroups);
    }
  }, [
    variableGroups,
    vgChangeExceptions,
    setFilteredVariableGroupsByExceptions,
  ]);

  return (
    <div>
      {filteredVariableGroupsByExceptions.length === 0 ? (
        <h2>No variable groups found.</h2>
      ) : (
        <>
          <h2>
            Add variable to these variable groups (Found variable groups:{" "}
            {filteredVariableGroupsByExceptions.length}
            ).
          </h2>
          <table>
            <TableHeader
              columnList={["Project", "Variable group name", "Remove"]}
            />

            <tbody>
              {partOfVariableGroups.map((variableGroup) => {
                return (
                  <AddVGTableRow key={v4()} variableGroup={variableGroup} />
                );
              })}
            </tbody>
          </table>
          <PaginationButtons collection={filteredVariableGroupsByExceptions} />
        </>
      )}
    </div>
  );
};

export default AddVGTable;