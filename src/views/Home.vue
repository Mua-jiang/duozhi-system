<template>
  <div>
	  <button @click="add">增长</button>
	  <div id="echart" style="width: 80%;height: 300px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import option from './options.js';
export default {
  data(){
    return {
		result: [5, 20, 36, 10, 10, 20],
		myChart: null
    }
  },
  watch:{
	result: {
		handler(arry){
			this.myChart.setOption({
			    series: [{
			        data: arry
			    }]
			});
		},
		deep:true
	}  
  },
  mounted() {
  	// 基于准备好的dom，初始化echarts实例
	this.myChart = echarts.init(document.getElementById('echart'));
	
	//配置项
	
	
  	// 绘制图表
  	this.myChart.setOption(option);
  },
  methods: {
	  add(){
		// this.result[0] = this.result[0] + 10
		// console.log(this.result)
		
		// let num = this.result[0] + 10
		// this.$set(this.result,0,num)
		
		this.result.splice(0,1,100)
		
		
		console.log(this.result)
	  
	  }
  }
}
</script>
