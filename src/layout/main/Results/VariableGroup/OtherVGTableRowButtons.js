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
  sendDeleteRequest,
  sendUpdateRequest,
} from "../../../../services/VariableGroupServices/VariableGroupInlineService";
import {
  LocalLoadingContext,
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

  const { localLoading, setLocalLoading } = useContext(LocalLoadingContext);

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
    setLocalLoading({ loading: true, row: index });
    sendUpdateRequest(
      message,
      value,
      variableGroup.variableGroupValue,
      setSingleOperation,
      index,
      variableGroups,
      setVariableGroups,
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

  const sendDelete = (variableGroup, index) => {
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    sendDeleteRequest(
      message,
      variableGroup.variableGroupValue,
      setSingleOperation,
      index,
      variableGroups,
      setVariableGroups,
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
    <td key={Math.random()}>
      {isSecretVariableGroup ||
      variableGroup.variableGroupValue === null ||
      variableGroup.variableGroupValue.length > 60 ? (
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
                <>
                  {localLoading.row === index && localLoading.loading ? (
                    <></>
                  ) : (
                    <abbr title="Update">
                      <button onClick={() => startUpdate(index)}>
                        <AiFillEdit />
                      </button>
                    </abbr>
                  )}
                </>
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
                  <button onClick={cancelDelete}>
                    <AiOutlineClose />
                  </button>
                </>
              ) : (
                <>
                  {localLoading.row === index && localLoading.loading ? (
                    <></>
                  ) : (
                    <abbr title="Delete">
                      <button onClick={() => startDelete(index)}>
                        <AiFillDelete />
                      </button>
                    </abbr>
                  )}
                </>
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
      {localLoading.row === index && localLoading.loading ? (
        <span>Loading...</span>
      ) : (
        <></>
      )}
    </td>
  );
};

export default OtherVGTableRowButtons;
