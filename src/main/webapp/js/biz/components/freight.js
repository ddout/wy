/**
 * 运费
 */
Vue.component('comp-freight', {
	data: function(){
		return {
			search:{
				entername:'',
				deptname:'',
				modify_user:'',
				begin_time:'',
				end_time:'',
				//
				start:1,
				limit:10,
				rowsCount:0,
				datas:[]
			},
			Freight:{
				id:'',
				houseid:'',
				housename:'',
				entername:'',
				deptname:'',
				modify_time:'',
				modify_user:'',
				f_dw:0,
				f_dj:0,
				f_je:0,
				errorMsg:''
			}
		};
	},
	mounted:function () {
		this.loadData();
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
	    	if(field == 'search-begin_time'){
	    		_this.search.begin_time = dateStr;
	    	} else if(field == 'search-end_time'){
	    		_this.search.end_time = dateStr;
	    	} else if(field == 'Freight_modify_time'){
	    		_this.Freight.modify_time = dateStr;
	    	}
	    });
	},
	methods: {
		clear:function(){
			this.Freight = {
					id:'',
					houseid:'',
					housename:'',
					entername:'',
					deptname:'',
					modify_time:'',
					modify_user:'',
					f_dw:0,
					f_dj:0,
					f_je:0,
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
					entername:this.search.entername,
					deptname:this.search.deptname,
					modify_user:this.search.modify_user,
					begin_time:this.search.begin_time,
					end_time:this.search.end_time,
					start:this.search.start,
					limit:this.search.limit
			};
			this.$parent.post({
				url : 'Freight/list.do',
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
				url : 'Freight/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		updateData:function(_id){
			var _this = this;
			_this.clear();
			_this.Freight.id=_id;
			this.$parent.post({
				url : 'Freight/getById.do',
				data : {"id":_id},
				success:function(res){
					$.extend(_this.Freight, res);
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
			if(this.Freight.id != ''){
				url = 'Freight/update.do';
			} else {
				url = 'Freight/add.do';
			}
			try {
				if(parseFloat(this.Freight.f_dw,10) == NaN){
					this.Freight.f_dw = 0;
				} else {
					this.Freight.f_dw = parseFloat(this.Freight.f_dw,10);
				}
				if(parseFloat(this.Freight.f_dj,10) == NaN){
					this.Freight.f_dj = 0;
				} else {
					this.Freight.f_dj = parseFloat(this.Freight.f_dj,10);
				}
				if(parseFloat(this.Freight.f_je,10) == NaN){
					this.Freight.f_je = 0;
				} else {
					this.Freight.f_je = parseFloat(this.Freight.f_je,10);
				}
			} catch (e) {
				return;
			}
			var data = {
				id:_this.Freight.id,
				houseid:_this.Freight.houseid,
				entername:_this.Freight.entername,
				deptname:_this.Freight.deptname,
				modify_time:_this.Freight.modify_time,
				modify_user:_this.Freight.modify_user,
				f_dw:_this.Freight.f_dw,
				f_dj:_this.Freight.f_dj,
				f_je:_this.Freight.f_je,
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
					_this.Freight.errorMsg = res;
				}
			});
		},
		showWareHouse:function(){
			var _this = this;
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
	            			_this.Freight.houseid=treeNode.sid;
	            			_this.Freight.housename=treeNode.name;
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
		}
	},
	template:'\
		<div>\
		  <h4>运费信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>承运单位</label>\
				    	<input type="text" class="form-control" placeholder="承运单位" v-model="search.entername">\
				  	</div>\
					<div class="form-group">\
				    	<label>部门</label>\
				    	<input type="text" class="form-control" placeholder="部门" v-model="search.deptname">\
				  	</div>\
					<div class="form-group">\
				    	<label>销售单位</label>\
				    	<input type="text" class="form-control" placeholder="销售单位" v-model="search.modify_user">\
				  	</div>\
					<div class="form-group">\
				    	<label>日期</label>\
						<div class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="search-begin_time" data-link-format="yyyy-mm-dd">\
					        <input class="form-control" size="16" type="text" value="" v-model="search.begin_time" readonly>\
					        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
					    </div>\
						<div class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="search-end_time" data-link-format="yyyy-mm-dd">\
					        <input class="form-control" size="16" type="text" value="" readonly>\
					        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
					    </div>\
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
							<th class="text-center">仓库</th>\
							<th class="text-center">承运单位</th>\
							<th class="text-center">部门</th>\
							<th class="text-center">日期</th>\
							<th class="text-center">销售单位</th>\
							<th class="text-center">吨位</th>\
							<th class="text-center">单价</th>\
							<th class="text-center">金额</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.housename}}</td>\
							<td class="text-left">{{item.entername}}</td>\
							<td class="text-left">{{item.deptname}}</td>\
							<td class="text-left">{{item.modify_time}}</td>\
							<td class="text-left">{{item.modify_user}}</td>\
							<td class="text-right">{{item.f_dw}}</td>\
							<td class="text-right">{{item.f_dj}}</td>\
							<td class="text-right">{{item.f_je}}</td>\
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
		  \
		  <div class="modal fade" tabindex="-1" role="dialog" id="data-Modal">\
			<form v-on:submit.prevent="dataModalSubmit" method="post">\
			  <div class="modal-dialog" role="document">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
			        <h4 class="modal-title">运费详情</h4>\
			      </div>\
			      <div class="modal-body" style="min-height:300px;">\
						<div class="form-group col-md-6">\
							<label>仓库</label>\
							<input class="form-control" placeholder="仓库" v-model="Freight.housename" v-on:click="showWareHouse" readonly="readonly"/>\
						</div>\
						<div class="form-group col-md-6">\
							<label>日期</label>\
							<div class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="Freight_modify_time" data-link-format="yyyy-mm-dd">\
								<input class="form-control" size="16" type="text" value="" v-model="Freight.modify_time" readonly>\
								<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
								<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
							</div>\
						</div>\
		      			<div class="form-group col-md-6">\
		      				<label>承运单位</label>\
							<input class="form-control" placeholder="承运单位" v-model="Freight.entername"/>\
						</div>\
						<div class="form-group col-md-6">\
							<label>部门</label>\
							<input class="form-control" placeholder="部门" v-model="Freight.deptname"/>\
						</div>\
						<div class="form-group col-md-6">\
							<label>销售单位</label>\
							<input class="form-control" placeholder="销售单位" v-model="Freight.modify_user"/>\
						</div>\
						<div class="form-group col-md-6">\
				     		<label>吨位</label>\
					    	<input class="form-control" placeholder="吨位" v-model="Freight.f_dw"/>\
						</div>\
						<div class="form-group col-md-6">\
					     	<label>单价</label>\
					    	<input class="form-control" placeholder="单价" v-model="Freight.f_dj"/>\
						</div>\
						<div class="form-group col-md-6">\
					     	<label>金额</label>\
					    	<input class="form-control" placeholder="金额" v-model="Freight.f_je"/>\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;">{{Freight.errorMsg}}</span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
			        <button type="submit" class="btn btn-primary">保存</button>\
					<input type="hidden" v-model="Freight.id"/>\
			      </div>\
			    </div>\
			  </div>\
			</form>\
			</div>\
			\
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
