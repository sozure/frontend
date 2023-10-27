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

export default OtherVGTableRowUpdateButton;
