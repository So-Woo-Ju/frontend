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
  type: Number;
  title: string;
  url: string;
}
