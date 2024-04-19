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
import MatUISelect from "../../MatUISelect";

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
          <MatUISelect
            collection={["List", "Add", "Delete", "Update"]}
            inputLabel={"VG action type"}
            id={`vg-action-type`}
            selectValue={actionType}
            setSelectValue={handleActionTypeChange}
            allOption={false}
            required={true}
          />
        );
      case "Secrets":
        return (
          <MatUISelect
            collection={["List", "Copy", "Delete", "Recover"]}
            inputLabel={"Secret action type"}
            id={`secret-action-type`}
            selectValue={actionType}
            setSelectValue={setActionType}
            allOption={false}
            required={true}
          />
        );
      case "Sync configurations":
        return <></>;
      case "Run pipelines":
        return (
          <MatUISelect
            collection={["Build", "Release"]}
            inputLabel={"Pipeline action type"}
            id={`pipeline-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
            required={true}
          />
        );
      case "Tags":
        return (
          <MatUISelect
            collection={["List", "CreateAndBuild"]}
            inputLabel={"Tag action type"}
            id={`tag-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
            required={true}
          />
        );
      case "Pull requests":
        return (
          <MatUISelect
            collection={["List", "Create", "CreateMultiple"]}
            inputLabel={"PR action type"}
            id={`pr-action-type`}
            selectValue={actionType}
            setSelectValue={setCustomActionType}
            allOption={false}
            required={true}
          />
        );
      default:
        toastErrorPopUp("Invalid tableType value!", "table-type", toastMs);
    }
  };

  return (
    <div className="main-select-container">
      <MatUISelect
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
        required={true}
      />
      {getActionTypeOptions()}
    </div>
  );
};

export default MainSelects;
