import React, { useContext } from "react";
import KeyVaultBaseForm from "../KeyVault/BaseForms/KeyVaultBaseForm";
import { getProjects } from "../../../../services/ProjectService";
import { getProfile } from "../../../../services/ProfileService";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  ClientIdContext,
  ClientSecretContext,
  DefaultSubscriptionContext,
  KVAuthorizedContext,
  KeyVaultsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
  ProjectsContext,
  SubscriptionsContext,
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
  const { setSubscriptions } = useContext(SubscriptionsContext);
  const { setDefaultSubscription } = useContext(
    DefaultSubscriptionContext
  );

  const mandatoryFields = [tenantId, clientId, clientSecret];

  const auth = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform", 1500);
    if (!incorrectFill) {
      let statuses = [];
      setLoading(true);
      await getProjects(
        organizationName,
        pat,
        setProjects,
        setProjectName,
        setSubscriptions,
        statuses
      );
      await getProfile(organizationName, pat, setProfileName, statuses);
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        userName: profileName === "" ? "empty" : profileName,
      };
      await sendListKeyVaultsRequest(
        message,
        setKeyVaults,
        setDefaultSubscription,
        statuses
      );
      setTimeout(() => {
        let counter = 0;
        statuses.forEach((status) => {
          if (status === 1) {
            counter++;
          }
        });
        setKvAuthorized(statuses.length === counter);
        setLoading(false);
      }, 2000);
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
