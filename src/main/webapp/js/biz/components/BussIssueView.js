/**
 * 出库详情
 */
Vue.component('comp-BussIssue-view', {
	data: function(){
		return {
			View:{
				type:this.$route.params.type,
				id:this.$route.params.id
			},
			item:{
				id:'',
				itemid:'',
				itemname:'',
				model:'',
				manuname:'',
				purchaseid:'',
				purchasename:'',
				item_num:0,
				item_num2:0,
				item_weight:0,
				item_dj:0,
				item_je:0,
				item_zdje:0,
				item_salesman:'-',
				item_drxkj:0,
				item_cj:0,
				item_bc:0
			},
			BussIssue:{
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
		    	if(field == 'BussIssue_modify_time'){
		    		_this.BussIssue.modify_time = dateStr;
		    	}
		    });
		} 
		if(this.View.type == 'add'){
			var date = new Date();
			var dateStr = date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' + (date.getMonth()+1) : date.getMonth()+1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
			_this.BussIssue.modify_time = dateStr;
		}
	},
	methods: {
		clear:function(){
			this.BussIssue = {
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
					url : 'Buss/Issue/getById.do',
					data : { id : _this.View.id },
					success:function(res){
						$.extend(_this.BussIssue, res);
						if(_this.BussIssue.id == '' || _this.BussIssue.id <= 0){
							_this.BussIssue.errorMsg='未能获取到数据';
						}
					},
					error:function(res){
						_this.BussIssue.errorMsg=res;
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
	            			_this.BussIssue.houseid=treeNode.sid;
	            			_this.BussIssue.housename=treeNode.name;
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
	            			_this.item.id=new Date().getTime();
	            			_this.item.itemid=treeNode.sid;
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
			for(var i = 0; i < this.BussIssue.items.length; i++){
				if(this.BussIssue.items[i].id == _id){
					this.BussIssue.items.splice(i,i==0?1:i);
					break;
				}
			}
		},
		checkItemd:function(){
			if(this.item.id==''){
				return;
			}
			try {
				if(parseFloat(this.item.item_num,10) == NaN){
					this.item.item_num = 0;
				} else {
					this.item.item_num = parseFloat(this.item.item_num,10);
				}
				if(parseFloat(this.item.item_num2,10) == NaN){
					this.item.item_num2 = 0;
				} else {
					this.item.item_num2 = parseFloat(this.item.item_num2,10);
				}
				if(parseFloat(this.item.item_weight,10) == NaN){
					this.item.item_weight = 0;
				} else {
					this.item.item_weight = parseFloat(this.item.item_weight,10);
				}
				if(parseFloat(this.item.item_dj,10) == NaN){
					this.item.item_dj = 0;
				} else {
					this.item.item_dj = parseFloat(this.item.item_dj,10);
				}
				if(parseFloat(this.item.item_je,10) == NaN){
					this.item.item_je = 0;
				} else {
					this.item.item_je = parseFloat(this.item.item_je,10);
				}
				//
				if(parseFloat(this.item.item_zdje,10) == NaN){
					this.item.item_zdje = 0;
				} else {
					this.item.item_zdje = parseFloat(this.item.item_zdje,10);
				}
				if(parseFloat(this.item.item_drxkj,10) == NaN){
					this.item.item_drxkj = 0;
				} else {
					this.item.item_drxkj = parseFloat(this.item.item_drxkj,10);
				}
				if(parseFloat(this.item.item_cj,10) == NaN){
					this.item.item_cj = 0;
				} else {
					this.item.item_cj = parseFloat(this.item.item_cj,10);
				}
				if(parseFloat(this.item.item_bc,10) == NaN){
					this.item.item_bc = 0;
				} else {
					this.item.item_bc = parseFloat(this.item.item_bc,10);
				}
			} catch (e) {
				console.log(e);
				return;
			}
			var newItem = {};
			$.extend(newItem,this.item);
			this.BussIssue.items.push(newItem);
			this.item = {
				id:'',
				itemid:'',
				itemname:'',
				model:'',
				manuname:'',
				purchaseid:'',
				purchasename:'',
				item_num:0,
				item_num2:0,
				item_weight:0,
				item_dj:0,
				item_je:0,
				item_zdje:0,
				item_salesman:'-',
				item_drxkj:0,
				item_cj:0,
				item_bc:0
			};
			$('#item-modal').modal('hide');
		},
		showPurchaseTree:function(){
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
            			_this.item.purchaseid=treeNode.id;
            			_this.item.purchasename=treeNode.name;
            			$('#purchase-modal').modal('hide');
					}
				}
			};
			this.$parent.post({
				url : 'Purchase/list.do',
				data : {start:1,limit:999999},
				success:function(res){
					var zNodes = res['data'];
					$('#purchase-modal').modal('show');
					$.fn.zTree.init($("#treePurchaseDataPanel"), setting, zNodes).expandAll(true);
				}
			});
		},
		postStorageData:function(){
			var _this = this;
			var url = '';
			if(_this.View.type == 'add'){
				_this.BussIssue.id = '';
				url = 'Buss/Issue/add.do';
			} else {
				url = 'Buss/Issue/update.do';
			}
			this.$parent.post({
				url : url,
				data : {
					id:_this.BussIssue.id,
					houseid:_this.BussIssue.houseid,
					modify_time:_this.BussIssue.modify_time,
					note:_this.BussIssue.note,
					modify_userid:_this.BussIssue.modify_userid,
					modify_username:_this.BussIssue.modify_username,
					items:JSON.stringify(_this.BussIssue.items)
				},
				success:function(res){
					_this.back();
				},
				error:function(res){
					_this.BussIssue.errorMsg=res;
				}
			});
		}
	},
	template:'\
		<div>\
			<div class="col-md-12" style="margin:30px 0 30px 0;">\
				<div class="btn-group" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-default" v-on:click="back">返回</a>\
					<a type="button" class="btn btn-default" v-on:click="postStorageData" v-if="View.type!=\'view\'">保存</a>\
					<span style="color:red;">{{BussIssue.errorMsg}}</span>\
				</div>\
			</div>\
			<div class="col-md-12">\
					<div class="form-group col-md-5">\
				    	<label>仓库</label>\
						<input class="form-control" placeholder="仓库" v-model="BussIssue.housename" v-on:click="showWareHouse" readonly="readonly"/>\
				  	</div>\
					<div class="form-group col-md-5">\
				    	<label>入库时间</label>\
						<div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="BussIssue_modify_time" data-link-format="yyyy-mm-dd">\
					        <input class="form-control" size="16" type="text" value="" v-model="BussIssue.modify_time" readonly>\
					        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
					    </div>\
				  	</div>\
				  	<div class="form-group col-md-5">\
				    	<label>操作人</label>\
				    	<input type="text" class="form-control" placeholder="操作人" v-model="BussIssue.modify_username" v-bind:readonly="View.type==\'view\'">\
				  	</div>\
					<div class="form-group col-md-5">\
						<label>备注</label>\
						<textarea class="form-control" rows="2" v-model="BussIssue.note" v-bind:readonly="View.type==\'view\'"></textarea>\
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
							<th class="text-center">购货单位</th>\
							<th class="text-center">生产厂家</th>\
							<th class="text-center">品名</th>\
							<th class="text-center">规格</th>\
							<th class="text-center">件数</th>\
							<th class="text-center">支数</th>\
							<th class="text-center">实际重量</th>\
							<th class="text-center">单价</th>\
							<th class="text-center">金额</th>\
							<th class="text-center">整单金额</th>\
							<th class="text-center">当日现款价</th>\
							<th class="text-center">差价</th>\
							<th class="text-center">磅差</th>\
							<th class="text-center">业务员</th>\
						</tr>\
						<tr v-for="item in BussIssue.items">\
							<td class="text-center">\
						  		<span class="glyphicon glyphicon-remove" aria-hidden="true" v-on:click="removeItemd(item.id)" v-if="View.type!=\'view\'"></span>\
							</td>\
							<td class="text-left">{{item.purchasename}}</td>\
							<td class="text-left">{{item.manuname}}</td>\
							<td class="text-left">{{item.itemname}}</td>\
							<td class="text-left">{{item.model}}</td>\
							<td class="text-right">{{item.item_num}}</td>\
							<td class="text-right">{{item.item_num2}}</td>\
							<td class="text-right">{{item.item_weight}}</td>\
							<td class="text-right">{{item.item_dj}}</td>\
							<td class="text-right">{{item.item_je}}</td>\
							<td class="text-right">{{item.item_zdje}}</td>\
							<td class="text-right">{{item.item_drxkj}}</td>\
							<td class="text-right">{{item.item_cj}}</td>\
							<td class="text-right">{{item.item_bc}}</td>\
							<td class="text-right">{{item.item_salesman}}</td>\
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
			                       	<div id="treeItemDataPanel" class="ztree" style="overflow-y:scroll;min-height: 250px;max-height: 480px">\
			            			</div>\
								</div>\
								<div class="col-md-7">\
									<div class="form-group col-md-12">\
								    	<label>生产厂家:{{item.manuname}}</label><br/>\
										<label>物料:{{item.itemname}}</label><br/>\
										<label>型号:{{item.model}}</label>\
								  	</div>\
									<div class="form-group col-md-12">\
										<input class="form-control" placeholder="购货单位" v-model="item.purchasename" readonly v-on:click="showPurchaseTree"/>\
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
									<div class="form-group col-md-6">\
								    	<label>实际重量</label>\
										<input class="form-control" placeholder="实际重量" v-model="item.item_weight"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>整单金额</label>\
										<input class="form-control" placeholder="整单金额" v-model="item.item_zdje"/>\
								  	</div>\
										<div class="form-group col-md-6">\
								    	<label>当日现款价</label>\
										<input class="form-control" placeholder="当日现款价" v-model="item.item_drxkj"/>\
								  	</div>\
										<div class="form-group col-md-6">\
								    	<label>价差</label>\
										<input class="form-control" placeholder="价差" v-model="item.item_cj"/>\
								  	</div>\
										<div class="form-group col-md-6">\
								    	<label>磅差</label>\
										<input class="form-control" placeholder="磅差" v-model="item.item_bc"/>\
								  	</div>\
									<div class="form-group col-md-6">\
								    	<label>业务员</label>\
										<input class="form-control" placeholder="业务员" maxlength="50" v-model="item.item_salesman"/>\
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
		  <div aria-hidden="true" id="purchase-modal" class="modal fade" tabIndex="-1" role="dialog">\
				<div class="modal-dialog">\
					<div class="modal-content">\
						<div class="modal-header bg-primary">\
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>\
							<h5 class="modal-title">\
			                    <i class="icon-pencil"></i>\
			                    <span style="font-weight:bold">选择购货单位</span>\
			                </h5>\
						</div>\
						<div class="modal-body">\
							<div class="row">\
								<div class="col-md-12">\
			                       	<div id="treePurchaseDataPanel" class="ztree" style="overflow-y:scroll;min-height: 400px;max-height: 600px">\
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
