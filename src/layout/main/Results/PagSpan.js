import PropTypes from 'prop-types';
import React from 'react'

const PagSpan = ({actualPageNumber, pageNumber}) => {
  return (
    <div>
        <span>{`Page: ${actualPageNumber}/${pageNumber}`}</span>
    </div>
  )
}

PagSpan.propTypes = {
  actualPageNumber: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};

export default PagSpan