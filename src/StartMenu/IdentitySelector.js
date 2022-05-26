import React from 'react';

/**
	DISPLAYS IDENTITY SELECTOR TABLE
	
	VARIABLES
		identities: [{identity},...]
		
	FUNCTIONS
		onHover
		renderMinus
		renderPlus		
 */

export default function IdentitySelectorTable(props) {
	
	
	
	const identities = props.identities;
	return (
		<table className="IdentitySelectorTable">
			<tbody className="IdentitySelectorTableBody">
				{
					identities.map((i, v) => 
						<tr 
							key={ i["code"] } 
							className="IdentitySelectorLine"
							onMouseOver={ () => props.onHover(i["code"]) }
						>
							<td 
								className="IdentitySelectorText" 
								data-faction={ i["faction_code"] }
							>
								{ i["title"] }
							</td>
							{ props.renderMinus(v) }
							<td className="IdentitySelectorCount">{ i["count"] }</td>
							{ props.renderPlus(v) }
						</tr>
					)							
				}
			</tbody>
		</table>
	);
}