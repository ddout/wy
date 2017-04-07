/**
 * 入库
 */
Vue.component('comp-BussStorage', {
	data: function(){
		return {
			search:{
				houseid:'',
				beginTime:'',
				endTime:'',
				//
				start:1,
				limit:10,
				rowsCount:0,
				datas:[]
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
					houseid:this.search.houseid,
					begin_time:this.search.beginTime,
					end_time:this.search.endTime,
					start:this.search.start,
					limit:this.search.limit
			};
			this.$parent.post({
				url : 'Buss/Storage/list.do',
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
				url : 'Buss/Storage/del.do',
				data : {"id":_id},
				success:function(res){
					_this.loadData();
				}
			});
		},
		addData:function(){
			this.$router.push({ name: 'compBussStorageView', params: { type:'add', id: '0' }});
		},
		updateData:function(_id){
			this.$router.push({ name: 'compBussStorageView', params: { type:'update', id: _id }});
		},
		viewData:function(_id){
			this.$router.push({ name: 'compBussStorageView', params: { type:'view', id: _id }});
		}
	},
	template:'\
		<div>\
		  <h4>入库信息</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>仓库名称</label>\
				    	<input type="text" class="form-control" placeholder="仓库名称" v-model="search.houseid">\
				  	</div>\
					<div class="form-group">\
				    	<label>入库时间</label>\
				    	<input type="text" class="form-control" placeholder="开始时间" v-model="search.beginTime" onClick="WdatePicker({onpicked: function(){ $(this).trigger(\'change\') }})">-\
						<input type="text" class="form-control" placeholder="结束时间" v-model="search.endTime" >\
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
							<th class="text-center">编号</th>\
							<th class="text-center">仓库名称</th>\
							<th class="text-center">操作人</th>\
							<th class="text-center">入库时间</th>\
							<th class="text-center">备注</th>\
							<th class="text-center">操作</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-right">{{item.id}}</td>\
							<td class="text-left">{{item.housename}}</td>\
							<td class="text-left">{{item.modify_username}}</td>\
							<td class="text-right">{{item.modify_time}}</td>\
							<td class="text-left">{{item.note}}</td>\
							<td class="text-left">\
								<div class="btn-group btn-group-sm" role="group" aria-label="...">\
									<a type="button" class="btn btn-success" v-on:click="viewData(item.id)">查看</a>\
							  		<a type="button" class="btn btn-success" v-on:click="updateData(item.id)">修改</a>\
							  		<a type="button" class="btn btn-success" v-on:click="delData(item.id)">删除</a>\
								</div>\
							</td>\
						</tr>\
					</tbody>\
				</table>\
				<comp-dd-pagination v-on:next="next" v-on:prev="prev" v-bind:parmas="search"></comp-dd-pagination>\
		  </div>\
		</div>'

});
