export interface VideoType {
  id: number;
  videoName: string;
  videoUrl: string;
  videoType: string;
  videoLanguage: string;
  textUrl: string;
  thumbnailUrl: string;
  captionUrl: string;
}

export interface UserType {
  email: string;
  password: string;
}

export interface LocationType {
  title: string;
  url: string;
  script: Array<{ start: string; end: string; text: string }>;
  vtt: string;
}

export interface ScriptType {
  script: {
    start: string;
    end: string;
    text: string;
  };
  currentTime: number | undefined;
  handleTimeline: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  convertTime: (arr: Array<string>) => number;
}
