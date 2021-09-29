import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";

import { Box } from "@material-ui/core";

import { bindActionCreators } from "redux";
import * as actions from "../actions/blocks";
import Block from "../components/Block";

export const Blocks = (props) => {
  const { actions, node, blocks } = props;

  console.debug({ node, blocks });

  useEffect(() => {
    actions.getBlock(node);
  }, [node, actions]);

  return (
    <Box marginY={0} marginX={1} width={1}>
      {blocks.loading && <span>Loading...</span>}
      {blocks.error && <span>Error getting blocks</span>}
      {blocks.list &&
        blocks.list.map((block) => <Block key={block.id} block={block} />)}
    </Box>
  );
};

Blocks.propTypes = {
  actions: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    blocks: state.blocks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
