;;
function $remote(defer, url, data, method){
	var ajax = $.ajax({
		url: url,
		data: data,
		dataType: 'json',
		type: method,
		success: function(result){
			if(result.success){
				defer.resolve(result);
			}else{
				result.errCode = 222;
				defer.reject(result);
			}
		},
		error: function(jqXhr, textStatus, errorThrown){
			var statusCode = jqXhr.statusCode();
			if(textStatus == 'timeout'){
				defer.reject({
					success: false,
					errCode: 900,
					errors: {_:'请求超时'},
					error: '请求超时'
				});
			}else{
				defer.reject({
					success: false,
					errCode: statusCode,
					errors: {_:'参数错误'},
					error: '参数错误'
				});
			}
		},
		statusCode: {
			333: function(jqXhr) {
				var redirectUrl = jqXhr.getResponseHeader("redirecturl");
				if(redirectUrl){
					location.href = redirectUrl;
				}
			}
		}
	});
	return ajax;
}

function Remoter($q, url, method){
	var self = this;
	this.status  = 'ready'; //ready loading success error
	this.data = null;
	this.errors = null;
	this.params = null;
	this.ajax = null;
	this.get = function(params){
		self.status = 'loading';
		if(self.ajax){
			self.ajax.abort();
		}
		self.params = params || {};
		var defer = $q.defer();
		self.ajax = $remote(defer, url, self.params, method||'post');
		defer.promise.then(function(result){
			self.status = 'success';
			self.data = result.data;
			self.errors = null;
			self.error = null;
			return result;
		}, function(result){
			self.status = 'error';
			self.errors = result.errors;
			self.error = result.error;
			self.data = null;
			return result;
		});
		return defer.promise;
	};
	this.post = function(params){
		self.status = 'loading';
		if(self.ajax){
			self.ajax.abort();
		}
		self.params = params || {};
		var defer = $q.defer();
		self.ajax = $remote(defer, url, self.params, 'post');
		defer.promise.then(function(result){
			self.status = 'success';
			self.data = result.data;
			self.errors = null;
			self.error = null;
			return result;
		}, function(result){
			self.status = 'error';
			self.errors = result.errors;
			self.error = result.error;
			self.data = null;
			return result;
		});
		return defer.promise;
	};
}

function Modeler($q, url){
	var self = this;
	this.status  = 'ready'; //ready loading success error
	this.data = null;
	this.errors = null;
	this.modelId = null;
	this.ajax = null;
	this.get = function(id){
		if(id){
			self.modelId = id;			
		}
		self.status = 'loading';
		if(self.ajax){
			self.ajax.abort();
		}
		var defer = $q.defer();
		self.ajax = $remote(defer, url, {id:self.modelId}, 'get');
		defer.promise.then(function(result){
			self.status = 'success';
			self.data = result.data;
			self.errors = null;
			self.error = null;
		}, function(result){
			self.status = 'error';
			self.errors = result.errors;
			self.error = result.error;
			self.data = null;
		});
		return defer.promise;
	};
}

function Pager($q, url, success, fail){
	var self = this;
	this.status  = 'ready';//ready loading success error
	this.pageNo = 1;
	this.pageSize = 0;
	this.totalPage = 0;
	this.total = 0;
	this.list = [];
	this.hasPrev = false;
	this.hasNext = false;
	this.isLast = false;
	this.isFirst = false;
	this.params = {};
	this.errors = null;
	this.ajax = null;
	this.success = success || angular.noop;
	this.fail = fail || angular.noop;
	this.page = function(pageNo, params){
		if(pageNo){
			self.pageNo = pageNo;			
		}
		if(params){
			self.params = params;
		}
		self.params.pageNo = self.pageNo;
		
		self.status = 'loading';
		if(self.ajax){
			self.ajax.abort();
		}
		var defer = $q.defer();
		self.ajax = $remote(defer, url, self.params, 'post');
		defer.promise.then(function(result){
			self.status = 'success';
			self.pageNo = result.data.pageNumber;
			self.pageSize = result.data.pageSize;
			self.totalPage = result.data.totalPage;
			self.total = result.data.totalRow;
			self.hasNext = (self.pageNo < self.totalPage);
			self.hasPrev = (self.pageNo > 1);
			self.isLast = (self.pageNo == self.totalPage);
			self.isFirst = (self.pageNo == 1);
			self.list = result.data.list;
			self.errors = null;
			self.success(result);
			return result;
		}, function(result){
			self.status = 'error';
			self.errors = result.errors;
			self.list = [];
			self.fail(fail);
			return result;
		});
		return defer.promise;
	};
	this.prev = function(){
		if(self.hasPrev){
			self.page(self.pageNo - 1);			
		}
	};
	this.next = function(){
		if(self.hasNext){
			self.page(self.pageNo + 1);
		}
	};
	this.first = function(){
		self.page(1);
	};
	this.last = function(){
		if(self.totalPage){
			self.page(self.totalPage);
		}
	};
}
