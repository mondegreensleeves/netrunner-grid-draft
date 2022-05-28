import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StartMenu from './StartMenu/StartMenu';
import DraftBoard from './DraftBoard/DraftBoard';
import cardPreview from './CardPreview/CardPreview';
import CardPreviewView from './CardPreview/CardPreviewView';
import PlayerPools from './PlayerPools/PlayerPools';
import DevTool from './Common/DevTool.js';
import TurnCounter from './Common/TurnCounter.js';
import ClipboardAlert from './Common/ClipboardAlert.js';
//import Notes from './Common/Notes.js';

/**
 *
 *	GAME STATE MANAGER
 *
 */
class Game extends React.Component {
	
	constructor(props) {
		const firstPlayer = Math.random() < 0.5;
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			AIsCurrent: firstPlayer,
			AWasFirst: firstPlayer,
			stepNumber: 0,
			cards: Array(0),
			playerPools: Array(2).fill(Array(0)),
			currentPick: Array(9).fill(0),
			takenCards: Array(9).fill(1),
			pickNumber: 0,
			numberOfPicks: 1,
			cardPoolData: Array(0),
			draftInProgress: false,
			cardPreview: {},
			identities: [],
			identitiesReturned: false,
			playerNames: ["",""],
			locked: -1,
			clipboardAlert: <span />
		};
		this.loadCardsJSON();
	}
	
	/**
		Updates info on right-hand Card Preview pane
	 */
	changePreviewImage(i) {
		if (i) this.setState({
			cardPreview: this.state.cardPoolData.get(i)["altStats"]
		})
	}
	
	/**
		Resets the alert for copying player pool	
	 */
	clearAlert() {
		this.setState({
			clipboardAlert: <span />
		});
	}
	
	/**
		Copy text to clipboard and alert user (PlayerPool function)
	 */
	copyTextBox(i) {
		navigator.clipboard.writeText(i);
		this.setState({
			clipboardAlert: <ClipboardAlert active="true" clear={this.clearAlert.bind(this)}/>
		});
	}
	
	/**
		Clears and locks draft board after last pick
	 */
	endDraft() {
		this.setState({
			currentPick: Array(9).fill(0),
			takenCards: Array(9).fill(1),
			draftInProgress: false,
			AIsCurrent: -1
		});
	}
	
	/**
		Loads cards from input URL, combines with Identities, and creates draft pool
	 */
	loadCards(deckInput1, deckInput2) {
		const cardData = this.state.cardPoolData;
		var processedCards = Array(0);
		
		for (const ident of this.state.identities) {
			let tempCard = cardData.get(ident["code"]);
			for (let i = 0; i < ident["count"]; i++) {
				processedCards.push(tempCard);
			}
		}
		
		let deckInput = deckInput1;
		if (deckInput) {
			const deckInputSplit = deckInput.split("/");
			console.log(deckInput)
			const deckInputID =  (deckInputSplit[0] === "https:") ? deckInputSplit[5] : deckInputSplit[3];
			let deckURL = "https://netrunnerdb.com/api/2.0/public/decklist/" + deckInputID;
			const callback = this.loadDeck(deckURL);
			callback.then(() => {
				let cards = this.state.cards.concat(processedCards);
				
				this.setState({
					cards: cards,
					draftInProgress: true
				});
				this.nextPick();
				}
			);
		}
	}
	
	/**
		Generates the necessary JSON for card data
	 */
	loadCardsJSON() {
		let identities = Array(0);
		
		if (this.state.cardPoolData.length === 0) {
			let deckURL = "./local-cards-JSON.json";
			fetch(deckURL)
				.then(response => response.json())
				.then(data => {	
					
					let cards = data['data'];
					let cardsWithKeys = new Map();
					let processedIdents = Array(0);
					cards.map((i) => {
						let code = i['code'];			
						if (i['type_code'] === "identity") {
							if (!processedIdents.includes(i['title'])) {
								let iWithCount = Object.assign({}, i);
								iWithCount["altStats"] = cardPreview(iWithCount);
								iWithCount["count"] = 0;
								identities.push(iWithCount);
								processedIdents.push(i['title']);
								cardsWithKeys.set(code, iWithCount);
							}
						} else {
							cardsWithKeys.set(code, i);	
						}			
						return 0;
						
					});
					this.setState({
						cardPoolData: cardsWithKeys
					});
					
					identities.sort((a,b) => {
						
						if (a['side_code'] !== b['side_code']) {
							return (a['side_code'] === "runner" ? -1 : 1);
						}	
						if (a['faction_code'] === b['faction_code']) {
							if (a['title'] < b['title']) return -1;
							return 1;
						}	
						if (a['faction_code'] < b['faction_code']) return -1;
						if (a['faction_code'] > b['faction_code']) return 1;
						return 0;
						
					});
					
					this.setState({
						identities: identities,
						identitiesReturned: false
					});
					console.log("card JSON loaded")
				});
		} else {
			if (window.confirm("Clear current draft?")) {
				identities = this.state.identities;
				identities.map((i) => i["count"] = 0);
				this.setState({
					cards: Array(0),
					playerPools: Array(2).fill(Array(0)),
					currentPick: Array(9).fill(0),
					identities: identities,
					identitiesReturned: false
				});
			}
		}
	}
	
	async loadDeck(deckURL) {
		let cardData = this.state.cardPoolData;
		let processedCards = this.state.cards;
		
		return await fetch(deckURL)
					.then(response => response.json())
					.then(data => {	
						
						if (data['success']) {
							
							
							let cards = data['data'][0]['cards'];
							for (const [key,count] of Object.entries(cards)) {
								let tempCard = cardData.get(key);
								if (tempCard['type_code'] !== "identity") {
									tempCard['altStats'] = cardPreview(tempCard);
									for (let i = 0; i < count; i++) {
										processedCards.push(tempCard);
									}
								}
							}
							this.setState({
								cards: processedCards
							});
							console.log(processedCards);
						}
					});
	}
	
	/**
		Swaps player OR calls for next pick OR ends draft
	 */
	nextTurn() {
		let AIsCurrent = this.state.AIsCurrent;
		let AWasFirst = this.state.AWasFirst;
		
		if (AIsCurrent === AWasFirst) {
			AIsCurrent = !AIsCurrent;
		} else {
			if (this.state.pickNumber + 1 < this.state.numberOfPicks) {
				AWasFirst = !AWasFirst;
				this.nextPick();
			} else {
				this.endDraft();
			}
		}
		
		this.setState({
			AIsCurrent: AIsCurrent,
			AWasFirst: AWasFirst
		});
	}
	
	/**
		Removes 9 cards from pool and places them into pick
	 */
	nextPick() {
		const takenCards = Array(9).fill(0);
		const pickNumber = this.state.pickNumber + 1;
		let cards = this.state.cards.slice();
		let currentPick = Array(0);
		
		for (let i = 0; i < 9; i++) {
			if (cards.length > 0) {
				let j = parseInt(Math.random() * cards.length);
				currentPick.push(cards[j]);
				cards.splice(j, 1);
			}
		}
		
		this.setState({
			currentPick: currentPick,
			cards: cards,
			pickNumber: pickNumber,
			takenCards: takenCards,
			locked: -1
		});
	}
	
	handleClick(hor, i) {
		if (this.state.draftInProgress) {
			const currentPlayer = this.state.AIsCurrent ? 0 : 1;
			let playerPools = this.state.playerPools.slice();
			let takenCards = this.state.takenCards.slice();
			const indeces = hor ? [ 3 * i, (3 * i ) + 1, (3 * i) + 2 ] : [ i, i + 3, i + 6 ];
			
			if (!takenCards[indeces[0]] || !takenCards[indeces[1]] || !takenCards[indeces[2]]) {
				indeces.map((a) => {
						if (!takenCards[a]) {
							let values = Object.assign({}, this.state.currentPick[a]);
							let duplicate = false;
							playerPools[currentPlayer].map((i) => {
								if (i["title"] === values["title"]) {
									i["quantity"] = i["quantity"] + 1;
									duplicate = true;
								}
								return 0;
							})
							if (!duplicate) {
								values["quantity"] = 1;
								playerPools[currentPlayer] = playerPools[currentPlayer].concat(values);
								playerPools[currentPlayer].sort((a,b) => {
									if ((a['type_code'] === "identity") && !(b['type_code'] === "identity")) {
										return -1;
									}
									if ((b['type_code'] === "identity") && !(a['type_code'] === "identity")) {
										return 1;
									}
									if (a["title"] < b["title"]) return -1;
									return 1;
								})
							}
							takenCards[a] = 1;
						}
						return 0;
					} 
				);
				this.setState({
					playerPools: playerPools,
					takenCards: takenCards
				});
				this.nextTurn();
			}
		}
	}
	
	/**
		Locks a card in the grid to the preview pane
	 */
	handleLockPreview(card) {
		if (this.state.draftInProgress) {
			this.setState({
				locked: -1
			});
			this.changePreviewImage(this.state.currentPick[card]['code']);
			if (card !== this.state.locked) {
				this.setState({
					locked: card
				});
			} 
		}
	}
	
	handleHover(n) {
		let card = this.state.currentPick[n]['code'];
		if (card && (this.state.locked === -1)) {
			this.changePreviewImage(card);
		}	
	}
	
	handleHoverPool(c) {
		if (c && (this.state.locked === -1)) {
			this.changePreviewImage(c);
		}	
	}
	
	updateIdentities(startMenuValues) {
		const deckURL = startMenuValues["url"];
		const noOfPicks = startMenuValues["noOfPicks"];
		const identities = startMenuValues["identities"];
		if (deckURL) {
			const playerA = startMenuValues["playerAName"];
			const playerB = startMenuValues["playerBName"];
			const playerNames = [
				(playerA ? playerA : "A"),
				(playerB ? playerB : "B")
			]
			this.setState({
				identities: identities,
				identitiesReturned: true,
				playerNames: playerNames,
			});
			this.resetNumberOfPicks(parseInt(noOfPicks));
			this.loadCards(deckURL);
		}
	}
	
	resetNumberOfPicks(numberOfPicks) {
		this.setState({
			numberOfPicks: numberOfPicks + 1,
			pickNumber: 0,
			AIsCurrent: true,
			AWasFirst: true
		})
	}
	
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,			
		});
	}
	
	render() {
		const currentPick = this.state.currentPick.slice();
		const takenCards = this.state.takenCards.slice();
		const identities = this.state.identities;
		const identitiesReturned = this.state.identitiesReturned;
		const lockedCard = this.state.locked
		const preview = this.state.cardPreview;
		const clipboardAlert = this.state.clipboardAlert;
		const playerAName = this.state.playerNames[0];
		const playerBName = this.state.playerNames[1];
		
		return (
			<div className="background">
				{ clipboardAlert }
				<div className="game">
					<div className="dev-tools">
						<div className="dev-buttons">
							<DevTool
								onClick={ this.loadCardsJSON.bind(this) }
								tag="PrepareDraft"
								text="New Draft"
							/>
							{ identitiesReturned ? <TurnCounter
								picksLeft={ this.state.numberOfPicks - this.state.pickNumber }
								aIsCurrent={ this.state.AIsCurrent }
								playerNames={ this.state.playerNames }
							/> : <br /> }
							
							<PlayerPools
								playerNames={ this.state.playerNames }
								playerPools={ this.state.playerPools }
								onClick={ this.copyTextBox.bind(this) }
								onHover={ this.handleHoverPool.bind(this) }
							/>
						</div>
					</div>
					
					<div className="game-board">
						<DraftBoard 
							cards={ currentPick }
							onClickX={ this.handleClick.bind(this, true) }				
							onClickY={ this.handleClick.bind(this, false) }
							onClick={ this.handleLockPreview.bind(this) }
							takenCards={ takenCards }
							onCardHover={ this.handleHover.bind(this) }
							cardPreview={ preview }	
							lockedCard={ lockedCard }
						/>
					</div>
					
					<CardPreviewView info={ preview } />
					
					{( identities.length > 0 && !identitiesReturned ? <StartMenu
							identities={ identities }
							confirm={ this.updateIdentities.bind(this) }
							onHover={ this.changePreviewImage.bind(this) }
							playerAName={ playerAName }
							playerBName={ playerBName }
						/> : "")}
					
				</div>
				<p className="legalFooter">
					created by monde - images belong to FFG & NISEI - icons belong to NISEI - not affiliated with either
				</p>
			</div>
		);
		
		
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);