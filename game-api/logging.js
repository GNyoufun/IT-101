/**
 * United logging function for records 
 * @param {String} str The out for logging
 * @param {String} department The logging from which to part of the app
 * @param {Date} [time=new Date()] The time for which the log was generated
 */
 function logging (str, department, time = new Date()) {
    const logs = time + ' - '; + department + " - " + str + "\n";
    console.log(logs);
  }

  module.exports = logging;