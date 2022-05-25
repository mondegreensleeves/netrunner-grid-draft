import React from 'react';
import SymbolRenderer from '../Common/SymbolRenderer.js';
import generateText from './CardPreviewTextParser.js'

export default function cardPreview(cardInfo) {
	
	function generateTitle(info) {
		return (
			<div className="CardPreviewTitle">
				<SymbolRenderer symbol={info["faction_code"]} />
				{ info["uniqueness"] ? <SymbolRenderer symbol="unique" /> : "" }
				{ info["title"] }
			</div>
		);
	}
	
	function generateType(info) {
		return (
			<div className="CardPreviewType">
				{info['type_code'][0].toUpperCase()}
				{info['type_code'].slice(1)}
				{info["keywords"] ? ": " + info["keywords"] : ""}
			</div>
		);
	}
	
	function generateStatsWithIcons(info) {
		let cost = 0;
		if (Object.keys(info).includes("cost")) {
			let costType = ["cost","Cost"];
			switch (info["type_code"]) {
				case "asset":
				case "ice":
				case "upgrade":
					costType = ["rez_cost","Rez Cost"]
					break;
				case "operation":
				case "event":
					costType = ["play_cost","Play Cost"]
					break;
				case "resource":
				case "hardware":
				case "program":
					costType = ["install_cost","Install Cost"]
					break;
				default: 
					break;
			}
			
			cost = ["cost",<SymbolRenderer symbol={costType[0]}/>,info["cost"]];
		
		}
		
		const toCheck = [
			"base_link",
			"advancement_cost",
			"agenda_points",
			"memory_cost",
			"trash_cost"
		]
		
		const statsWithIcons = toCheck.map((i) => {
			
			if (Object.keys(info).includes(i)) {
				return [i,<SymbolRenderer symbol={i}/>,info[i]]
			}
			return 0;
		});
		
		
		
		return (
			<div className="CardPreviewStatsIcons">
				{
					cost !== 0 ? (
						<div className="CardPreviewStatIcon" key={ cost[0] } >
							{ cost[1] }{ cost[2] }
						</div>
					): ""}
				{
					statsWithIcons.map((e) => {return e !== 0 ? ( 
							<div className="CardPreviewStatIcon" key={ e[0] } >
								{ e[1] }{ e[2] }
							</div>		
					) : ""})
				}			
			</div>
		);
	}
	
	/**
	 *	
	 */
	function generateStatsWithoutIcons(info) {
		const toCheck = [
			["minimum_deck_size","Min. Deck Size: "],
			["influence_limit","Inf. Limit: "],
			["strength","Strength: "]
		]
		
		const statsWithoutIcons = toCheck.map((i) => {
			
			if (Object.keys(info).includes(i[0]) && info[i[0]] !== null) {
				return [i[0],i[1],info[i[0]]];
			}
			return 0;
		});

		return (
			<div className="CardPreviewStatsNoIcons">
			{
				statsWithoutIcons.map((e) => {return e !== 0 ? ( 
						<div className="CardPreviewStatNoIcon" data-stat={ e[0] } key={ e[0] } >
							{ e[1] }{ e[2] }
						</div>		
					
				) : ""})
			}			
			</div>
		);
	}
	
	let cardPreview = {
		code: cardInfo["code"],
		type: generateType(cardInfo),
		title: generateTitle(cardInfo),
		statsIcon: generateStatsWithIcons(cardInfo),
		statsNoIcon: generateStatsWithoutIcons(cardInfo),
		text: generateText(cardInfo)
	}
	
	return cardPreview;
}