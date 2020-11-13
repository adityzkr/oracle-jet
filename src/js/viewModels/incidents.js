/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['accUtils','knockout','ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojcube',
'ojs/ojconverter-number', 'ojs/ojknockouttemplateutils','text!data/data.json','text!data/data1.json','ojs/ojchart','ojs/ojselectcombobox'],
 function(accUtils,ko, Bootstrap, Model, Cube, NumberConverter, KnockoutTemplateUtils,file,file1) {
    function IncidentsViewModel() {

      // this.myName = ko.observable('')
      // this.mySalary = ko.observable('')
      // this.msg = ko.computed(function(){
      //   if(this.mySalary()>15000){
      //     return "Salary is Okay....!"
      //   }else{
      //     return "It is not okay...!"
      //   }
      // },this)
      // var data = [
      //   {name:'Peter',items:[22]},
      //   {name:'Raju',items:[23]},
      //   {name:'Guru',items:[24]},
      //   {name:'Henry',items:[25]}
      // ];
      // The following is the observableArray
      // I am going to utilize this array to generate charts
      

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      var data = JSON.parse(file)
      this.datasource=ko.observableArray(data);
      this.val = ko.observable('pie');
      this.connected = () => {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }
    function DataGridModel() {
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var cube = null;
      var dataArr = null;
      function generateCube(dataArr, axes) {
        return new Cube.DataValueAttributeCube(dataArr, axes,
          [{ attribute: 'Units', aggregation: Cube.CubeAggType.SUM },
                  { attribute: 'Sales' },
                  { attribute: 'Tax', aggregation: Cube.CubeAggType.AVERAGE }]);
      }
      var axes = [
        { axis: 0,
          levels: [
                { attribute: 'city' },
                { dataValue: true }] },
        { axis: 1,
          levels: [
                { attribute: 'year' },
                { attribute: 'product' }] },
        { axis: 2,
          levels: [
                { attribute: 'color' },
                { attribute: 'drivetrain' }] }];
      this.dataSource1 = ko.observable();
      dataArr = JSON.parse(file1);
      cube = generateCube(dataArr, axes);
      this.dataSource1(new Cube.CubeDataGridDataSource(cube));
  
  
      var currencyOptions =
      {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      };
      this.currencyConverter = new NumberConverter.IntlNumberConverter(
        currencyOptions);
      this.taxConverter = new NumberConverter.IntlNumberConverter(
      { style: 'percent', minimumFractionDigits: 2 });
      this.cellClassName = function (cellContext) {
        return 'oj-helper-justify-content-right';
      }
    }
    Bootstrap.whenDocumentReady().then(
      function () {
        ko.applyBindings(new DataGridModel(),
            document.getElementById('datagrid'));
      });
    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return IncidentsViewModel;
  }
  
);
