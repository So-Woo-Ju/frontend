export default function convertTime(arr: Array<string>): number {
  if (arr.length === 3) {
    const hour = Number(arr[0]) * 3600;
    const min = Number(arr[1]) * 60;
    const sec = Number(arr[2]);
    return hour + min + sec;
  } else {
    const min = Number(arr[0]) * 60;
    const sec = Number(arr[1]);
    return min + sec;
  }
}
