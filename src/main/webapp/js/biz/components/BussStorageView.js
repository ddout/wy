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
			item:{
				id:'',
				itemname:'',
				model:'',
				manuname:'',
				supplierid:'',
				suppliername:'',
				item_num:0,
				item_num2:0,
				item_weight:0,
				item_dj:0,
				item_je:0,
				item_note:'-'
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
		if(this.View.type == 'update' || this.View.type == 'add'){
			var _this = this;
			$('.form_date').datetimepicker({
		        language:  'zh-CN',
		        weekStart: 1,
		        todayBtn:  1,
		        autoclose: 1,
		        todayHighlight: 1,
		        startView: 2,
		        minView: 2,
		        forceParse: 0,
		        format: 'yyyy-mm-dd'
		    }).on('changeDate', function(ev){
		    	var field = ev.target.getAttribute('data-link-field');
		    	var dateStr = '';
		    	if(ev.date){
		    		dateStr = ev.date.getFullYear() + '-' + (ev.date.getMonth() < 9 ? '0' + (ev.date.getMonth()+1) : ev.date.getMonth()+1) + '-' + (ev.date.getDate() < 10 ? '0' + ev.date.getDate() : ev.date.getDate());
		    	}
		    	if(field == 'BussStorage_modify_time'){
		    		_this.BussStorage.modify_time = dateStr;
		    	}
		    });
		} 
		if(this.View.type == 'add'){
			var date = new Date();
			var dateStr = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
			_this.BussStorage.modify_time = dateStr;
		}
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
						$.extend(_this.BussStorage, res);
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
			//warehouse-modal
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
	            		if(treeNode.ttype == '0'){
	            			_this.BussStorage.houseid=treeNode.sid;
	            			_this.BussStorage.housename=treeNode.name;
	            			$('#warehouse-modal').modal('hide');
	            		}
					}
				}
			};
			this.$parent.post({
				url : 'Warehouse/getTreeData.do',
				success:function(res){
					var zNodes = res;
					$('#warehouse-modal').modal('show');
					$.fn.zTree.init($("#treeDataPanel"), setting, zNodes).expandAll(true);
				}
			});
		},
		showItemTree:function(){
			var _this = this;
			if(_this.View.type == 'view'){
				return;
			}
			//Item-modal
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
	            		if(treeNode.ttype == '0'){
	            			_this.item.id=treeNode.sid;
	            			_this.item.itemname=treeNode.itemname;
	            			_this.item.model=treeNode.model;
	            			if(treeNode.getParentNode()){
	            				_this.item.manuname=treeNode.getParentNode().name;
	            			}else {
	            				_this.item.manuname='';
	            			}
	            		}
					}
				}
			};
			this.$parent.post({
				url : 'Item/getTreeData.do',
				success:function(res){
					var zNodes = res;
					$('#item-modal').modal('show');
					$.fn.zTree.init($("#treeItemDataPanel"), setting, zNodes).expandAll(true);
				}
			});
		},
		removeItemd:function(_id){
			for(var i = 0; i < this.BussStorage.items.length; i++){
				if(this.BussStorage.items[i].id == _id){
					this.BussStorage.items.splice(i,i==0?1:i);
					break;
				}
			}
		},
		checkItemd:function(){
			if(this.item.id==''){
				return;
			}
			var newItem = {};
			$.extend(newItem,this.item);
			this.BussStorage.items.push(newItem);
			this.item = {
				id:'',
				itemname:'',
				model:'',
				manuname:'',
				supplierid:'',
				suppliername:'',
				item_num:0,
				item_num2:0,
				item_weight:0,
				item_dj:0,
				item_je:0,
				item_note:'-'
			};
			$('#item-modal').modal('hide');
		},
		showSupplierTree:function(){
			var _this = this;
			if(_this.View.type == 'view'){
				return;
			}
			//warehouse-modal
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
            			_this.item.supplierid=treeNode.id;
            			_this.item.suppliername=treeNode.name;
            			$('#supplier-modal').modal('hide');
					}
				}
			};
			this.$parent.post({
				url : 'Supplier/list.do',
				data : {start:1,limit:999999},
				success:function(res){
					var zNodes = res['data'];
					$('#supplier-modal').modal('show');
					$.fn.zTree.init($("#treeSupplierDataPanel"), setting, zNodes).expandAll(true);
				}
			});
		},
		postStorageData:function(){
			console.log(this.BussStorage);
		}
	},
	template:'\
		<div>\
			<div class="col-md-12" style="margin:30px 0 30px 0;">\
				<div class="btn-group" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-default" v-on:click="back">返回</a>\
					<a type="button" class="btn btn-default" v-on:click="postStorageData" v-if="View.type!=\'view\'">保存</a>\
					<span style="color:red;">{{BussStorage.errorMsg}}</span>\
				</div>\
			</div>\
			<div class="col-md-12">\
					<div class="form-group col-md-5">\
				    	<label>仓库</label>\
						<input class="form-control" placeholder="仓库" v-model="BussStorage.housename" v-on:click="showWareHouse" readonly="readonly"/>\
				  	</div>\
					<div class="form-group col-md-5">\
				    	<label>入库时间</label>\
						<div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="BussStorage_modify_time" data-link-format="yyyy-mm-dd">\
					        <input class="form-control" size="16" type="text" value="" v-model="BussStorage.modify_time" readonly>\
					        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
					    </div>\
				  	</div>\
				  	<div class="form-group col-md-5">\
				    	<label>操作人</label>\
				    	<input type="text" class="form-control" placeholder="操作人" v-model="BussStorage.modify_username" v-bind:readonly="View.type==\'view\'">\
				  	</div>\
					<div class="form-group col-md-5">\
						<label>备注</label>\
						<textarea class="form-control" rows="2" v-model="BussStorage.note" v-bind:readonly="View.type==\'view\'"></textarea>\
					</div>\
			</div>\
			<div class="col-md-12 data-panel">\
				<div class="btn-group btn-group-sm" role="group" aria-label="..." v-if="View.type!=\'view\'">\
			  		<a type="button" class="btn btn-success" v-on:click="showItemTree">新增物料</a>\
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
						<tr v-for="item in BussStorage.items">\
							<td class="text-center">\
						  		<span class="glyphicon glyphicon-remove" aria-hidden="true" v-on:click="removeItemd(item.id)" v-if="View.type!=\'view\'"></span>\
							</td>\
							<td class="text-left">{{item.suppliername}}</td>\
							<td class="text-left">{{item.manuname}}</td>\
							<td class="text-left">{{item.itemname}}</td>\
							<td class="text-left">{{item.model}}</td>\
							<td class="text-right">{{item.item_num}}</td>\
							<td class="text-right">{{item.item_num2}}</td>\
							<td class="text-right">{{item.item_weight}}</td>\
							<td class="text-right">{{item.item_dj}}</td>\
							<td class="text-right">{{item.item_je}}</td>\
							<td class="text-right">{{item.item_note}}</td>\
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
			\
			<div aria-hidden="true" id="item-modal" class="modal fade" tabIndex="-1" role="dialog">\
				<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-header bg-primary">\
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\
							<h5 class="modal-title">\
			                    <i class="icon-pencil"></i>\
			                    <span style="font-weight:bold">选择物料</span>\
			                </h5>\
						</div>\
						<div class="modal-body">\
							<div class="row">\
								<div class="col-md-5">\
			                       	<div id="treeItemDataPanel" class="ztree" style="overflow-y:scroll;min-height: 250px;max-height: 400px">\
			            			</div>\
								</div>\
								<div class="col-md-7">\
									<div class="form-group col-md-12">\
								    	<label>生产厂家:{{item.manuname}}</label><br/>\
										<label>物料:{{item.itemname}}</label><br/>\
										<label>型号:{{item.model}}</label>\
								  	</div>\
									<div class="form-group col-md-12">\
										<input class="form-control" placeholder="供应商" v-model="item.suppliername" readonly v-on:click="showSupplierTree"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>件数</label>\
										<input class="form-control" placeholder="件数" v-model="item.item_num"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>支数</label>\
										<input class="form-control" placeholder="支数" v-model="item.item_num2"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>单价</label>\
										<input class="form-control" placeholder="单价" v-model="item.item_dj"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>金额</label>\
										<input class="form-control" placeholder="金额" v-model="item.item_je"/>\
								  	</div>\
									<div class="form-group col-md-12">\
								    	<label>实际重量</label>\
										<input class="form-control" placeholder="实际重量" v-model="item.item_weight"/>\
								  	</div>\
									<div class="form-group col-md-12">\
								    	<label>备注</label>\
										<input class="form-control" placeholder="备注" maxlength="50" v-model="item.item_note"/>\
								  	</div>\
								</div>\
							</div>\
						</div>\
						<div class="modal-footer">\
							<button type="button" class="btn default" v-on:click="checkItemd">确定</button>\
							<button type="button" class="btn default" data-dismiss="modal">关闭</button>\
						</div>\
					</div>\
				</div>\
			</div>\
			\
			\
		  <div aria-hidden="true" id="supplier-modal" class="modal fade" tabIndex="-1" role="dialog">\
				<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-header bg-primary">\
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\
							<h5 class="modal-title">\
			                    <i class="icon-pencil"></i>\
			                    <span style="font-weight:bold">选择供应商</span>\
			                </h5>\
						</div>\
						<div class="modal-body">\
							<div class="row">\
								<div class="col-md-12">\
			                       	<div id="treeSupplierDataPanel" class="ztree" style="overflow-y:scroll;min-height: 400px;max-height: 600px">\
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
