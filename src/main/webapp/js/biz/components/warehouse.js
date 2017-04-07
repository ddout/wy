/**
 * 仓库
 */
Vue.component('comp-warehouse', {
	data: function(){
		return {
			search:{
				name:'',
				//
				start:1,
				limit:10,
				rowsCount:0,
				datas:[]
			},
			Warehouse:{
				//仓库
				id:'',
				name:'',
				enterid:'',
				entername:'',
				address:'',
				heads:'',
				heads_phone:'',
				note:'',
				errorMsg:''
			}
		};
	},
	mounted:function () {
		this.loadData();
	},
	methods: {
		clear:function(){
			this.Warehouse = {
					id:'',
					name:'',
					enterid:'',
					entername:'',
					address:'',
					heads:'',
					heads_phone:'',
					note:'',
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
					start:this.search.start,
					limit:this.search.limit
			};
			this.$parent.post({
				url : 'Warehouse/list.do',
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
				url : 'Warehouse/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		updateData:function(_id){
			var _this = this;
			_this.clear();
			_this.Warehouse.id=_id;
			this.$parent.post({
				url : 'Warehouse/getById.do',
				data : {"id":_id},
				success:function(res){
					$.extend(_this.Warehouse, res);
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
			if(this.Warehouse.id != ''){
				url = 'Warehouse/update.do';
			} else {
				url = 'Warehouse/add.do';
			}
			var data = {
				id:_this.Warehouse.id,
				name:_this.Warehouse.name,
				enterid:_this.Warehouse.enterid,
				address:_this.Warehouse.address,
				heads:_this.Warehouse.heads,
				heads_phone:_this.Warehouse.heads_phone,
				note:_this.Warehouse.note
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
					_this.Warehouse.errorMsg = res;
				}
			});
		},
		showParentTree:function(){
			var _this = this;
			var setting = {
				check: {
					enable: false
				},
				data: {  
	                simpleData: {  
	                    enable: true,
	                    idKey: "id",
	        			pIdKey: "pid"
	                }
	            },
	            callback: {
	            	beforeClick: function zTreeOnClick(treeId, treeNode) {
	            		_this.Warehouse.enterid=treeNode.id;
	            		_this.Warehouse.entername=treeNode.name;
	            		$('#tree-modal').modal('hide');
					}
				}
			};
			this.$parent.post({
				url : 'enter/list.do',
				data : {start:1,limit:999999},
				success:function(res){
					var zNodes = res['data'];
					$('#tree-modal').modal('show');
					$.fn.zTree.init($("#treeDataPanel"), setting, zNodes).expandAll(true);
				}
			});
		}
	},
	template:'\
		<div>\
		  <h4>仓库信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>名称</label>\
				    	<input type="text" class="form-control" placeholder="仓库名称" v-model="search.name">\
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
							<th class="text-center">所属单位</th>\
							<th class="text-center">名称</th>\
							<th class="text-center">地址</th>\
							<th class="text-center">负责人</th>\
							<th class="text-center">负责人电话</th>\
							<th class="text-center">备注</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.entername}}</td>\
							<td class="text-left">{{item.name}}</td>\
							<td class="text-left">{{item.address}}</td>\
							<td class="text-left">{{item.heads}}</td>\
							<td class="text-left">{{item.heads_phone}}</td>\
							<td class="text-left">{{item.note}}</td>\
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
			        <h4 class="modal-title">仓库详情</h4>\
			      </div>\
			      <div class="modal-body">\
		      			<div class="form-group">\
		      				<label>所属单位</label>\
						    <input type="hidden" v-model="Warehouse.enterid" readonly="readonly"/>\
							<input class="form-control" placeholder="所属单位" v-model="Warehouse.entername" v-on:click="showParentTree" readonly="readonly"/>\
						</div>\
						<div class="form-group">\
							<label>名称</label>\
						    <input class="form-control" placeholder="名称" v-model="Warehouse.name"/>\
						</div>\
						<div class="form-group">\
							<label>地址</label>\
						    <input class="form-control" placeholder="地址" v-model="Warehouse.address"/>\
						</div>\
						<div class="form-group">\
							<label>负责人</label>\
						    <input class="form-control" placeholder="负责人" v-model="Warehouse.heads"/>\
						</div>\
						<div class="form-group">\
							<label>负责人电话</label>\
						    <input class="form-control" placeholder="负责人电话" v-model="Warehouse.heads_phone"/>\
						</div>\
						<div class="form-group">\
					     	<label>备注</label>\
					    	<input class="form-control" placeholder="备注" v-model="Warehouse.note"/>\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;">{{Warehouse.errorMsg}}</span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
			        <button type="submit" class="btn btn-primary">保存</button>\
					<input type="hidden" v-model="Warehouse.id"/>\
			      </div>\
			    </div>\
			  </div>\
			</form>\
			</div>\
			\
			<div aria-hidden="true" id="tree-modal" class="modal fade" tabIndex="-1" role="dialog">\
				<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-header bg-primary">\
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\
							<h5 class="modal-title">\
			                    <i class="icon-pencil"></i>\
			                    <span id="lblAddTitle" style="font-weight:bold">选择数据</span>\
			                </h5>\
						</div>\
						<div class="modal-body">\
							<div class="row">\
								<div class="col-md-12">\
			                       	<div id="treeDataPanel" class="ztree" style="overflow-y:scroll;min-height: 400px;max-height: 600px">\
			            			</div>\
								</div>\
							</div>\
						</div>\
						<div class="modal-footer">\
							<button type="button" class="btn default" data-dismiss="modal">关闭</button>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>'

});
