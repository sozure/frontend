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

export default OtherVGTableRowDeleteButton;
