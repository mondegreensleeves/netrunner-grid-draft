import React from 'react';

/**
	RENDER PLAYER POOL AS TEXT BOX
	
	VARIABLES
		player: # player
		playerPool: [pool]
	
	FUNCTIONS	
		onClick: copy text
		onHover: change cardPreview
 */

export default function PlayerPool(props) {
	const id = "playerPool" + props.player; 
	return (
		<div className="playerPool">
			<div className="playerPoolText"
	            id={id}
	            onClick={() => props.onClick(document.getElementById(id).innerText)}
	        >
	            {props.playerPool.map((i) => <dt
	                key={i["code"]}
	                onMouseOver={() => props.onHover(i["code"])}
	            >
	                {i["quantity"] + "\t" + i["title"]}
	            </dt>)}
	        </div>
		</div>
	);
}