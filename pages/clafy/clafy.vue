<template>
	<view>
		<view class="content">
			<view v-if="showHeader" class="header">
				<!-- 定位城市 -->
				<view class="addr">
					<view class="icon location"></view>
					{{ city }}
				</view>
				<!-- 搜索框 -->
				<view class="input-box">
					<input
						placeholder="默认关键字"
						placeholder-style="color:#c0c0c0;"
						@tap="toSearch()"
					/>
					<view class="icon search"></view>
				</view>
				<!-- 右侧图标按钮 -->
				<view class="icon-btn">
					<view class="icon yuyin-home"></view>
					<view class="icon tongzhi" @tap="toMsg"></view>
				</view>
			</view>
			<view class="turn">
				<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
			</view>
		</view>
		<view class="category-list">
			<view
				class="category"
				v-for="(row, index) in categoryList"
				:key="index"
				@tap="toCategory(row)"
			>
				<view class="img"><image :src="row.img"></image></view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<button @click="toFa">fabu</button>
	</view>
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	export default {
		components: {
			carousel
			},
		data() {
			return {
				showHeader:true,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				title: 'Hello',
				city: '天津',
				categoryList: [
					{ id: 1, name: '外卖', img: '/static/img/category/1.png' },
					{ id: 2, name: '快递', img: '/static/img/category/2.png' },
					{ id: 3, name: '家教', img: '/static/img/category/3.png' },
					{ id: 4, name: '零工', img: '/static/img/category/4.png' },
					{ id: 5, name: '在线', img: '/static/img/category/5.png' },
					{ id: 6, name: '运动', img: '/static/img/category/6.png' },
					{ id: 7, name: 'kk', img: '/static/img/category/7.png' },
					{ id: 8, name: 'aa', img: '/static/img/category/8.png' }
				],
				imgList: [{
					url: 'https://img9.51tietu.net/pic/2019-091200/vgkpidei2tjvgkpidei2tj.jpg',
					id: 1,
					},{
					url: 'https://img9.51tietu.net/pic/2019-091200/euzekmi5m23euzekmi5m23.jpg',
					id: 2,
					},{
					url: 'https://img9.51tietu.net/pic/2019-091200/143tt0ta4sr143tt0ta4sr.jpg',
					id: 3,
					},{
					url: 'https://img9.51tietu.net/pic/2019-091200/ff1vqwm3q33ff1vqwm3q33.jpg',
					id: 4,
					},
				]
			}
		},
		methods: {
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.setStorageSync('catName',e.name);
				console.log(e.name)
				uni.navigateTo({
					url:"../list/list?cid="+e.id+'&name='+e.name
				});
			},
			selectedBanner(item, index) {
				console.log('', item, index)
			},
			toFa:function() {
				uni.navigateTo({
					url:'../recruit/recruit'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
	
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
	
		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	
	.turn {
		margin-top: 80rpx;
	}
	
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 9vw;
					height: 9vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
</style>

