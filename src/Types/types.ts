export interface Launch {
  name: string;
  date_utc: string;
  links: {
    article: string;
  };
}
export interface LaunchArray {
  name: string;
  date_utc: string;
  links: {
    article: string;
  };
}

/*
interface IState {
  futurLaunches: [
    {
      name: string;
      date_utc: string;
      links: { article: string | null };
    }
  ];
}*/

export interface LaunchData {
  details: string;
  links: {
    article: any;
    flickr: { small: any; original: any };
    patch: { small: string; large: string };
    presskit: null | string;
    reddit: {
      campaign: null | string;
      launch: null | string;
      media: null | string;
      recovery: null | string;
    };
    webcast: null;
    wikipedia: null | string;
    youtube_id: null | string;
  };
  success: null | true | false;
  tbd: null | true | false;
  rocket: string;
  rocket_name: string;
}

export interface LaunchState {
  futurLaunches: Launch[] | null;
}
export interface LaunchDataState {
  data: LaunchData | null;
}
