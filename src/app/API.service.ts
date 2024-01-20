/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreatePhoto: OnCreatePhotoSubscription;
  onUpdatePhoto: OnUpdatePhotoSubscription;
  onDeletePhoto: OnDeletePhotoSubscription;
  onCreateTag: OnCreateTagSubscription;
  onUpdateTag: OnUpdateTagSubscription;
  onDeleteTag: OnDeleteTagSubscription;
};

export type CreatePhotoInput = {
  id?: string | null;
  url: string;
  description?: string | null;
};

export type ModelPhotoConditionInput = {
  url?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelPhotoConditionInput | null> | null;
  or?: Array<ModelPhotoConditionInput | null> | null;
  not?: ModelPhotoConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Photo = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: ModelTagConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection";
  items: Array<Tag | null>;
  nextToken?: string | null;
};

export type Tag = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type UpdatePhotoInput = {
  id: string;
  url?: string | null;
  description?: string | null;
};

export type DeletePhotoInput = {
  id: string;
};

export type CreateTagInput = {
  id?: string | null;
  name: string;
  photoTagsId?: string | null;
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelTagConditionInput | null> | null;
  or?: Array<ModelTagConditionInput | null> | null;
  not?: ModelTagConditionInput | null;
  photoTagsId?: ModelIDInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateTagInput = {
  id: string;
  name?: string | null;
  photoTagsId?: string | null;
};

export type DeleteTagInput = {
  id: string;
};

export type ModelPhotoFilterInput = {
  id?: ModelIDInput | null;
  url?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelPhotoFilterInput | null> | null;
  or?: Array<ModelPhotoFilterInput | null> | null;
  not?: ModelPhotoFilterInput | null;
};

export type ModelPhotoConnection = {
  __typename: "ModelPhotoConnection";
  items: Array<Photo | null>;
  nextToken?: string | null;
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelTagFilterInput | null> | null;
  or?: Array<ModelTagFilterInput | null> | null;
  not?: ModelTagFilterInput | null;
  photoTagsId?: ModelIDInput | null;
};

export type ModelSubscriptionPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  url?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPhotoFilterInput | null> | null;
  or?: Array<ModelSubscriptionPhotoFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionTagFilterInput | null> | null;
  or?: Array<ModelSubscriptionTagFilterInput | null> | null;
};

export type CreatePhotoMutation = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePhotoMutation = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeletePhotoMutation = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTagMutation = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type UpdateTagMutation = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type DeleteTagMutation = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type GetPhotoQuery = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListPhotosQuery = {
  __typename: "ModelPhotoConnection";
  items: Array<{
    __typename: "Photo";
    id: string;
    url: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetTagQuery = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type ListTagsQuery = {
  __typename: "ModelTagConnection";
  items: Array<{
    __typename: "Tag";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    photoTagsId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type OnCreatePhotoSubscription = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdatePhotoSubscription = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeletePhotoSubscription = {
  __typename: "Photo";
  id: string;
  url: string;
  description?: string | null;
  tags?: {
    __typename: "ModelTagConnection";
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateTagSubscription = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type OnUpdateTagSubscription = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

export type OnDeleteTagSubscription = {
  __typename: "Tag";
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  photoTagsId?: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreatePhoto(
    input: CreatePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<CreatePhotoMutation> {
    const statement = `mutation CreatePhoto($input: CreatePhotoInput!, $condition: ModelPhotoConditionInput) {
        createPhoto(input: $input, condition: $condition) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePhotoMutation>response.data.createPhoto;
  }
  async UpdatePhoto(
    input: UpdatePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<UpdatePhotoMutation> {
    const statement = `mutation UpdatePhoto($input: UpdatePhotoInput!, $condition: ModelPhotoConditionInput) {
        updatePhoto(input: $input, condition: $condition) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePhotoMutation>response.data.updatePhoto;
  }
  async DeletePhoto(
    input: DeletePhotoInput,
    condition?: ModelPhotoConditionInput
  ): Promise<DeletePhotoMutation> {
    const statement = `mutation DeletePhoto($input: DeletePhotoInput!, $condition: ModelPhotoConditionInput) {
        deletePhoto(input: $input, condition: $condition) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePhotoMutation>response.data.deletePhoto;
  }
  async CreateTag(
    input: CreateTagInput,
    condition?: ModelTagConditionInput
  ): Promise<CreateTagMutation> {
    const statement = `mutation CreateTag($input: CreateTagInput!, $condition: ModelTagConditionInput) {
        createTag(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTagMutation>response.data.createTag;
  }
  async UpdateTag(
    input: UpdateTagInput,
    condition?: ModelTagConditionInput
  ): Promise<UpdateTagMutation> {
    const statement = `mutation UpdateTag($input: UpdateTagInput!, $condition: ModelTagConditionInput) {
        updateTag(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTagMutation>response.data.updateTag;
  }
  async DeleteTag(
    input: DeleteTagInput,
    condition?: ModelTagConditionInput
  ): Promise<DeleteTagMutation> {
    const statement = `mutation DeleteTag($input: DeleteTagInput!, $condition: ModelTagConditionInput) {
        deleteTag(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTagMutation>response.data.deleteTag;
  }
  async GetPhoto(id: string): Promise<GetPhotoQuery> {
    const statement = `query GetPhoto($id: ID!) {
        getPhoto(id: $id) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPhotoQuery>response.data.getPhoto;
  }
  async ListPhotos(
    filter?: ModelPhotoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListPhotosQuery> {
    const statement = `query ListPhotos($filter: ModelPhotoFilterInput, $limit: Int, $nextToken: String) {
        listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            url
            description
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPhotosQuery>response.data.listPhotos;
  }
  async GetTag(id: string): Promise<GetTagQuery> {
    const statement = `query GetTag($id: ID!) {
        getTag(id: $id) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTagQuery>response.data.getTag;
  }
  async ListTags(
    filter?: ModelTagFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTagsQuery> {
    const statement = `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
        listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            createdAt
            updatedAt
            photoTagsId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTagsQuery>response.data.listTags;
  }
  OnCreatePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePhoto">>
  > {
    const statement = `subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onCreatePhoto(filter: $filter) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreatePhoto">>
    >;
  }

  OnUpdatePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePhoto">>
  > {
    const statement = `subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onUpdatePhoto(filter: $filter) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdatePhoto">>
    >;
  }

  OnDeletePhotoListener(
    filter?: ModelSubscriptionPhotoFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePhoto">>
  > {
    const statement = `subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
        onDeletePhoto(filter: $filter) {
          __typename
          id
          url
          description
          tags {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeletePhoto">>
    >;
  }

  OnCreateTagListener(
    filter?: ModelSubscriptionTagFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTag">>
  > {
    const statement = `subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
        onCreateTag(filter: $filter) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTag">>
    >;
  }

  OnUpdateTagListener(
    filter?: ModelSubscriptionTagFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTag">>
  > {
    const statement = `subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
        onUpdateTag(filter: $filter) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTag">>
    >;
  }

  OnDeleteTagListener(
    filter?: ModelSubscriptionTagFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTag">>
  > {
    const statement = `subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
        onDeleteTag(filter: $filter) {
          __typename
          id
          name
          createdAt
          updatedAt
          photoTagsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTag">>
    >;
  }
}
