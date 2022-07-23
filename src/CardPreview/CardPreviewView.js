import React from 'react';
import './CardPreview.css'

export default class CardPreviewView extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="CardPreview">
				<div className="CardPreviewImgPane">
					<img className="CardPreviewImg" src={
						this.props.info.code ? "https://static.nrdbassets.com/v1/large/" + this.props.info.code + ".jpg" : "noCardImage.png"
					}/>
				</div>
				<hr/>
				
				{ this.props.info.title }
				{ this.props.info.type }
				<div className="CardPreviewStats">
					{ this.props.info.statsIcon }
					{ this.props.info.statsNoIcon }
				</div>
				<hr/>
				{ this.props.info.text ? this.props.info.text : "" }				
				
			</div>
		)
	}
}