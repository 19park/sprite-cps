import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import {getQueryParam} from "@/assets/utils/index";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.tz.setDefault("Asia/Seoul");

const getQueryDay = getQueryParam("d");
export const currentDay = getQueryDay ? dayjs(getQueryDay).tz() : dayjs().tz();
const startDay0920 = dayjs('2024-09-20T00:00:00').tz();
const startDay0923 = dayjs('2024-09-23T10:00:00').tz();
const startDay0930 = dayjs('2024-09-30T00:00:00').tz();
const startDay1007 = dayjs('2024-10-07T00:00:00').tz();
const startDay1014 = dayjs('2024-10-14T00:00:00').tz();
const eventEndDay = dayjs('2024-11-01T00:00:00').tz();

export const isEvent0920 = currentDay.isAfter(startDay0920) || currentDay.isSame(startDay0920);
export const isEvent0923 = currentDay.isAfter(startDay0923) || currentDay.isSame(startDay0923);
export const isEvent0930 = currentDay.isAfter(startDay0930) || currentDay.isSame(startDay0930);
export const isEvent1007 = currentDay.isAfter(startDay1007) || currentDay.isSame(startDay1007);
export const isEvent1014 = currentDay.isAfter(startDay1014) || currentDay.isSame(startDay1014);
export const isEventEnd = eventEndDay.diff(currentDay, 'hours', true) <= 0;