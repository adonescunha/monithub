class SidebarCtrl {
  constructor($scope) {
    $scope.$evalAsync(function() {
      $.AdminLTE.tree('.sidebar');
    });
  }
}

SidebarCtrl.$inject = ['$scope'];

export default SidebarCtrl;
