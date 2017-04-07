/**
 * 入库详情
 */
Vue.component('comp-BussStorage-view', {
	data: function(){
		return {
			View:{
				type:this.$route.params.type,
				id:this.$route.params.id
			},
			BussStorage:{
				id:'',
				createtime:'',
				houseid:'',
				housename:'',
				modify_time:'',
				note:'',
				modify_userid:'',
				modify_username:'',
				items:[],
				errorMsg:''
			}
		};
	},
	mounted:function () {
		this.loadData();
	},
	methods: {
		clear:function(){
			this.BussStorage = {
				id:'',
				createtime:'',
				houseid:'',
				housename:'',
				modify_time:'',
				note:'',
				modify_userid:'',
				modify_username:'',
				items:[],
				errorMsg:''
			}
		},
		back:function(){
			this.$router.go(-1);
		},
		loadData:function(){
			this.clear();
			var _this = this;
			if(_this.View.type == 'update'){
				
			} else if(_this.View.type == 'view'){
				
			} else if(_this.View.type == 'add'){
				
			} else {
				return;
			}
			if(_this.View.id != '' && _this.View.id > 0){
				this.$parent.post({
					url : 'Buss/Storage/getById.do',
					data : { id : _this.View.id },
					success:function(res){
						console.log(res)
						$.extend(_this.BussStorage, res);
						console.log(_this.BussStorage.id)
						if(_this.BussStorage.id == '' || _this.BussStorage.id <= 0){
							_this.BussStorage.errorMsg='未能获取到数据';
						}
					},
					error:function(res){
						_this.BussStorage.errorMsg=res;
					}
				});
			}
		},
		showWareHouse:function(){
			var _this = this;
			if(_this.View.type == 'view'){
				return;
			}
			console.log('showWareHouse');
			//warehouse-modal
		}
	},
	template:'\
		<div>\
			<div class="col-md-12" style="margin:30px 0 30px 0;">\
				<div class="btn-group" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-default" v-on:click="back">返回</a>\
					<a type="button" class="btn btn-default" v-if="View.type!=\'view\'">保存</a>\
				</div>\
			</div>\
			<div class="col-md-12">\
					<div class="form-group">\
				    	<label>仓库</label>\
						<input class="form-control" placeholder="仓库" v-model="BussStorage.housename" v-on:click="showWareHouse" readonly="readonly"/>\
				  	</div>\
					<div class="form-group">\
				    	<label>入库时间</label>\
				    	<input type="text" class="form-control" placeholder="入库时间" v-model="BussStorage.modify_time" onFocus="WdatePicker()" readonly="readonly">\
				  	</div>\
				  	<div class="form-group">\
				    	<label>操作人</label>\
				    	<input type="text" class="form-control" placeholder="操作人" v-model="BussStorage.modify_username" v-bind:readonly="View.type==\'view\'">\
				  	</div>\
			</div>\
			<div class="col-md-12">\
		    	<label>备注</label>\
		    	<textarea class="form-control" rows="2" v-model="BussStorage.note" v-bind:readonly="View.type==\'view\'"></textarea>\
			</div>\
			<div class="col-md-12 data-panel">\
				<div class="btn-group btn-group-sm" role="group" aria-label="..." v-if="View.type!=\'view\'">\
			  		<a type="button" class="btn btn-success" >新增物料</a>\
				</div>\
				<table class="table table-bordered">\
					<tbody>\
						<tr>\
							<th class="text-center">&nbsp;</th>\
							<th class="text-center">供应商</th>\
							<th class="text-center">生产厂家</th>\
							<th class="text-center">品名</th>\
							<th class="text-center">规格</th>\
							<th class="text-center">件数</th>\
							<th class="text-center">支数</th>\
							<th class="text-center">实际重量</th>\
							<th class="text-center">单价</th>\
							<th class="text-center">金额</th>\
							<th class="text-center">备注</th>\
						</tr>\
						<tr>\
							<td class="text-center">\
						  		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
							</td>\
							<td class="text-left">1</td>\
							<td class="text-left">2</td>\
							<td class="text-left">3</td>\
							<td class="text-left">4</td>\
							<td class="text-right">5</td>\
							<td class="text-right">6</td>\
							<td class="text-right">7</td>\
							<td class="text-right">8</td>\
							<td class="text-right">9</td>\
							<td class="text-right">0</td>\
						</tr>\
					</tbody>\
				</table>\
		  </div>\
			\
			<div aria-hidden="true" id="warehouse-modal" class="modal fade" tabIndex="-1" role="dialog">\
				<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-header bg-primary">\
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\
							<h5 class="modal-title">\
			                    <i class="icon-pencil"></i>\
			                    <span style="font-weight:bold">选择仓库</span>\
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
			\
	</div>'

});
