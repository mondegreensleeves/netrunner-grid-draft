import SymbolRenderer from '../Common/SymbolRenderer.js';
import React from 'react';

export default function generateText(info) {
	
	function CardPreviewTextLine(props) {
		const tagText = parseTextTags(props.line.split(/<|>/)).slice(0,-1);
		return <div className="CardPreviewTextLine">{ tagText }</div>;
	}
	
	function parseTextTags (line, index = 0) {
		if (line.length > 0) {
			const current = line[0];
			let rest = line.slice(1);
			let ret = Array(0);
			var i = 1;
			switch (current) {
				case "strong":
				case "trace":
				case "em":
				case "errata":
				case "li":
				case "ul":
					const CustomTag = `${current}`
					while (i < line.length && line[i] !== `/${current}`) i++;
					ret.push(
						<CustomTag className={"CardPreviewTextLine-" + current} key={ "CPTL-" + index }>
							{ 
								current === "ul" ?
								parseTextTags(line.slice(1,i), index + 1) :									
								line.slice(1,i).map((j) => {
									return (
										parseIcons(j.split(/\[|\]/))
									)
								})}
						</CustomTag>
					)
					rest = line.slice(i + 1);
					break;
				default:
					ret.push(parseIcons(current.split(/\[|\]/)));
					break;
			}
			return ret.concat(parseTextTags(rest, index + 1));
		}
		return "";
	}
	
	function parseIcons (text) {
		if (text.length > 0) {
			if (text.length % 2 === 0) console.log(text)
			let ret = Array(0);
			for (let i = 0; i < text.length; i++) {
				if (i % 2 === 0) {
					ret.push(text[i])
				} else {
					ret.push(<SymbolRenderer symbol={text[i]} key={ "symbol-" + i }/>)
				}
			}
			return ret
		}
		return "";
	}
	
	const paragraphText = info["text"] ? info["text"].split("\n") : []; 
	const keyPrefix = info["code"] + "-line-";
	return (	
		<div className="CardPreviewText">
			{ 
				paragraphText.map((i,k) => (
					<CardPreviewTextLine
						line={i}
						key={ keyPrefix + k }
					/>
				)
			) }
		</div>
	);
	
	
}
