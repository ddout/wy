/**
 * 购货单位
 */
Vue.component('comp-purchase', {
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
			Purchase:{
				//购货单位
				id:'',
				name:'',
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
			this.Purchase = {
					id:'',
					name:'',
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
				url : 'Purchase/list.do',
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
				url : 'Purchase/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		updateData:function(_id){
			var _this = this;
			_this.clear();
			_this.Purchase.id=_id;
			this.$parent.post({
				url : 'Purchase/getById.do',
				data : {"id":_id},
				success:function(res){
					$.extend(_this.Purchase, res);
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
			if(this.Purchase.id != ''){
				url = 'Purchase/update.do';
			} else {
				url = 'Purchase/add.do';
			}
			var data = {
				id:_this.Purchase.id,
				name:_this.Purchase.name,
				note:_this.Purchase.note
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
					_this.Purchase.errorMsg = res;
				}
			});
		}
	},
	template:'\
		<div>\
		  <h4>购货单位信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>名称</label>\
				    	<input type="text" class="form-control" placeholder="购货单位名称" v-model="search.name">\
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
							<th class="text-center">名称</th>\
							<th class="text-center">备注</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.name}}</td>\
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
			        <h4 class="modal-title">购货单位详情</h4>\
			      </div>\
			      <div class="modal-body">\
						<div class="form-group">\
							<label>名称</label>\
						    <input class="form-control" placeholder="名称" v-model="Purchase.name"/>\
						</div>\
						<div class="form-group">\
					     	<label>备注</label>\
					    	<input class="form-control" placeholder="备注" v-model="Purchase.note"/>\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;">{{Purchase.errorMsg}}</span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
			        <button type="submit" class="btn btn-primary">保存</button>\
					<input type="hidden" v-model="Purchase.id"/>\
			      </div>\
			    </div>\
			  </div>\
			</form>\
			</div>\
		</div>'

});
