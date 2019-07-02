import React, {PureComponent} from 'react';
import './index.scss';
import {CellItem, Initiator, Move} from '../MineSweeper';

interface IProps {
  cellItem: CellItem;

  onCellClick(move: Move): void;

  onFlagClick(row: number, col: number, value: any, initiator: Initiator): void;

  disabled: boolean;
}

class Cell extends PureComponent<IProps> {
  onClick = () => {
    const {onCellClick, cellItem} = this.props;
    const {row, col} = cellItem;
    onCellClick({
      row,
      col,
      initiator: {
        row,
        col,
        isPlayer: true,
      }
    } as Move);
  };

  flag = () => {
    const {onFlagClick, cellItem} = this.props;
    const {row, col} = cellItem;

    const initiator: Initiator = {
      row,
      col,
      isPlayer: true,
    };

    onFlagClick(row, col, cellItem.flagged ? undefined : col, initiator);
  };

  render() {
    const {cellItem, disabled} = this.props;

    let itemContent: string;
    if (cellItem.item === '0') {
      itemContent = '_';
    } else {
      itemContent = cellItem.item;
    }

    return (
      <div
        title={`row: ${cellItem.row}, col: ${cellItem.col}, neighbors: ${cellItem.neighbors.length}`}
        className={`cell ${cellItem.flagged ? 'marked' : ''} ${disabled && ' disabled'} `}
      >
        <div className='mark' onClick={this.flag}/>
        <span
          onClick={this.onClick}
        >
          {itemContent}
        </span>
      </div>
    );
  }
}

export default Cell;
