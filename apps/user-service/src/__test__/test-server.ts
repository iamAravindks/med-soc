import { ApolloServer } from "@apollo/server";
import { CacheService, responseCachePlugin } from "@hubspire/cache-directive";
import { RedisMemoryServer } from "redis-memory-server";
import { UserServiceContext } from "../libs/types";
import { Modules } from "../modules";
import { TestDB } from "./test-db";

export default class TestApolloServer {
  public redisClient!: CacheService;

  constructor(
    public readonly apollo = new ApolloServer<UserServiceContext>({
      schema: Modules.schemas,
      plugins: [responseCachePlugin<UserServiceContext>()],
    })
  ) {}

  async start() {
    await TestDB.connect();
    const redisServer = new RedisMemoryServer();
    this.redisClient = await CacheService.start({
      cache_prefix: "UserService",
      redis_host: await redisServer.getHost(),
      redis_port: await redisServer.getPort(),
    });
    await this.apollo.start();
  }
  async stop() {
    await TestDB.disconnect();
    await this.apollo.stop();
  }
}
