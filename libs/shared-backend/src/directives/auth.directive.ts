import { MapperKind, getDirective, mapSchema } from "@graphql-tools/utils";
import { GraphQLError, GraphQLSchema, defaultFieldResolver } from "graphql";
import { set } from "lodash";

const authDirectiveArgumentMaps: Record<string, any> = {};
const isMHAdminDirectiveArgumentMaps: Record<string, any> = {};

export function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const isMHAdminDirective = getDirective(schema, type, "isMHAdmin")?.[0];
      if (isMHAdminDirective)
        isMHAdminDirectiveArgumentMaps[type.name] = isMHAdminDirective;

      const authDirective = getDirective(schema, type, "auth")?.[0];
      if (authDirective) authDirectiveArgumentMaps[type.name] = authDirective;

      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const isMHAdminDirective =
        getDirective(schema, fieldConfig, "isMHAdmin")?.[0] ??
        isMHAdminDirectiveArgumentMaps[typeName];
      if (isMHAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = function (source, args, context, info) {
          if (context.isMHAdmin) return resolve(source, args, context, info);
          throw new GraphQLError("invalid service token");
        };
        return fieldConfig;
      }

      const authDirective =
        getDirective(schema, fieldConfig, "auth")?.[0] ??
        authDirectiveArgumentMaps[typeName];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          if (context.isMHAdmin) return resolve(source, args, context, info);
          if (context.accessToken) {
            try {
              const { sdk } = appMainSDK(AccessMode.User, context.accessToken);
              const { current_user: user } = await sdk.getCurrentUser();
              if (user && user.status && user._id) {
                set(context, "userId", user._id);
                return resolve(source, args, context, info);
              }
            } catch (err) {}
          }
          throw new GraphQLError("Not authenticated / Not allowed field", {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          });
        };
        return fieldConfig;
      }
    },
  });
}
