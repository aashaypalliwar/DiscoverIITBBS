import React, { useState } from 'react';
import CustomChip from './CustomChip';
import { TableCell, TableRow } from '@material-ui/core';

const TagGroup = props => {
  const [isLoading, setLoading] = useState(false);
  const [errorStatus, setError] = useState({
    isError: false,
    errorMessage: ''
  });
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  let triggerDeleteModal = () => {
    setShowDelete(true);
  };

  let doNothing = () => {};

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" className={props.classes.cellB}>
          {props.tagGroup}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left" className={props.classes.cell}>
          {props.tags.map((tag, index) => {
            return (
              <li key={index} style={{ display: 'inline' }}>
                <CustomChip
                  tag={tag}
                  classes={props.classes}
                  addToSelected={props.addToSelected}
                  removeFromSelected={props.removeFromSelected}
                />
              </li>
            );
          })}
        </TableCell>
        {/* <TableCell
                    align="right"
                    className={props.classes.cell}
                ></TableCell> */}
      </TableRow>
    </>
  );
};

export default TagGroup;
