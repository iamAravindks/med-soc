import DataLoader from "dataloader";
import { PostByIdBatchFunc } from "../modules/post/post.loader";

export function getLoaders() {
  return {
    postByIdLoader: new DataLoader(PostByIdBatchFunc),
  };
}
