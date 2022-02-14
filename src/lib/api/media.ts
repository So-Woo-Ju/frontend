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
  /*if (type === 1) {
    const { preSignedUrl } = await client({
      url: "/media/get-presigned-url",
      method: "post",
      data: { file },
    });
    const imageUrl;
    const res = await fetch(preSignedUrl, {
      method: "PUT",
      body: file,
    });
  } else {
    const res = await client({
      url: "/media/upload",
      method: "post",
      data: { url },
    });
  }*/

  return { data: "" };
};
