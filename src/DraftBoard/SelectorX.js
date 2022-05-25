import React from 'react';
import SymbolRenderer from '../Common/SymbolRenderer.js';

export default function SelectorX(props) {
	return (
		<button
			className="selectorX"
			onClick={props.onClick}
			value={props.value}
		>
			<div className="selectorXImage">
				<SymbolRenderer symbol={"credit"} />
			</div>
		</button>		
	);
}