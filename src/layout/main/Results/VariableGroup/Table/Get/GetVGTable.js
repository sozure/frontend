import "../../../../../../CSS/style.css";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  LocalLoadingContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  SingleModificationContext,
  SingleOperationContext,
  VariablesContext,
} from "../../../../../../contexts/Contexts";
import { DataGrid } from "@mui/x-data-grid";
import GetVGTableRowInput from "./GetVGTableRowInput";
import CopyButton from "../../../../CopyButton";
import GetVGTableRowButton from "./GetVGTableRowButton";
import CustomClipLoader from "../../../../../CustomClipLoader";
import {
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../../../services/CommonService";
import {
  sendDeleteRequest,
  sendUpdateRequest,
} from "../../../../../../services/VariableGroupServices/VariableGroupInlineService";

const GetVGTable = () => {
  const { variables } = useContext(VariablesContext);
  const { localLoading, setLocalLoading } = useContext(LocalLoadingContext);
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { profileName } = useContext(ProfileNameContext);

  const [variablesForDataGrid, setVariablesForDataGrid] = useState([]);
  const [helperVariables, setHelperVariables] = useState([]);
  const inputKey = v4();

  useEffect(() => {
    let result = [];
    let helper = [];
    let counter = 1;
    variables.forEach((variable) => {
      result.push({
        id: counter,
        project: variable.project,
        variableGroupName: variable.secretVariableGroup
          ? `${variable.variableGroupName} (${variable.keyVaultName})`
          : variable.variableGroupName,
        variableKey: variable.variableGroupKey,
        variableValue: variable.variableGroupValue,
        operation: null,
      });
      helper.push({
        id: counter,
        isSecretVariableGroup: variable.secretVariableGroup,
        index: findIndexOfVariableGroup(variables, variable),
      });
      counter++;
    });
    setVariablesForDataGrid(result);
    setHelperVariables(helper);
  }, [variables]);

  const GetColumns = (
    helperList,
    onSingleModification,
    localLoading,
    inputKey
  ) => {
    return [
      { field: "project", headerName: "Project", width: 200 },
      {
        field: "variableGroupName",
        headerName: "Variable Group Name",
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
        renderCell: (params) =>
          onSingleModification.modification &&
          onSingleModification.operation === "update" &&
          onSingleModification.row ===
            findVariableInHelperList(helperList, params.row.id).index ? (
            <GetVGTableRowInput
              inputKey={inputKey}
              variableValue={params.row.variableValue}
            />
          ) : (
            <span
              className={
                findVariableInHelperList(helperList, params.row.id)
                  .isSecretVariableGroup
                  ? "error"
                  : ""
              }
            >
              {findVariableInHelperList(helperList, params.row.id)
                .isSecretVariableGroup
                ? "Secret variable, can't show it's value."
                : params.row.variableValue}
            </span>
          ),
      },
      {
        field: "operation",
        headerName: "Operation",
        width: 250,
        renderCell: (params) => (
          <>
            {findVariableInHelperList(helperList, params.row.id)
              .isSecretVariableGroup || params.row.variableValue === null ? (
              <span className={"error"}>Can't change variable.</span>
            ) : (
              <div className="tableButtons">
                {(onSingleModification.modification &&
                  onSingleModification.row ===
                    findVariableInHelperList(helperList, params.row.id)
                      .index) ||
                (localLoading.row ===
                  findVariableInHelperList(helperList, params.row.id).index &&
                  localLoading.loading) ? (
                  <></>
                ) : (
                  <CopyButton value={params.row.variableValue} />
                )}{" "}
                {onSingleModification.operation === "deletion" &&
                onSingleModification.row ===
                  findVariableInHelperList(helperList, params.row.id).index ? (
                  <></>
                ) : (
                  <GetVGTableRowButton
                    variableGroup={params.row}
                    onSingleModification={onSingleModification}
                    sendAction={sendUpdate}
                    startAction={startUpdate}
                    cancelAction={cancelUpdate}
                    localLoading={localLoading}
                    index={
                      findVariableInHelperList(helperList, params.row.id).index
                    }
                    type={"Update"}
                  />
                )}{" "}
                {onSingleModification.operation === "update" &&
                onSingleModification.row ===
                  findVariableInHelperList(helperList, params.row.id).index ? (
                  <></>
                ) : (
                  <GetVGTableRowButton
                    variableGroup={params.row}
                    onSingleModification={onSingleModification}
                    localLoading={localLoading}
                    sendAction={sendDelete}
                    startAction={startDelete}
                    cancelAction={cancelDelete}
                    index={
                      findVariableInHelperList(helperList, params.row.id).index
                    }
                    type={"Delete"}
                  />
                )}
              </div>
            )}
            {localLoading.row ===
              findVariableInHelperList(helperList, params.row.id).index &&
              localLoading.loading && <CustomClipLoader />}
          </>
        ),
      },
    ];
  };

  const findVariableInHelperList = (helperList, id) => {
    let result = null;
    helperList.forEach((variable) => {
      if (variable.id === id) {
        result = variable;
      }
    });
    return result;
  };

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupKey === variableGroup.variableGroupKey &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  const sendUpdate = async (variable, index) => {
    let value = document.getElementById(`single_update${inputKey}`).value;
    let message = {
      projectName: variable.project,
      organizationName: organizationName,
      userName: profileName,
      pat: pat,
      newValue: value,
      vgRegex: variable.variableGroupName,
      vgValueRegex: variable.variableValue,
      keyRegex: variable.variableKey,
      secretIncluded: false,
      keyIsRegex: false,
    };
    setLocalLoading({ loading: true, row: index });
    await sendUpdateRequest(
      message,
      setSingleOperation,
      index,
      variablesForDataGrid,
      setVariablesForDataGrid,
      setLocalLoading
    );
    setOnSingleModificationBack(setOnSingleModification);
    setTimeout(() => setSingleOperationBack(setSingleOperation), 3000);
  };

  const startUpdate = (row) => {
    let model = {
      row: row,
      operation: "update",
      modification: true,
    };
    setOnSingleModification(model);
  };

  const cancelUpdate = () => {
    setOnSingleModificationBack(setOnSingleModification);
  };

  const sendDelete = async (variable, index) => {
    let message = {
      projectName: variable.project,
      pat: pat,
      userName: profileName,
      vgRegex: variable.variableGroupName,
      organizationName: organizationName,
      keyRegex: variable.variableKey,
      secretIncluded: false,
    };
    setLocalLoading({ loading: true, row: index });
    await sendDeleteRequest(
      message,
      variable.variableValue,
      setSingleOperation,
      index,
      variablesForDataGrid,
      setVariablesForDataGrid,
      setLocalLoading
    );
    setOnSingleModificationBack(setOnSingleModification);
  };

  const startDelete = (row) => {
    let model = {
      row: row,
      operation: "deletion",
      modification: true,
    };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack(setOnSingleModification);
  };

  return (
    <div className="form">
      {(variablesForDataGrid === null) |
      (variablesForDataGrid === undefined) |
      (variablesForDataGrid.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>
            Matched variables (Found variables: {variablesForDataGrid.length})
          </h2>
          <br />
          <DataGrid
            rows={variablesForDataGrid}
            columns={GetColumns(
              helperVariables,
              onSingleModification,
              localLoading,
              inputKey
            )}
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

export default GetVGTable;
