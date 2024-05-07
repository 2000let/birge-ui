import { Comments } from "@/models/Comments";
import { sendRequest, sendRequestMethodEnum } from "./BaseApi";

interface CommentsResponse {
  elements: Comments[];
  allElementsSize: number;
  currentOffset: number;
  currentLimit: number;
}

const comments = (): Promise<Comments[]> => {
  return sendRequest<Comments[]>(
    sendRequestMethodEnum.GET,
    "comments"
  );
};

const   getComments = async (offset?: number, limit?: number): Promise<CommentsResponse> => {
  //In a perfect world, the request for comments would have an offset/limit parameters, so I'm emulating here.
  const commentsData = (await comments());
  const length = commentsData.length;

  const mutationElements = (commentsData: Comments[]): Comments[] => {
    if (offset && !limit) {
      return commentsData.slice(offset, length);
    }

    if (!offset && limit) {
      return commentsData.slice(offset, length - (length - limit));
    }

    if (offset && limit) {
      return commentsData.slice(offset, length - (length - limit - offset));
    }

    return commentsData;
  };

  return {
    elements: mutationElements(commentsData),
    allElementsSize: length,
    currentLimit: limit || 0,
    currentOffset: offset || 0,
  };
};

export { getComments };  
export type { CommentsResponse };

