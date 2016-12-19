var app = angular.module("FishApp")


app.service("ProfileService", ["$http", function ($http) {

	this.getProfile = function () {
		return $http.get("/api/profile")
			.then(function (response) {
				return response.data;
			})
	}

	this.updateProfile = function (user) {
		return $http.put("/api/profile", user._id)
			.then(function (response) {
				return response.data
			})
	}
}])

app.controller("ProfileCtrl", ["$scope", "ProfileService", function ($scope, ProfileService) {
	(function getProfile() {
		ProfileService.getProfile()
			.then(function (response) {
				console.log(response)
				$scope.profile = response;
			})
	})();

	$scope.updateProfile = function (user) {
		ProfileService.updateProfile(user)
			.then(function (response) {
				console.log(response);
				$scope.profile = response;
			})
	}

}])