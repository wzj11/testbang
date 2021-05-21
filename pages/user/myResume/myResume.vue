<template>
	<view class="container flex-column align-center bg-white">
		<!-- 头部信息填写 填写基本的姓名 年龄 民族等基本信息 -->
		<view class="head-info margin-top-sm flex-row">
			<view class="head-left">
				<view class="name-box flex-row flex-center radius-xs border">
					<text class="text-gray text-bold">姓名</text>
					<input class="margin-left-sm" type="text" placeholder="请输入姓名" />
				</view>
				<view class="nation-box flex-row flex-center radius-xs border margin-top-sm">
					<text class="text-gray text-bold">民族</text>
					<picker mode="selector" :range="sexList" class="text-center margin-left-sm">
						<view>{{sexList[0]}}</view>
					</picker>
				</view>
				<view class="sex-age flex-row margin-top-sm grid col-2">
					<view class="sex-box flex-row border radius-xs flex-center">
						<text class="text-gray text-bold">性别</text>
						<picker mode="selector" :range="sexList" class="text-center">
							<view>{{sexList[0]}}</view>
						</picker>
					</view>
					<view class="age-box flex-row border radius-xs flex-center">
						<text class="text-gray text-bold">年龄</text>
						<input class="margin-left-sm" type="text" placeholder="年龄" />
					</view>
				</view>
			</view>
			<view class="head-right radius-xs border">
			</view>
		</view>
		
		<!-- 参加工作时间 -->
		<view class="join-job-time flex-row flex-center border margin-top-sm radius-xs">
			<text class="text-gray text-bold">参加工作时间</text>
			<picker mode="date" class="text-center margin-left-sm">
				<view>2018-02-02</view>
			</picker>
		</view>
		<!-- 现居住地址 -->
		<view class="current-place flex-row flex-center border margin-top-sm radius-xs">
			<text class="text-gray text-bold">现居住地</text>
			<picker mode="region" class="text-center margin-left-sm">
				<view>{{current_place}}</view>
			</picker>
		</view>
		<!-- 户籍所在地 -->
		<view class="census-place flex-row flex-center border margin-top-sm radius-xs">
			<text class="text-gray text-bold">户籍所在地</text>
			<picker mode="region" class="text-center margin-left-sm">
				<view>{{census_place}}</view>
			</picker>
		</view>
		<!-- 政治面貌 -->
		<view class="political-status flex-row flex-center border margin-top-sm radius-xs">
			<text class="text-gray text-bold">政治面貌</text>
			<picker mode="selector" :range="politicalList" class="text-center margin-left-sm">
				<view>{{politicalList[0]}}</view>
			</picker>
		</view>
		<!-- 求职状态 -->
		<view class="search-status flex-row flex-center border margin-top-sm radius-xs">
			<text class="text-gray text-bold">求职状态</text>
			<picker mode="selector" :range="statusList" class="text-center margin-left-sm">
				<view>{{statusList[0]}}</view>
			</picker>
		</view>
		<!-- 期望行业 -->
		<view class="expect-industry border margin-top-sm flex-column align-center"
		@click="toChooseExpectIndustry">
			<view class="head-tip">
				<text class="text-gray text-bold">期望行业</text>
			</view>
			<view class="industry-list flex-row align-center">
				<view class="item" v-for="(item, index) in itemList" :key="index">
					<text class="text-gray text-xs">web前端开发工程师</text>
				</view>
			</view>
		</view>
		<!-- 期望岗位 -->
		<view class="expect-job border margin-top-sm flex-column align-center"
		@click="toChooseExpectJob">
			<view class="head-tip">
				<text class="text-gray text-bold">期望岗位</text>
			</view>
			<view class="job flex-row align-center">
				<text>{{expect_job}}</text>
			</view>
		</view>
		
		<!-- 简历保存按钮 -->
		<view class="re-btn re-btn-lg margin-top-lg bg-blue text-white">
			保存简历
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexList: ['男', '女'],
				politicalList: ['群众', '中共党员'],
				census_place: '选择地址',
				current_place: '选择地址',
				statusList: ['在职', '随时就职'],
				itemList: [
					'',
					'',
					''
				],
				expect_job: '前端工程师',
				
			}
		},
		methods: {
			toChooseExpectJob() {
				uni.navigateTo({
					url: 'expectJob/expectJob'
				})
			},
			toChooseExpectIndustry() {
				uni.navigateTo({
					url: 'expectIndustry/expectIndustry'
				})
			},
			
		}
	}
</script>

<style>
	.head-info {
		width: 94vw;
		height: 280rpx;
	}
	
	.head-info .head-left {
		height: 100%;
		flex: 7;
	}
	
	.head-info .head-right {
		height: 100%;
		flex: 3;
	}
	
	.sex-age {
		width: 92%;
		grid-gap: 20rpx;
	}
	
	.sex-box,
	.age-box {
		height: 80rpx;
	}
	
	.sex-box picker {
		width: 64%;
	}
	
	.age-box input {
		width: 50%;
	}
	
	.name-box,
	.nation-box {
		width: 92%;
		height: 80rpx;
	}
	
	.name-box input,
	.nation-box picker {
		width: 80%;
	}
	
	.join-job-time,
	.current-place,
	.census-place,
	.political-status,
	.search-status {
		width: 94%;
		height: 80rpx;
	}
	
	.join-job-time picker,
	.current-place picker,
	.census-place picker,
	.political-status picker,
	.search-status picker {
		width: 66%;
	}
	
	.expect-industry {
		width: 94%;
		height: 220rpx;
	}
	
	.head-tip {
		width: 94%;
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.industry-list {
		width: 94%;
		height: 160rpx;
		flex-wrap: wrap;
		/* justify-content: space-between; */
		justify-content: flex-start;
	}
	
	.industry-list .item {
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 10rpx;
		background-color: #F1F2F6;
		border-radius: 5rpx;
		margin-left: 20rpx;
	}
	
	.expect-job {
		width: 94%;
		height: 140rpx;
	}
	
	.job {
		width: 94%;
		height: 80rpx;
	}
	
	.re-btn {
		margin-bottom: 100rpx;
	}
</style>
