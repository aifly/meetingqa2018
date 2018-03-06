import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import ZmitiLoadingApp from './loading/index.jsx';
import ZmitiIndexApp from './index/index.jsx';
import ZmitiContentApp from './content/index.jsx';
import ZmitiResultApp from './result/index.jsx';

import Obserable from './components/public/obserable';
var obserable = new Obserable();

export class App extends Component {
	constructor(props) {
		super(props);


		this.state = {
			progress: '0%',
			loadingImg: [],
			showLoading: true,
			name: '',
			tel: '',
			arr: ["A", 'B', 'C', "D", "E", "F", "G", "H", "I", "J"],
			score: 0,
			myAnswer: []

		}
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;

		this.zmitiMap = [

			{
				"name": "北京市",
				"log": "116.46",
				"lat": "39.92"
			}, {
				"name": "上海市",
				"log": "121.48",
				"lat": "31.22"
			}, {
				"name": "天津市",
				"log": "117.2",
				"lat": "39.13"
			}, {
				"name": "重庆市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "石家庄",
				"log": "114.48",
				"lat": "38.03"
			}, {
				"name": "太原市",
				"log": "112.53",
				"lat": "37.87"
			}, {
				"name": "沈阳市",
				"log": "123.38",
				"lat": "41.8"
			}, {
				"name": "长春市",
				"log": "125.35",
				"lat": "43.88"
			}, {
				"name": "哈尔滨市",
				"log": "126.63",
				"lat": "45.75"
			}, {
				"name": "杭州市",
				"log": "120.19",
				"lat": "30.26"
			}, {
				"name": "福州市",
				"log": "119.3",
				"lat": "26.08"
			}, {
				"name": "济南市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "郑州市",
				"log": "113.65",
				"lat": "34.76"
			}, {
				"name": "武汉市",
				"log": "114.31",
				"lat": "30.52"
			}, {
				"name": "长沙市",
				"log": "113",
				"lat": "28.21"
			}, {
				"name": "广州市",
				"log": "113.23",
				"lat": "23.16"
			}, {
				"name": "海口市",
				"log": "110.35",
				"lat": "20.02"
			}, {
				"name": "成都市",
				"log": "104.06",
				"lat": "30.67"
			}, {
				"name": "贵阳市",
				"log": "106.71",
				"lat": "26.57"
			}, {
				"name": "昆明市",
				"log": "102.73",
				"lat": "25.04"
			}, {
				"name": "南昌市",
				"log": "115.89",
				"lat": "28.68"
			}, {
				"name": "西安市",
				"log": "108.95",
				"lat": "34.27"
			}, {
				"name": "西宁市",
				"log": "101.74",
				"lat": "36.56"
			}, {
				"name": "兰州市",
				"log": "103.73",
				"lat": "36.03"
			}, {
				"name": "南宁市",
				"log": "106.54",
				"lat": "29.59"
			}, {
				"name": "乌鲁木齐市",
				"log": "87.68",
				"lat": "43.77"
			}, {
				"name": "呼和浩特市",
				"log": "111.65",
				"lat": "40.82"
			}, {
				"name": "拉萨市",
				"log": "91.11",
				"lat": "29.97"
			}, {
				"name": "银川市",
				"log": "106.27",
				"lat": "38.47"
			}, {
				"name": "台北市",
				"log": "121.5",
				"lat": "25.14"
			}, {
				"name": "香港",
				"log": "114.17",
				"lat": "22.27"
			}, {
				"name": "澳门",
				"log": "113.33",
				"lat": "22.13"
			}, {
				"name": "合肥市",
				"log": "117.27",
				"lat": "31.86"
			}, {
				"name": "南京市",
				"log": "118.78",
				"lat": "32.04"
			}
		]
	}
	render() {

		var mainStyle = {};
		if (this.state.indexBg) {
			mainStyle.background = this.state.indexBg ? '#fff url(' + this.state.indexBg + ') no-repeat center / cover' : "#fff url(./assets/images/bg.png) no-repeat center center / cover "
		}

		var data = {
			obserable,
			IScroll,
			theme: this.state.theme,
			title: this.state.title,
			duration: this.state.duration,
			totalDuration: this.state.totalDuration,
			question: this.state.question,
			myAnswer: this.state.myAnswer,
			arr: this.state.arr,
			indexBg: this.state.indexBg,
			indexPage: this.state.indexPage,
			worksid: this.state.worksid,
			needInfo: this.state.needInfo
		}


		var ZmitiCustomApp = null;
		if (this.state.custom && this.state.custom.indexOf('Zmiti') > -1 && this.state.custom.indexOf('App') > -1) {
			var ZmitiCustomApp = require('./' + this.state.custom.replace(/Zmiti/ig, '').replace(/App/ig, '').toLowerCase() + '/index.jsx');
		}

		return (
			<div className='zmiti-main-ui' style={mainStyle}>
				{this.state.showLoading && <ZmitiLoadingApp myHeadImg={this.state.headimgurl} progress={this.state.progress}></ZmitiLoadingApp>}
				{!this.state.showLoading && <ZmitiIndexApp {...data}></ZmitiIndexApp>}
				{!this.state.showLoading && <ZmitiContentApp {...this.state} {...data}></ZmitiContentApp>}
				{!this.state.showLoading && <ZmitiResultApp {...data}></ZmitiResultApp>}
				{ZmitiCustomApp &&<ZmitiCustomApp {...data}></ZmitiCustomApp>}
			</div>
		);
	}

