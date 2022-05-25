import React from 'react';
import SymbolRenderer from '../Common/SymbolRenderer.js';

export default function SelectorY(props) {
	return (
		<button
			className="selectorY"
			onClick={props.onClick}
			value={props.value}
		>
			<div className="selectorYImage">
				<SymbolRenderer symbol={"credit"} />
			</div>
		</button>		
	);
}