/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Employees module
 */
define(['accUtils','knockout','text!data/data.json','ojs/ojchart'],
 function (oj, ko, file) {
    /**
     * The view model for the main content view template
     */
    function EmployeesContentViewModel() {
//        var self = this;
        this.empName=ko.observable("Peter");
    }
    var data = JSON.parse(file)
    this.datasource=ko.observableArray(data);
    
    return EmployeesContentViewModel;
});
