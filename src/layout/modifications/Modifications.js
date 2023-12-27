import React, {useContext} from "react";
import { ModificationsForm } from "./Forms/ModificationsForm";
import { ModificationsTable } from "./Results/ModificationsTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangesContext } from "../../contexts/Contexts";

export const Modifications = () => {
  const { setChanges } = useContext(ChangesContext);
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        id="back_to_main"
        onClick={() => {
          setChanges([]);
          navigate("/");
        }}
      >
        Back to main
      </Button>
      <ModificationsForm />
      <ModificationsTable />
    </>
  );
};
