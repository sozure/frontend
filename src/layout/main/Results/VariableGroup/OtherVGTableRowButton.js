import PropTypes from "prop-types";
import React from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

const OtherVGTableRowButton = ({
  variableGroup,
  onSingleModification,
  localLoading,
  sendAction,
  startAction,
  cancelAction,
  index,
  type
}) => {

  return (
    <>
      {onSingleModification.modification &&
      onSingleModification.row === index ? (
        <>
          <button onClick={() => sendAction(variableGroup, index)}>
            <AiOutlineCheck />
          </button>
          <button onClick={cancelAction}>
            <AiOutlineClose />
          </button>
        </>
      ) : (
        <>
          {localLoading.row === index && localLoading.loading ? (
            <></>
          ) : (
            <abbr title={type}>
              <button onClick={() => startAction(index)}>
                {type === "Update" ? <AiFillEdit /> : <AiFillDelete /> }
              </button>
            </abbr>
          )}
        </>
      )}
    </>
  );
};

OtherVGTableRowButton.propTypes = {
  variableGroup: PropTypes.object.isRequired,
  onSingleModification: PropTypes.object.isRequired,
  localLoading: PropTypes.object.isRequired,
  sendAction: PropTypes.func.isRequired,
  startAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default OtherVGTableRowButton;
