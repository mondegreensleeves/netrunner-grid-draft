import React from 'react';
import './SymbolRenderer.css'

export default function SymbolRenderer(props) {
	return (
			<img className="symbol" data-symbol={props.symbol} />
		);
}