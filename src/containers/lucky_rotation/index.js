import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import axios from 'axios';
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getHistoryTuDo,
	getCodeBonus,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	getInfoUser,
	userLogout,
	getDataUserSpin
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './images/muivongquay.png'

import backtotop from './images/backtotop.png'
import sukiendangdienra from './images/btn-sukiendangdienra.png'
import livestream from './images/btn_livestream.png'
import sapdienra from './images/btn-sapdienra.png'
import ketthuc from './images/btn-ketthuc.png'
import logo from './images/logo.png';
import thamgiangay from './images/btn-thamgiangay.gif';
import iphone_11_pro_max from './images/iphone-11-pro-max.png';
import vqmm_p2 from './images/vqmm-p2.png';
import btn_quay_p2 from './images/btn-quay-p2.png';
import honda from './images/honda.png';
import iphone_xs from './images/iphone-xs.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import icon_bangvinhdanh from './images/icon-bangvinhdanh.png';
import logo_splay from './images/logo_splay.png';
import logo_scoin from './images/logo_scoin.png';
import img_phanthuong from './images/img-phanthuong.png';
import btn_close from './images/btn-close.png';
import img_card10k from './images/img-card10k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card500k from './images/img-card500k.png';
import img_thele from './images/img-thele.png';
import img_tudo from './images/img-tudo.png';
import img_maduthuong from './images/img-maduthuong.png';
import img_thongbao from './images/img-thongbao.png';
import img_livestream from './images/img-livestream.png';
import img_giaithuong from './images/img-giaithuong.png';
// import muiten from './images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			limit: 10,
			offsetTuDo: 0,
			offsetCode: 0,
			offsetVinhDanh: 0,
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			activeHistory:1,
			countVinhDanh:0,
			countHistory:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listHistory:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:false,
			scoinCard:false,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			img_status: sukiendangdienra,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			hour_live:'00', 
			minute_live:'00', 
			second_live:'00',
			linkLiveStream:'',
			isLive:false,
			user:{},
			xacthuc:false,
			timeWaiting:0
		};
	}
	componentWillMount(){
		// if (window.innerWidth <= 320) {
		// 	this.setState({ width: 242, height: 378, img_width:280, img_height:280});
		// }
		// if (window.innerWidth > 320 && window.innerWidth <= 480) {
		// 	this.setState({ width: 260, height: 405, img_width:300, img_height:300});
		// }
		// if (window.innerWidth > 480 && window.innerWidth <= 600) {
		// 	this.setState({ width: 400, height: 500, img_width:500, img_height:500});
		// }
		// if (window.innerWidth > 600 && window.innerWidth <= 768) {
		// 	this.setState({ width: 485, height: 500, img_width:560, img_height:560});
		// }
		// if (window.innerWidth > 768 && window.innerWidth < 1024) {
		// 	this.setState({ width: 650, height: 700, img_width:750, img_height:750});
		// }
		// if (window.innerWidth >= 1024) {
		// 	this.setState({ width: 645, height: 830, img_width:752, img_height:752});
		// }

		this.onResize()
		window.removeEventListener('scroll', this.handleScroll);
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));

		this.props.getLuckyInfo().then(()=>{
			var data=this.props.dataLuckyInfo;
			if(data!==undefined){
				if(data.Status===0){
					this.getStatus(data.Data)
				}
			}
		})

		this.props.getLuckyItems().then(()=>{
			var data=this.props.dataLuckyItems;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({itemOfSpin: data.Data})
				}
			}
		})

		this.getVinhDanh(1);


		if (user !== null) {
			this.setState({isLogin:true, user:user})
			this.props.getDataUserSpin(user.Token).then(()=>{
				var data=this.props.dataUserSpin;
				if(data!==undefined){
					if(data.Status===0){
						this.setState({turnsFree: data.Spins})
					}
				}

			})
		} 
		
		
		let theWheel = new Wheel({
			'numSegments'       : 12,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',

			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.width=img_width;
		loadedImg.height=img_height;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	onResize=()=>{
		if (window.innerWidth <= 320) {
			this.setState({ width: 210, height: 235, img_width:170, img_height:170});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 480) {
			this.setState({ width: 250, height: 280, img_width:200, img_height:200});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 335, height: 375, img_width:270, img_height:270});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 768) {
			this.setState({ width: 470, height: 525, img_width:375, img_height:375});
		}
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			this.setState({ width: 504, height: 563, img_width:405, img_height:405});
		}
		if (window.innerWidth >= 1024) {
			this.setState({ width: 670, height: 752, img_width:540, img_height:540});
		}
	}

	getVinhDanh=(pageNumber)=>{
		const {limit}=this.state;
		this.props.getVinhDanh(limit, (pageNumber-1)).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				if(data.Status===0){
					var listVinhDanh=data.Data;
					console.log(listVinhDanh)
					this.setState({listVinhDanh:data.Data, countVinhDanh:data.Totals})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Kh??ng l???y ???????c d??? li???u b???ng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getStatus=(luckySpin)=>{
		var StartDate=luckySpin.StartDate;
		var EndDate=luckySpin.EndDate;
		var start=StartDate.substring(StartDate.indexOf("(") +1,StartDate.indexOf(")"));
		var end=EndDate.substring(EndDate.indexOf("(")+1,EndDate.indexOf(")"));
		console.log(start, end)
		var time=Date.now();

		// var distance_3day=start - 3 * 86400 * 1000;
		// var duration=end-time;

		if (time < start) {
			this.timeRemain(start)
			this.setState({ img_status: sapdienra, message_status:"S??? ki???n ch??a di???n ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: sukiendangdienra});
		}
		if (time > end) {
			this.setState({ img_status: ketthuc, message_status:"S??? ki???n ???? k???t th??c."});
			// $('#myModal14').modal('show');
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Tr??nh duy???t kh??ng h??? tr??? localStorage");
			}
			// window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			// window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
			window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}else{
			$('#myModal12').modal('show');
		}
	}
	logoutAction = () => {
		this.logout();
		localStorage.removeItem("user");
		// window.location.replace(
		// 	`https://graph.vtcmobile.vn/oauth/authorize?client_id=58306439627cac03c8e4259a87e2e1ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );

		// window.location.replace(
		// 	`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );
		window.location.replace(
			`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=UH8DN779CWCMnCyeXGrm2BRqiTlJajUyZUEM0Kc&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	logout=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		var header = {
			headers: {
				"Content-Type": "application/json",
				"token": user.Token,
			}
		}
		axios.get('http://171.244.14.138/luckywheel/user-signout/', header).then(function (response) {
			console.log(response)
		})
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		// var user = 'nambv';
		var time=Date.now();
		if(time > luckySpin.endDate){
			this.setState({message_status:"V??ng quay ???? k???t th??c."},()=>{
				$('#myModal8').modal('show');
			})
		}else{
			if (user !== null) {
				if(user.VipLevel!==0){
					if(turnsFree>0){
						this.props.pickCard(user.Token).then(()=>{
							var data=this.props.dataPick;
							console.log(data)
							var list=this.state.data_auto;
							if(data!==undefined){
								if(data.Status ===0){
									var id=data.Data.AwardId;
									var pos=0
									pos = itemOfSpin.map(function(e) { return e.Id; }).indexOf(id);
									list.push(data.Data.AwardName);
									
									this.resetWheel();
									if(!isSpin && closeAuto){
										this.startSpin(pos+1);
									}	
									this.setState({itemBonus: data.Data, data_auto: list, closeAuto:true});
								}else if(data.Status ===2){
									$('#matluot').modal('show');
									this.setState({message_error:data.Message, timeWaiting:data.WaitingSeconds})
									this.timeWaitings(data.WaitingSeconds)
								}else{
									$('#myModal11').modal('show');
									this.setState({message_error:data.Message})
								}
							}else{
								$('#myModal12').modal('show');
								this.setState({server_err:true})
							}
						})
						
					}else{
						$('#myModal6').modal('show');
					}
				}else{
					$('#activeVip').modal('show');
				}
			} else {
				$('#myModal5').modal('show');
			}
		}
		
	}

	btnStart=()=>{
		const {wheelSpinning}=this.state;
		if(!wheelSpinning){
			this.setState({data_auto:[], closeAuto:true},()=>{
				this.start();
			})
		}	
		// this.startSpin(5)
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	// stopSpin=()=>{
	// 	const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
	// 	if (stop == false) {

	// 		theWheel.stopAnimation(false);
	// 		theWheel.animation.spins = 1;
	// 		theWheel.rotationAngle = 0;
	// 		theWheel.draw(); 
	// 		theWheel.startAnimation();
	// 		// theWheel.stopAnimation(false);
	// 		this.setState({wheelSpinning: true, stop:true});
	// 	}
	// }

	resetWheel=()=>{
		const { theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 10; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree, theWheel, itemBonus}=this.state;
		if(auto){
			var intervalId = setInterval(this.autoRotation, 2000);
			$('#myModal9').modal('show');
   			this.setState({intervalId: intervalId, isSpin: true, closeAuto:false, wheelSpinning: false});
			
		}else{
			if(itemBonus.type!=="ACTION"){
				$('#myModal4').modal('show');
			}
			this.setState({isSpin: false, closeAuto:true, wheelSpinning: false});
			this.getDetailData()
		}
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	autoRotation=()=>{
		const {turnsFree, luckySpin}=this.state;
		if(turnsFree>0){
			this.getDetailData();
		}else{
			clearInterval(this.state.intervalId);
		}
	}


	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getDataUserSpin(user.Token).then(()=>{
			var data=this.props.dataUserSpin;
			if(data!==undefined){
				var turnsFree=data.Spins
				if(data.Status===0){
					if(turnsFree>0){
						if(auto){
							this.start();
						}
					}else{
						$('#myModal6').modal('show');
						clearInterval(this.state.intervalId);
					}
					this.setState({turnsFree:turnsFree})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'L???i h??? th???ng. Vui l??ng th??? l???i.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}

		})
	}

	// showPopup=()=>{
	// 	const {itemBonus, turnsFree}=this.state;

	// 	setTimeout(()=>{
	// 		$('#myModal4').modal('hide');
	// 		if(turnsFree>0){
	// 			this.start()
	// 		}
	// 	},2000)
	// 	if(itemBonus.keyName!=="matluot"){
	// 		$('#myModal4').modal('show');
	// 	}
	// }

	timeRemain=(times)=>{
		var _this=this;
		setInterval(()=>{
			var time=(times-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				_this.setState({day:day, hour: hour, minute: minute, second:second})
				// _this.setState({hour_live: hour, minute_live: minute, second_live:second})
			}
		}, 1000);
	}

	timeWaitings=(time)=>{
		var minute=Math.floor(time/60) > 9 ? Math.floor(time/60) : `0${Math.floor(time/60)}`;
		var second=Math.ceil(time%60) > 9 ? Math.ceil(time%60) : `0${Math.ceil(time%60)}`;
		this.setState({minute_live: minute, second_live:second})
	}

	timeConverter=(time)=>{
		var start=time.substring(time.indexOf("(") +1,time.indexOf(")"));
		var a = new Date(+start);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	  }



	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		var user = JSON.parse(localStorage.getItem("user"));
		// var user='nambv'
		if (user !== null) {
			this.getDataTuDo(user);
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	getDataTuDo=(user)=>{
		const {luckySpin, limit, activeTuDo}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getTuDo(user.Token, limit, (activeTuDo-1)).then(()=>{
			var data=this.props.dataTuDo;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({listTuDo:data.Data, countTuDo:data.Totals, noti_tudo:false})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getHistory=(user)=>{
		const {luckySpin, limit, activeHistory}=this.state;
		// var offsetTuDo=(pageNumber-1)*limit;
		this.props.getHistoryTuDo(user.Token, limit, (activeHistory-1)).then(()=>{
			var data=this.props.dataHistoryTuDo;
			if(data!==undefined){
				if(data.Status===0){
					this.setState({listHistory:data.Data, countHistory:data.Totals})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	showModalCodeBonus=()=>{
		const {luckySpin, offsetCode, limit}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.Token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					if(data.status==='01'){
						console.log(data.data)
						this.setState({dataCodeBonus:data.data, countCodeBonus:data.data.length, listCodeBonus: data.data.slice(0,5), noti_mdt:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Ch??a t???i ???????c d??? li???u. Vui l??ng th??? l???i'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


	handlePageChangeTuDo=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeTuDo: pageNumber},()=>{
			this.getDataTuDo(user, pageNumber)
		})
	}

	handlePageChangeHistory=(pageNumber)=> {
		var user = JSON.parse(localStorage.getItem("user"));
		this.setState({activeHistory: pageNumber},()=>{
			this.getHistory(user, pageNumber)
		})
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		this.setState({activeVinhDanh: pageNumber},()=>{
			this.getVinhDanh(pageNumber)
		})
		// const {dataVinhDanh}=this.state;
		// var newPosition=(pageNumber-1)*10
		// this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	xacThuc=(url)=> {
		localStorage.removeItem("user");
		document.location.reload(true);
		$('#myModal8').modal('hide');
		window.open(url, '_blank').focus();
	}

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}


	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	render() {
		const {xacthuc, scoinCard,height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, img_status, message_status, data_auto,message_error,linkLiveStream,
			 activeTuDo, activeHistory, activeCodeBonus, activeVinhDanh, limit, countCodeBonus, countTuDo, countHistory, countVinhDanh, listHistory, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, hour_live, minute_live, second_live, isLive, user}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span className="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div className="container-fluid page1">
				<div className="content-inner-p1">
					<h1 className="logo-p1" id="logo"><img src={logo} alt="Logo" width="500" className="img-fluid" /></h1>
					<div className="container">
						<div className="timer-p1 float-right">
							<img src={img_status} alt="S??? ki???n ??ang di???n ra" width="298" className="img-fluid" />
							<div className="table-responsive">
							<table className="table table-borderless text-white">
								<tr>
									<td className="cell-timer-p1 display-5 text-center">{day}</td>
									<td className="cell-timer-p1 display-5 text-center">{hour}</td>
									<td className="cell-timer-p1 display-5 text-center">{minute}</td>
									<td className="cell-timer-p1 display-5 text-center">{second}</td>
								</tr>
								<tr>
									<td align="center" className="p-0 h6">Ng??y</td>
									<td align="center" className="p-0 h6">Gi???</td>
									<td align="center" className="p-0 h6">Ph??t</td>
									<td align="center" className="p-0 h6">Gi??y</td>
								</tr>
							</table>
							
							</div>
						</div> 
					</div>
					<p className="btn-thamgiangay"><a href="#p2" title="Tham gia ngay"><img src={thamgiangay} alt="Tham gia ngay" width="200" className="img-fluid" /></a></p>
					<div className="position-absolute-p1">
						<ul className="nav flex-column menu-left-p1">
							<li className="pt-6"><a href="https://scoin.vn/nap-game" title="N???p Scoin" target="_blank">Active ViP</a></li>
							{/* <li className="pt-6"><a href="http://sandbox.scoin.vn/nap-vao-game?GameId=330287" title="N???p Scoin" target="_blank">N???p Game</a></li> */}
							<li className="pt-5b"><a href="#" title="Th??? l???" onClick={this.showModalRules}>Th??? l???</a></li>
							<li className="pt-5b"><a href="#" title="Ph???n th?????ng" onClick={this.showModalBonus}>Ph???n th?????ng</a></li>
							<li className="pt-5a"><a href="#bvd" title="Vinh danh">Vinh danh</a></li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div id="p2" className="container-fluid page2">
				<div className="container content-inner-p2">
					<h1 className="logo-p2"><img src={logo} alt="Logo" width="600" className="img-fluid" /></h1>
					<div className="vqmm">
							<canvas style={{}} id="canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">		
							</canvas>
							{/* <canvas style={{marginTop:-(height+15), padding:0}} id="new_canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">
								
							</canvas> */}
						{/* <img src={vqmm_p2} alt="V??ng quay may m???n" className="img-fluid"/>     */}
					</div>
					<div className="btn-logout">
						{(isLogin)?(<div><p className="p-0 m-0 text-center">Xin ch??o {user.Username}</p>
						<h5 className="text-center" onClick={this.logoutAction}><a style={{cursor:'pointer'}} title="????ng xu???t">????ng xu???t</a></h5></div>):(<h5 className="text-center" onClick={this.loginAction}><a style={{cursor:'pointer'}} title="????ng nh???p" >????ng nh???p</a></h5>)}
						
					</div>
					<div className="btn-quay">
						<h5 className="text-center">C??n: {turnsFree} l?????t &nbsp;<a className="small" href="#" title="Th??m l?????t" data-toggle="modal" data-target="#themluot"><u>Th??m l?????t</u></a></h5>
						<a style={{cursor:'pointer'}} onClick={this.btnStart}><img src={btn_quay_p2} alt="" className="img-fluid hv" /></a>
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck" name="autospin" />
							<label className="custom-control-label" for="customCheck" onClick={this.handleChange}>Ch???n quay t??? ?????ng</label>
						</div>
					</div>   
				</div>
				
				<div className="menu-right">
					<ul className="nav flex-column">
						<li className="pt-6"><a style={{color:"#fff", cursor:'pointer'}} title="T??? ?????" onClick={this.showModalTuDo}>T??? ?????</a>{notification_tudo}</li>
					</ul>
				</div>
			</div>
			{/* End p2 */}

			<div className="container jumbotron">
				{/* <div class="bg-ketquaquayso">
					<h2 class="d-block text-center text-white text-kqqs display-6 mb-0" style={{fontSize:'2vw'}}>KQ M?? d??? th?????ng</h2>
					<h4 class="text-center text-white" style={{fontSize:'1.5vw'}}>T??? ?????ng c???p nh???t sau 19:00 ng??y 01/11/2019</h4>
					<div class="row px-5">
						<div class="col-6 align-content-center text-center pl-3">
							<h2 class="text-center pt-4 color-kqqs" style={{fontSize:'2vw'}}>GI???I ?????C BI???T <br />iPhone 11 Pro Max</h2>
							<img src={iphone_11_pro_max} width="60%" class="img-fluid text-center" />
						</div>
						<div class="col-6 mstt">
							<h2 class="text-center color-kqqs" style={{fontSize:'2vw'}}>M?? s??? tr??ng th?????ng<br /> 
							<label class="form-control form-control form-control-sm bg-secondary" style={{height:50}} /></h2>
							
						</div>
					</div>
				</div> */}
				{/* <div class="bg-ketquaquayso">
					<h2 class="d-block text-center text-kqqs mb-0 bg-title-mdt">KQ M?? d??? th?????ng</h2>
					<h4 class="text-center text-white">T??? ?????ng c???p nh???t sau livestream l??c 19:00 ng??y 04/11/2019</h4>
					<div class="row px-5">
						<div class="col-md-6 align-content-center text-center pl-3">
							<h2 class="text-center pt-4 color-kqqs title-giaidacbiet">GI???I ?????C BI???T <br />iPhone 11 Pro Max</h2>
							<img src={iphone_11_pro_max} width="70%" class="img-fluid text-center bg-img-giaithuong" />
						</div>
						<div class="col-md-6 mstt">
						<h2 class="text-center color-kqqs title-giaidacbiet">M?? s??? tr??ng th?????ng<br /> <span class="badge badge-secondary p-3" style={{width: 120, height: 50, fontSize:24}}>2135</span><br />
						
						<button class="btn btn-dv" onClick={this.showPopupLiveStream}><h5 class="glow mb-0 small"><img src={spin} width="24" class="pr-1" alt=""/> Xem livestream </h5></button>
						</h2>
							
						</div>
					</div>
				</div> */}
				<h2 id="bvd" className="d-block btn-ketqua mt-5"><img src={icon_bangvinhdanh} alt="icon" />B???ng vinh danh</h2>
				<div className="table-responsive mt-4">
					<table className="table table-borderless tbl-bvd mx-auto text-center">
						<thead>
						<tr className="text-uppercase title-bvd">
							<th></th>
							<th>T??n</th>
							<th>Ph???n th?????ng</th>
							<th>Th???i gian tr??ng</th>
						</tr>
						</thead>
						<tbody className="top-12">
						<tr>
							<td></td>
							<td>sb_32375.5d***</td>
							<td>iPhone 11 Pro Max 256GB</td>
							<td>20:00:00 04-11-2019</td>
						</tr>
						</tbody>
					</table>
					<table className="table table-bordered tbl-bvd mx-auto text-center">            
						<tbody className="top100">
							{listVinhDanh.map((obj, key) => (
								<tr key={key}>
									<td className="border-right-0">{obj.Username}</td>
									<td className="border-left-0 border-right-0">{obj.AwardName}</td>
									<td className="border-left-0">{this.timeConverter(obj.SpinTime)}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="pagination justify-content-center pag-custom">
						<Pagination
							activePage={activeVinhDanh}
							itemsCountPerPage={10}
							totalItemsCount={countVinhDanh}
							pageRangeDisplayed={numberPage}
							lastPageText={'Trang cu???i'}
							firstPageText={'Trang ?????u'}
							itemClass={"page-item"}
							linkClass={"page-link"}
							onChange={(v) => this.handlePageChangeVinhDanh(v)}
						/>
					</div> 
				</div>
				<div className="w-100 justify-content-center text-center pt-5">
					<ul className="nav nav-pills nav-justified">
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://daily.scoin.vn/huong-dan-mua-the/" title="H?????ng d???n mua th??? scoin" target="_blank">H?????ng d???n mua th??? scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://www.facebook.com/scoinvtcmobile/" title="Nh???n th??ng b??o sk" target="_blank">Nh???n th??ng b??o sk</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://scoin.vn/nap-game" title="N???p scoin" target="_blank">N???p Game</a>
						{/* <a className="nav-link btn-dv text-uppercase text-nowrap" href="http://sandbox.scoin.vn/nap-vao-game?GameId=330287" title="N???p scoin" target="_blank">N???p Game</a> */}
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="tel:19001104" title="Hotline h??? tr???">HOT LINE: 19001104</a>
						</li>
					</ul>
				</div>
			</div>
			{/* {(isLive)?(<div className="button-bt">
				<button type="button" className="btn fixed-bottom btn-dv btn-block" onClick={this.showPopupLiveStream}><h5 className="glow mb-0"><img src={spin} width="24" className="pr-1" alt=""/> Xem livestream so M?? d??? th?????ng t???i ????y sau: {hour_live}gi???&nbsp;&nbsp;{minute_live}ph??t&nbsp;&nbsp;{second_live}gi??y </h5></button>
			</div>):(<div></div>)} */}
			


			<div className="container-fluid footer">
				<p className="text-center"><img src={logo_splay} width="100" alt="" /> <img src={logo_scoin} width="150" hspace="10" alt="" /></p>
				<p className="text-center"><span className="text-uppercase">C??NG TY C??? PH???N VTC D???CH V??? DI ?????NG</span> <br />VTC Mobile - Th??nh vi??n c???a T???ng C??ng ty Truy???n th??ng ??a ph????ng ti???n Vi???t Nam VTC <br /> T???ng 11, t??a nh?? VTC Online, s??? 18 Tam Trinh, ph?????ng Minh Khai, qu???n Hai B?? Tr??ng, H?? N???i.
<br />Tel: (84-4).39877470 <br />Fax: (84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
	</p>
			</div>

			{/* The Modal Ph???n th?????ng */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_phanthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body w-100">
						<img src={img_giaithuong} class="w-100" />
					</div>
					</div>
				</div>
			</div>

			{/* The Modal Th??? l??? */}
			<div className="modal fade" id="myModal1">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thele} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div class="modal-body">
						<h3 class="text-red">I. ?????i t?????ng tham gia</h3>
						<p class="text-thele pl-3"> &bull; To??n b??? kh??ch h??ng ???? active t??i kho???n kh??ch h??ng VIP. N???u ch??a active v?? ch??a l?? kh??ch h??ng VIP, Kh??ch h??ng vui l??ng th???c hi???n active v?? tr??? th??nh VIP <code><a href="https://vip.scoin.vn" title="????ng k??" target="_blank" class="text-primary">t???i ????y</a></code>. <br />
        &bull;  ??i???u ki???n ????? tham gia game VQMM l??: l?? kh??ch h??ng VIP; ???? active t??i kho???n VIP.</p>
						<h3 class="text-red">II. C??ch th???c tham gia s??? ki???n</h3>
						<p class="text-thele pt-3 pl-3"> &bull; B?????c 1:  Tr??? th??nh kh??ch h??ng VIP <br />
					&bull; B?????c 2: Nh???n l?????t quay mi???n ph?? h???ng ng??y, t????ng ???ng v???i c???p VIP</p>
							<div class="table-responsive">
								<table class="table table-bordered text-center text-thele">
									<thead>
									<tr>
										<th>STT</th>
										<th>C???p VIP</th>
										<th>S??? l?????t quay/ng??y</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>VIP ?????ng</td>
										<td>5</td>
									</tr>
									<tr>
										<td>2</td>
										<td>VIP B???c</td>
										<td>10</td>
									</tr>
									<tr>
										<td>3</td>
										<td>VIP V??ng</td>
										<td>15</td>
									</tr>
									<tr>
										<td>4</td>
										<td>VIP B???ch kim</td>
										<td>20</td>
									</tr>                  
									</tbody>
								</table>
							</div>
							<p class="text-thele pt-3 pl-3"> &bull; B?????c 3: Ch??i v??ng quay t???i link: <a href="https://vqmmvip.splay.vn" title="https://vqmmvip.splay.vn">https://vqmmvip.splay.vn</a>(C???n ????ng nh???p b???ng t??i kho???n Scoin ????? ch??i).</p>
						<h3 class="text-red">III. C??c gi???i th?????ng</h3>
						<p class="text-thele pl-3"> &bull; Iphone 12 Pro max 256Gb.<br></br>
							&bull; Th??? Scoin: s??? ???????c l??u tr??? trong T??? ????? s??? ki???n. Kh??ch h??ng c?? th??? xem v?? n???p v??o c??c game c???a VTC Mobile.<br></br>
							&bull; N???p tr???c ti???p 50k Scoin v??o t??i kho???n ng?????i ch??i.<br></br>
							&bull; Giftcode t??? c???p ????? 1 ?????n c???p ????? 6, s??? ???????c l??u tr??? trong T??? ????? s??? ki???n. Kh??ch h??ng c?? th??? xem v?? n???p v??o game t????ng ???ng.<br></br>
							&bull; H???p qu?? ?????c bi???t.
							</p>


						<h3 class="text-red">IV. Th???i gian trao th?????ng</h3>
							<p class="text-thele pl-3"> &bull; C??ng ty c??? ph???n VTC D???ch v??? di ?????ng s??? trao gi???i th?????ng cho kh??ch h??ng ch???m nh???t sau 15 ng??y l??m vi???c k??? t??? khi k???t th??c s??? ki???n.</p>
								<p class="text-thele pl-3"><code>L??u ??:</code>  <br />&bull; Khi ?????n nh???n gi???i th?????ng, kh??ch h??ng c???n ??em theo gi???y t??? t??y th??n (CMND/ CCCD/ H??? chi???u c??n hi???u l???c. 
								Theo kho???n 6, ??i???u 3, ch????ng 1 c???a Lu???t thu??? thu nh???p c?? nh??n, nh???ng ng?????i may m???n tr??ng gi???i th?????ng hi???n v???t c?? gi?? tr??? kinh t??? cao c?? ngh??a v??? n???p thu??? theo quy ?????nh c???a Nh?? n?????c. 
								Th??ng tin chi ti???t xem <code><a href="https://www.mof.gov.vn/webcenter/portal/mttpltc/r/m/pchtrphlu/pchtrthtu/pchtrthtu_chitiet?dDocName=BTC260955&dID=31536&_afrLoop=73261410332298795#!%40%40%3F_afrLoop%3D73261410332298795%26centerWidth%3D100%2525%26dDocName%3DBTC260955%26dID%3D31536%26leftWidth%3D0%2525%26rightWidth%3D0%2525%26showFooter%3Dfalse%26showHeader%3Dfalse%26_adf.ctrl-state%3D1a8d3rpn02_4" title="t???i ????y" target="_blank" class="text-primary">t???i ????y</a></code>.<br></br>
						&bull; Trong t???t c??? c??c tr?????ng h???p, quy???t ?????nh c???a C??ng ty c??? ph???n VTC D???ch v??? di ?????ng l?? quy???t ?????nh cu???i c??ng. M???i tr?????ng h???p gian l???n ho???c kh??ng trung th???c s??? b??? x??? l?? theo ph??p lu???t.


						</p>
						</div>

					</div>
				</div>
			</div>


			{/* The Modal T??? ????? */}
			<div className="modal fade" id="myModal2" style={{zIndex:10001}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_tudo} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<ul class="nav nav-pills nav-justified w-50 mx-auto">
							<li class="nav-item">
								<a class="nav-link active text-red" data-toggle="pill" href="#phanthuong" onClick={()=>this.getDataTuDo(user)}>Ph???n th?????ng</a>
							</li>
							<li class="nav-item">
								<a class="nav-link text-red" data-toggle="pill" href="#lichsu" onClick={()=>this.getHistory(user)}>L???ch s???</a>
							</li>
						</ul>
						<div class="tab-content">        
							<div class="tab-pane container active" id="phanthuong">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Ph???n th?????ng</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">N???i dung</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Th???i gian tr??ng</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listTuDo.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{obj.AwardName}</td>
													<td className="border-left-0 border-right-0">{obj.AwardSpecific}</td>
													<td className="border-left-0">{this.timeConverter(obj.SpinTime)}</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
										<Pagination
											activePage={activeTuDo}
											itemsCountPerPage={limit}
											totalItemsCount={countTuDo}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cu???i'}
											firstPageText={'Trang ?????u'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeTuDo(v)}
										/>
									</div> 
								</div>
							</div>
							<div class="tab-pane container fade" id="lichsu">
								<div class="table-responsive mt-2">
									<table class="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
										<thead>
										<tr class="text-uppercase lead">
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">STT</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">K???t Qu???</th>
											<th class="border-bottom-0 border-left-0 border-right-0 border-top-0">Th???i Gian</th>
										</tr>
										</thead>            
										<tbody class="popup-tudo">
											{listHistory.map((obj, key) => (
												<tr key={key}>
													<td className="border-right-0">{key}</td>
													<td className="border-left-0 border-right-0">{obj.AwardName}</td>
													<td className="border-left-0">{this.timeConverter(obj.SpinTime)}</td>
												</tr>
											))}
										</tbody>
									</table>
									<div className="pagination justify-content-center pag-custom">
										<Pagination
											activePage={activeHistory}
											itemsCountPerPage={limit}
											totalItemsCount={countHistory}
											pageRangeDisplayed={numberPage}
											lastPageText={'Trang cu???i'}
											firstPageText={'Trang ?????u'}
											itemClass={"page-item"}
											linkClass={"page-link"}
											onChange={(v) => this.handlePageChangeHistory(v)}
										/>
									</div> 
								</div>
							</div>
							
						</div>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal M?? d??? th?????ng */}
			<div className="modal fade" id="myModal3" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_maduthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">T??m ki???m</span>
								</div>
								<input type="text" className="form-control" placeholder="Nh???p m?? d??? th?????ng" onChange={e => this.findCode(e)}/>
							</div>
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">M??</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">N???i dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Th???i gian tr??ng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								{listCodeBonus.map((obj, key) => (
									<tr key={key}>
										<td className="border-right-0">{obj.description}</td>
										<td className="border-left-0 border-right-0">{obj.itemName}</td>
										<td className="border-left-0">{obj.date}</td>
									</tr>
								))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeCodeBonus}
									itemsCountPerPage={5}
									totalItemsCount={countCodeBonus}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cu???i'}
									firstPageText={'Trang ?????u'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeCodeBonus(v)}
								/>
							</div> 
							<p className="text-thele">L??u ??: T??i kho???n Scoin c???a qu?? kh??ch c???n ph???i x??c th???c s??? ??T ????? nh???n th??ng b??o trong tr?????ng h???p tr??ng gi???i. <code><a style={{fontSize:18}} href=" https://scoin.vn/doi-sdt" title="X??c th???c ngay" target="_blank">X??c th???c ngay</a></code> </p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Th??ng b??o ch??c m???ng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									{(code)?(
									<div>
										<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">B???n v???a quay v??o ??</span>
											<span className="pt-1 d-block">M?? s??? d??? th?????ng iPhone 11 Pro Max 256GB ???? ???????c l??u trong M?? d??? th?????ng.</span>
											{/* <span className="pt-1 d-block">B???n v???a nh???n ???????c M?? s??? d??? th?????ng gi???i hi???n v???t <span style={{fontWeight:'bold'}}>iPhone 11 Pro Max 256GB</span></span> */}
										</div>
										{/* <p style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{itemBonus.value}</p> */}
									
										<p className="small pt-2 mb-2 text-center">So KQ M?? s??? d??? th?????ng v??o l??c 19:00 ng??y 04/11/2019.<br /><label title="Xem ph???n th?????ng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalCodeBonus}>Xem ph???n th?????ng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>X??c nh???n</button>
									</div>
									):(
									<div>
										{(scoinCard)?(<div><div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>B???n v???a quay v??o ?? <span style={{color:'red'}}>th??? Scoin {itemBonus.value}VND</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Ph???n th?????ng ???? ???????c chuy???n v??o T??? ????? s??? ki???n) <br /><label title="Xem ph???n th?????ng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem ph???n th?????ng</label></p></div>):(
											<div>
											<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span>B???n v???a nh???n ???????c <span style={{color:'red'}}>{itemBonus.value} Scoin</span></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Ph???n th?????ng ???? ???????c c???ng v??o v?? Scoin)</p>
										</div>
										)}
									
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>X??c nh???n</button>
									</div>
									)}	
									


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Th??ng b??o ????ng nh???p--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Xin vui l??ng ????ng nh???p!</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>????ng nh???p</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Th??ng b??o h???t l?????t--> */}
			<div className="modal fade" id="myModal6" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">B???n ???? h???t l?????t quay ng??y h??m nay!</h5>
							{/* <p className="text-thele lead text-center">H??y n???p Scoin ????? nh???n th??m l?????t ch??i V??ng quay th??ng 10.</p> */}
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>N???p Game</button> */}
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}>N???p Game</button> */}
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
							{(xacthuc)?(<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.xacThuc('https://scoin.vn/cap-nhat-sdt')}>X??c Th???c</button>):(<div></div>)}
							
						</div>       
					</div>

					</div>
				</div>
			</div>


			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button className="close" onClick={this.closePopupAuto}><img src={btn_close} alt="????ng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">K???t qu??? quay t??? ?????ng</h3>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{key+1}. {obj}</li>
								))}
							</ol> 
							
							<p className="text-thele">V??o <code><label onClick={this.showModalTuDo}>T??? ?????</label></code> ho???c <code><label onClick={this.showModalCodeBonus}>M?? d??? th?????ng</label></code> ????? xem chi ti???t.</p>
							<p className="text-thele text-center"><code>??ang quay t??? ?????ng <span className="spinner-grow spinner-grow-sm"></span></code></p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal10">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
					</div>
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h5 class="text-center">B???n s??? nh???n ???????c l?????t ch??i mi???n ph?? khi n???p th??? Scoin v??o game c???a VTC Mobile.</h5>
							<table className="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
									<tr>
										<th colspan="4">N???p th??? Scoin v??o game</th>                    
									</tr>
									<tr>
										<th>STT</th>
										<th>M???nh gi?? th??? Scoin (VN??)</th>
										<th>S??? l?????t quay chu???n</th>
										<th>S??? l?????t quay (???? c???ng)</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>50.000</td>
										<td>1</td>
										<td></td>
									</tr>
									<tr>
										<td>2</td>
										<td>100.000</td>
										<td>2</td>
										<td></td>
									</tr>
									<tr>
										<td>3</td>
										<td>200.000</td>
										<td>4</td>
										<td></td>
									</tr>
									<tr>
										<td>4</td>
										<td>300.000</td>
										<td>6</td>
										<td></td>
									</tr>
									<tr>
										<td>5</td>
										<td>500.000</td>
										<td>10</td>
										<td></td>
									</tr>
									<tr>
										<td>6</td>
										<td>1.000.000</td>
										<td>22</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>7</td>
										<td>2.000.000</td>
										<td>44</td>
										<td>10%</td>
									</tr>
									<tr>
										<td>8</td>
										<td>5.000.000</td>
										<td>120</td>
										<td>20%</td>
									</tr>
								</tbody>
							</table> 
							<div class="btn-logout position-relative w-25 mx-auto text-center left-0 top-0">
								<h5 class="text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}><a>N???p</a></h5>
								{/* <h5 class="text-center" onClick={()=>this.openTabNapScoin('http://sandbox.scoin.vn/nap-vao-game?GameId=330287')}><a>N???p</a></h5> */}
							</div>             
							{/* <button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={()=>this.openTabNapScoin('https://scoin.vn/nap-game')}>N???p</button> */}
						</div>
						
					</div>

					</div>
				</div>
				</div>

				<div className="modal fade" id="myModal11">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="matluot">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
								<h5 className="text-thele lead text-center">Th???i gian c??n l???i: {minute_live} : {second_live}</h5>

							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal12">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">Th??ng b??o b???o tr??!</h5>
								<h5 className="text-thele lead text-center">H??? th???ng ??ang ???????c n??ng c???p ????? t???i ??u. Vui l??ng quay l???i sau 10 ph??t.</h5>
								<h5 className="text-thele lead text-center">Xin l???i v?? s??? b???t ti???n n??y</h5>
								<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closeServerErr}>X??c nh???n</button>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal14">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_livestream} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

						<div className="modal-body">
								<div className="facebook-responsive">
									<iframe src={linkLiveStream} width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
								</div>     
						</div>

						</div>
					</div>
				</div>

				{/* <!-- The Modal Th??m l?????t quay--> */}
				<div class="modal fade" id="themluot">
					<div class="modal-dialog">
						<div class="modal-content popup-phanthuong">
						<div class="modal-header border-bottom-0">
							<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
						</div>

						<div class="modal-body">
							<div class="table-responsive mt-2">
								<h5 class="text-center">B???n s??? nh???n ???????c l?????t ch??i mi???n ph?? h???ng ng??y khi l?? kh??ch h??ng VIP c???a VTC Mobile.</h5>
								<table class="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
									<thead>
									<tr>
										<th>STT</th>
										<th>C???p VIP</th>
										<th>S??? l?????t quay/ng??y</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>1</td>
										<td>VIP ?????ng</td>
										<td>5</td>
									</tr>
									<tr>
										<td>2</td>
										<td>VIP B???c</td>
										<td>10</td>
									</tr>
									<tr>
										<td>3</td>
										<td>VIP V??ng</td>
										<td>15</td>
									</tr>
									<tr>
										<td>4</td>
										<td>VIP B???ch kim</td>
										<td>20</td>
									</tr>                  
									</tbody>
								</table>
							</div>
							
						</div>

						</div>
					</div>
				</div>

				{/* <!-- The Modal Th??ng b??o Active tk VIP--> */}
				<div class="modal fade" id="activeVip">
					<div class="modal-dialog">
						<div class="modal-content popup-phanthuong">
							<div class="modal-header border-bottom-0">
								<h4 class="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
								<button type="button" class="close" data-dismiss="modal"><img src={btn_close} alt="????ng" /></button>
							</div>
							<div class="modal-body">
								<div class="table-responsive mt-2">              
									<h5 class="text-thele lead text-center">B???n c???n active t??i kho???n VIP ????? ch??i.</h5>
									<a href="https://vip.scoin.vn" type="button" target="_blank" class="btn btn-xacnhan text-white btn-block text-center py-4">Trang ch??? VIP</a>
								</div>       
							</div>

						</div>
					</div>
				</div>
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataLuckyInfo: state.lucky.dataLuckyInfo,
	dataLuckyItems:state.lucky.dataLuckyItems,
	dataInfoUser:state.lucky.dataInfoUser,
	dataUserSpin:state.lucky.dataUserSpin,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataHistoryTuDo: state.lucky.dataHistoryTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	getInfoUser,
	buyTurn,
	getHistoryTuDo,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
	getLuckyInfo,
	getLuckyItems,
	userLogout,
	getDataUserSpin
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)