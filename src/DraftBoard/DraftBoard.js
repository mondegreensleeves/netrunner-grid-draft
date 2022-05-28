import React from 'react';
import './DraftBoard.css'
import SelectorX from './SelectorX.js';
import SelectorY from './SelectorY.js'
import Square from './Square.js';

/**
	PURPOSE
	VARIABLES
		cards: [cardinfo]
		lockedCard: 0-8
		takenCards: [3x1, 6x0]
	
	FUNCTIONS
		onCardHover
		onClick
		onClickX
		onClickY	
 */
export default class DraftBoard extends React.Component {
	
	renderSquare(i) {
		return (<Square 
			value={ this.props.takenCards[i] }
			cards={ this.props.cards ? this.props.cards[i]['code'] : "0"}
			altStats={ this.props.cards ? this.props.cards[i]['altStats'] : ""}
			onMouseOver={ () => this.props.onCardHover(i) }
			onClick={ () => this.props.onClick(i) }
			highlighted={ i === this.props.lockedCard}
		/>);
	}
	
	renderSelectorX(i) {
		return (<SelectorX
			value={ i }
			onClick={ () => this.props.onClickX(i) } 
		/>);
	}
	
	renderSelectorY(i) {
		return (<SelectorY
			value={ i }
			onClick={ () => this.props.onClickY(i) } 
		/>);
	}	
	
	render() {

		return (
			<div className="UI-area">
				<table className="draft-area">
					<tbody className="draft-area-grid">
						<tr className="board-row">
							<td />
							<td>{this.renderSelectorY(0)}</td>
							<td>{this.renderSelectorY(1)}</td>
							<td>{this.renderSelectorY(2)}</td>
						</tr>
						<tr className="board-row">
							<td>{this.renderSelectorX(0)}</td>
							<td>{this.renderSquare(0)}</td>
							<td>{this.renderSquare(1)}</td>
							<td>{this.renderSquare(2)}</td>
						</tr>
						<tr className="board-row">
							<td>{this.renderSelectorX(1)}</td>
							<td>{this.renderSquare(3)}</td>
							<td>{this.renderSquare(4)}</td>
							<td>{this.renderSquare(5)}</td>
						</tr>
						<tr className="board-row">
							<td>{this.renderSelectorX(2)}</td>
							<td>{this.renderSquare(6)}</td>
							<td>{this.renderSquare(7)}</td>
							<td>{this.renderSquare(8)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
	
	
}
