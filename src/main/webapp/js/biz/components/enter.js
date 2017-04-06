/**
 * 单位
 */
Vue.component('comp-enter', {
	data: function(){
		return {
			search:{
				name:'',
				//
				start:1,
				limit:3,
				rowsCount:0,
				datas:[]
			},
			Enter:{
				//单位
				id:'',
				name:'',
				orderby:'',
				pid:'',
				note:'',
				objs:[]
			}
		};
	},
	mounted:function () {
		this.loadData();
	},
	methods: {
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
				url : 'enter/list.do',
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
				url : 'enter/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		updateData:function(_id){
			var _this = this;
			console.log('update='+_id)
			_this.Enter.id=_id;
			$('#data-Modal').modal('show');
		},
		addData:function(){
			var _this = this;
			console.log('add=')
			_this.Enter.id='';
			$('#data-Modal').modal('show');
		},
		dataModalSubmit:function(event){
			console.log(this.Enter.id)
		}
	},
	template:'\
		<div>\
		  <h4>单位信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline">\
					<div class="form-group">\
				    	<label>名称</label>\
				    	<input type="text" class="form-control" placeholder="单位名称" v-model="search.name">\
				  	</div>\
				    <a class="btn btn-primary btn-sm" v-on:click="loadData">搜索</a>\
				</form>\
			</div>\
			<div class="col-md-12 data-panel">\
				<div class="btn-group btn-group-sm" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-success" v-on:click="addData">新增</a>\
				</div>\
				<table class="table table-bordered">\
					<tbody>\
						<tr>\
							<th class="text-center">上级</th>\
							<th class="text-center">名称</th>\
							<th class="text-center">顺序</th>\
							<th class="text-center">备注</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.pid}}</td>\
							<td class="text-left">{{item.name}}</td>\
							<td class="text-right">{{item.orderby}}</td>\
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
			        <h4 class="modal-title">单位详情</h4>\
			      </div>\
			      <div class="modal-body">\
		      			<div class="form-group">\
		      				<label>上级</label>\
						    <input class="form-control" placeholder="上级" v-model="Enter.pid"/>\
						</div>\
						<div class="form-group">\
							<label>名称</label>\
						    <input class="form-control" placeholder="名称" v-model="Enter.name"/>\
						</div>\
						<div class="form-group">\
							<label>排序</label>\
						    <input class="form-control" placeholder="排序" v-model="Enter.orderby"/>\
						</div>\
						<div class="form-group">\
					     	<label>备注</label>\
					    	<input class="form-control" placeholder="备注" v-model="Enter.note"/>\
						</div>\
			      </div>\
			      <div class="modal-footer">\
			      	<span style="color:red;margin-right:30px;"></span>\
			        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\
			        <button type="submit" class="btn btn-primary">保存</button>\
					<input type="hidden" v-model="Enter.id"/>\
			      </div>\
			    </div>\
			  </div>\
			</form>\
			</div>\
		</div>'

});
