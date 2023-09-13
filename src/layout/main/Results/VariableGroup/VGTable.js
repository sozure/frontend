import React, { useContext } from "react";
import AddVGTable from "./AddVGTable";
import ActionButtons from "./ActionButtons";

import { OnAddContext } from "../../../../contexts/Contexts";
import OtherVGTable from "./OtherVGTable";

const VGTable = () => {
  const { onAdd } = useContext(OnAddContext);

  return (
    <div>
      {onAdd ? <AddVGTable /> : <OtherVGTable />}
      <ActionButtons />
    </div>
  );
};

export default VGTable;
