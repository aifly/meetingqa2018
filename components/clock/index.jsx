import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/index.css';
import $ from 'jquery';

class ZmitiClockApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			width:this.props.size || 60,
			height:this.props.size || 60,
			borderWidth:this.props.size / 60 * 4

		}

		return (
			<div className='zmiti-clock-main-ui' style={mainStyle}>
				<span style={{width:mainStyle.borderWidth,marginLeft:-mainStyle.borderWidth}}></span>
				<span className={this.props.animate?'active':''} style={{width:mainStyle.borderWidth,marginLeft:-mainStyle.borderWidth}}></span>
			</div>
		);
	}


	componentDidMount() {

	}
}

ZmitiClockApp.defaultProps = {
	size:60
}

export default PubCom(ZmitiClockApp);

