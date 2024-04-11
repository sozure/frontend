import React, {useContext, useState} from "react";
import { ModificationsForm } from "./Forms/ModificationsForm";
import { ModificationsTable } from "./Results/ModificationsTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PaginationCounterContext } from "../../contexts/Contexts";

export const Modifications = () => {
  const [ changes, setChanges ] = useState([]);
  const [ entityType, setEntityType ] = useState("Environment variables");
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        id="back_to_main"
        onClick={() => {
          setChanges([]);
          setPaginationCounter(0);
          navigate("/");
        }}
      >
        Back to main
      </Button>
      <ModificationsForm entityType={entityType} setEntityType={setEntityType} setChanges={setChanges}/>
      <ModificationsTable entityType={entityType} changes={changes}/>
    </>
  );
};
