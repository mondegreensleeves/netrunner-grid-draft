import React from 'react';

/**
	DISPLAYS NUMBER OF CARDS IN PLAYER POOL
	
	VARIABLES
		playerName: name
		playerPoolSize: # cards in pool
 */

export default function PlayerPoolTotal(props) {
	return (
		<div className="playerPoolTotal">
			{ props.playerName }: { props.playerPoolSize } cards
		</div>
	);
};