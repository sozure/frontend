import React, { useContext } from "react";
import KeyVaultBaseForm from "../KeyVault/BaseForms/KeyVaultBaseForm";
import { getProjects } from "../../../../services/ProjectService";
import { getProfile } from "../../../../services/ProfileService";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  ClientIdContext,
  ClientSecretContext,
  KVAuthorizedContext,
  KeyVaultsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
  ProjectsContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import { checkRequiredInputs } from "../../../../services/CommonService";
import { sendListKeyVaultsRequest } from "../../../../services/SecretServices/SecretService";
import { CommonAuthorizeFormElements } from "./CommonAuthorizeFormElements";

const KVAuthorizeForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { setKeyVaults } = useContext(KeyVaultsContext);
  const { setKvAuthorized } = useContext(KVAuthorizedContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { profileName, setProfileName } = useContext(ProfileNameContext);

  const mandatoryFields = [tenantId, clientId, clientSecret];

  const auth = () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform");
    if (!incorrectFill) {
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        userName: profileName,
      };

      sendListKeyVaultsRequest(
        message,
        setLoading,
        setKeyVaults,
        setKvAuthorized
      );
      setLoading(true);
      getProjects(
        organizationName,
        pat,
        setProjects,
        setKvAuthorized,
        setProjectName,
        setLoading
      );
      setLoading(true);
      getProfile(
        organizationName,
        pat,
        setProfileName,
        setKvAuthorized,
        setLoading
      );
    }
  };
  return (
    <div className="form">
      <KeyVaultBaseForm />
      <CommonAuthorizeFormElements />
      <Button variant="contained" id="authorize_keyvault" onClick={auth}>
        Authorize
      </Button>
      <ToastContainer />
    </div>
  );
};

export default KVAuthorizeForm;
