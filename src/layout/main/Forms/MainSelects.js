import React, { useContext } from "react";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  ActionTypeContext,
  TableTypeContext,
  PaginationCounterContext,
} from "../../../contexts/Contexts";
import {
  getToastOnClose,
  toastErrorPopUp,
} from "../../../services/CommonService";
import MatUiSelect from "../../MatUiSelect";

const MainSelects = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const toastMs = getToastOnClose();

  const handleActionTypeChange = (value) => {
    setOnAdd(false);
    setOnDelete(false);
    setOnUpdate(false);
    setActionType(value);
  };

  const setCustomActionType = (value) => {
    setPaginationCounter(0);
    setActionType(value);
  };

  const setCustomTableType = (value) => {
    setActionType("");
    setTableType(value);
  };

  const getActionTypeOptions = () => {
    switch (tableType) {
      case "Variable Groups":
        return (
          <MatUiSelect
            collection={["List", "Add", "Delete", "Update"]}
            inputLabel={"VG action type"}
            id={`vg-action-type`}
            selectValue={actionType}
            setSelectValue={handleActionTypeChange}
            allOption={false}
          />
        );
      case "Secrets":
        return (
          <MatUiSelect
            collection={["List", "Copy", "Delete", "Recover"]}
            inputLabel={"Secret action type"}
            id={`secret-action-type`}
            selectValue={actionType}
            setSelectValue={setActionType}
            allOption={false}
          />
        );
      case "Sync configurations":
        return <></>;
      case "Run pipelines":
        return (
          <MatUiSelect
            collection={["Build", "Release"]}
            inputLabel={"Pipeline action type"}
            id={`pipeline-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
          />
        );
      case "Tags":
        return (
          <MatUiSelect
            collection={["List", "CreateAndBuild"]}
            inputLabel={"Tag action type"}
            id={`tag-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
          />
        );
      case "Pull requests":
        return (
          <MatUiSelect
            collection={["List", "Create", "CreateMultiple"]}
            inputLabel={"PR action type"}
            id={`pr-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
          />
        );
      default:
        toastErrorPopUp("Invalid tableType value!", "table-type", toastMs);
    }
  };

  return (
    <div className="main-select-container">
      <MatUiSelect
        collection={[
          "Secrets",
          "Variable Groups",
          "Sync configurations",
          "Run pipelines",
          "Tags",
          "Pull requests",
        ]}
        inputLabel={"Select table type"}
        id={`select-table-type`}
        selectValue={tableType}
        setSelectValue={setCustomTableType}
        allOption={false}
      />
      {getActionTypeOptions()}
    </div>
  );
};

export default MainSelects;
