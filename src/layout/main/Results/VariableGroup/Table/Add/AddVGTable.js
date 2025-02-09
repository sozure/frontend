import React, { useContext, useEffect, useState } from "react";

import {
  VariableGroupsContext,
  VGChangeExceptionsContext,
} from "../../../../../../contexts/Contexts";
import { getFilteredVariableGroupsByExceptions } from "../../../../../../services/HelperFunctions/ExceptionHelperFunctions";
import { DataGrid } from "@mui/x-data-grid";
import MatUIButton from "../../../../../MatUIButton";

const AddVGTable = () => {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { vgChangeExceptions, setVgChangeExceptions } = useContext(
    VGChangeExceptionsContext
  );

  const [
    filteredVariableGroupsByExceptions,
    setFilteredVariableGroupsByExceptions,
  ] = useState([]);

  const columns = [
    { field: "project", headerName: "Project", width: 425 },
    {
      field: "variableGroupName",
      headerName: "Variable group name",
      width: 425,
    },
    {
      field: "remove",
      headerName: "",
      width: 425,
      renderCell: (params) => (
        <MatUIButton
          id={"remove_add_suggestion"}
          send={() => {
            addVgToExceptions(params.row.variableGroupName);
          }}
          displayName={"X"}
        />
      ),
    },
  ];

  useEffect(() => {
    if (variableGroups.length !== 0) {
      let filteredVariableGroups = getFilteredVariableGroupsByExceptions(
        variableGroups,
        vgChangeExceptions
      );
      let result = [];
      let index = 1;
      filteredVariableGroups.forEach((variableGroup) => {
        result.push({
          id: index,
          project: variableGroup.project,
          variableGroupName: variableGroup.variableGroupName,
        });
        index++;
      });
      setFilteredVariableGroupsByExceptions(result);
    }
  }, [
    variableGroups,
    vgChangeExceptions,
    setFilteredVariableGroupsByExceptions,
  ]);

  const addVgToExceptions = (name) => {
    let newExceptions = [...vgChangeExceptions, { variableGroupName: name }];
    setVgChangeExceptions(newExceptions);
  };

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
          <DataGrid
            rows={filteredVariableGroupsByExceptions}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </>
      )}
    </div>
  );
};

export default AddVGTable;
