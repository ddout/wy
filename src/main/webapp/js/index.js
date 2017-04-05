var app = new Vue({
		el : '#app-main',
		data : {
			sysMsg:'',
			userInfo : {
				user : '',
				pwd : '',
				imgcode : '',
				auth : false,
				authMsg : ''
			},
			Enter:{
				//单位
				id:'',
				name:'',
				orderby:'',
				pid:'',
				note:'',
				objs:[]
			},
			Warehouse:{
				//仓库
				id:'',
				name:'',
				enterid:'',
				address:'',
				heads:'',
				heads_phone:'',
				note:'',
				objs:[]
			},
			Supplier:{
				//供应商
				id:'',
				name:'',
				note:'',
				objs:[]
			},
			Purchase:{
				//购货单位
				id:'',
				name:'',
				note:'',
				objs:[]
			},
			Manu:{
				//物料生产厂家
				id:'',
				name:'',
				note:'',
				objs:[]
			},
			Item:{
				//物料
				id:'',
				name:'',
				manuid:'',
				model:'',
				objs:[]
			}
		},
		methods : {
			authUserShow : function() {
				$('#auth-Modal').modal('show');
				this.userInfo.authMsg = '';
			},
			flushImgcode :function(event){
				$(event.target).attr('src','randCodeImage?t='+new Date().getTime());
			},
			authUser:function(event){
				var _this = this;
				var data = {
						user:_this.userInfo.user,
						pwd:_this.userInfo.pwd,
						randCode:_this.userInfo.imgcode
				};
				this.post({
					url : 'access/login.do',
					data : data,
					lock:function(){
						$(event.target).button('loading');
					},
					unlock:function(){
						$(event.target).button('reset');
					},
					success:function(res){
						_this.userInfo.auth = true;
						_this.userInfo.pwd = '';
						$('#auth-Modal').modal('hide');
					},
					error:function(res){
						_this.userInfo.authMsg = res;
					}
				});
			},
			post:function(cfg){
				var _this = this;
				var config = {
						url : cfg['url'],
						data : cfg['data'],
						dataType : 'json',
						type : 'post',
						success:function(res){
							if('function' === (typeof cfg.unlock)){
								cfg.unlock.call(this);
							} else {
								_this.sysMsg = '';
							}
							if(res['result'] == 'SUCCESS'){
								if('function' === (typeof cfg.success)){
									cfg.success.call(this, res['rows']);
								}
							} else {
								if('function' === (typeof cfg.error)){
									cfg.error.call(this, res['msg']);
								} else {
									_this.sysMsg = res['msg'];
								}
							}
						},
						error:function(res){
							if('function' === (typeof cfg.unlock)){
								cfg.unlock.call(this);
							} else {
								_this.sysMsg = '';
							}
							if('function' === (typeof cfg.error)){
								cfg.call(this, res);
							} else {
								_this.sysMsg = res;
							}
						}
					};
				if('function' === (typeof cfg.lock)){
					cfg.lock.call(this);
				} else {
					_this.sysMsg = 'loading.......';
				}
				$.ajax(config);
			}
		}
	});

