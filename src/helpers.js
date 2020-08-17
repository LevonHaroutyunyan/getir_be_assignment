/**
 * Returns an object of the given params, to use a json response
 *
 * @param code - Status Code
 * @param msg - Status message
 * @param records - Data
 * @returns {{msg: string, code: int, records: array}}
 */
const getRespObj = (code, msg, records = []) => ({
  code,
  msg,
  records
});

const errorFormatter = ({ msg, param, value }) => `${param}: ${msg}: ${value}`;

module.exports = {
  getRespObj,
  errorFormatter
};
