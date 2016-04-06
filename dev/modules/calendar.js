module.exports.calendar = function (dt, cottage, bookingsObj) {

    var numberOfMonths = 12;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var daysCalendar = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var daysObj = {
        'Sunday': 1,
        'Monday': 2,
        'Tuesday': 3,
        'Wednesday': 4,
        'Thursday': 5,
        'Friday': 6
    };
    var daysInMonthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var months   = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var month = dt.getMonth(),
        year = dt.getFullYear(),
        table = '',
        saturday,
        startOfWeek,
        daysInMonth,
        daysInCalendar,
        rows,
        count,
        firstDate;

    for (var i = 0; i < numberOfMonths; i++) {

        firstDate = new Date(year, month, 1);
        firstDay = days[firstDate.getDay()];

        if (firstDay === 'Saturday') {
            saturday = 1;
        } else {
            saturday = 1 + (days.length - daysObj[firstDay]);
        }

        count = saturday;

        if (year % 4 === 0 && month === 1) {
            daysInMonth = 29;
        } else {
            daysInMonth = daysInMonthsArray[month];
        }

        daysInCalendar = (daysInMonth - (saturday - 1)) > 28 ? 35 : 28;
        rows = daysInCalendar / 7;

        table += '<table border="1">';
        table += '<tr>';
        table += '<th colspan="8">' + months[month] + ' ' + year + '</th>';
        table += '</tr>';

        table += '<tr>';
        for (var j = 0; j < daysCalendar.length; j++) {
            table += '<th>' + daysCalendar[j] + '</th>';
        }
        table += '<th></th>';
        table += '</tr>';
        for (var k = 0; k < rows; k++) {
            for (var col = 0; col < 8; col++) {
                var m = (month + 1).toString().length === 1 ? '0' + (month + 1) : month + 1;
                var d = count.toString().length === 1 ? '0' + count : count;
                if (!startOfWeek) {
                    startOfWeek = '' + year + m + d;
                    if (bookingsObj[startOfWeek]) {
                        table += '<tr class="unavailable">';
                    } else {
                        table += '<tr>';
                    }
                }
                if (col === 6) {
                    endOfWeek = '' + year + m + d;
                }
                if (col === 7) {
                    table += '<td>';
                    if (bookingsObj[startOfWeek]) {
                        table += '£' + bookingsObj[startOfWeek].total;
                    } else {
                        table += '£TBD';
                    }
                    table += '</td>';
                    startOfWeek = null;
                } else {
                    table += '<td>' + count++ + '</td>';
                }
                if (count > daysInMonth) {
                    count = 1;
                    if (month < 11) {
                        month++;
                    } else {
                        month = 0;
                        year++;
                    }
                }

            }
            table += '</tr>';
        }
        table += '</table>';
    }
   return table;

};