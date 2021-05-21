<template>
	<view class="">
		<sl-filter :ref="'slFilter'" :topFixed="true" :isTransNav="true" :navHeight="0" :color="titleColor" :themeColor="themeColor" :menuList="menuList"
				         @result="result"></sl-filter>
		<uni-list v-for="(row, index) in tllist" :key="index">
		    <uni-list-item :title="row.type" :note="row.content" :rightText="row.price" to="../detail/detail"></uni-list-item>
		</uni-list>
  </view>
	
</template>

<script>
	import slFilter from "../../components/songlazy-sl-filter/sl-filter/sl-filter.vue"
	export default{
		components: {
			 slFilter
		},
		data(){
			return{
				tllist:[],
				menuList: [
				    {
				        'title': '结算方式',
				        'detailTitle': 'lll',
				        'isMutiple': true,
				        'key': 'key_1',
				        'detailList': [
				            {
				                'title': '日结',
				                'value': ''
				            },
				            {
				                'title': '次结',
				                'value': 'val_1_1'
				            },
				            {
				                'title': '月结',
				                'value': 'val_1_2'
				            }
				        ]
				    },
				    {
				        'title': '薪酬',
				        'detailTitle': '子标题2',
				        'key': 'key_2',
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '100以下',
				                'value': ''
				            },
				            {
				                'title': '100-500',
				                'value': 'val_2_1'
				            },
				            {
				                'title': '500-1000',
				                'value': 'val_2_2'
				            },
										{
										    'title': '1000以上',
										    'value': 'val_2_2'
										}
				        ]
				    },
						{
						    'title': '菜单3',
						    'detailTitle': '子标题2',
						    'key': 'key_2',
						    'isMutiple': false,
						    'detailList': [
						        {
						            'title': '不限',
						            'value': ''
						        },
						        {
						            'title': '条件_2_1',
						            'value': 'val_2_1'
						        },
						        {
						            'title': '条件_2_2',
						            'value': 'val_2_2'
						        }
						    ]
						},
				    {
				        'title': '排序',
				        'detailTitle': '子标题3',
				        'key': 'key_3',
				        'isSort': true,
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '距离远近',
				                'value': 'val_3_1'
				            },
				            {
				                'title': '价格高低',
				                'value': 'val_3_2'
				            },
				            {
				                'title': '时间长短',
				                'value': 'val_3_3'
				            }
				        ]
				    }
				],
			}
		},
		onLoad(option) {
			const that = this
			console.log(option.name)
			uni.showLoading({

			})
			uniCloud.callFunction({
				name:'findtype',
				data:{
					id:'wzj',
					value:option.name
				},
				success(res) {
					console.log(res)
					that.tllist = res.result.data
					that.tllist.forEach((item, index) => {
						if (item.money_type == "日结") {
							item.price = item.price + "/日"
						}
					})
				},
				complete() {
					uni.hideLoading()
				}
			})
		},
		methods:{
		}
	}
</script>

<style>
</style>
