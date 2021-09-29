import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";

const Block = (props) => {
  const { block } = props;
  const classes = useStyles();
  return (
    <Box padding={'5px'} marginBottom={'4px'} className={classes.root}>
      <div>{block.id}</div>
      <div>{block.attributes.data}</div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "lightgrey",
  },
}));

Block.propTypes = {
  block: PropTypes.shape({
    number: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default Block;
