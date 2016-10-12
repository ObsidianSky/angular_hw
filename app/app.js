import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular.module('app', [uiRouter])
    .config( ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/templates/home.template.html'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'app/templates/form.templates.html',
            controller: formController,
            controllerAs: 'registration'
        })
        .state('employees', {
            url: '/employees',
            resolve: {
                all: employeesService => {
                    return employeesService.getAllEmployees();
                }
            },
            templateUrl: 'app/templates/employees.template.html',
            controller: employeesController,
            controllerAs: 'employee'
        })
        .state('employee', {
            url: '/employee/:id',
            templateUrl: 'app/templates/employee.template.html'
        });

    })
    .service('employeesService', function($http) {
        return {
            getAllEmployees: getAllEmployees
        };

        function getAllEmployees() {
            return $http.get('./employees.json').then(respond => {
                return respond.data;
            });
        }
    })
    .service('checkEmailUniqueService', function(employeesService) {
        return {
            check: check
        };

        function check(email) {
            return employeesService.getAllEmployees().then(employees => {
                return !employees.some(employee => {
                    return employee.email === email;
                });
            });
        }
    });


function employeesController($stateParams, all) {
    const vm = this;
    vm.id = $stateParams.id;
    vm.all = all;
}

function formController(checkEmailUniqueService) {
    const vm = this;
    vm.form = {};

    vm.checkUnique = () => {
        if(!vm.form.email.$modelValue) return;

        checkEmailUniqueService.check(vm.form.email.$modelValue).then(uniq => {
            vm.form.email.$setValidity('notUnique', uniq);
        });
    };
}
