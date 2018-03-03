
import Actions from '../core/Actions';
import Component from '../core/Component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import CardBlock from '../component/Card/CardBlock';
import CardBlockTXs from '../component/Card/CardBlockTXs';
import HorizontalRule from '../component/HorizontalRule';

class Block extends Component {
  static propTypes = {
    getBlock: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    tx: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { block: {}, txs: [] };
  };

  componentDidMount() {
    this.props
      .getBlock(this.props.match.params.hash)
      .then(({ block, txs }) => this.setState({ block, txs }));
  };

  render() {
    return (
      <div>
        <HorizontalRule title="Block Info" />
        <CardBlock block={ this.state.block } height={ this.props.tx.height } />        
        <HorizontalRule title="Block Transactions" />
        <CardBlockTXs txs={ this.state.txs } />
      </div>
    );
  };
}

const mapDispatch = dispatch => ({
  getBlock: query => Actions.getBlock(query)
});

const mapState = state => ({
  tx: state.txs.length 
    ? state.txs[0] 
    : { height: state.coin.blocks }
});

export default connect(mapState, mapDispatch)(Block);
