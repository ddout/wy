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
		var _this = this;
		this.loadData();
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
	    	if(field == 'search-beginTime'){
	    		_this.search.beginTime = dateStr;
	    	} else if(field == 'search-endTime'){
	    		_this.search.endTime = dateStr;
	    	}
	    });;
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
						<div class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="search-beginTime" data-link-format="yyyy-mm-dd">\
					        <input class="form-control" size="16" type="text" value="" v-model="search.beginTime" readonly>\
					        <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>\
					    </div>\
						<div class="input-group date form_date col-md-5" data-date="" data-date-format="yyyy-mm-dd" data-link-field="search-endTime" data-link-format="yyyy-mm-dd">\
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
