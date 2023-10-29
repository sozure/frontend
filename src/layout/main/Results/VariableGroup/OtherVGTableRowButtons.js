import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 } from "uuid";

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
import OtherVGTableRowDeleteButton from "./OtherVGTableRowDeleteButton";
import OtherVGTableRowUpdateButton from "./OtherVGTableRowUpdateButton";

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
  const { setSingleOperation } = useContext(SingleOperationContext);

  const { localLoading, setLocalLoading } = useContext(LocalLoadingContext);

  const sendUpdate = (variableGroup) => {
    let value = document.getElementById(`single_update${inputKey}`).value;
    let message = {
      projectName: variableGroup.project,
      organizationName: organizationName,
      pat: pat,
      newValue: value,
      vgRegex: variableGroup.variableGroupName,
      vgValueRegex: variableGroup.variableGroupValue,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    setLocalLoading({ loading: true, row: index });
    sendUpdateRequest(
      message,
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
    setLocalLoading({ loading: true, row: index });
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
    <td key={v4()}>
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
            <OtherVGTableRowUpdateButton
              variableGroup={variableGroup}
              onSingleModification={onSingleModification}
              sendUpdate={sendUpdate}
              startUpdate={startUpdate}
              cancelUpdate={cancelUpdate}
              localLoading={localLoading}
              index={index}
            />
          )}

          {onSingleModification.operation === "update" &&
          onSingleModification.row === index ? (
            <></>
          ) : (
            <OtherVGTableRowDeleteButton
              variableGroup={variableGroup}
              onSingleModification={onSingleModification}
              localLoading={localLoading}
              sendDelete={sendDelete}
              startDelete={startDelete}
              cancelDelete={cancelDelete}
              index={index}
            />
          )}
        </div>
      )}
      {localLoading.row === index && localLoading.loading ? (
        <span>Loading...</span>
      ) : (
        <></>
      )}
    </td>
  );
};

OtherVGTableRowButtons.propTypes = {
  inputKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  variableGroup: PropTypes.object.isRequired,
  isSecretVariableGroup: PropTypes.bool.isRequired,
};

export default OtherVGTableRowButtons;
