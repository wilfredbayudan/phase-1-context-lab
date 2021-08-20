/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let testEmployee = {
  firstName: 'Wilfred',
  familyName: 'Bayudan',
  title: 'Corporate Trainer',
  payPerHour: 30,
  timeInEvents: [
    { type: 'TimeIn', hour: 900, date: '2021-08-07' },
    { type: 'TimeIn', hour: 1400, date: '2021-08-07' },
    { type: 'TimeIn', hour: 1200, date: '2021-08-08' },
    { type: 'TimeIn', hour: 1000, date: '2021-08-09' },
  ],
  timeOutEvents: [
    { type: 'TimeOut', hour: 1000, date: '2021-08-07' },
    { type: 'TimeOut', hour: 1500, date: '2021-08-07' },
    { type: 'TimeOut', hour: 2300, date: '2021-08-08' },
    { type: 'TimeOut', hour: 2300, date: '2021-08-09' },
  ]
}

let testRecords = [
  {
    firstName: 'Wilfred',
    familyName: 'Bayudan',
    title: 'Corporate Trainer',
    payPerHour: 30,
    timeInEvents: [
      { type: 'TimeIn', hour: 900, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1400, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1200, date: '2021-08-08' },
      { type: 'TimeIn', hour: 1000, date: '2021-08-09' },
    ],
    timeOutEvents: [
      { type: 'TimeOut', hour: 1000, date: '2021-08-07' },
      { type: 'TimeOut', hour: 1500, date: '2021-08-07' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-08' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-09' },
    ]
  },
  {
    firstName: 'Bob',
    familyName: 'Joe',
    title: 'Corporate Trainer',
    payPerHour: 30,
    timeInEvents: [
      { type: 'TimeIn', hour: 900, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1400, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1200, date: '2021-08-08' },
      { type: 'TimeIn', hour: 1000, date: '2021-08-09' },
    ],
    timeOutEvents: [
      { type: 'TimeOut', hour: 1000, date: '2021-08-07' },
      { type: 'TimeOut', hour: 1500, date: '2021-08-07' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-08' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-09' },
    ]
  },
  {
    firstName: 'Alice',
    familyName: 'Wonderland',
    title: 'Corporate Trainer',
    payPerHour: 30,
    timeInEvents: [
      { type: 'TimeIn', hour: 900, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1400, date: '2021-08-07' },
      { type: 'TimeIn', hour: 1200, date: '2021-08-08' },
      { type: 'TimeIn', hour: 1000, date: '2021-08-09' },
    ],
    timeOutEvents: [
      { type: 'TimeOut', hour: 1000, date: '2021-08-07' },
      { type: 'TimeOut', hour: 1500, date: '2021-08-07' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-08' },
      { type: 'TimeOut', hour: 2300, date: '2021-08-09' },
    ]
  },
]

// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
  let createdRecords = []
  arr.forEach(employee => createdRecords.push(createEmployeeRecord(employee)));
  return createdRecords;
}

function createTimeInEvent(dateStamp) {
  let updatedEmployee = this;

  const hourDate = dateStamp.split(' ');
  const date = hourDate[0];
  const hour = parseInt(hourDate[1]);

  const timeIn = {
    type: 'TimeIn',
    hour,
    date
  }

  updatedEmployee.timeInEvents.push(timeIn);

  return updatedEmployee;
}

function createTimeOutEvent(dateStamp) {
  let updatedEmployee = this;
  const hourDate = dateStamp.split(' ');
  const date = hourDate[0];
  const hour = parseInt(hourDate[1]);

  const timeOut = {
    type: 'TimeOut',
    hour,
    date
  }

  updatedEmployee.timeOutEvents.push(timeOut);

  return updatedEmployee;
}

function hoursWorkedOnDate(date) {
  const timeInEvents = this.timeInEvents.filter(timeEvent => timeEvent.type === 'TimeIn' && timeEvent.date === date);
  const timeOutEvents = this.timeOutEvents.filter(timeEvent => timeEvent.type === 'TimeOut' && timeEvent.date === date);
  let hoursWorked = 0;
  if (timeInEvents.length === timeOutEvents.length) {

    for (let i = 0; i < timeInEvents.length; i++) {
      hoursWorked += timeOutEvents[i].hour - timeInEvents[i].hour;
    }

  } else {
    console.log(`Missing punch.`);
  }

  return hoursWorked/100;

}

function wagesEarnedOnDate(date) {    
  // return hoursWorkedOnDate(date) * this.payPerHour;
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}



const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.map(employee => allWagesFor.call(employee)).reduce((a, b) => a + b);
}
