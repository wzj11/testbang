'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const collection = db.collection('tableImages')
	const res = collection.orderBy('createtime','desc').get()
	
	//返回数据给客户端
	return res
};
