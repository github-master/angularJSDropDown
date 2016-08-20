/*
var unitList = 
{
    "Length": ["Kilometer", "Meter", "Centermeter", "Milimeter", "Mile"], 
    "Temperature": [], 
    "Speed": [], 
    "Volumn": [],
    "Area": [], 
    "Time": [], 
    "Angle": [], 
    "Energy": [],
    "Power": []
                
};

function attachEvents() {

}

console.error("key =" );
$(document).ready(function() {
    var div = document.getElementById("unites");
    console.error("unitList.length=" + Object.keys(unitList).length);
    if(unitList && Object.keys(unitList).length > 0) {
        frag = document.createDocumentFragment(),
        select = document.createElement("select");
        select.id="listClass";
        console.error("key2 =");
        var i =0;
        for (var key in unitList) {
            console.error("key =" + key);
            if(i== 0) {
                select.options.add( new Option(key,key, true, true) );
            } else {
                select.options.add(new Option(key, key));
            }
            i++;
            frag.appendChild(select);
        }

        frag.appendChild(select);
        div.appendChild(frag);
    }

})
*/
var myApp = angular.module('myApp', []);
myApp. controller('unitController', function($scope) {
    $scope.unitList = [
        {
            id: 0, 
            name:'Distance',
            units:[{id:0, unit:"Kilometer"}, {id:1, unit:"Meter"}, {id: 2, unit:"Centermeter"}, {id:3, unit:"Milimeter"}, {id:4, unit:"Mile"}, {id:5, unit:"Yard"}, {id:6, unit:"Foot"}, {id:7, unit:"Inch"}, 
                    {id:8, unit:"Mil"}, {id:9, unit:"Nautical mile"}],
            converter:[1,1000,100000,1000000,0.62137119,1093.6133,3280.8399,39370.0787,39370078.7,0.5399568],
            popular:4
        },
        {
            id: 1, 
            name:'Weight', 
            units: [{id:0, unit:"Kilogram"}, {id:1, unit:"Gram"}, {id:2, unit:"Miligram"}, {id:3, unit:"Microgram"}, {id:4, unit:"Metric Ton"}, {id: 5, unit:"Long ton"}, {id: 6, unit:"Short ton"},
                    {id: 7, unit:"Metric quintal"},{id: 8, unit:"US quintal"},{id: 9, unit:"Pound"},{id:10,unit:"Ounce"}],
            converter:[1,1000,1000000,1000000000,0.001,0.00098421,0.00110231, 0.01, 0.02204623, 2.20462262,35.273962],
            popular:9
        } ,
        {
            id: 2, 
            name:'Volume',
            units: [{id:0, unit:"US gallon"}, {id:1, unit:"US quart"}, {id:2, unit:"US pint"}, {id:3, unit:"US cup"}, {id:4, unit:"US ounce"}, {id: 5, unit:"US tablespoon"},{id:6,unit:"US teaspoon"},{id:7,unit:"Imperial gallon"},
                    {id:8, unit:"Imperial quart"}, {id:9, unit:"Imperial pint"}, {id:10, unit:"Imperial ounce"}, {id:11, unit:"Imperial tbsp"}, {id: 12, unit:"Imperial tsp"}, {id: 13, unit:"Liter"}, {id: 14, unit:"Milliliter"}, 
                    {id: 15, unit:"Cubic meter"}, {id: 16, unit:"Cubic foot"}, {id: 17, unit:"Cubic inch"}],
            converter:[1,4,8,16,128,256,768, 0.83267382,3.33069527,6.66139054,133.227811,213.164497,639.493492,3.78541178,3785.41178,0.00378541,0.13368056,231],
            popular:13
        }/*,
        {
            id: 1, 
            name:'Temperature',
            units:[{id:0, unit:"Celsius"}, {id:1, unit:"Fahrenheit"}, {id:2, unit:"Kelvin"}], 
            converter:[1,33.8,274.15],
            popular:1
        },
        {id: 4, name:'Area',units:'[""]', popular:"Mile"},
        {id: 5, name:'Time',units:'[""]', popular:"Mile"},
        {id: 6, name:'Angle',units:'[""]', popular:"Mile"},
        {id: 7, name:'Energy',units:'[""]', popular:"Mile"},
        {id: 8, name:'Power',units:'Denmark', popular:"Mile"} */
    ];
    var startInputFocused = true;

    $scope.listChange = function() {
        console.error("listchange; = " + $scope.selected.units[0].unit);
        $scope.curUnit1 = $scope.selected.units[0].id;
        $scope.curUnit2 = $scope.selected.popular;
      
        var indexPop = parseInt($scope.curUnit2);
        $scope.startBox = (1).toString();
        $scope.endBox = ($scope.selected.converter[indexPop]).toString();
        //$scope.$apply();
    };
    $scope.getResultStr = function(result) {  //NOTE: result is number,
        var resultStr;
        if(angular.isNumber(result)) {
            resultStr = result.toString();
            if(result % 1 != 0 && resultStr.length > 9) {
               resultStr = result.toPrecision(9);
            }
        } else {
            resultStr = result;
        }
        return resultStr;
    };

    $scope.sublistChange = function() {
        var temp, result, resultStr;
        var index1 = parseInt($scope.curUnit1);
        var index2 = parseInt($scope.curUnit2);
        //console.error("startInput; = " + index2  + "$scope.selected.converter[index2] =" + $scope.selected.converter[index2] + "$scope.startBox=" +$scope.startBox);
        if(startInputFocused) {
            temp = Number($scope.startBox)
            result = (temp * Number($scope.selected.converter[index2]) / Number($scope.selected.converter[index1]));
            $scope.endBox = $scope.getResultStr(result);
        } else {
            temp = Number($scope.endBox)
            result = (temp * Number($scope.selected.converter[index1]) / Number($scope.selected.converter[index2])); 
            $scope.startBox  = $scope.getResultStr(result);
        }
      
        //$scope.$apply();
    };

    $scope.startInput = function() {
       
        var temp = Number($scope.startBox), result, resultStr;
        if($scope.startBox == '-') {
            $scope.endBox = "";
        } else {
            var index1 = parseInt($scope.curUnit1);
            var index2 = parseInt($scope.curUnit2);
            //console.error("startInput; temp= " + temp  + "$scope.selected.converter[index2] =" + $scope.selected.converter[index2] + "$scope.startBox=" + temp* Number($scope.selected.converter[index2]));
            result = (temp * Number($scope.selected.converter[index2]) / Number($scope.selected.converter[index1]));
           
           $scope.endBox = $scope.getResultStr(result);
        }
        //$scope.$apply();
    };

    $scope.endInput = function() {
        var temp = Number($scope.endBox), result, resultStr; 
         if($scope.endBox == '-') {
            $scope.startBox = "";
        } else {
            var index1 = parseInt($scope.curUnit1);
            var index2 = parseInt($scope.curUnit2);
            //console.error("startInput; = " + $scope.curUnit2 );
            
            result = temp * Number($scope.selected.converter[index1]) / Number($scope.selected.converter[index2]);
            $scope.startBox  = $scope.getResultStr(result);
           //$scope.startBox = 'endget';
            //$scope.$apply();
        }
    };

     $scope.startFocused = function() {
        startInputFocused = true;
        angular.element(document.querySelector('#startBox')).css('border-color', '#FFF');
        angular.element(document.querySelector('#endBox')).css('border-color', '#2B60DE'); 
        //$scope.$apply();
    };

     $scope.endFocused = function() {
        startInputFocused = false;
        angular.element(document.querySelector('#endBox')).css('border-color', '#FFF');
        angular.element(document.querySelector('#startBox')).css('border-color', '#2B60DE');
    };

    $scope.start = function() {
        $scope.selected = $scope.unitList[0]; 
        var indexPop = parseInt($scope.selected.popular);
        $scope.endBox = $scope.getResultStr($scope.selected.converter[indexPop]);
    };


    $scope.start();
 

    //$scope.curUnit1 = $scope.unitList[0].units[0].unit;
    //$scope.curUnit2 = $scope.unitList[0].units[4].unit;
    //$scope.curUnit2 = $scope.unitList[0].popular;
   // $scope.selected.units
    //$scope.selected1 = $scope.unitList[0].units;
    //$scope.selected2 = $scope.selected.popular;
});

myApp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {    
            scope.$watch('endBox', function(newValue,oldValue) {             
                if(newValue != "NaN" && newValue != oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                    if (arr.length === 2 && newValue === '-.') return;
                    if (isNaN(newValue)) {
                        scope.endBox = oldValue;
                        scope.endInput();
                    }
                }
            });
            scope.$watch('startBox', function(newValue,oldValue) {
                if(newValue != "NaN" && newValue != oldValue) {
                    var arr = String(newValue).split("");
                    if (arr.length === 0) return;
                    if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                    if (arr.length === 2 && newValue === '-.') return;
                    if (isNaN(newValue)) {
                        scope.startBox = oldValue;
                         scope.startInput();
                    }
                }
            }); 
        }
    };
});
