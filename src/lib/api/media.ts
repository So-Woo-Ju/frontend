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
    const script = [
      { time: "0:00", text: "시작해요?" },
      { time: "0:03", text: "어... 안녕, 안녕하세요. 제 이름은 최웅이에요." },
      { time: "0:09", text: "(하품소리)" },
      { time: "0:13", text: "카메라 보지마요." },
      { time: "0:14", text: "자꾸 신경 쓰이는데." },
      { time: "0:16", text: "카메라가 없다고 생각해요." },
      { time: "0:19", text: "근데 바로 옆에 있는데 어떻게 없다고 생각해요." },
      { time: "0:21", text: "보다시피 어.. 촬영 당하고 있어요." },
      { time: "0:25", text: "멍청아, 앞에나 봐." },
      { time: "0:31", text: "혼자가 아니라" },
      { time: "0:33", text: "얼빵하게 보지말고 앞이나 보라고." },
      { time: "0:36", text: "재수없는 애랑 같이요." },
      { time: "0:38", text: "제 이름은 국연수예요." },
      { time: "0:41", text: "처음 최웅을 본 건 1학년 때인가." },
      { time: "0:51", text: "선생님." },
      { time: "0:52", text: "응." },
      { time: "0:53", text: "최웅이 누구예요?" },
      { time: "0:54", text: "이번 달에도 걔가 1등이에요?" },
    ];
    if (status === 200) {
      // 머신러닝 작동 호출
      return { status, url, script };
    } else {
      return { status, statusText };
    }
  } else {
    /*const res = await client({
      url: "/media/upload",
      method: "post",
      data: { url },
    });*/
    const script = [
      { time: "0:00", text: "시작해요?" },
      { time: "0:03", text: "어... 안녕, 안녕하세요. 제 이름은 최웅이에요." },
      { time: "0:09", text: "(하품소리)" },
      { time: "0:13", text: "카메라 보지마요." },
      { time: "0:14", text: "자꾸 신경 쓰이는데." },
      { time: "0:16", text: "카메라가 없다고 생각해요." },
      { time: "0:19", text: "근데 바로 옆에 있는데 어떻게 없다고 생각해요." },
      { time: "0:21", text: "보다시피 어.. 촬영 당하고 있어요." },
      { time: "0:25", text: "멍청아, 앞에나 봐." },
      { time: "0:31", text: "혼자가 아니라" },
      { time: "0:33", text: "얼빵하게 보지말고 앞이나 보라고." },
      { time: "0:36", text: "재수없는 애랑 같이요." },
      { time: "0:38", text: "제 이름은 국연수예요." },
      { time: "0:41", text: "처음 최웅을 본 건 1학년 때인가." },
      { time: "0:51", text: "선생님." },
      { time: "0:52", text: "응." },
      { time: "0:53", text: "최웅이 누구예요?" },
      { time: "0:54", text: "이번 달에도 걔가 1등이에요?" },
    ];
    return { status: 200, url: "url", script };
  }
};
