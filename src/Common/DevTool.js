import React from 'react';

/**
	PURPOSE
	
	VARIABLES
		tag: internal
		text: UI
	
	FUNCTIONS
		onClick: function to execute
 */

export default function DevTool(props) {
	return (
		<button
			className={ "dev" + props.tag }
			onClick={ props.onClick }
		>
			{ props.text }
		</button>
	);
}