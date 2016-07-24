(function (angular){
    'use strict';
    //知识点
    //1)在html页面，$scope.**　只需写**即可；但在js代码中，$scope.**要写$scope.**;
    // Your starting point. Enjoy the ride!
    var controllerApp=angular.module('appController',['appService']);
    controllerApp.controller('myController',[
        '$scope',
        '$location',
        'myService',function($scope,$location,myService){
        //功能１：显示数据
        $scope.tasks=myService.getData();

        //功能２：添加数据
        $scope.newTask='';
        $scope.add=function(){
            if(!$scope.newTask){
                return;
            }
            myService.add($scope.newTask);
            $scope.newTask='';
        }

        //功能３：删除数据
        $scope.remove=myService.remove;

        //功能４：编辑数据
        $scope.isEditing=-1;
        $scope.edit=function(id){
            $scope.isEditing=id;
        }
        //当输入框为可输入状态时，实际上数据已经一直在更新保存了，此时只需将状态更改为不可编辑状态即可
        $scope.save=function(){
            $scope.isEditing=-1;
            //编辑完数据，保存数据
            myService.save();
        }
        //功能５：切换完成状态[index.html添加两个属性即可]
        // //功能６：批量切换完成状态
        var status=true;
        $scope.toggleAll=function(){
            for(var i=0;i<$scope.tasks.length;i++){
                var item=$scope.tasks[i];
                item.completed=status;
            }
            status=!status;
        }
        //功能７：一键清除所有已完成的任务
        $scope.clearCompleted=function(){
            myService.clearCompleted();//此方法只更新了arr的值，没有更新$scope.tasks的值
            //知识点：tmp是新创建数组，如果直接赋值给arr,则arr的地址值改变了，不再指向$scope.tasks的地址
            //改进方法一:重新获取更新后的数组值；
            $scope.tasks=myService.getData();//
            //改进方法二：在service.js中用遍历方式，将数组tmp中的值一个个赋值给arr;

        }
        //另一种方法[不推存使用]:一旦tasks中的值发生改变，即马上保存数据
        // $scope.$watch('tasks',function(newValue,oldValue){
        //     myService.save();
        // });

        //功能８：如果有已完成的任务，显示“清除完成”按钮，否则，隐藏
        $scope.show=function(){
            for(var i=0;i<$scope.tasks.length;i++){
                if($scope.tasks[i].completed){
                    return true;//只要有一个是已完成的任务，则返回true,无需再遍历
                }
            }
            return false;
        }

        //功能９:随时更新未完成的任务的数量[实时更新:需要一直执行函数]
        $scope.getUnCompleted=myService.getUnCompleted;
        //功能10：点击completed按钮，只显示已经完成的任务;点击active按钮，只显示未完成的按钮；点击all,显示全部按钮;
        // //点击completed按钮，只显示已经完成的任务;
        // //方法一
        $scope.isCompleted={};//传入的是一个空对象，就不会产生过滤效果
        // // $scope.getAll=function(){
        // //     $scope.isCompleted={};
        // // }
        // // $scope.getActive=function () {
        // //     $scope.isCompleted={completed:false};
        // // }
        // // $scope.getCompleted=function () {
        // //     $scope.isCompleted={completed:true};
        // // }
        // //方法二
        // //1)获取页面的锚点地址[不带#]的方法:
        // //angular：$location.url();
        // //js:window.addEventListener("hashchange");
        // //2)动态监听锚点地址，实时改变页面内容;
        // //知识点：$scope.$watch()只能监听数据模型[$scope的值]
        $scope.loca=$location;
        $scope.$watch("loca.url()",function(newValue,oldValue){
            switch(newValue){
                case '/active':
                $scope.isCompleted={completed:false};
                break;
                case '/completed':
                $scope.isCompleted={completed:true};
                break;
                default:
                $scope.isCompleted={};
            }
        })
        
    }]);
   
})(angular);
