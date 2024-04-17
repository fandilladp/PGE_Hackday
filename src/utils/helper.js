import moment from "moment";
import "moment/locale/id";

export function getDailyAlert(data) {
  return data?.forecast?.filter((item) => item?.alert_daily !== null)[0]
    ?.alert_daily;
}

export function formatDate(date) {
  return moment(date).locale("id").format("dddd, DD MMMM YYYY");
}
