// public/core.js

var todoApp = angular.module('todoApp', []);

todoApp.controller('mainController', ['$scope', '$http', function($scope, $http) {
	$scope.formData = {};
	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.then(function onSuccess(response) {
			var data = response.data;
			$scope.todos = data;
			console.log('response data: ' + Object.keys(data[0]));
		}, function onError(response) {
			console.log('Error: ' + response.data);
		});
	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.then(function onSuccess(response) {
				$scope.formData = {};		// clear the form so our user is ready to enter another
				$scope.todos = response.data;
				console.log($scope.todos);
			}, function onError(response) {
				console.log('Error: ' + response.data);
			});
	};
	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.then(function onSuccess(response) {
			$scope.todos = response.data;
			console.log(response.data);
		}, function onError(response) {
			console.log('Error: ' + response.data);
		});
	};
}]);