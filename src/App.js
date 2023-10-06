import "./CSS/style.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./layout/main/Main";
import {
  ActionTypeContext,
  KeyRegexContext,
  KeyVaultNameContext,
  LoadingContext,
  MessageContext,
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  OrganizationContext,
  PATContext,
  ProjectNameContext,
  ProjectsContext,
  SecretContext,
  SecretRegexContext,
  TableTypeContext,
  VGAuthorizedContext,
  VGRegexContext,
  ValueRegexContext,
  VariableGroupsContext,
  NewKeyContext,
  NewValueContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  OriginKeyVaultContext,
  DestinationKeyVaultContext,
  PaginationCounterContext,
  OnRecoverContext,
  SingleModificationContext,
  SingleOperationContext,
  LocalLoadingContext,
  KeyIsRegexContext,
} from "./contexts/Contexts";

function App() {
  let envTenantId =
    process.env.REACT_APP_TENANT_ID === undefined ||
    process.env.REACT_APP_TENANT_ID === ""
      ? ""
      : process.env.REACT_APP_TENANT_ID;

  let envClientId =
    process.env.REACT_APP_CLIENT_ID === undefined ||
    process.env.REACT_APP_CLIENT_ID === ""
      ? ""
      : process.env.REACT_APP_CLIENT_ID;

  let envClientSecret =
    process.env.REACT_APP_CLIENT_SECRET === undefined ||
    process.env.REACT_APP_CLIENT_SECRET === ""
      ? ""
      : process.env.REACT_APP_CLIENT_SECRET;

  let envPAT =
    process.env.REACT_APP_PAT === undefined || process.env.REACT_APP_PAT === ""
      ? ""
      : process.env.REACT_APP_PAT;

  let envOrg =
    process.env.REACT_APP_ORGANIZATION === undefined ||
    process.env.REACT_APP_ORGANIZATION === ""
      ? ""
      : process.env.REACT_APP_ORGANIZATION;

  const [keyVaultName, setKeyVaultName] = useState("");
  const [actionType, setActionType] = useState("List");
  const [tableType, setTableType] = useState("KV");
  const [pat, setPat] = useState(envPAT);
  const [projectName, setProjectName] = useState("");
  const [organizationName, setOrganizationName] = useState(envOrg);
  const [valueRegex, setValueRegex] = useState("");
  const [vgRegex, setVgRegex] = useState("");
  const [secretRegex, setSecretRegex] = useState("");
  const [keyRegex, setKeyRegex] = useState("");
  const [variableGroups, setVariableGroups] = useState([]);
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onRecover, setOnRecover] = useState(false);
  const [keyIsRegex, setKeyIsRegex] = useState(false);
  const [message, setMessage] = useState({});
  const [projects, setProjects] = useState([]);
  const [vgAuthorized, setVgAuthorized] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [tenantId, setTenantId] = useState(envTenantId);
  const [clientId, setClientId] = useState(envClientId);
  const [clientSecret, setClientSecret] = useState(envClientSecret);
  const [originKeyVault, setOriginKeyVault] = useState("");
  const [destinationKeyVault, setDestinationKeyVault] = useState("");
  const [paginationCounter, setPaginationCounter] = useState(0);

  const [onSingleModification, setOnSingleModification] = useState({
    row: -1,
    operation: "",
    modification: false,
  });

  const [singleOperation, setSingleOperation] = useState({
    row: -1,
    modificationHappened: false,
    success: false,
    response: "",
    operation: "",
  });

  const [localLoading, setLocalLoading] = useState({ loading: false, row: -1 });

  return (
    <KeyVaultNameContext.Provider value={{ keyVaultName, setKeyVaultName }}>
      <ActionTypeContext.Provider value={{ actionType, setActionType }}>
        <TableTypeContext.Provider value={{ tableType, setTableType }}>
          <PATContext.Provider value={{ pat, setPat }}>
            <ProjectNameContext.Provider
              value={{ projectName, setProjectName }}
            >
              <ValueRegexContext.Provider value={{ valueRegex, setValueRegex }}>
                <VGRegexContext.Provider value={{ vgRegex, setVgRegex }}>
                  <SecretRegexContext.Provider
                    value={{ secretRegex, setSecretRegex }}
                  >
                    <KeyRegexContext.Provider value={{ keyRegex, setKeyRegex }}>
                      <VariableGroupsContext.Provider
                        value={{ variableGroups, setVariableGroups }}
                      >
                        <LoadingContext.Provider
                          value={{ loading, setLoading }}
                        >
                          <OnUpdateContext.Provider
                            value={{ onUpdate, setOnUpdate }}
                          >
                            <OnAddContext.Provider value={{ onAdd, setOnAdd }}>
                              <OnDeleteContext.Provider
                                value={{ onDelete, setOnDelete }}
                              >
                                <SecretContext.Provider
                                  value={{ secrets, setSecrets }}
                                >
                                  <MessageContext.Provider
                                    value={{ message, setMessage }}
                                  >
                                    <OrganizationContext.Provider
                                      value={{
                                        organizationName,
                                        setOrganizationName,
                                      }}
                                    >
                                      <ProjectsContext.Provider
                                        value={{ projects, setProjects }}
                                      >
                                        <VGAuthorizedContext.Provider
                                          value={{
                                            vgAuthorized,
                                            setVgAuthorized,
                                          }}
                                        >
                                          <NewKeyContext.Provider
                                            value={{ newKey, setNewKey }}
                                          >
                                            <NewValueContext.Provider
                                              value={{ newValue, setNewValue }}
                                            >
                                              <TenantIdContext.Provider
                                                value={{
                                                  tenantId,
                                                  setTenantId,
                                                }}
                                              >
                                                <ClientIdContext.Provider
                                                  value={{
                                                    clientId,
                                                    setClientId,
                                                  }}
                                                >
                                                  <ClientSecretContext.Provider
                                                    value={{
                                                      clientSecret,
                                                      setClientSecret,
                                                    }}
                                                  >
                                                    <OriginKeyVaultContext.Provider
                                                      value={{
                                                        originKeyVault,
                                                        setOriginKeyVault,
                                                      }}
                                                    >
                                                      <DestinationKeyVaultContext.Provider
                                                        value={{
                                                          destinationKeyVault,
                                                          setDestinationKeyVault,
                                                        }}
                                                      >
                                                        <PaginationCounterContext.Provider
                                                          value={{
                                                            paginationCounter,
                                                            setPaginationCounter,
                                                          }}
                                                        >
                                                          <OnRecoverContext.Provider
                                                            value={{
                                                              onRecover,
                                                              setOnRecover,
                                                            }}
                                                          >
                                                            <SingleModificationContext.Provider
                                                              value={{
                                                                onSingleModification,
                                                                setOnSingleModification,
                                                              }}
                                                            >
                                                              <SingleOperationContext.Provider
                                                                value={{
                                                                  singleOperation,
                                                                  setSingleOperation,
                                                                }}
                                                              >
                                                                <LocalLoadingContext.Provider
                                                                  value={{
                                                                    localLoading,
                                                                    setLocalLoading,
                                                                  }}
                                                                >
                                                                  <KeyIsRegexContext.Provider
                                                                    value={{
                                                                      keyIsRegex, setKeyIsRegex,
                                                                    }}
                                                                  >
                                                                    <BrowserRouter>
                                                                      <Routes>
                                                                        <Route
                                                                          path="/"
                                                                          element={
                                                                            <Main />
                                                                          }
                                                                        />
                                                                      </Routes>
                                                                    </BrowserRouter>
                                                                  </KeyIsRegexContext.Provider>
                                                                </LocalLoadingContext.Provider>
                                                              </SingleOperationContext.Provider>
                                                            </SingleModificationContext.Provider>
                                                          </OnRecoverContext.Provider>
                                                        </PaginationCounterContext.Provider>
                                                      </DestinationKeyVaultContext.Provider>
                                                    </OriginKeyVaultContext.Provider>
                                                  </ClientSecretContext.Provider>
                                                </ClientIdContext.Provider>
                                              </TenantIdContext.Provider>
                                            </NewValueContext.Provider>
                                          </NewKeyContext.Provider>
                                        </VGAuthorizedContext.Provider>
                                      </ProjectsContext.Provider>
                                    </OrganizationContext.Provider>
                                  </MessageContext.Provider>
                                </SecretContext.Provider>
                              </OnDeleteContext.Provider>
                            </OnAddContext.Provider>
                          </OnUpdateContext.Provider>
                        </LoadingContext.Provider>
                      </VariableGroupsContext.Provider>
                    </KeyRegexContext.Provider>
                  </SecretRegexContext.Provider>
                </VGRegexContext.Provider>
              </ValueRegexContext.Provider>
            </ProjectNameContext.Provider>
          </PATContext.Provider>
        </TableTypeContext.Provider>
      </ActionTypeContext.Provider>
    </KeyVaultNameContext.Provider>
  );
}

export default App;
