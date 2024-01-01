import React, { useContext, useState } from "react";
import { ContainingVGsContext, LoadingContext, OrganizationContext, PATContext, ProfileNameContext, VariablesSyncContext } from "../../../../contexts/Contexts";
import { Box, Button } from "@mui/material";
import { sendSyncListVariableGroupsRequest } from "../../../../services/VariableGroupServices/VariableGroupService";

import ProjectSelectMenu from "../../../ProjectSelectMenu";

const SyncTableForm = () => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { setLoading } = useContext(LoadingContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);

  const [project, setProject] = useState("");

  const send = async (body) => {
    await sendSyncListVariableGroupsRequest(body, "", setContainingVGs);
  };

  return (
    <>
      <ProjectSelectMenu
        allOption={false}
        projectName={project}
        setProjectName={setProject}
      />

      <Box>
        <Button
          id="get_vgs"
          onClick={() => {
            let counter = 0;
            syncVariables.forEach(async (variable) => {
              let body = {
                projectName: project,
                pat: pat,
                userName: profileName,
                vgRegex: ".*",
                keyRegex: variable,
                organizationName: organizationName,
                setLoading: setLoading,
                containingVGs: containingVGs,
                index: counter,
                secretIncluded: true,
                containsKey: true,
              };
              counter++;
              await send(body);
            });
          }}
          variant="contained"
        >
          Send request
        </Button>
      </Box>
    </>
  );
};

export default SyncTableForm;
