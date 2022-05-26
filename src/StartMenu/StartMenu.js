import React from 'react';
import './StartMenu.css';
import StartMenuIntroText from './StartMenuIntroText.js';
import IdentitySelector from './IdentitySelector.js';


export default class StartMenu extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			finished: false,
			
			identities: props.identities,
			confirm: props.confirm,
			onHover: props.onHover,
			
			playerAName: props.playerAName,
			playerBName: props.playerBName,
			url: "",
			noOfPicks: 18,
			
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
	
	
	
	handleFieldUpdate(field, e) {
		console.log(e)
		this.setState({
			[field]: e.target.value
		})
	}
	
	validateInput() {
		if (this.state.url.match(/https:\/\/netrunnerdb.com\/en\/decklist\/+/) ||
			this.state.url.match(/netrunnerdb.com\/en\/decklist\/+/)) {
			this.props.confirm({
				identities: this.state.identities,
				url: this.state.url,
				noOfPicks: this.state.noOfPicks,
				playerAName: this.state.playerAName,
				playerBName: this.state.playerBName				
			});
		} else {
			window.alert("Invalid deck URL format")
		}
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
	
	renderEntryBoxes() {
		const noOfPicks = this.state.noOfPicks;
		return (
			<form className="StartMenuInputBoxes">
				<table>
					<tbody>
						<tr>
							<td><label htmlFor="p1Name">Player Name:</label></td>
							<td>
								<input 
									id="p1Name" 
									type="text" 
									placeholder="Player 1"
									value={ this.state.playerAName }
									onChange={ this.handleFieldUpdate.bind(this, "playerAName") }
								/>
							</td>
						</tr>
						<tr>
							<td><label htmlFor="p2Name">Player Name:</label></td>
							<td>
								<input 
									id="p2Name" 
									type="text" 
									placeholder="Player 2"
									value={ this.state.playerBName }
									onChange={ this.handleFieldUpdate.bind(this, "playerBName") }
								/>
							</td>
						</tr>
						<tr>
							<td><label htmlFor="deckURL">Decklist:</label></td>
							<td>
								<input 
									id="deckURL" 
									type="text"
									value={ this.state.url } 
									placeholder="netrunnerdb deck URL"
									pattern="(https://)?netrunnerdb.com/.{2,}/decklist/.+"
									title="https://netrunnerdb.com/XX/decklist/XXXX
										 or netrunnerdb.com/XX/decklist/XXXX"
									onChange={ this.handleFieldUpdate.bind(this, "url") }
								/>
							</td>
						</tr>
						<tr>
							<td><label htmlFor="noOfPicks">Number of Picks:</label></td>
							<td>
								<input 
									id="noOfPicks" 
									type="number" 
									value={ this.state.noOfPicks }
									placeholder="18" 
									min="2" 
									step="2"
									onChange={ this.handleFieldUpdate.bind(this, "noOfPicks") }
								/>
							</td>
							
							<td>({noOfPicks * 2.5} - {noOfPicks * 3} cards per player)</td>
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
					
					<StartMenuIntroText />
					{ this.renderEntryBoxes() }
					<hr />
					{ this.renderConfirmButton() }
					
					<hr />
					<IdentitySelector 
						identities={ identities }
						onHover={ this.state.onHover }
						renderMinus={ this.renderMinus.bind(this) }
						renderPlus={ this.renderPlus.bind(this) }
					/>
					<hr />
					
					{ this.renderConfirmButton() }
				</div>
			</div>
		) : <div className="StartMenu" />);
	}
}