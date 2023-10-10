import DataLoader from "dataloader";
import { UserByIdBatchFunc } from "../modules/user/user.loader";

export function getLoaders() {
  return {
    userByIdLoader: new DataLoader(UserByIdBatchFunc),
  };
}
