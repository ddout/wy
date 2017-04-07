/**
 * 物料
 */
Vue.component('comp-item', {
	data: function(){
		return {
			search:{
				name:'',
				manuid:'',
				model:'',
				//
				start:1,
				limit:10,
				rowsCount:0,
				datas:[]
			},
			Item:{
				//物料
				id:'',
				name:'',
				manuid:'',
				model:'',
				errorMsg:''
			}
		};
	},
	mounted:function () {
		this.loadData();
	},
	methods: {
		clear:function(){
			this.Item = {
					id:'',
					name:'',
					manuid:'',
					model:'',
					errorMsg:''
			};
		},
		next:function(){
			this.search.start = this.search.start+1;
			this.loadData();
		},
		prev:function(){
			this.search.start = this.search.start-1;
			this.loadData();
		},
		loadData:function(){
			var _this = this;
			var data = {
					name:this.search.name,
					manuid:this.search.manuid,
					model:this.search.model,
					start:this.search.start,
					limit:this.search.limit
			};
			this.$parent.post({
				url : 'Item/list.do',
				data : data,
				success:function(res){
					_this.search.rowsCount = res['rowsCount'];
					_this.search.datas = res['data'];
				}
			});
		},
		delData:function(_id){
			var _this = this;
			this.$parent.post({
				url : 'Item/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		updateData:function(_id){
			var _this = this;
			_this.clear();
			_this.Item.id=_id;
			this.$parent.post({
				url : 'Item/getById.do',
				data : {"id":_id},
				success:function(res){
					$.extend(_this.Item, res);
					$('#data-Modal').modal('show');
				}
			});
			
		},
		addData:function(){
			var _this = this;
			_this.clear();
			$('#data-Modal').modal('show');
		},
		dataModalSubmit:function(event){
			var _this = this;
			var url = '';
			if(this.Item.id != ''){
				url = 'Item/update.do';
			} else {
				url = 'Item/add.do';
			}
			var data = {
				id:_this.Item.id,
				name:_this.Item.name,
				model:_this.Item.model,
				manuid:_this.Item.manuid
			};
			this.$parent.post({
				url : url,
				data : data,
				success:function(res){
					_this.loadData();
					_this.clear();
					$('#data-Modal').modal('hide');
				},
				error:function(res){
					_this.Item.errorMsg = res;
				}
			});
		}
	},
	template:'\
		<div>\
		  <h4>物料信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>生产厂家</label>\
				    	<input type="text" class="form-control" placeholder="生产厂家" v-model="search.manuid">\
				  	</div>\
					<div class="form-group">\
				    	<label>名称</label>\
				    	<input type="text" class="form-control" placeholder="名称" v-model="search.name">\
				  	</div>\
					<div class="form-group">\
				    	<label>型号</label>\
				    	<input type="text" class="form-control" placeholder="型号" v-model="search.model">\
				  	</div>\
				    <button type="submit" class="btn btn-primary btn-sm">搜索</button>\
				</form>\
			</div>\
			<div class="col-md-12 data-panel">\
				<div class="btn-group btn-group-sm" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-success" v-on:click="addData">新增</a>\
				</div>\
				<table class="table table-bordered">\
					<tbody>\
						<tr>\
							<th class="text-center">生产厂家</th>\
							<th class="text-center">名称</th>\
							<th class="text-center">型号</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.manuid}}</td>\
							<td class="text-left">{{item.name}}</td>\
							<td class="text-left">{{item.model}}</td>\
							<td class="text-left">\
								<div class="btn-group btn-group-sm" role="group" aria-label="...">\
							  		<a type="button" class="btn btn-success" v-on:click="updateData(item.id)">修改</a>\
							  		<a type="button" class="btn btn-success" v-on:click="delData(item.id)">删除</a>\
								</div>\
							</td>\
						</tr>\
					</tbody>\
				</table>\
				<comp-dd-pagination v-on:next="next" v-on:prev="prev" v-bind:parmas="search"></comp-dd-pagination>\
		  </div>\
		  <div class="modal fade" tabindex="-1" role="dialog" id="data-Modal">\
			<form v-on:submit.prevent="dataModalSubmit" method="post">\
			  <div class="modal-dialog" role="document">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
			        <h4 class="modal-title">物料详情</h4>\
			      </div>\
			      <div class="modal-body">\
						<div class="form-group">\
							<label>生产厂家</label>\
						    <input class="form-control" placeholder="生产厂家" v-model="Item.manuid"/>\
						</div>\
						<div class="form-group">\
							<label>名称</label>\
						    <input class="form-control" placeholder="名称" v-model="Item.name"/>\
						</div>\
						<div class="form-group">\
					     	<label>型号</label>\
					    	<input class="form-control" placeholder="型号" v-model="Item.model"/>\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;">{{Item.errorMsg}}</span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
			        <button type="submit" class="btn btn-primary">保存</button>\
					<input type="hidden" v-model="Item.id"/>\
			      </div>\
			    </div>\
			  </div>\
			</form>\
			</div>\
		</div>'

});
