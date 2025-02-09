import "../../../../../../CSS/style.css";
import React, { useContext, useEffect, useState } from "react";

import {
  OnDeleteContext,
  VariablesContext,
  VGChangeExceptionsContext,
} from "../../../../../../contexts/Contexts";
import { getFilteredVariableGroupsByExceptions } from "../../../../../../services/HelperFunctions/ExceptionHelperFunctions";
import MatUIButton from "../../../../../MatUIButton";
import { DataGrid } from "@mui/x-data-grid";

const DeleteVGTable = () => {
  const { variables } = useContext(VariablesContext);
  const { vgChangeExceptions, setVgChangeExceptions } = useContext(
    VGChangeExceptionsContext
  );
  const { onDelete } = useContext(OnDeleteContext);

  const [
    filteredVariableGroupsByExceptions,
    setFilteredVariableGroupsByExceptions,
  ] = useState([]);

  useEffect(() => {
    if (variables.length !== 0) {
      let filteredVariableGroups = getFilteredVariableGroupsByExceptions(
        variables,
        vgChangeExceptions
      );
      let result = [];
      let index = 1;
      filteredVariableGroups.forEach((variableGroup) => {
        result.push({
          id: index,
          project: variableGroup.project,
          variableGroupName: variableGroup.secretVariableGroup
            ? `${variableGroup.variableGroupName} (${variableGroup.keyVaultName})`
            : variableGroup.variableGroupName,
          variableKey: variableGroup.variableGroupKey,
          variableValue: variableGroup.secretVariableGroup
            ? "Secret variable, can't show it's value."
            : variableGroup.variableGroupValue,
        });
        index++;
      });
      setFilteredVariableGroupsByExceptions(result);
    }
  }, [variables, vgChangeExceptions, setFilteredVariableGroupsByExceptions]);

  const addVgToExceptions = (name, variableKey) => {
    let newExceptions = [
      ...vgChangeExceptions,
      { variableGroupName: name, variableKey: variableKey },
    ];
    setVgChangeExceptions(newExceptions);
  };

  const columns = [
    { field: "project", headerName: "Project", width: 250 },
    {
      field: "variableGroupName",
      headerName: "Variable group name",
      width: 250,
    },
    {
      field: "variableKey",
      headerName: "Variable key",
      width: 250,
    },
    {
      field: "variableValue",
      headerName: "Variable value",
      width: 250,
    },
    {
      field: "remove",
      headerName: "",
      width: 250,
      renderCell: (params) => (
        <>
          {onDelete && (
            <MatUIButton
              id={"remove_delete_or_update_suggestion"}
              send={() => {
                addVgToExceptions(
                  params.row.variableGroupName,
                  params.row.variableKey
                );
              }}
              displayName={"X"}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="form">
      {(filteredVariableGroupsByExceptions === null) |
      (filteredVariableGroupsByExceptions === undefined) |
      (filteredVariableGroupsByExceptions.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>
            Variables to be deleted (Total:{" "}
            {filteredVariableGroupsByExceptions.length})
          </h2>
          <br />

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

export default DeleteVGTable;
