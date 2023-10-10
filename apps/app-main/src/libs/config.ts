import { RemoteGraphQLDataSource } from "@apollo/gateway";
import { AppMainContext } from "./types";

export class HeaderDataSource extends RemoteGraphQLDataSource {
  willSendRequest({
    request,
    context,
  }: {
    request: any;
    context: Partial<AppMainContext>;
  }) {
    request.http.headers.set("Authorization", context.authorization);
    if (context.isMHAdmin) {
      switch (String(request.http.url)) {
        case String(process.env.FEED_SERVICE_URL):
          request.http.headers.set("mh-token", process.env.FEED_SERVICE_TOKEN);
          break;
        case String(process.env.USER_SERVICE_URL):
          request.http.headers.set("mh-token", process.env.USER_SERVICE_TOKEN);
          break;
      }
    }
  }
}
