/**
 * 
 */
Vue.component('comp-nav', {
	data: function(){
		return {
			userInfo : {
				user : '',
				pwd : '',
				imgcode : '',
				auth : false,
				authMsg : ''
			}
		};
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
			_this.$parent.post({
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
	},
	template:'\
		<div>\
			<nav class="navbar-static-top navbar-default navbar-fixed-top" role="navigation">\
				<div class="container-fluid">\
					<div class="navbar-header">\
						<router-link to="/" class="navbar-brand">\
				        	<img alt="logo" src="images/logo.png">\
				        </router-link>\
				    </div>\
				    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\
						<ul class="nav navbar-nav">\
							<li class="nomargin">\
								<router-link to="/BussStorage">入库</router-link>\
							</li>\
							<li class="nomargin">\
								<router-link to="/BussIssue">出库</router-link>\
							</li>\
							<li class="dropdown">\
					          <a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">系统设置 <span class="caret"></span></a>\
					          <ul class="dropdown-menu">\
					            <li><router-link to="/enter">单位管理</router-link></li>\
					            <li><router-link to="/warehouse">仓库管理</router-link></li>\
					            <li role="separator" class="divider"></li>\
					            <li><router-link to="/supplier">供应商</router-link></li>\
					            <li><router-link to="/purchase">购货单位</router-link></li>\
								<li role="separator" class="divider"></li>\
					            <li><router-link to="/manu">物料生产厂家</router-link></li>\
					            <li><router-link to="/item">物料</router-link></li>\
					          </ul>\
					        </li>\
						</ul>\
						<ul class="nav navbar-nav navbar-right">\
					        <li>\
					        	<a v-on:click="authUserShow" v-if="userInfo.auth==false">登录</a>\
					        	<a v-if="userInfo.auth==true">{{userInfo.user}}</a>\
					        </li>\
				        </ul>\
					</div>\
				</div>\
			</nav>\
			<div class="modal fade" tabindex="-1" role="dialog" id="auth-Modal">\
			  <div class="modal-dialog" role="document">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
			        <h4 class="modal-title">Auth</h4>\
			      </div>\
			      <div class="modal-body">\
		      			<div class="form-group">\
		      				<label for="userInfo-user">Name</label>\
						    <input class="form-control" id="userInfo-user" v-model="userInfo.user" placeholder="your Username"/>\
						</div>\
						<div class="form-group">\
							<label for="userInfo-pwd">Password</label>\
						    <input type="password" class="form-control" id="userInfo-pwd" v-model="userInfo.pwd" placeholder="your Password"/>\
						</div>\
						<div class="form-group">\
					     	<label for="userInfo-imgcode">Imgcode</label>\
					    	<input class="form-control" id="userInfo-imgcode" v-model="userInfo.imgcode" placeholder="your Img Code"/>\
					    	<img src="randCodeImage" v-on:click="flushImgcode">\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;">{{userInfo.authMsg}}</span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
			        <button type="button" class="btn btn-primary" v-on:click="authUser">Auth DO</button>\
			      </div>\
			    </div>\
			  </div>\
			</div>\
		</div>'

});
