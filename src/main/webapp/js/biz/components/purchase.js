/**
 * 购货单位
 */
Vue.component('comp-purchase', {
	data: function(){
		return {
			Purchase:{
				//购货单位
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
	    this.fetchData()
	},
	methods: {
		fetchData: function(){
		}
	},
	template:''
	+'<div>'
	+'  <h4>购货单位信息</h4>'
	+'	<div class="col-md-12">'
	+'		<form class="form-inline">'
	+'			<div class="form-group">'
	+'		    	<label for="exampleInputName2">Name</label>'
	+'		    	<input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">'
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
