class SidebarCtrl {
  constructor($scope, Wait) {
    $scope.$evalAsync(function() {
      $.AdminLTE.tree('.sidebar');
    });
  }
}

SidebarCtrl.$inject = ['$scope', 'Wait'];

export default SidebarCtrl;
