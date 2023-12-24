import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { PaginationCounterContext } from "../../../contexts/Contexts";
import PagSpan from "./PagSpan";
import { Button } from "@mui/material";

const PaginationButtons = ({ collection }) => {
  const { paginationCounter, setPaginationCounter } = useContext(
    PaginationCounterContext
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [collectionLength, setCollectionLength] = useState(collection.length);
  const [actualPageNumber, setActualPageNumber] = useState(1);

  const number = 10;

  useEffect(() => {
    let collectionLength = collection.length;
    setCollectionLength(collectionLength);
    setPageNumber(Math.ceil(collectionLength / number));
  }, [collection]);

  const increasePaginationCounter = () => {
    let helperPageNum = actualPageNumber + 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter = paginationCounter + number;
    setPaginationCounter(increasedPaginationCounter);
  };

  const decreasedPaginationCounter = () => {
    let helperPageNum = actualPageNumber - 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter =
      paginationCounter - number <= 0 ? 0 : paginationCounter - number;
    setPaginationCounter(increasedPaginationCounter);
  };

  return (
    <div className="pagination-btn-container">
      <div className="page-number">
        <PagSpan actualPageNumber={actualPageNumber} pageNumber={pageNumber} />
      </div>
      {collectionLength <= number ? (
        <></>
      ) : (
        <div className="pagination-btns">
          <Button
            className={paginationCounter === 0 ? "previous" : "next"}
            disabled={paginationCounter === 0}
            onClick={decreasedPaginationCounter}
            variant="text"
          >
            Previous
          </Button>
          <Button
            className={
              paginationCounter + number >= collectionLength
                ? "previous"
                : "next"
            }
            disabled={
              (paginationCounter + number >= collectionLength) ||
              (collectionLength < number)
            }
            onClick={increasePaginationCounter}
            variant="contained"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

PaginationButtons.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PaginationButtons;
