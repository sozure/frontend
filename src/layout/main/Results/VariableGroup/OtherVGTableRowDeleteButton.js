import PropTypes from "prop-types";
import React from "react";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const OtherVGTableRowDeleteButton = ({
  variableGroup,
  onSingleModification,
  localLoading,
  sendDelete,
  startDelete,
  cancelDelete,
  index,
}) => {
  return (
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
  );
};

OtherVGTableRowDeleteButton.propTypes = {
  variableGroup: PropTypes.object.isRequired,
  onSingleModification: PropTypes.object.isRequired,
  localLoading: PropTypes.object.isRequired,
  sendDelete: PropTypes.func.isRequired,
  startDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default OtherVGTableRowDeleteButton;
