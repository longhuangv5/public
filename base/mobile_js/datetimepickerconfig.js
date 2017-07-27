(function(){
	'use strict'
	
	app.config(['ionicDatePickerProvider', 'ionicTimePickerProvider',function (ionicDatePickerProvider, ionicTimePickerProvider) {
            var time = (new Date()).getMinutes();
            time = time+30-time%30;
            var timePickerObj = {
                inputTime: (((new Date()).getHours() * 60 * 60) + (time * 60)),
                format: 24,
                step: 15,
                setLabel: '确定',
                closeLabel: '关闭'
            };

            var datePickerObj = {
                inputDate: new Date(),
                setLabel: '确定',
                todayLabel: '今天',
                closeLabel: '关闭',
                mondayFirst: false,
                weeksList: ["日", "一", "二", "三", "四", "五", "六"],
                monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                templateType: 'popup',
                from: new Date(),
                to: new Date(2050, 1, 1),
                showTodayButton: true,
                dateFormat: 'yyyy-MM-dd',
                closeOnSelect: false
            };
            ionicDatePickerProvider.configDatePicker(datePickerObj);
            ionicTimePickerProvider.configTimePicker(timePickerObj);
        }]);
})()
