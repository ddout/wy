var app = new Vue({
		el : '#app-main',
		data : {
			errorMsg:'',
			userInfo : {
				user : '',
				pwd : '',
				imgcode : '',
				auth : false,
				authMsg : ''
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
				$(event.target).button('loading');
				var data = {
						user:_this.userInfo.user,
						pwd:_this.userInfo.pwd,
						randCode:_this.userInfo.imgcode
				};
				$.ajax({
					url : 'access/login.do',
					data : data,
					dataType:'json',
					type:'post',
					success:function(res){
						$(event.target).button('reset');
						if(res['result'] == 'SUCCESS'){
							_this.userInfo.auth = true;
							_this.userInfo.pwd = '';
							$('#auth-Modal').modal('hide');
						} else {
							_this.userInfo.auth = false;
							_this.userInfo.authMsg = res['msg'];
						}
					},
					error:function(res){
						_this.errorMsg = res;
						_this.userInfo.auth = false;
					}
				});
			}
		}
	});

