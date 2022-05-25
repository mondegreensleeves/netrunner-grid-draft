import React from 'react';
import './StartMenu.css';


export default class StartMenu extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			identities: props.identities,
			confirm: props.confirm,
			finished: false,
			onHover: props.onHover,
			url: "",
			tooMuch: 0
		};
	}
	
	updateCount(i, d) {
		let identities = this.state.identities;
		let count = identities[i]["count"] + d;
		if (count > -1) {
			identities[i]["count"] = count;
			this.setState ({ identities: identities });
			if (d === 1 && (count === 20 || count === 30)) {
				const tooMuch = this.state.tooMuch;
				switch (tooMuch) {
					case 0:
						window.alert("20 of one ident? are you sure? or are you trying to break things?")
						this.setState({
							tooMuch: 1
						})
						break;
					case 1:
						window.alert("I mean, if that's what makes you happy...")
						this.setState({
							tooMuch: 2
						})
						break;
					default:
						break;
				}
			};
		}
	}	
	
	renderIntroText() {
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
						</a> using Netrunner and NISEI cards. Just paste a deck's <a target="_blank" href="https://netrunnerdb.com">
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
	
	renderPlus(i) {
		return (
			<td className="IdentitySelectorPlus">
				<button onClick={ () => this.updateCount(i,1) }>
					+
				</button>
			</td>
		)	
	}
	
	renderMinus(i) {
		return (
			<td className="IdentitySelectorMinus">
				<button onClick={ () => this.updateCount(i,-1) }>
					-
				</button>
			</td>
		)	
	}
	
	renderConfirmButton() {
		return (
			<button onClick={ () => this.validateInput() }>
				Confirm
			</button>
		);
	}
	
	handleURLUpdate(e) {
		console.log(e)
		this.setState({
			url: e.target.value
		})
	}
	
	validateInput() {
		if (this.state.url.match(/https:\/\/netrunnerdb.com\/en\/decklist\/+/) ||
			this.state.url.match(/netrunnerdb.com\/en\/decklist\/+/)) {
			this.props.confirm(this.state.identities)
		} else {
			window.alert("Invalid deck URL format")
		}
	}
	
	renderEntryBoxes() {
		return (
			<form className="StartMenuInputBoxes">
				<table>
					<tbody>
						<tr>
							<td><label htmlFor="p1Name">Player Name:</label></td>
							<td><input id="p1Name" type="text" placeholder="Player 1"/></td>
						</tr>
						<tr>
							<td><label htmlFor="p2Name">Player Name:</label></td>
							<td><input id="p2Name" type="text" placeholder="Player 2"/></td>
						</tr>
						<tr>
							<td><label htmlFor="deckURL">Decklist:</label></td>
							<td><input 
								id="deckURL" 
								type="text"
								value={ this.state.url } 
								placeholder="netrunnerdb deck URL"
								pattern="(https://)?netrunnerdb.com/.{2,}/decklist/.+"
								title="https://netrunnerdb.com/XX/decklist/XXXX or netrunnerdb.com/XX/decklist/XXXX"
								onChange={ this.handleURLUpdate.bind(this) }
								
							/></td>
						</tr>
						<tr>
							<td><label htmlFor="noOfPicks">Number of Picks:</label></td>
							<td><input id="noOfPicks" type="number" placeholder="18" min="2" step="2" /></td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	}
	
	render() {
		let identities = this.state.identities;
		let finished = this.state.finished;
		return (!finished ? ( 
			<div className="StartMenu">
				<div className="StartMenuContent">
					{ this.renderIntroText() }
					{ this.renderEntryBoxes() }
					<hr />
					{ this.renderConfirmButton() }
					<hr />
					<table className="IdentitySelectorTable">
						<tbody className="IdentitySelectorTableBody">
							{
								identities.map((i, v) => 
									<tr 
										key={ i["code"] } 
										className="IdentitySelectorLine"
										onMouseOver={ () => this.props.onHover(i["code"]) }
									>
										<td 
											className="IdentitySelectorText" 
											data-faction={ i["faction_code"] }
											
										>{i["title"]}</td>
										{this.renderMinus(v)}
										<td className="IdentitySelectorCount">{i["count"]}</td>
										{this.renderPlus(v)}
									</tr>
								)							
							}
						</tbody>
					</table>
					<hr />
					{ this.renderConfirmButton() }
				</div>
			</div>
		) : <div className="StartMenu" />);
	}
}