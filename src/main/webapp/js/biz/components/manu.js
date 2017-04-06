/**
 * 物料生产厂家
 */
Vue.component('comp-manu', {
	data: function(){
		return {
			Manu:{
				id:'',
				name:'',
				note:'',
				objs:[]
			}
		};
	},
	watch:{
		'$route': 'fetchData'
	},
	created: function() {
	    // 组件创建完后获取数据，
	    // 此时 data 已经被 observed 了
	    this.fetchData()
	},
	methods: {
		fetchData: function(){
			this.Manu.id = this.$route.params.id;
		}
	},
	template:''
	+'<div>'
	+'  <h4>单位信息</h4>'
	+'	<div class="col-md-12">'
	+'		<form class="form-inline">'
	+'			<div class="form-group">'
	+'		    	<label for="exampleInputName2">Name</label>'
	+'		    	<input type="text" class="form-control" id="exampleInputName2"  v-model="Manu.id" placeholder="Jane Doe">'
	+'		  	</div>'
	+'		    <div class="form-group">'
	+'		    	<label for="exampleInputEmail2">Email</label>'
	+'		    	<input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">'
	+'		    </div>'
	+'		    <button type="submit" class="btn btn-primary btn-sm">搜索</button>'
	+'		</form>'
	+'	</div>'
	+'	<div class="col-md-12 data-panel">'
	+'		<div class="btn-group btn-group-sm" role="group" aria-label="...">'
	+'	  		<a type="button" class="btn btn-success">Left</a>'
	+'	  		<a type="button" class="btn btn-success">Middle</a>'
	+'	  		<a type="button" class="btn btn-success">Right</a>'
	+'		</div>'
	+'		<table class="table table-bordered">'
	+'			<tbody>'
	+'				<tr>'
	+'					<th class="text-center">name</th>'
	+'					<th class="text-center">ip</th>'
	+'					<th class="text-center">note</th>'
	+'					<th class="text-center">lasttime</th>'
	+'				</tr>'
	+'			</tbody>'
	+'		</table>'
	+'  </div>		'
	+'</div>'

});
