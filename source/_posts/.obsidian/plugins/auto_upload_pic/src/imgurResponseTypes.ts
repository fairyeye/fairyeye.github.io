export type ImgurErrorData = {
  success: boolean;
  status: number;
  data: {
    request: string;
    method: string;
    error: string;
  };
};

export type AccountInfo = {
  success: boolean;
  status: number;
  data: {
    id: number;
    created: number;

    url: string;
    bio: string;
    avatar: string;
    avatar_name: string;
    cover: string;
    cover_name: string;
    reputation: number;
    reputation_name: string;

    pro_expiration: boolean;

    user_flow: {
      status: boolean;
    };

    is_blocked: boolean;
  };
};

export type ImgurPostData = {
  success: boolean;
  status: number;
  data: {
    datetime: number;
    id: string;
    link: string;
    url: string;
    deletehash: string;

    size: number;
    width: number;
    height: number;

    type: string;
    animated: boolean;
    has_sound: boolean;
  };
};
