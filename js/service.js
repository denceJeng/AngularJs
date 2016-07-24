(function(angular) {
    'use strict';

    // 1.创建模块
    var appService = angular.module('appService', []);
    appService.service('myService', ['$log', '$window', function($log, $window) {
        //$window=window;
        //window.localStorage:里面是一个数组，用来存放多个对象
        var storage = $window.localStorage;
        var str = storage.getItem('todos');//获取得到的是字符串
        var arr = JSON.parse(str || '[]');//将得到的字符串转换为数组

        //功能１：显示数据
        this.getData= function() {
            return arr;
        }

        //功能２：添加数据
        this.add = function(newTask) {
            var id;
            if (arr.length <= 0) {
                id = 0;
            } else {
                id = arr[arr.length-1].id+1;
            }
            arr.push({ id: id, name: newTask, completed: false });
            this.save();
        }

        //功能３：删除数据
        this.remove = function(id) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.id == id) {
                    arr.splice(i, 1);
                    //删除数据之后要将数据保存
                    this.save();
                    return; 
                }
            }
        }

        // 4.保存数据
        this.save = function() {
            var arr_str = JSON.stringify(arr);
            storage.setItem('todos', arr_str);
        }

      　//功能７：一键清除所有已完成的任务
        this.clearCompleted= function() {
            var tmp = []; // 都是未完成的数据
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                // 把completed为false数据添加到tmp里
                if (item.completed == false) {
                    tmp.push(item);
                }
            }
            // 注意，通过下面这行代码之后，arr被重新指向了一个新数组，不再和$scope.tasks指向一个数组，那么此时arr变化就不会导致$scope.tasks变化了。
            arr = tmp;

            // arr.length=0;// 把数组长度清为0，数组变为一个空数组，但还是原来的数组.
            // for (var i = 0; i < tmp.length; i++) {
            //   // Things[i]
            //   //可以直接遍历tmp数据
            //   arr[arr.length] = tmp[i];// 可以直接给一个数据赋值
            // }

            this.save();
        }

        // 获取所有未完成的的任务数
        this.getUnCompleted=function(){
          var count = 0;
          for (var i = 0; i < arr.length; i++) {
            var item =arr[i];
            if(!item.completed){
              count++;
            }
          }
          return count;
        }
    }])

})(angular)
