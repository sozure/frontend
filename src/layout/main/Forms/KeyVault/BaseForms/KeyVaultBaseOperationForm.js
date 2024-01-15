import PropTypes from "prop-types";
import React from "react";

import KeyVaultSelect from "./KeyVaultSelect";
import SecretRegexInput from "./SecretRegexInput";
import MatUIButton from "../../../../MatUIButton";

const KeyVaultBaseOperationForm = ({ send }) => {

  return (
    <div className="form">
      <KeyVaultSelect />
      <SecretRegexInput />
      <MatUIButton id={"submit_button"} send={send} displayName={"Send request"}/>
    </div>
  );
};

KeyVaultBaseOperationForm.propTypes = {
  send: PropTypes.func.isRequired,
};

export default KeyVaultBaseOperationForm;
