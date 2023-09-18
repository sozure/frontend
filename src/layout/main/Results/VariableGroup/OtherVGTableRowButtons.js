import React, { useContext, useEffect } from "react";
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
} from "../../../../contexts/Contexts";

const OtherVGTableRowButtons = ({
  variableGroups,
  variableGroup,
  isSecretVariableGroup,
  index,
  inputKey,
}) => {
  const { pat } = useContext(PATContext);
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { organizationName } = useContext(OrganizationContext);

  const { singleOperation, setSingleOperation } = useContext(
    SingleOperationContext
  );

  useEffect(() => {
    if (singleOperation.modificationHappened) {
      const timeOut = setTimeout(() =>
        setSingleOperation(
          { modificationHappened: false, success: false, response: "" },
          5000
        )
      );
      clearTimeout(timeOut);
    }
    console.log(singleOperation);
  }, [singleOperation, setSingleOperation]);

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
      index
    );
    
    variableGroup.variableGroupValue = value;
    setOnSingleModificationBack();
  };

  const startUpdate = (row) => {
    let model = { row: row, operation: "update", modification: true };
    setOnSingleModification(model);
  };

  const cancelUpdate = () => {
    setOnSingleModificationBack();
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
      setSingleOperation
    );
    variableGroups.splice(index, 1);
    setOnSingleModificationBack();
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack();
  };

  const setOnSingleModificationBack = () => {
    let model = { row: 0, operation: "", modification: false };
    setOnSingleModification(model);
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
      {singleOperation.modificationHappened ? (
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
