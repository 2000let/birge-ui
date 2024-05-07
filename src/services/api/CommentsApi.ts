import { Comments } from "@/models/Comments";
import { sendRequest, sendRequestMethodEnum } from "./BaseApi";


const getComments = (): Promise<Comments[]> => {
  return sendRequest<Comments[]>(sendRequestMethodEnum.GET, "comments");
};


export { getComments };  

