import { Box, Button } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types";

const MatUIButton = ({id, send, displayName}) => {
  return (
    <Box>
        <Button id={id} onClick={send} variant="contained">
          {displayName}
        </Button>
      </Box>
  )
}

MatUIButton.propTypes = {
  id: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  displayName: PropTypes.any.isRequired
};

export default MatUIButton