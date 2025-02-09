import React, { useContext } from "react";
import ActionButtons from "../ActionButtons";

import {
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
} from "../../../../../contexts/Contexts";
import UpdateVGTable from "./Update/UpdateVGTable";
import DeleteVGTable from "./Delete/DeleteTable";
import GetVGTable from "./Get/GetVGTable";
import AddVGTable from "./Add/AddVGTable";

const GetActionTable = (onAdd, onUpdate, onDelete) => {
  if (onAdd) {
    return <AddVGTable />;
  } else if (onUpdate) {
    return <UpdateVGTable />;
  } else if (onDelete) {
    return <DeleteVGTable />;
  } else {
    return <GetVGTable />;
  }
};

const VGTable = () => {
  const { onAdd } = useContext(OnAddContext);
  const { onUpdate } = useContext(OnUpdateContext);
  const { onDelete } = useContext(OnDeleteContext);

  return (
    <div>
      {GetActionTable(onAdd, onUpdate, onDelete)}
      <ActionButtons />
    </div>
  );
};

export default VGTable;
