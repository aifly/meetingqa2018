import React, { Component } from 'react';
import {PubCom} from '../public/pub.jsx';
import './css/index.css';
import $ from 'jquery';

class ZmitiKeyboardApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		return (
			<div className={'zmiti-keyboard-main-ui '+(this.props.show?'show':'')}>
				<section>
					<aside className={this.state.show1?'active':''} onTouchStart={this.modifyTel.bind(this,1)}>1</aside>
					<aside className={this.state.show2?'active':''} onTouchStart={this.modifyTel.bind(this,2)}>2</aside>
					<aside className={this.state.show3?'active':''} onTouchStart={this.modifyTel.bind(this,3)}>3</aside>
				</section>
				<section>
					<aside className={this.state.show4?'active':''} onTouchStart={this.modifyTel.bind(this,4)}>4</aside>
					<aside className={this.state.show5?'active':''} onTouchStart={this.modifyTel.bind(this,5)}>5</aside>
					<aside className={this.state.show6?'active':''} onTouchStart={this.modifyTel.bind(this,6)}>6</aside>
				</section>
				<section>
					<aside className={this.state.show7?'active':''} onTouchStart={this.modifyTel.bind(this,7)}>7</aside>
					<aside className={this.state.show8?'active':''} onTouchStart={this.modifyTel.bind(this,8)}>8</aside>
					<aside className={this.state.show9?'active':''} onTouchStart={this.modifyTel.bind(this,9)}>9</aside>
				</section>
				<section>
					<aside className={this.state.showback?'active':''} onTouchStart={this.modifyTel.bind(this,'back')}>
						<span>确定</span>
					</aside>
					<aside className={this.state.show0?'active':''} onTouchStart={this.modifyTel.bind(this,0)}>0</aside>
					<aside className={this.state.showdel?'active':''} onTouchStart={this.modifyTel.bind(this,'del')}><img src='./assets/images/del.png'/></aside>
				</section>
			</div>
		);
	}


	modifyTel(e){

		this.state['show'+e] = true;
		this.forceUpdate();

		setTimeout(()=>{
			this.state['show'+e] = false;
			

			let {obserable} = this.props;
			obserable.trigger({
				type:'modifyTel',
				data:e
			});	
		},200)
		
	}


	componentDidMount() {

	}
}
export default PubCom(ZmitiKeyboardApp);