import React, {
	Component
} from 'react';
import {
	PubCom
} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';


import ZmitiClockApp from '../components/clock/index.jsx';
import ZmitiToastApp from '../components/toast/index.jsx';
import ZmitiKeyboardApp from '../components/keyboard/index.jsx';

class ZmitiContentApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toast: '',
			username: '',
			tel: '',
			currentQid: 0,
			score: 0,
			rightAnswerCount: 0,
			currentAnswer: [],
			clock: 0,
			result: '',
			iNow: -1,
			scale: 0
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

		window.s = this;


	}

	render() {

		var component = null;
		switch (this.props.theme) {
			case "PAPER":
				break;
			case "DANGJIAN":
				var mainStyle = {
					background: "#fff url(./assets/images/bg1.jpg) no-repeat center center",
					backgroundSize: 'cover '
				}
				component = <div className='zmiti-dangjian-content-C lt-full' style={mainStyle} onTouchStart={this.contentTap.bind(this)}>
			{this.props.needInfo && <section className={'zmiti-dangjian-content-user lt-full '+(this.state.hideUser?'hide':'')} >
			<div className='zmiti-dangjian-content-cover'>
			<section className='zmiti-dangjian-content-form'>
			<div className='zmiti-dangjian-content-input'><label>姓名：</label><input ref='input' value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} placeholder='请输入姓名' type='text'/></div>
			<div className='zmiti-dangjian-content-input'><label>手机号：</label><div className='zmiti-dangjian-tel-input' value={this.state.tel} style={{paddingLeft: 110}}  onTouchStart={()=>{this.refs['input'].blur();this.setState({showKeyboard:true})}}>{this.state.tel||'请输入手机号'}</div></div>
			<div className='zmiti-dangjian-clock'><ZmitiClockApp></ZmitiClockApp></div>
			<div className='zmiti-dangjian-all-duration'>请在{(this.props.duration/60|0)+'分钟'+(this.props.duration%60>0 ? (this.props.duration%60|0)+'秒':'')}内完成测试</div>

			</section>
			</div>
			<div onTouchTap={this.beginAnswer.bind(this)} className={'zmiti-btn zmiti-begin-answer-btn '+(this.state.username.length>0 && this.state.tel.length>0?'active':'') +  (this.state.beginTap?' tap':'')  }>
			开始答题
			</div>
			</section>}

			<section className={'zmiti-dangjian-question-C  lt-full' +(this.state.showQList?' active':'')+(this.state.hideList?' hide':'')} style={mainStyle}>
			<header style={{background:'url(./assets/images/header-bg.png) no-repeat',backgroundSize:'cover'}}>
			<img src='./assets/images/clock.png' />
			<span>{this.state.clock/60<10?'0'+(this.state.clock/60|0):this.state.clock/60|0}:{this.state.clock % 60<10?'0'+this.state.clock % 60:this.state.clock % 60} s</span>
			</header>
			
			{this.props.question.map((question,q)=>{
				var className = '';
				if(this.state.currentQid > q ){
					className = 'left';
				}else if(this.state.currentQid === q){
					className = 'active';
				}else{
					className = 'right';
				}
				var scrollStyle ={
					height:this.viewH - 78,
					background:this.props.indexBg? '#fff url('+this.props.indexBg+') no-repeat center / cover' : "#fff url(./assets/images/bg1.jpg) no-repeat center center / cover "
				}

				return	<section className={'zmiti-dangjian-q-scroll '+ className} ref={'zmiti-dangjian-q-scroll'+q} key={q} style={scrollStyle}>
				<audio src='./assets/music/error.mp3' ref='error'></audio>
				<audio src='./assets/music/right1.mp3' ref='right'></audio>
				<section style={{paddingBottom:60}}>
				<div className='zmiti-dangjian-q-title'>
				{question.isMultiselect && <span hidden> * 此题为多选题 </span>}
				<article>
				{question.img && <img src={question.img}/>}	
				<div>{question.title}</div>
				</article>
				<div className='zmiti-dangjian-pager'>
				<img src='./assets/images/q-title.png' className='zmiti-q-title'/>
				<span>{this.state.currentQid+1}</span>
				<span>{this.props.question.length}</span>
				</div>
				<img src='./assets/images/q-title1.png' className='zmiti-q-title1'/>
				</div>
				<div className='zmiti-dangjian-q-answer-list'>
				{question.answer.map((item,i)=>{
					return <div 
					onTouchTap={this.chooseMyAnswer.bind(this,i)} key={i} 
					className={'zmiti-dangjian-q-item ' + (this.state.iNow ===i ? this.state.result :'')} ref={'answer-'+i}>
					{this.props.arr[i]+"、"+item.content}
					{this.state.iNow ===i && <img src={'./assets/images/'+(this.state.result === 'active'?'right':'error')+'.png'}/>}
					</div>
				})}

				{this.props.myAnswer.length>=this.props.question.length-1 && <div onTouchTap={this.submitPaper.bind(this)} className={'zmiti-dangjian-submit-btn ' + (this.state.submit?'active':'')}>提交答卷</div>}
				{this.props.myAnswer.length<this.props.question.length-1 && this.props.questionType!=='single' && <div onTouchTap={this.doNext.bind(this)} className={'zmiti-dangjian-submit-btn ' + (this.state.submit?'active':'')}>下一题</div>}
				</div>
				</section>	
				</section>
			})}
			</section>

			<section  ref='result' className={'zmiti-dangjian-result-page lt-full ' + (this.state.showScore?'active':'') }style={mainStyle}>
			<div>
			<div className='zmiti-dangjian-score-C'>
			<div className='zmiti-dangjian-score'>
			{this.state.scale}%
			<svg width="100%" height="200px" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<circle cx={110} cy='110' r='90' fill='none' strokeDasharray="14,6" stroke='#000'></circle>
			</svg>
			</div>
			<div>您答对了{this.state.rightAnswerCount}道题</div>
			{this.state.rightAnswerCount>0 && <div style={{fontWeight:'bold'}}>达到“{this.state.level}”水平</div>}
			{this.state.rightAnswerCount<=0 && <div style={{fontWeight:'bold'}}>尚需努力！</div>}

			</div>


			<div onTouchTap={this.watchAnswer.bind(this)} className='zmiti-dangjian-result-btn zmiti-dangjian-result-btn1'>
			<span><img src='./assets/images/watch.png'/></span>
			<span>查看答案</span>
			</div>
			<div className='zmiti-share-btns'>
			<div onTouchTap={this.doAgin.bind(this)} className='zmiti-dangjian-result-btn'>
			<span><img src='./assets/images/refresh.png'/></span>
			<span>再做一次</span>
			</div>

			<div style={{width:20}}></div>

			<div onTouchTap={this.showMask.bind(this)} className='zmiti-dangjian-result-btn'>
			<span><img src='./assets/images/share-ico.png'/></span>
			<span>分享好友</span>
			</div>	
			</div>

			<div className='zmiti-team'>总策划：刘思扬</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>出品：陈凯星 冯瑛冰</div>
			<div className='zmiti-team'>监制：齐慧杰 孙爱东</div>
			<div className='zmiti-team'>统筹：黄庆华 曹晓轩</div>
			<div className='zmiti-team'>试题：王谦 班和平 苏蕾 常琳</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>编辑：孔唯千 侯帮兴 王丹</div>
			<div className='zmiti-team1'></div>
			<div className='zmiti-team'>联合制作：新华社客户端 半月谈杂志社</div>

			<div className='zmiti-copyright' hidden>新华社客户端<span style={{opacity:0}}>新</span>半月谈杂志社联合出品</div>
			</div>
			</section>
			</div>;
				break;
		}

		var maskStyle = {
			background: 'url(./assets/images/arron1.png) no-repeat center center / cover'
		}

		return (
			<div className={'zmiti-content-main-ui  '+(this.state.showContent ? 'show':'') +(this.state.hideContent?' hide':'')}>
			{component}
			{this.state.showMask&& <div onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask lt-full' style={maskStyle}></div>}
			<ZmitiKeyboardApp show={this.state.showKeyboard} obserable={this.props.obserable}></ZmitiKeyboardApp>
			<div className='zmiti-dangjian-toast'>
			{this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>}
			</div>
			</div>
		);
	}

	contentTap(e) {
		if (!e.target.classList.contains('zmiti-dangjian-tel-input')) {
			this.setState({
				showKeyboard: false
			})
		}
	}


	showMask() {
		this.setState({
			showMask: true
		})
	}

	watchAnswer() {

		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'toggleResult',
			data: true
		});

		this.setState({
			hideContent: true
		});

	}

	doAgin() {
		this.setState({
			hideList: false,
			currentQid: 0,
			showScore: false,
			clock: 0,
			iNow: -1,
			result: '',
			currentAnswer: []
		}, () => {
			//this.scroll.refresh();
		});
		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'clearMyAnswer'
		});

		this.timer = setInterval(() => {
			this.setState({
				clock: this.state.clock + 1
			})
		}, 1000)
	}


	submitPaper() { //提交答卷
		this.setState({
			submit: true
		});
		var s = this;
		var score = 0;

		clearInterval(this.timer)
		let {
			obserable
		} = this.props;
		obserable.trigger({
			type: 'fillAnswer',
			data: this.state.currentAnswer.concat([])
		});

		this.props.myAnswer.map((item, i) => {
			this.props.question[i].rightAnswer = [];

			this.props.question[i].answer.map((a, k) => {
				if (a.isRight) {
					this.props.question[i].rightAnswer.push(k);
				} else {
					this.props.question[i].rightAnswer.push(undefined);
				}
			})

		});
		var rightAnswerCount = 0;
		this.props.question.map((item, i) => {
			if (this.props.questionType !== 'single') {
				var isRight = 0;
				this.props.question[i].rightAnswer.map((right, k) => {
					if (this.props.myAnswer[i][k] === right) {
						isRight++
					}
				})
				if (isRight >= this.props.question[i].rightAnswer.length) {
					score += this.props.question[i].score;
				}



			} else {


				this.props.question[i].rightAnswer.map((right, k) => {
					if (right === this.props.myAnswer[i][0] && this.props.myAnswer[i][0] !== undefined) {
						score += this.props.question[i].score;
						rightAnswerCount++;
					}

				})


			}
		});

		score >= 100 && (score = 100);

		var level = '';
		this.props.level.map((item, i) => {
			if (score <= item.score) {
				level = item.name;
			}
		});

		this.setState({
			level
		})

		if (!this.props.showLevel) {
			level = score + '分';
		}

		obserable.trigger({
			type: "modifyShareInfo",
			data: {
				title: s.props.shareTitle.replace(/{username}/, s.state.username || s.props.nickname).replace(/{score}/ig, score).replace(/{level}/ig, level),
				desc: s.props.shareDesc.replace(/{username}/, s.state.username || s.props.nickname).replace(/{score}/ig, score).replace(/{level}/ig, level)
			}
		});

		//'您答对了'+this.state.rightAnswerCount+'道题，击败了'+(Math.random()*90|0 + 10)+'%的网友，获得"'+ this.state.level +'"称号',



		//s.state.scale = scale;

		this.setState({
			rightAnswerCount
		}, () => {
			setTimeout(() => {
				var scale = (Math.random() * 90 | 0) + 10;
				var s = this;
				console.log(this.state.rightAnswerCount);
				if (s.state.rightAnswerCount === 50) {
					scale = 99;

				} else if (s.state.rightAnswerCount > 45) {

					scale = (Math.random() * 4 | 0) + 95;

				} else if (s.state.rightAnswerCount > 40) {

					scale = (Math.random() * 5 | 0) + 90;

				} else if (s.state.rightAnswerCount > 30) {

					scale = (Math.random() * 20 | 0) + 70;

				} else if (s.state.rightAnswerCount > 20) {

					scale = (Math.random() * 20 | 0) + 50;

				} else {
					scale = (Math.random() * 46 | 0) + 4;
				}

				var ss = scale;

				var i = 0;
				var t = setInterval(() => {


					if (scale === 0) {
						s.state.scale = 0;
						s.forceUpdate();
						clearInterval(t);
						return;
					}
					if (i > 20) {

						s.state.scale = scale;
						s.forceUpdate();
						clearInterval(t);
						return;
					}
					s.state.scale = Math.random() * 100 | 0;
					i++;
					s.forceUpdate();


				}, 100)
				var title = window.share.title.replace(/{rightAnswerCount}/, s.state.rightAnswerCount).replace(/{scale}/, scale).replace(/{level}/, s.state.level);
				if (s.state.rightAnswerCount === 0) {
					title = '学习政府工作报告，尚需努力！';
					s.state.scale = 0;
					scale = 0;
				}

				s.props.wxConfig(
					title,
					window.share.desc,
					s.props.shareImg,
					s.props.appId,
					s.props.worksid
				)

				return;


			}, 10)
		})



		obserable.trigger({
			type: 'clearCountdown'
		})



		setTimeout(() => {
			this.setState({
				submit: false,
				hideList: true,
				score,
				showScore: true
			});
		}, 200);

		var s = this;

		//var idx = Math.random() * this.zmitiMap.length | 0;


		return;


	}


	doNext() { //下一题目；

		if (!this.state.currentAnswer || this.state.currentAnswer.length <= 0) {
			this.state.currentAnswer = [
				[undefined]
			];
		}
		let {
			obserable
		} = this.props;


		obserable.trigger({
			type: 'fillAnswer',
			data: this.state.currentAnswer.concat([])
		});
		this.setState({
			currentQid: this.state.currentQid + 1,
			iNow: -1,
			result: '',
			currentAnswer: []
		}, () => {
			this['scroll' + this.state.currentQid].refresh();
			//this.scroll.refresh();
		})
	}


	chooseMyAnswer(i) {
		window.c = this;
		if (!this.props.myAnswer[this.state.currentQid] && this.props.myAnswer[this.state.currentQid] !== 0) {

			this.props.question[this.state.currentQid].answer.map((itne, i) => {
				this.state.currentAnswer.push(undefined);
			});

			this.state.currentAnswer.length = this.props.question[this.state.currentQid].answer.length;

			if (this.props.questionType === 'single') { //单选题目

				this.state.currentAnswer[0] = i;


				//判断用户是否回答正确
				var audio = this.refs[this.props.question[this.state.currentQid].answer[i].isRight ? 'right' : 'error'];
				audio.currentTime = 0;
				audio.play()
				this.state.result = this.props.question[this.state.currentQid].answer[i].isRight ? 'active' : 'error'
				this.state.iNow = i;
				this.forceUpdate();

				if (this.props.question[this.state.currentQid + 1]) {
					setTimeout(() => {
						this.doNext();
					}, 500)
				}

			} else { //多选题or混合题目。
				var has = false;
				this.state.currentAnswer.forEach((item, k) => {
					if (item === i) {
						has = true;
						return;
					}
				});
				if (has) {
					this.state.currentAnswer.splice(i, 1, undefined);
				} else {
					this.state.currentAnswer[i] = i;
				}
				this.forceUpdate();


			}



		}
	}

	showToast(msg) {
		this.setState({
			toast: msg
		});

		setTimeout(() => {
			this.setState({
				toast: ''
			});
		}, 2000)
	}

	beginAnswer(time = 200) { //

		if (this.props.needInfo && (this.state.username.length <= 0 || this.state.tel.length <= 0)) {
			if (this.state.username.length <= 0) {
				this.showToast('姓名不能为空')
			}
			if (this.state.tel.length <= 0) {
				this.showToast('手机号不能为空')
			}
			return;
		}

		if (this.props.needInfo && !(/^1[34578]\d{9}$/.test(this.state.tel))) {
			this.showToast('请填写正确的手机号');
			return false;
		}


		let {
			obserable
		} = this.props;
		this.setState({
			beginTap: true
		});
		this.timer && clearInterval(this.timer);
		this.timer = setInterval(() => {
			this.setState({
				clock: this.state.clock + 1
			})
		}, 1000)

		setTimeout(() => {
			this.setState({
				beginTap: false,
				hideUser: true

			});

			obserable.trigger({
				type: 'toggleQList',
				data: true
			});

			obserable.trigger({
				type: 'setQuestionScroll'
			})

		}, time);
	}


	componentDidMount() {



		let {
			IScroll,
			obserable
		} = this.props;

		obserable.on('submitPaper', () => {
			this.submitPaper();
		});

		obserable.on('beginAnswer', (data) => {
			this.beginAnswer(data);
		})
		obserable.on('setQuestionScroll', () => {

			this.props.question.map((item, i) => {
				if (this.refs['zmiti-dangjian-q-scroll' + i]) {
					this['scroll' + i] = new IScroll(this.refs['zmiti-dangjian-q-scroll' + i], {
						scrollbars: true
					})

				}
			});
			setTimeout(() => {
				this.props.question.map((item, i) => {
					this['scroll' + i].refresh();
				});
			}, 1000)


		});

		obserable.on('countdown', function() {
			this.timer = setInterval(() => {
				this.setState({
					clock: this.state.clock + 1
				})
			}, 1000)
		}.bind(this))

		obserable.on('modifyTel', (data) => {
			if (typeof data === 'string') {
				if (data === 'del') {
					this.state.tel = this.state.tel.substring(0, this.state.tel.length - 1);
				} else if (data === 'back') {
					this.state.showKeyboard = false;
				}
			} else {
				this.state.tel += data;
			}


			this.forceUpdate()
		});

		obserable.on('backToShare', () => {
			obserable.trigger({
				type: 'toggleResult',
				data: false
			});

			this.setState({
				hideContent: false
			})
		});

		obserable.on('toggleContent', (data) => {
			this.setState({
				showContent: data
			});
		});
		obserable.on('toggleQList', (data) => {
			this.setState({
				showQList: data
			});
		});


		setTimeout(() => {
			this.resultScroll = new IScroll(this.refs['result'], {
				//scrollbars: true
			})
		}, 1000)

	}
}
export default PubCom(ZmitiContentApp);