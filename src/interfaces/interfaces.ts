export interface VideoType {
  id: number;
  src: string;
  videoName: string;
  videoUrl: string;
  videoType: string;
  videoLanguage: string;
}

export interface UserType {
  email: string;
  password: string;
}

export interface LocationType {
  title: string;
  url: string;
  script: Array<{ start: string; end: string; text: string }>;
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
