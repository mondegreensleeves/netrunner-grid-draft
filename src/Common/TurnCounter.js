import React from 'react';
import './TurnCounter.css';

/**
	RENDERS TURN AND PICK INFO
	
	VARIABLES
		picksLeft: #
		aIsCurrent: t/f
		playerNames: [name, name]		
 */

export default function TurnCounter(props) {
	return (
		<div className="TurnCounter">
			<h3 className="TurnCounterPicks">
				{ props.picksLeft > 1 ? "Picks Left: " + (props.picksLeft - 1) : "Last Pick!" }
			</h3>
			<h3 className="TurnCounterCurrent">
				{ "Current Pick: " + (props.aIsCurrent ? props.playerNames[0] : props.playerNames[1]) }
			</h3>
		</div>
	);
}