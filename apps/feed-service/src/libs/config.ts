import DataLoader from "dataloader";
import { LikeByIdBatchFunc } from "../modules/like/like.loader";
import { PostByIdBatchFunc } from "../modules/post/post.loader";

export function getLoaders() {
  return {
    postByIdLoader: new DataLoader(PostByIdBatchFunc),
    likeByIdLoader: new DataLoader(LikeByIdBatchFunc),
  };
}
