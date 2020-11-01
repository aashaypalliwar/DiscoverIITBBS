import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CardContent,
  Chip,
  Divider,
  Table,
  FormControl,
  Select,
  Button,
  Input,
  InputLabel,
  Grid,
  Paper,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  makeStyles,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';

const CustomChip = props => {
  const [variant, setVariant] = useState('outlined');
  let toggle = () => {
    if (variant === 'outlined') {
      setVariant('default');
      console.log('selecting ...' + props.tag);
      props.addToSelected(props.tag);
    } else {
      setVariant('outlined');
      console.log('removing ...' + props.tag);
      props.removeFromSelected(props.tag);
    }
  };

  return (
    <Chip
      label={props.tag.name}
      className={props.classes.chip}
      size="small"
      clickable
      onClick={toggle}
      variant={variant}
      color="primary"
    />
  );
};

export default CustomChip;
