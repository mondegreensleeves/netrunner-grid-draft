import React from 'react';
import PlayerPool from './PlayerPool.js'
import PlayerPoolTotal from './PlayerPoolTotal.js'
import './PlayerPools.css'

/**
	DISPLAYS PLAYER DRAFT POOL INFORMATION
	
	VARIABLES
		playerNames: [name, name]
		playerPools: [pool, pool]
	
	FUNCTIONS	
		onClick: copy text
		onHover: change cardPreview
 */

export default function PlayerPools(props) {
	const playerPools = props.playerPools.slice();
	return (
		<div className="playerPools">
			<PlayerPoolTotal
				playerName={ props.playerNames[0] }
				playerPoolSize={ playerPools[0].length }
			/>
			<PlayerPool 
				player="0" 
				playerPool={ playerPools[0] }
				onClick={ (i) => props.onClick(i) }
				onHover={ (i) => props.onHover(i) }
			/>
			<PlayerPoolTotal
				playerName={ props.playerNames[1] }
				playerPoolSize={ playerPools[1].length }				
			/>
			<PlayerPool 
				player="1" 
				playerPool={ playerPools[1] }
				onClick={ (i) => props.onClick(i) }
				onHover={ (i) => props.onHover(i) }
			/>
		</div>
	);
} 