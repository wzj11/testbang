<template>
	<view>
		<view class="content">
			<view v-if="showHeader" class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
				<!-- 定位城市 -->
				<view class="addr">
					<view class="icon location" @click="findadd">{{city}}</view>
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
			<uni-search-bar :radius="100" @confirm="search" cancelButton="none"></uni-search-bar>
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
		</view>
		<uni-list v-for="(row, index) in tllist" :key="index">
		   <uni-list-item :title="row.type" :note="row.content" :rightText="row.price" to="../detail/detail"></uni-list-item>
		</uni-list>
		<view v-show="isLoadMore">
		                <uni-load-more status="loading" ></uni-load-more>
		          </view>
		<u-toast ref="uToast" type="success"/>
	</view>
	
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import QQMapWX from '../../untils/qqmap-wx-jssdk1/qqmap-wx-jssdk.js'
	export default {
		components: {
			carousel
			},
		data() {
			return {
				showHeader:true,
				isLoadMore:false,
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				title: 'Hello',
				city: '请定位',
				tllist:[],
				page:1,
				timer:null,
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
					},]
			}
		},
		onLoad() {
		},
		onShow() {
			this.page = 1;
			this.tllist = [];
			this.getMsg();
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.isLoadMore = true
				this.page += 1
				this.timer = setTimeout(()=>{
					this.getMsg()
				},500)
			}
		},
		onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
		methods: {
			selectedBanner(item, index) {
				console.log('', item, index)
			},
			findadd(){
				const that = this
				wx.getLocation({//获取地址
				   type: 'gcj02',
					 
				   success(res) {
				     const latitude = res.latitude
				     const longitude = res.longitude
				     const speed = res.speed
				     const accuracy = res.accuracy
				     console.log(latitude, longitude, speed, accuracy)
						 const qqmapsdk = new QQMapWX({
							 key: 'SA4BZ-JNF3S-3OOOO-65SXB-XOU6V-FYF5Z',
						 });
				     qqmapsdk.reverseGeocoder({//SDK调用
				       location: { latitude, longitude },
				       success: function (res) {
								 that.city = res.result.ad_info.city,
								 console.log(that.city)
				         console.log(res)
							  }
				     })
				   }
				 })
				
				},
			toSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			},
			getMsg: function() {
				const that = this;
				uni.showLoading({
				})
				uniCloud.callFunction({
					name: 'test',
					data:{
						num:that.page
					},
					success(res) {
						console.log("调用成功",res.result.data)
						if (that.tllist.length > 0) {
							if (res.result.data.length == 0) {
								that.$refs.uToast.show({
									title: '没有更多数据了',
									type:'success'
								})
							}
							let newlist = res.result.data
							newlist.forEach((item, index) => {
								if (item.money_type == "日结") {
									item.price = item.price + "/日"
								} else if (item.money_type == "月结") {
									item.price = item.price + "/月"
								}
							})
							that.tllist = that.tllist.concat(newlist)
							console.log(that.tllist)
						} else {
							that.tllist = res.result.data
							that.tllist.forEach((item, index) => {
								if (item.money_type == "日结") {
									item.price = item.price + "/日"
								} else if (item.money_type == "月结") {
									item.price = item.price + "/月"
								}
							})
						}
						that.isLoadMore = false
						clearTimeout(that.timer)
					},
					complete() {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
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
				font-size: 32upx;
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
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.city {
		font-size: 2rpx;
	}
	
	.turn {
		margin-top: 80rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
