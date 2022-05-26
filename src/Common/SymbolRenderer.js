import React from 'react';
import './SymbolRenderer.css'

/**
	RENDERS ICONS
	
	VARIABLES
		symbol: "identifier"		
 */

export default function SymbolRenderer(props) {
	return (
			<img className="symbol" data-symbol={props.symbol} />
		);
}