import React from 'react';
import { useState, useEffect } from "react";

export default function ClipboardAlert(props) {
	const [show, setShow] = useState(true);
	
	useEffect(
		() => {
			setShow(false);
		},
		[]
	);
	
	return (
		<div 
			className="clipboardAlert" data-hidden={ !show }
			onTransitionEnd={ () => props.clear() }
		>
			Copied to clipboard!
		</div>
	);

}