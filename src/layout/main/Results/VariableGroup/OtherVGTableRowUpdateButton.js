import PropTypes from "prop-types";
import React from "react";
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const OtherVGTableRowUpdateButton = ({
  variableGroup,
  onSingleModification,
  localLoading,
  sendUpdate,
  startUpdate,
  cancelUpdate,
  index,
}) => {
  return (
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
  );
};

OtherVGTableRowUpdateButton.propTypes = {
  variableGroup: PropTypes.object.isRequired,
  onSingleModification: PropTypes.object.isRequired,
  localLoading: PropTypes.object.isRequired,
  sendUpdate: PropTypes.func.isRequired,
  startUpdate: PropTypes.func.isRequired,
  cancelUpdate: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default OtherVGTableRowUpdateButton;
