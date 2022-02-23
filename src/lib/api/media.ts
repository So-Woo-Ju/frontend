import client from "./client";

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

export const upload = async (type: Number, file: File | null, url: string) => {
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
    if (status === 200) {
      // 머신러닝 작동 호출
      return { status, url };
    } else {
      return { status, statusText };
    }
  } else {
    /*const res = await client({
      url: "/media/upload",
      method: "post",
      data: { url },
    });*/
    return { data: "" };
  }
};