	submit() {
		this.setState({
			submit: true
		});

		setTimeout(() => {
			this.setState({
				submit: false
			});
		}, 100);
	}

	beginTest() {

		this.setState({
			tap: true
		});

		setTimeout(() => {
			this.setState({
				tap: false,
				showForm: true,
			});

		}, 100);

	}

	wxConfig(title, desc, img, appId = 'wxfacf4a639d9e3bcc', worksid) {

		var durl = location.href.split('#')[0]; //window.location;
		var code_durl = encodeURIComponent(durl);


		var appId = appId,
			img = img;


		img = 'http://h5.zmiti.com/public/' + window.h5name + '/assets/images/300.png'
		var s = this;
		var url = window.config.protocol + "//api.zmiti.com/weixin/jssdk.php?type=signature&durl=" + code_durl
		if (window.config.server === 'zhongguowangshi') {
			url = window.config.protocol + "//h5.zhongguowangshi.com/" + window.h5name + "/weixin/jssdk.php?type=signature&durl=" + code_durl + "&worksid=" + worksid;
			img = window.config.protocol + '//h5.zhongguowangshi.com/' + window.h5name + '/assets/images/300.png';
			appId = window.config.appId;
		}


		$.ajax({
			type: 'get',
			url: url,
			dataType: 'jsonp',
			jsonp: "callback",
			jsonpCallback: "jsonFlickrFeed",
			error() {},
			success(data) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: '1488558145', // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: data.signature, // 必填，签名，见附录1
					jsApiList: ['checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'hideMenuItems',
						'showMenuItems',
						'hideAllNonBaseMenuItem',
						'showAllNonBaseMenuItem'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

				wx.ready(() => {


					//朋友圈
					wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//朋友
					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						type: "link",
						dataUrl: "",
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//qq
					wx.onMenuShareQQ({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
				});
			}
		});

	}



	componentDidMount() {

		var s = this;



		$.getJSON('./assets/js/data.json?t=' + new Date().getTime(), (data) => {



			this.state.custom = data.custom;
			this.state.indexBg = data.indexBg;
			this.state.indexPage = data.indexPage;
			this.state.needInfo = data.needInfo;
			this.state.title = data.title;
			this.state.theme = data.theme;
			this.state.duration = data.duration;
			this.state.totalDuration = data.duration;
			this.state.question = data.question;

			//this.state.question.length = 8;

			this.state.worksid = data.worksid;
			this.worksid = data.worksid;
			if (window.config.server === 'zhongguowangshi') {
				this.state.worksid = window.config.worksid;
				this.worksid = window.config.worksid;
			}

			this.state.worksid = window.config.worksid;
			this.worksid = window.config.worksid;
			this.state.wxappid = data.wxappid;
			this.state.wxappsecret = data.wxappsecret;
			this.state.custom = data.custom;
			this.state.level = data.level;
			this.state.questionType = data.questionType;
			this.state.shareDesc = data.shareDesc || '';
			this.state.shareTitle = data.shareTitle || '';
			this.state.shareImg = data.shareImg;
			this.state.showLevel = data.showLevel;
			this.state.title = document.title;
			this.state.isPublish = data.isPublish
			this.state.isUseWX = data.isUseWX;
			this.state.isShowUseTime = data.isShowUseTime;
			//document.title = this.state.title;
			this.state.wxConfig = this.wxConfig.bind(this);

			this.forceUpdate(() => {
				obserable.trigger({
					type: 'setQuestionScroll'
				});
			});

			obserable.on('fillAnswer', (data) => {
				this.state.myAnswer.push(data);
				this.forceUpdate();
			});

			window.s = this;
			var i = 0;
			obserable.on('countdown', () => {
				if (this.state.isShowUseTime) {
					///this.state.duration = 0;
				}
				this.timer = setInterval(() => {
					if (this.state.duration <= 0) {
						clearInterval(this.timer);
						obserable.trigger({
							type: 'submitPaper'
						})
					}
					if (this.state.isShowUseTime) {

					} else {
						this.setState({
							duration: this.state.duration - 1
						});
					}
				}, 1000);
			});

			obserable.on('clearCountdown', () => {
				clearInterval(this.timer);
			});

			obserable.on('clearMyAnswer', (data) => {
				this.state.myAnswer.length = 0;
				this.forceUpdate();
			});

			obserable.on('modifyShareInfo', (data) => {
				this.setState({
					shareTitle: data.title,
					shareDesc: data.desc
				});
			});

			this.setState({
				showLoading: true
			});



			s.loading(data.loadingImg, (scale) => {
				s.setState({
					progress: (scale * 100 | 0) + '%'
				})
				if (scale === 1) {
					s.setState({
						showLoading: false
					});
				}
			}, () => {

				var protocol = window.config.protocol;

				$.ajax({
					url: protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
					type: "POST",
					data: {
						customid: 42
					},
					success(data) {
						if (data.getret === 0) {
							console.log(data);
						}
					}
				});


				s.wxConfig(
					s.state.title,
					window.share.desc,
					data.shareImg,
					data.appId,
					s.worksid
				);

				s.forceUpdate();

			});
		});



		$(document).one('touchstart', () => {
			/*this.refs['talkAudio'].pause();
			this.refs['talkAudio'].muted = true;
			this.refs['talkAudio'].play();
			setTimeout(()=>{
				this.refs['talkAudio'].muted = false;
			},500);
			if(this.refs['audio'] && this.refs['audio'].paused){
				this.refs['audio'].play();
			};*/
		})

	}

	loading(arr, fn, fnEnd) {
		var len = arr.length;
		var count = 0;
		var i = 0;

		function loadimg() {
			if (i === len) {
				return;
			}
			var img = new Image();
			img.onload = img.onerror = function() {
				count++;
				if (i < len - 1) {
					i++;
					loadimg();
					fn && fn(i / (len - 1), img.src);
				} else {
					fnEnd && fnEnd(img.src);
				}
			};
			img.src = arr[i];
		}
		loadimg();
	}

	isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	}

	componentWillMount() {
		var s = this;

	}

	clearRender() {
		clearInterval(this.talkTimer);
	}


}

ReactDOM.render(<App></App>, document.getElementById('fly-main-ui'));