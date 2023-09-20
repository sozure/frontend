import React, { useContext } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineTrophy,
  AiOutlineStop,
} from "react-icons/ai";
import {
  sendDeleteRequest2,
  sendUpdateRequest2,
} from "../../../../services/VariableGroupService";
import {
  OrganizationContext,
  PATContext,
  SingleModificationContext,
  SingleOperationContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";
import {
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

const OtherVGTableRowButtons = ({
  variableGroup,
  isSecretVariableGroup,
  index,
  inputKey,
}) => {
  const { pat } = useContext(PATContext);
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );

  const { variableGroups, setVariableGroups } = useContext(
    VariableGroupsContext
  );

  const { organizationName } = useContext(OrganizationContext);
  const { singleOperation, setSingleOperation } = useContext(
    SingleOperationContext
  );

  const sendUpdate = (variableGroup) => {
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    let value = document.getElementById(`single_update${inputKey}`).value;
    sendUpdateRequest2(
      message,
      value,
      variableGroup.variableGroupValue,
      setSingleOperation,
      index,
      variableGroups,
      setVariableGroups
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

  const sendDelete = (variableGroup, index) => {
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    sendDeleteRequest2(
      message,
      variableGroup.variableGroupValue,
      setSingleOperation,
      index,
      variableGroups,
      setVariableGroups
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
    <td key={Math.random()}>
      {isSecretVariableGroup |
      (variableGroup.variableGroupValue.length > 60) ? (
        <span className={"error"}>Can't change variable.</span>
      ) : (
        <div className="tableButtons">
          {onSingleModification.operation === "deletion" &&
          onSingleModification.row === index ? (
            <></>
          ) : (
            <>
              {onSingleModification.modification &&
              onSingleModification.row === index ? (
                <>
                  <button onClick={() => sendUpdate(variableGroup)}>
                    <AiOutlineCheck />
                  </button>

                  <button onClick={() => cancelUpdate()}>
                    <AiOutlineClose />
                  </button>
                </>
              ) : (
                <button onClick={() => startUpdate(index)}>
                  <AiFillEdit />
                </button>
              )}
            </>
          )}

          {onSingleModification.operation === "update" &&
          onSingleModification.row === index ? (
            <></>
          ) : (
            <>
              {onSingleModification.modification &&
              onSingleModification.row === index ? (
                <>
                  <button onClick={() => sendDelete(variableGroup, index)}>
                    <AiOutlineCheck />
                  </button>
                  <button onClick={() => cancelDelete()}>
                    <AiOutlineClose />
                  </button>
                </>
              ) : (
                <button onClick={() => startDelete(index)}>
                  <AiFillDelete />
                </button>
              )}
            </>
          )}
        </div>
      )}
      {singleOperation.modificationHappened &&
      singleOperation.row === index &&
      singleOperation.operation === "Update" ? (
        <div>
          {singleOperation.success ? (
            <>
              <span>Success </span>
              <AiOutlineTrophy />
            </>
          ) : (
            <>
              <span>{singleOperation.response} </span>
              <AiOutlineStop />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </td>
  );
};

export default OtherVGTableRowButtons;
