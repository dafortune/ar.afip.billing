const dayjs = require("dayjs");

exports.serializeDate = function serializeDate(date) {
  if (!date) {
    return null;
  }

  return dayjs(date).format("YYYY-MM-DD");
};
