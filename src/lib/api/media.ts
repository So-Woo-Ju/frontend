import client from "./client";
import convertScript from "util/convertScript";

export const load = () => {
  return client({
    url: "/media/my",
    method: "get",
  });
};

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
    const { status, statusText, url, vtt } = {
      status: 200,
      statusText: "OK",
      url: "https://s3-sowooju-video-an2.s3.ap-northeast-2.amazonaws.com/1-202205303005.mp4",
      vtt: "https://s3-sowooju-caption-an2.s3.ap-northeast-2.amazonaws.com/1-202205303005.vtt",
    };

    const script = await (
      await fetch(
        "https://s3-sowooju-text-an2.s3.ap-northeast-2.amazonaws.com/1-202205303005.json"
      )
    ).json();
    if (status === 200) {
      return { status, url, script: convertScript(script), vtt };
    } else {
      return { status, statusText };
    }
  }
};
