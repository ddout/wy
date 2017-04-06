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
				limit:10,
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
	methods: {
		next:function(){
			console.log('parent --- test');
		},
		prev:function(){
			console.log('parent --- test111s');
		},
		loadList:function(){
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
					console.log(res)
					_this.search.rowsCount = res['rowsCount'];
					_this.search.datas = res['data'];
				}
			});
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
				    <a class="btn btn-primary btn-sm" v-on:click="loadList">搜索</a>\
				</form>\
			</div>\
			<div class="col-md-12 data-panel">\
				<div class="btn-group btn-group-sm" role="group" aria-label="...">\
			  		<a type="button" class="btn btn-success">Left</a>\
			  		<a type="button" class="btn btn-success">Middle</a>\
			  		<a type="button" class="btn btn-success">Right</a>\
				</div>\
				<table class="table table-bordered">\
					<tbody>\
						<tr>\
							<th class="text-center">上级</th>\
							<th class="text-center">名称</th>\
							<th class="text-center">顺序</th>\
							<th class="text-center">备注</th>\
						</tr>\
						<tr v-for="item in search.datas">\
							<td class="text-left">{{item.pid}}</td>\
							<td class="text-left">{{item.name}}</td>\
							<td class="text-right">{{item.orderby}}</td>\
							<td class="text-left">{{item.note}}</td>\
						</tr>\
					</tbody>\
				</table>\
				<comp-dd-pagination v-on:next="next" v-on:prev="prev" v-bind:parmas="search"></comp-dd-pagination>\
		  </div>\
		</div>'

});
