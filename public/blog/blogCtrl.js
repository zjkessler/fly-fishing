var app = angular.module("FishApp");

app.controller("BlogCtrl", ["$scope", "BlogService", "$sce", function ($scope, BlogService, $sce) {

	$scope.searchResults = [];

	$scope.blogList = [];
	$scope.blogSample = [];
	$scope.blogRead = []

	//search for feeds
	$scope.searchRSS = function (query) {
		console.log(query)
		BlogService.searchRSS(query)
			.then(function (response) {
				console.log(response.results)
				$scope.searchResults = response.results;
			})
	}

	//save feed to db and attach to user
	$scope.addBlog = function (blog) {
		console.log(blog)
		BlogService.addBlog(blog)
			.then(function (response) {
				$scope.blogList.push(response.data)

			})
	}

	//get individual feedlist for display
	//$scope.showBlog=function(blog){
	//	BlogService.showBlog(blog).then(function (response){}
	//		
	//	
	//}

	//get individual article for display
	//	$scope.readBlog = function(blogListing){
	//		BlogService.getOneBlog(blogListing)
	//		.then(function(response){
	//			
	//		})
	//	}


	//delete feed from db
	//	$scope.deleteBlog = function (item, index) {
	//	BlogService.removeBlog(item)
	//	.then(function(response){
	//		
	//	})
	//		//
	//		//	}


			}])

app.service("BlogService", ["$http", function ($http) {
	var config = {
		headers: {
			Authorization: "OAuth 6b7cb13c-bb38-42b4-a6b8-5a6d3a8b0aaf"
		}
	}
	this.searchRSS = function (query) {

		return $http.get("/api/feed?q=" + query)
			.then(function (response) {
				return response.data;
			}, function (response) {
				console.log(response)
				console.log("Error" + response.status + ":" + response.statusText);
			})
	}
	this.addBlog = function (blog) {
		return $http.post("/api/feed", blog)
			.then(function (response) {
				return response;
			}, function (response) {
				console.log(response)
				console.log("Error" + response.status + ":" + response.statusText);
			})

	}
}])



//this.showBlog =function(){
//	
//}

//this.getOneBlog =function(){
//	
//}

//this.removeBlog = function(){
//