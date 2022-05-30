export default function convertScript(
  data: Array<{ start: number; end: number; text: string }>
) {
  return data.map((t: { start: number; end: number; text: string }, idx) => {
    return {
      id: idx,
      start:
        String(Math.floor(t.start / 60)).padStart(2, "0") +
        ":" +
        String(Math.floor(t.start) % 60).padStart(2, "0"),
      end:
        String(Math.floor(t.end / 60)) +
        ":" +
        String(Math.floor(t.end) % 60).padStart(2, "0"),
      text: t.text,
    };
  });
}
