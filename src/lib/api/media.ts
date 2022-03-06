import client from "./client";
import { my_script } from "../timeline";

export const load = (email: string) => {
  return {
    data: [
      {
        id: 1,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 2,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 3,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 4,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 5,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 6,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
      {
        id: 7,
        src: "",
        userId: "",
        videoName: "제목제목",
        videoUrl: "",
        videoType: "",
        videoLanguage: "",
      },
    ],
  };
};

function convertScript(data: Array<{ start: number; textEdited: string }>) {
  return data.map((t: { start: number; textEdited: string }) => {
    return {
      time:
        String(Math.floor(t.start / 1000 / 60)).padStart(2, "0") +
        ":" +
        String(Math.floor(t.start / 1000) % 60).padStart(2, "0"),
      text: t.textEdited,
    };
  });
}
export const upload = async (
  type: Number,
  file: File | null,
  youtubeUrl: string,
) => {
  if (type === 1) {
    const {
      data: { data },
    } = await client({
      url: "/media/video/presigned-url",
      method: "get",
    });
    const { status, statusText, url } = await fetch(data.videoS3Url, {
      method: "PUT",
      body: file,
    });
    const script = convertScript(my_script.segments);
    if (status === 200) {
      // 머신러닝 작동 호출
      const src = url.split("?")[0];
      return { status, url: src, script };
    } else {
      return { status, statusText };
    }
  } else {
    /*const res = await client({
      url: "/media/upload",
      method: "post",
      data: { url },
    });*/
    const script = convertScript(my_script.segments);
    let url;
    if (youtubeUrl.includes("watch")) {
      url = youtubeUrl.split("v=")[1].split("&")[0];
    } else {
      url = youtubeUrl.split("/")[3];
    }
    return { status: 200, url, script };
  }
};
