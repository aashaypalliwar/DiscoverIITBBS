import React from 'react';
import CustomChip from './CustomChip';
import { TableCell, TableRow } from '@material-ui/core';

const TagGroup = props => {
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" className={props.classes.cellB}>
          {props.tagGroup}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left" className={props.classes.cell}>
          {props.tags
            .sort((a, b) => {
              if (a.name < b.name) return -1;
              return 1;
            })
            .map((tag, index) => {
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
      </TableRow>
    </>
  );
};

export default TagGroup;
