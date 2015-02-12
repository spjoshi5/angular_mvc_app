﻿angular.module('app').controller('PlayerCtrl', function ($scope, appService,toaster) {
  


    $scope.vmFormProject = {};
    $scope.vmListProject = {};

    $scope.gridColumns = [
        {
            field: "ProjectID",
            title: "Project ID",
            template: "<a href='' ng-click='selectProject(this)' >${ProjectID}</a>"
        },
        {
            field: "Name",
            title: "Project Name",
        },
        {
            field: "Description",
            title: "Description",
        },
        {
            field: "StartDate",
            title: "Start",
            type: "date",
            template: '#= kendo.toString(kendo.parseDate(StartDate),"dd/MM/yyyy")#',
        },
        {
            field: "EndDate",
            title: "End",
            type: "date",
            template: '#= kendo.toString(kendo.parseDate(EndDate),"dd/MM/yyyy")#',
        },
    ];


    $scope.selectProject = function (obj) {
        console.log(obj.dataItem);
        $scope.vmFormProject = obj.dataItem;

    };


    $scope.loadProjects = function () {
        appService.getProjectList().then(function (rvm) {
            if (rvm.Success) {
                $scope.vmListProject = rvm.Data;

                $scope.gridData = {
                    data: new kendo.data.ObservableArray($scope.vmListProject),
                    pageSize: 7
                };

                //console.log($scope.vmListProject);
            }

            //console.log(rvm);
        });
    }


    $scope.initPage = function () {
        $scope.loadProjects();
    }

    $scope.addProject = function () {
        appService.saveProject($scope.vmFormProject).then(function (rvm) {
            if (rvm.Success) {
                toaster.pop('success', "Success", rvm.SuccessMessage);
                $scope.vmFormProject = {};
                $scope.loadProjects();
            } else {
                console.log(rvm.Errors);
                toaster.pop('error', "Error", rvm.Errors[0].Message);
                
            }


        });
    }



});
