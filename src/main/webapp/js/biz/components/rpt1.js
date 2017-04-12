/**
 * 进出明细rpt
 */
Vue.component('comp-rpt1', {
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
				data_tp1 : [],
				data_tp2 : [],
				data_tp3 : []
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
	    	if(field == 'search-beginTime'){
	    		_this.search.beginTime = dateStr;
	    	} else if(field == 'search-endTime'){
	    		_this.search.endTime = dateStr;
	    	}
	    });
	},
	methods: {
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
				url : 'rpt1/list.do',
				data : data,
				success:function(res){
					_this.search.data_tp1 = res['data_tp1'];
					_this.search.data_tp2 = res['data_tp2'];
					_this.search.data_tp3 = res['data_tp3'];
				}
			});
		}
	},
	template:'\
		<div>\
		  <h4>进出货明细</h4>\
			<div class="col-md-12">\
				<form class="form-inline" v-on:submit.prevent="loadData" method="post">\
					<div class="form-group">\
				    	<label>仓库名称</label>\
				    	<input type="text" class="form-control" placeholder="仓库名称" v-model="search.houseid">\
				  	</div>\
					<div class="form-group">\
				    	<label>日期</label>\
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
				<ul class="nav nav-pills"  role="tablist">\
					<li role="presentation" class="active"><a href="#tp1" id="tp1-tab" role="tab" data-toggle="tab" aria-controls="tp1" aria-expanded="true">入库</a></li>\
				  	<li role="presentation" class=""><a href="#tp2" role="tab" id="tp2-tab" data-toggle="tab" aria-controls="tp2" aria-expanded="false">销售</a></li>\
				  	<li role="presentation" class=""><a href="#tp3" role="tab" id="tp3-tab" data-toggle="tab" aria-controls="tp3" aria-expanded="false">运费</a></li>\
				</ul>\
				<div class="tab-content main-panel">\
					<div role="tabpanel" class="tab-pane fade active in" id="tp1" aria-labelledby="tp1-tab">\
						<table class="table table-bordered">\
							<tbody>\
								<tr>\
									<th class="text-center">仓库</th>\
									<th class="text-center">供应商</th>\
									<th class="text-center">日期</th>\
									<th class="text-center">厂家</th>\
									<th class="text-center">品名</th>\
									<th class="text-center">规格</th>\
									<th class="text-center">件数</th>\
									<th class="text-center">支数</th>\
									<th class="text-center">实际重量</th>\
									<th class="text-center">单价</th>\
									<th class="text-center">金额</th>\
									<th class="text-center">备注</th>\
								</tr>\
								<tr v-for="item in search.data_tp1">\
									<td class="text-left">{{item.housename}}</td>\
									<td class="text-left">{{item.suppliername}}</td>\
									<td class="text-left">{{item.modify_time}}</td>\
									<td class="text-left">{{item.manuname}}</td>\
									<td class="text-left">{{item.itemname}}</td>\
									<td class="text-left">{{item.itemmodel}}</td>\
									<td class="text-right">{{item.item_num}}</td>\
									<td class="text-right">{{item.item_num2}}</td>\
									<td class="text-right">{{item.item_weight}}</td>\
									<td class="text-right">{{item.item_dj}}</td>\
									<td class="text-right">{{item.item_je}}</td>\
									<td class="text-left">{{item.item_note}}</td>\
								</tr>\
							</tbody>\
						</table>\
			        </div>\
			        <div role="tabpanel" class="tab-pane fade" id="tp2" aria-labelledby="tp2-tab">\
						<table class="table table-bordered">\
							<tbody>\
								<tr>\
									<th class="text-center">仓库</th>\
									<th class="text-center">日期</th>\
									<th class="text-center">购货单位</th>\
									<th class="text-center">厂家</th>\
									<th class="text-center">品名</th>\
									<th class="text-center">规格</th>\
									<th class="text-center">件数</th>\
									<th class="text-center">支数</th>\
									<th class="text-center">实际重量</th>\
									<th class="text-center">单价</th>\
									<th class="text-center">金额</th>\
									<th class="text-center">整单金额</th>\
									<th class="text-center">当日现款价</th>\
									<th class="text-center">价差</th>\
									<th class="text-center">磅差</th>\
									<th class="text-center">业务员</th>\
								</tr>\
								<tr v-for="item in search.data_tp2">\
									<td class="text-left">{{item.housename}}</td>\
									<td class="text-left">{{item.modify_time}}</td>\
									<td class="text-left">{{item.purchasename}}</td>\
									<td class="text-left">{{item.manuname}}</td>\
									<td class="text-left">{{item.itemname}}</td>\
									<td class="text-left">{{item.itemmodel}}</td>\
									<td class="text-right">{{item.item_num}}</td>\
									<td class="text-right">{{item.item_num2}}</td>\
									<td class="text-right">{{item.item_weight}}</td>\
									<td class="text-right">{{item.item_dj}}</td>\
									<td class="text-right">{{item.item_je}}</td>\
									<td class="text-right">{{item.item_zdje}}</td>\
									<td class="text-right">{{item.item_drxkj}}</td>\
									<td class="text-right">{{item.item_cj}}</td>\
									<td class="text-right">{{item.item_bc}}</td>\
									<td class="text-left">{{item.item_salesman}}</td>\
								</tr>\
							</tbody>\
						</table>\
			        </div>\
		  		    <div role="tabpanel" class="tab-pane fade" id="tp3" aria-labelledby="tp3-tab">\
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
								</tr>\
								<tr v-for="item in search.data_tp3">\
									<td class="text-left">{{item.housename}}</td>\
									<td class="text-left">{{item.entername}}</td>\
									<td class="text-left">{{item.deptname}}</td>\
									<td class="text-left">{{item.modify_time}}</td>\
									<td class="text-right">{{item.modify_user}}</td>\
									<td class="text-right">{{item.f_dw}}</td>\
									<td class="text-right">{{item.f_dj}}</td>\
									<td class="text-right">{{item.f_je}}</td>\
								</tr>\
							</tbody>\
						</table>\
			        </div>\
			    </div>\
		  </div>\
		</div>'

});
