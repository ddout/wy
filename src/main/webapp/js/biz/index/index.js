const app = new Vue({
		el : '#app-main',
		router: router,
		data : {
			sysMsg:'',
			sysLoading:false,
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
			//
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
	



