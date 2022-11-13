import React from 'react';

/**
	DISPLAYS INTRODUCTION MESSAGE
 */

export default function StartMenuIntroText() {
		return (
			<div className="StartMenuIntroText">
				<h3 className="StartMenuIntroTextHeader">
					Welcome to Netrunner Grid Draft!
				</h3>
				<div className="StartMenuIntroTextBody">
					<p>
						This is a tool I put together to learn ReactJS, built to 
						emulate a <a target="_blank" href="https://strategy.channelfireball.com/all-strategy/mtg/channelmagic-articles/cube-design-grid-drafting-and-more/">
							 grid draft 
						</a> using Netrunner cards. Just paste a deck's <a target="_blank" href="https://netrunnerdb.com">
							netrunnerdb.com
						</a> URL below, choose how many picks you want,
						and even add some Identities if you feel like it!
					</p> 
					<p>
						The scope of this version is local, that is, there is no networking involved. With this in mind, I
						tried to optimize its usability for Discord and other screen-sharing programs. Some helpful tips:
					</p> 
					<ul>
						<li>
							Clicking the text of a pool will copy it to your clipboard. 
							This can be pasted directly into jinteki.net; 
							Identities, if any, will be at the top for easy removal.
							You may want to paste it somewhere else first if you think deckbuilding will be an event. 
						</li>
						<li>
							You can lock the card being previewed on the right-hand side by clicking it in the grid.
							Clicking a locked card or moving to the next pick will unlock the preview.</li>
						<li>
							If you're in GLC on Discord (statistically, you probably are) and have some feedback for me, 
							feel free to look me up (monde)	and send me a message!
						</li>
					</ul>
				</div>	
			</div>
		);
	}