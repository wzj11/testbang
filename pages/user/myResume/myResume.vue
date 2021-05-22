<template>
	<view class="container flex-column align-center bg-white">
		<!-- 头部信息填写 填写基本的姓名 年龄 民族等基本信息 -->
		<view class="head-info margin-top-sm flex-row">
			<view class="head-left">
				<view class="name-box flex-row flex-center radius-xs border">
					<text class="text-gray text-bold">姓名</text>
					<input class="margin-left-sm" type="text" placeholder="请输入姓名" />
				</view>
				<view class="date-box flex-row flex-center radius-xs border margin-top-sm">
					<text class="text-gray text-bold">生日</text>
					<picker mode="date" class="text-center margin-left-sm">
						<view>2000-01-01</view>
					</picker>
				</view>
				<view class="sex-edu flex-row margin-top-sm grid col-2">
					<view class="sex-box flex-row border radius-xs flex-center">
						<text class="text-gray text-bold">性别</text>
						<picker mode="selector" :range="sexList" class="text-center">
							<view>{{sexList[0]}}</view>
						</picker>
					</view>
					<view class="edu-box flex-row border radius-xs flex-center">
						<text class="text-gray text-bold">教育状态</text>
						<picker mode="selector" :range="eduList" class="text-center">
							<view>{{eduList[0]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="head-right radius-xs border">
				<image class="upload" src="../../../static/upload.png" mode="aspectFit" @upload></image><!--上传头像 -->
			</view>
		</view>
		
		
		<!-- 所在城市 -->
		<view class="current-place flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">所在城市</text>
			<picker mode="region" class="text-center margin-left-sm">
				<view>{{current_place}}</view>
			</picker>
		</view>
		<!-- 生日 -->
		<view class="join-job-time flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">生日</text>
			<picker mode="date" class="text-center margin-left-xs">
				<view>2000-01-01</view>
			</picker>
		</view><!-- 最高学历 -->
		<view class="highestedu flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">最高学历</text>
			<picker mode="selector" :range="highestedu"class="text-center margin-left-sm">
				<view>{{highestedu[0]}}</view>
			</picker>
		</view>
		<!-- 政治面貌 -->
		<view class="political-status flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">政治面貌</text>
			<picker mode="selector" :range="politicalList" class="text-center margin-left-sm">
				<view>{{politicalList[0]}}</view>
			</picker>
		</view>
		
		<view class="phone flex-row flex-center border margin-top-lg radius-xs">
			<text class="text-gray text-bold">手机号码</text>
			<input class="margin-left-sm" type="text" placeholder="请输入手机号码" />
		</view>
		
		<view class="mail flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">邮箱</text>
			<input class="margin-left-sm" type="text" placeholder="请输入邮箱" />
		</view>
		
		<view class="qq flex-row flex-center border margin-top-xs radius-xs">
			<text class="text-gray text-bold">QQ</text>
			<input class="margin-left-sm" type="text" placeholder="请输入QQ" />
		</view>
		
		<view class="re-btn re-btn-lg margin-top-lg bg-blue text-white">
			保存简历
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eduList:['请选择','在读','已毕业'],
				sexList: ['男', '女'],
				politicalList: ['请选择','群众', '中共党员'],
				current_place: '选择地址',
				highestedu:['请选择','初中','高中/中专','大学/大专','硕士','博士'],
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
	
	.upload{
		height: 90%;
		width: 90%;
		align-items: center;
		align-content: center;
	}
	.sex-edu {
		width: 80%;
		grid-gap: 20rpx;
	}
	
	.sex-box{
		width: 80%;
		height: 80rpx;
	}
	.edu-box{
		height: 80rpx;
		width: 133%;
	}
	
	.sex-box picker{
		width: 30%;
	}
	.edu-box picker {
		width: 44%;
	}
	
	.name-box,
	.date-box {
		width: 92%;
		height: 80rpx;
	}
	
	.name-box input,
	.date-box picker {
		width: 80%;
	}
	
	.phone,
	.mail,
	.qq{
		width: 92%;
		height: 80rpx;
	}
	
	.phone input,
	.mail input,
	.qq input{
		width: 80%;
	}
	.join-job-time,
	.current-place,
	.education,
	.census-place,
	.political-status,
	.highestedu,
	.search-status {
		width: 94%;
		height: 80rpx;
	}
	
	.join-job-time picker,
	.current-place picker,
	.education picker,
	.census-place picker,
	.political-status picker,
	.highestedu picker,
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
