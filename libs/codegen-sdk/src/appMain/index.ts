import { GraphQLError } from "graphql";
import { GraphQLClient } from "graphql-request";
import { get } from "lodash";
import { SdkFunctionWrapper, getSdk } from "../generated/sdk";
import { AccessMode } from "../index";

const errorHandler: SdkFunctionWrapper = async <T>(
  action: () => Promise<T>
): Promise<T> => {
  try {
    const result = await action();
    return result;
  } catch (e) {
    throw new GraphQLError(
      get(
        JSON.parse((e as Error).message.split(":").slice(1).join(":")),
        "response.errors.0.message"
      )
    );
  }
};

export const appMainSDK = (mode: AccessMode, value: string) => {
  const client = new GraphQLClient(String(process.env.APP_MAIN_GATEWAY_URL), {
    headers:
      mode === AccessMode.MhAdmin
        ? {
            "mh-token": value,
          }
        : {
            Authorization: `Bearer ${value}`,
          },
  });
  const sdk = getSdk(client, errorHandler);
  return { sdk };
};
