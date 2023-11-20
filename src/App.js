import "./CSS/style.css";
import React, { useMemo, useState } from "react";
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
  VariablesContext,
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
  VariableGroupsContext,
  ProfileNameContext,
  ChangesContext,
  KeyVaultsContext,
  KVAuthorizedContext,
} from "./contexts/Contexts";
import { Modifications } from "./layout/modifications/Modifications";
import Welcome from "./layout/main/Welcome";

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
  const [variables, setVariables] = useState([]);
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
  const [keyVaults, setKeyVaults] = useState([]);
  const [changes, setChanges] = useState([]);
  const [vgAuthorized, setVgAuthorized] = useState(false);
  const [kvAuthorized, setKvAuthorized] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [tenantId, setTenantId] = useState(envTenantId);
  const [clientId, setClientId] = useState(envClientId);
  const [clientSecret, setClientSecret] = useState(envClientSecret);
  const [originKeyVault, setOriginKeyVault] = useState("");
  const [destinationKeyVault, setDestinationKeyVault] = useState("");
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [profileName, setProfileName] = useState("");

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
    <KeyVaultNameContext.Provider
      value={useMemo(
        () => ({ keyVaultName, setKeyVaultName }),
        [keyVaultName, setKeyVaultName]
      )}
    >
      <ActionTypeContext.Provider
        value={useMemo(
          () => ({ actionType, setActionType }),
          [actionType, setActionType]
        )}
      >
        <TableTypeContext.Provider
          value={useMemo(
            () => ({ tableType, setTableType }),
            [tableType, setTableType]
          )}
        >
          <PATContext.Provider
            value={useMemo(() => ({ pat, setPat }), [pat, setPat])}
          >
            <ProjectNameContext.Provider
              value={useMemo(
                () => ({ projectName, setProjectName }),
                [projectName, setProjectName]
              )}
            >
              <ValueRegexContext.Provider
                value={useMemo(
                  () => ({ valueRegex, setValueRegex }),
                  [valueRegex, setValueRegex]
                )}
              >
                <VGRegexContext.Provider
                  value={useMemo(
                    () => ({ vgRegex, setVgRegex }),
                    [vgRegex, setVgRegex]
                  )}
                >
                  <SecretRegexContext.Provider
                    value={useMemo(
                      () => ({ secretRegex, setSecretRegex }),
                      [secretRegex, setSecretRegex]
                    )}
                  >
                    <KeyRegexContext.Provider
                      value={useMemo(
                        () => ({ keyRegex, setKeyRegex }),
                        [keyRegex, setKeyRegex]
                      )}
                    >
                      <VariablesContext.Provider
                        value={useMemo(
                          () => ({ variables, setVariables }),
                          [variables, setVariables]
                        )}
                      >
                        <LoadingContext.Provider
                          value={useMemo(
                            () => ({ loading, setLoading }),
                            [loading, setLoading]
                          )}
                        >
                          <OnUpdateContext.Provider
                            value={useMemo(
                              () => ({ onUpdate, setOnUpdate }),
                              [onUpdate, setOnUpdate]
                            )}
                          >
                            <OnAddContext.Provider
                              value={useMemo(
                                () => ({ onAdd, setOnAdd }),
                                [onAdd, setOnAdd]
                              )}
                            >
                              <OnDeleteContext.Provider
                                value={useMemo(
                                  () => ({ onDelete, setOnDelete }),
                                  [onDelete, setOnDelete]
                                )}
                              >
                                <SecretContext.Provider
                                  value={useMemo(
                                    () => ({ secrets, setSecrets }),
                                    [secrets, setSecrets]
                                  )}
                                >
                                  <MessageContext.Provider
                                    value={useMemo(
                                      () => ({ message, setMessage }),
                                      [message, setMessage]
                                    )}
                                  >
                                    <OrganizationContext.Provider
                                      value={useMemo(
                                        () => ({
                                          organizationName,
                                          setOrganizationName,
                                        }),
                                        [organizationName, setOrganizationName]
                                      )}
                                    >
                                      <ProjectsContext.Provider
                                        value={useMemo(
                                          () => ({ projects, setProjects }),
                                          [projects, setProjects]
                                        )}
                                      >
                                        <VGAuthorizedContext.Provider
                                          value={useMemo(
                                            () => ({
                                              vgAuthorized,
                                              setVgAuthorized,
                                            }),
                                            [vgAuthorized, setVgAuthorized]
                                          )}
                                        >
                                          <NewKeyContext.Provider
                                            value={useMemo(
                                              () => ({ newKey, setNewKey }),
                                              [newKey, setNewKey]
                                            )}
                                          >
                                            <NewValueContext.Provider
                                              value={useMemo(
                                                () => ({
                                                  newValue,
                                                  setNewValue,
                                                }),
                                                [newValue, setNewValue]
                                              )}
                                            >
                                              <TenantIdContext.Provider
                                                value={useMemo(
                                                  () => ({
                                                    tenantId,
                                                    setTenantId,
                                                  }),
                                                  [tenantId, setTenantId]
                                                )}
                                              >
                                                <ClientIdContext.Provider
                                                  value={useMemo(
                                                    () => ({
                                                      clientId,
                                                      setClientId,
                                                    }),
                                                    [clientId, setClientId]
                                                  )}
                                                >
                                                  <ClientSecretContext.Provider
                                                    value={useMemo(
                                                      () => ({
                                                        clientSecret,
                                                        setClientSecret,
                                                      }),
                                                      [
                                                        clientSecret,
                                                        setClientSecret,
                                                      ]
                                                    )}
                                                  >
                                                    <OriginKeyVaultContext.Provider
                                                      value={useMemo(
                                                        () => ({
                                                          originKeyVault,
                                                          setOriginKeyVault,
                                                        }),
                                                        [
                                                          originKeyVault,
                                                          setOriginKeyVault,
                                                        ]
                                                      )}
                                                    >
                                                      <DestinationKeyVaultContext.Provider
                                                        value={useMemo(
                                                          () => ({
                                                            destinationKeyVault,
                                                            setDestinationKeyVault,
                                                          }),
                                                          [
                                                            destinationKeyVault,
                                                            setDestinationKeyVault,
                                                          ]
                                                        )}
                                                      >
                                                        <PaginationCounterContext.Provider
                                                          value={useMemo(
                                                            () => ({
                                                              paginationCounter,
                                                              setPaginationCounter,
                                                            }),
                                                            [
                                                              paginationCounter,
                                                              setPaginationCounter,
                                                            ]
                                                          )}
                                                        >
                                                          <OnRecoverContext.Provider
                                                            value={useMemo(
                                                              () => ({
                                                                onRecover,
                                                                setOnRecover,
                                                              }),
                                                              [
                                                                onRecover,
                                                                setOnRecover,
                                                              ]
                                                            )}
                                                          >
                                                            <SingleModificationContext.Provider
                                                              value={useMemo(
                                                                () => ({
                                                                  onSingleModification,
                                                                  setOnSingleModification,
                                                                }),
                                                                [
                                                                  onSingleModification,
                                                                  setOnSingleModification,
                                                                ]
                                                              )}
                                                            >
                                                              <SingleOperationContext.Provider
                                                                value={useMemo(
                                                                  () => ({
                                                                    singleOperation,
                                                                    setSingleOperation,
                                                                  }),
                                                                  [
                                                                    singleOperation,
                                                                    setSingleOperation,
                                                                  ]
                                                                )}
                                                              >
                                                                <LocalLoadingContext.Provider
                                                                  value={useMemo(
                                                                    () => ({
                                                                      localLoading,
                                                                      setLocalLoading,
                                                                    }),
                                                                    [
                                                                      localLoading,
                                                                      setLocalLoading,
                                                                    ]
                                                                  )}
                                                                >
                                                                  <KeyIsRegexContext.Provider
                                                                    value={useMemo(
                                                                      () => ({
                                                                        keyIsRegex,
                                                                        setKeyIsRegex,
                                                                      }),
                                                                      [
                                                                        keyIsRegex,
                                                                        setKeyIsRegex,
                                                                      ]
                                                                    )}
                                                                  >
                                                                    <VariableGroupsContext.Provider
                                                                      value={useMemo(
                                                                        () => ({
                                                                          variableGroups,
                                                                          setVariableGroups,
                                                                        }),
                                                                        [
                                                                          variableGroups,
                                                                          setVariableGroups,
                                                                        ]
                                                                      )}
                                                                    >
                                                                      <ProfileNameContext.Provider
                                                                        value={useMemo(
                                                                          () => ({
                                                                            profileName,
                                                                            setProfileName,
                                                                          }),
                                                                          [
                                                                            profileName,
                                                                            setProfileName,
                                                                          ]
                                                                        )}
                                                                      >
                                                                        <ChangesContext.Provider
                                                                          value={useMemo(
                                                                            () => ({
                                                                              changes,
                                                                              setChanges,
                                                                            }),
                                                                            [
                                                                              changes,
                                                                              setChanges,
                                                                            ]
                                                                          )}
                                                                        >
                                                                          <KeyVaultsContext.Provider
                                                                            value={useMemo(
                                                                              () => ({
                                                                                keyVaults,
                                                                                setKeyVaults,
                                                                              }),
                                                                              [
                                                                                keyVaults,
                                                                                setKeyVaults,
                                                                              ]
                                                                            )}
                                                                          >
                                                                            <KVAuthorizedContext.Provider
                                                                              value={useMemo(
                                                                                () => ({
                                                                                  kvAuthorized,
                                                                                  setKvAuthorized,
                                                                                }),
                                                                                [
                                                                                  kvAuthorized,
                                                                                  setKvAuthorized,
                                                                                ]
                                                                              )}
                                                                            >
                                                                              <Welcome />
                                                                              <BrowserRouter>
                                                                                <Routes>
                                                                                  <Route
                                                                                    path="/"
                                                                                    element={
                                                                                      <Main />
                                                                                    }
                                                                                  />
                                                                                  <Route
                                                                                    path="/changes"
                                                                                    element={
                                                                                      <Modifications />
                                                                                    }
                                                                                  />
                                                                                </Routes>
                                                                              </BrowserRouter>
                                                                            </KVAuthorizedContext.Provider>
                                                                          </KeyVaultsContext.Provider>
                                                                        </ChangesContext.Provider>
                                                                      </ProfileNameContext.Provider>
                                                                    </VariableGroupsContext.Provider>
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
                      </VariablesContext.Provider>
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
