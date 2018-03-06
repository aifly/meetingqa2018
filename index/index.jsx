import React, {
	Component
} from 'react';
import {
	PubCom
} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import '../assets/js/touch';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			beginTest: false,
			className: ''
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;


		if (this.props.indexPage) {

			var indexStyle = {
				background: 'url(' + this.props.indexPage + ') no-repeat  center bottom',
				backgroundSize: 'cover'
			}
			conponent = <div ref='zmiti-index-page'  className='lt-full' style={indexStyle}>
					<div className='zmiti-index-note'>
						<div className={'zmiti-title '+ this.state.className}>
							<img src='./assets/images/title1.png' />
						</div>

					</div>

					<div onTouchTap={this.beginTest.bind(this)} className={'zmiti-begin-test '+ this.state.className}>
						<img src='./assets/images/begin-test1.png'/>
					</div>
					<div className='zmiti-logo'>
						<img src='./assets/images/zmiti.png' />
						新华社新媒体中心出品
					</div>
				</div>
		}


		return (
			<div className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				{conponent}
			</div>
		);
	}


	animate() {
		this.setState({
			className: 'active'
		})
	}

	beginTest(time = 500) {

		let {
			obserable
		} = this.props;
		this.setState({
			btnClick: true
		});

		setTimeout(() => {
			this.setState({
				beginTest: true,
				btnClick: false,
			});
			setTimeout(() => {
				this.setState({
					hideIndex: true
				});
				obserable.trigger({
					type: 'toggleContent',
					data: true
				});

				if (!this.props.needInfo) { //不需要收集姓名和电话信息
					obserable.trigger({
						type: 'beginAnswer',
						data: 0
					});
				}
			}, time)
		}, 200)
	}


	componentDidMount() {
		if (this.refs['zmiti-index-page']) {
			$(this.refs['zmiti-index-page']).swipe('up', () => {
				this.beginTest(0);
			}).swipe('left', () => {
				this.beginTest(0);
			});
		}

		setTimeout(() => {
			this.animate();
		}, 100)


	}
}
export default PubCom(ZmitiIndexApp);