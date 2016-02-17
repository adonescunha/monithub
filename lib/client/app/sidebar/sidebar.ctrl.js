class SidebarCtrl {
  constructor($scope, Wait) {
    $scope.$evalAsync(function() {
      $.AdminLTE.tree('.sidebar');
    });
  }
}

SidebarCtrl.$inject = ['$scope'];

export default SidebarCtrl;
