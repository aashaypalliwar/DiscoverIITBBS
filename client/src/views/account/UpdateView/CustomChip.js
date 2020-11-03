import React, { useState } from 'react';
import { Chip } from '@material-ui/core';

const CustomChip = props => {
  const [variant, setVariant] = useState('outlined');
  let toggle = () => {
    if (variant === 'outlined') {
      setVariant('default');
      props.addToSelected(props.tag);
    } else {
      setVariant('outlined');
      props.removeFromSelected(props.tag);
    }
  };

  return (
    <>
      <Chip
        label={props.tag.name}
        className={props.classes.chip}
        size="small"
        clickable
        onClick={toggle}
        variant={variant}
        color="primary"
      />
      &nbsp;
    </>
  );
};

export default CustomChip;
