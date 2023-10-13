import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IPostDocument } from '../../../modules/post/post.model';
import { FeedServiceContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type CachePurgeInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  types: Array<Scalars['String']['input']>;
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  creator: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: FieldWrapper<Post>;
  deletePost: FieldWrapper<Post>;
  updatePost: FieldWrapper<Post>;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationDeletePostArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
};

export type Post = {
  __typename?: 'Post';
  _id: FieldWrapper<Scalars['ID']['output']>;
  author: FieldWrapper<User>;
  content?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  creator?: Maybe<FieldWrapper<Scalars['ID']['output']>>;
  imageUrl?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  feedServiceHello: FieldWrapper<Scalars['String']['output']>;
  getAllPost: Array<Maybe<FieldWrapper<Post>>>;
  getAllPostCount: FieldWrapper<Scalars['Int']['output']>;
  getOnePost?: Maybe<FieldWrapper<Post>>;
  getPostById?: Maybe<FieldWrapper<Post>>;
};


export type QueryGetAllPostArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllPostCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOnePostArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetPostByIdArgs = {
  _id: Scalars['ID']['input'];
};

export type UpdatePostInput = {
  _id: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['ID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: FieldWrapper<Scalars['ID']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type UnwrappedObject<T> = {
        [P in keyof T]: T[P] extends infer R | Promise<infer R> | (() => infer R2 | Promise<infer R2>)
          ? R & R2 : T[P]
      };
export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CachePurgeInput: CachePurgeInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CreatePostInput: CreatePostInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<IPostDocument>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  UpdatePostInput: UpdatePostInput;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CachePurgeInput: CachePurgeInput;
  String: Scalars['String']['output'];
  CreatePostInput: CreatePostInput;
  ID: Scalars['ID']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Post: IPostDocument;
  Query: {};
  Int: Scalars['Int']['output'];
  UpdatePostInput: UpdatePostInput;
  User: User;
  Boolean: Scalars['Boolean']['output'];
}>;

export type CachePurgeDirectiveArgs = {
  payloads: Array<CachePurgeInput>;
};

export type CachePurgeDirectiveResolver<Result, Parent, ContextType = FeedServiceContext, Args = CachePurgeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheSetDirectiveArgs = {
  identifier: Scalars['String']['input'];
  maxAge?: Maybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CacheSetDirectiveResolver<Result, Parent, ContextType = FeedServiceContext, Args = CacheSetDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IsMhAdminDirectiveArgs = { };

export type IsMhAdminDirectiveResolver<Result, Parent, ContextType = FeedServiceContext, Args = IsMhAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = FeedServiceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'data'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, '_id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data'>>;
}>;

export type PostResolvers<ContextType = FeedServiceContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Post']>, { __typename: 'Post' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = FeedServiceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  feedServiceHello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getAllPost?: Resolver<Array<Maybe<ResolversTypes['Post']>>, ParentType, ContextType, Partial<QueryGetAllPostArgs>>;
  getAllPostCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllPostCountArgs>>;
  getOnePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, Partial<QueryGetOnePostArgs>>;
  getPostById?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, '_id'>>;
}>;

export type UserResolvers<ContextType = FeedServiceContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;

  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = FeedServiceContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = FeedServiceContext> = ResolversObject<{
  cachePurge?: CachePurgeDirectiveResolver<any, any, ContextType>;
  cacheSet?: CacheSetDirectiveResolver<any, any, ContextType>;
  isMHAdmin?: IsMhAdminDirectiveResolver<any, any, ContextType>;
}>;
