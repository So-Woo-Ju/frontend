import client from "./client";

export const load = () => {
  return client({
    url: "/media/my",
    method: "get",
  });
};

function convertScript(
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
export const upload = async (
  title: string,
  lang: number,
  type: Number,
  file: File | null,
  youtubeUrl: string
) => {
  if (type === 1) {
    const {
      data: {
        data: { videoS3Url, fileName },
      },
    } = await client({
      url: "/media/video/presigned-url",
      method: "get",
    });
    const { status, statusText } = await fetch(videoS3Url, {
      method: "PUT",
      body: file,
    });
    if (status === 200) {
      const {
        data: { data },
      } = await client({
        url: "/media/result",
        method: "post",
        data: {
          videoName: title,
          videoType: "LOCAL",
          videoLanguage: lang === 1 ? "KOR" : "ENG",
          fileName: fileName,
        },
      });

      const script = await (await fetch(data.textUrl)).json();
      const src = data.videoUrl.split("?")[0];
      return {
        status,
        url: src,
        script: convertScript(script),
        vtt: data.captionUrl,
      };
    } else {
      return { status, statusText };
    }
  } else {
    /*const res = await client({
      url: "/media/upload",
      method: "post",
      data: { youtubeUrl },
    });*/
    const { status, statusText, url, vtt } = {
      status: 200,
      statusText: "OK",
      url: "https://s3-sowooju-video-an2.s3.ap-northeast-2.amazonaws.com/11-202203140939.mp4",
      vtt: "https://s3-sowooju-caption-an2.s3.ap-northeast-2.amazonaws.com/test.vtt",
    };

    const script = await (
      await fetch(
        "https://s3-sowooju-text-an2.s3.ap-northeast-2.amazonaws.com/1-202205274931.json"
      )
    ).json();
    if (status === 200) {
      // 머신러닝 작동 호출
      const src = url.split("?")[0];
      return { status, url: src, script, vtt };
    } else {
      return { status, statusText };
    }
  }
};
