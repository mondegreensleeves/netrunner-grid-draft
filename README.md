# Netrunner Grid Draft

[First version up on heroku](https://netrunner-grid-draft.herokuapp.com/)!

### What is this?

This is a tool for simulating a **Netrunner** grid draft. It is designed with screen-sharing in mind, as the first version was decided to not have networking. In the initial menu, two drafters will be asked for:
1. names,
2. number of rounds to draft,
3. a [netrunnerdb](https://netrunnerdb.com/) link to the draft pool, and
4. any Identity cards they wish to include (netrunnerdb decklists do not allow these, as they are separate from the deck).

Once loaded, players will perform the draft for the set number of rounds, at which point the decklists will be ready to copy into [jinteki.net](https://jinteki.net) for deck construction and playing games.

**This first version of the site is intended to be used locally or with screen-sharing software.** 

Here are some example drafts that you can use to test its function:
- https://netrunnerdb.com/en/decklist/a3f6150d-73e9-4ff5-97d1-b4701733acc2/grid-draft-tool-example-corp-cube
- https://netrunnerdb.com/en/decklist/b3e3612c-5c44-41df-a152-6fc5d8d65cc8/grid-draft-tool-example-runner-cube

### What is a grid draft?
Grid draft is a game mode of Netrunner (and other card games) where 2 players begin by assembling a large group of cards (known as a "cube"). 
1. Players deal 9 random cards from the cube into a 3x3 grid. 
2. The first player selects a row or column of 3 cards to add to their draft pool. 
3. The second player selects a row or column from the remaining 6 cards to add to their draft pool. 
4. The remaining cards are discarded.
5. Repeat this process, alternating the first player to pick, unless the alloted number of picks has been reached.
6. Assemble decks from the chosen cards and play - glhf!

### What is Netrunner? 
**Android: Netrunner** is a 2-player asymmetric card game of strategy, risk, and hidden information. One player is the corporation, or "Corp", who wins by advancing and scoring the Agendas in their deck. The other player, the "Runner", wins by stealing these cards during "runs" - accessing certain Corp cards, perhaps even before they have a chance to be played or drawn. The Corp, whose cards all enter play facedown, can deter these by installing ICE to protect their servers, or Upgrades to give them special effects. The Runner uses their cards to build up the equipment and money necessary to breach into servers and steal enough of the Corp's Agendas.

Based off the original **Netrunner** - a 1996 game by Richard Garfield of **Artifact** and **Magic: The Gathering** fame - **Android: Netrunner** is a reboot that was designed and published by Fantasy Flight Games from 2012 to 2018 under license from Wizards of the Coast. Its unique playstyle and evocative theme attracted many fans who continue to play the game after its final printing. This is due in large part to **[NISEI](https://nisei.net/)**, a non-profit who continues to design and produce cards compatible with the Netrunner engine, as well as arrange the largest tournaments every year.