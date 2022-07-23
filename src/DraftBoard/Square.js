import React from 'react';

export default function Square(props) {
	const imageURL = (props.cards && !props.value ? "https://static.nrdbassets.com/v1/large/" + props.cards + ".jpg" : "noCardImage.png");
	return (
		<div
			className="square"
		>
			<img 
				className="card-img" 
				src={imageURL} 
				title={props.altStats}
				onMouseOver={props.onMouseOver}
				onClick={props.onClick}
				data-highlighted={props.highlighted}
			/>
		</div>		
	);
}

