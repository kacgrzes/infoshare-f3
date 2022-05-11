import React, { createContext, useContext, FC, useState, useEffect } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  UseInfiniteQueryResult,
} from 'react-query';
import { client } from '@infoshare-f3/api-client';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { Me } from '@infoshare-f3/types'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
    },
  },
});

// Auth
type AuthContextType = {
  me: Me | null;
  isAuthenticated?: boolean;
  loginMutation?: UseMutationResult<
    AxiosResponse,
    unknown,
    { username: string; password: string }
  >;
  logout?: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  me: null,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

const AuthProvider: FC = ({ children }) => {
  const [me, setMe] = useState<Me | null>(null);
  const queryClient = useQueryClient();
  const loginMutation = useMutation(client.auth.login, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.setDefaultOptions({
          queries: {
            enabled: true,
          },
        });
        queryClient.refetchQueries();
        const user = jwtDecode(response.data.token) as Me;
        setMe(user);
      }
    },
  });
  const logout = () => {
    queryClient.setDefaultOptions({
      queries: {
        enabled: false
      }
    })
    setMe(null)
  }
  const isAuthenticated = queryClient.defaultQueryOptions().enabled && me !== null;

  return (
    <AuthContext.Provider
      children={children}
      value={{ loginMutation, isAuthenticated, me, logout }}
    />
  );
};

// Tweets
type TweetsContextType = {
  tweets?: any;
  tweetsQuery?: UseInfiniteQueryResult;
  createTweetMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, { text: string; }, unknown>;
  deleteTweetMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, { tweetId: string; }, unknown>;
  getTweet: (tweetId?: string) => any;
  checkIfCanDelete?: (tweetId: string) => void;
  likeTweetMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, { tweetId: string; }, unknown>;
  unlikeTweetMutation?: UseMutationResult<AxiosResponse<any, any>, unknown, { tweetId: string; }, unknown>;
  toggleTweetLike?: (tweetId: string) => void;
};

const TweetsContext = createContext<TweetsContextType>({
  getTweet: () => null
});

export const useTweetsContext = () => {
  const context = useContext(TweetsContext);
  if (context === undefined) {
    throw new Error('useTweetsContext must be used within a TweetsProvider');
  }
  return context;
};

const TweetsProvider: FC = ({ children }) => {
  const { me } = useAuthContext()
  const queryClient = useQueryClient();

  // mutations
  const createTweetMutation = useMutation(client.tweets.create, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries('tweets');
      }
    },
  });
  const deleteTweetMutation = useMutation(client.tweets.delete, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries('tweets');
      }
    },
  });
  const likeTweetMutation = useMutation(client.tweets.like, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries('tweets');
      }
    },
  });
  const unlikeTweetMutation = useMutation(client.tweets.unlike, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries('tweets');
      }
    },
  });

  // queries
  const tweetsQuery = useInfiniteQuery(
    'tweets',
    ({ pageParam = 1 }) => {
      return client.tweets.getAll({ page: pageParam });
    },
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        const hasNextPage =
          lastPage?.data?.tweets?.length % 10 === 0 &&
          lastPage?.data?.tweets?.length !== 0;
        const pages = allPages.length;
        if (hasNextPage) {
          return pages + 1;
        }
      },
    }
  );

  const getTweet = (tweetId?: string) => {
    if (!tweetId) {
      return null
    }
    const cache = queryClient.getQueryData('tweets') as any;
    const tweets = cache.pages.map((page: any) => page.data.tweets).flat();
    const tweet = tweets.find((tweet: any) => tweet.id === tweetId);

    return tweet;
  };

  const checkIfCanDelete = (tweetId: string) => {
    const tweet = getTweet(tweetId)
    return tweet.author.id === me?.id
  }

  const toggleTweetLike = (tweetId: string) => {
    const tweet = getTweet(tweetId);
    const mutation = tweet.liked ? unlikeTweetMutation : likeTweetMutation;
    mutation.mutate({ tweetId });
  };

  const tweets =
    tweetsQuery?.data?.pages?.flatMap((page: any) => page?.data?.tweets) ??
    [];

  const value = {
    tweetsQuery,
    tweets,
    createTweetMutation,
    deleteTweetMutation,
    likeTweetMutation,
    unlikeTweetMutation,
    getTweet,
    checkIfCanDelete,
    toggleTweetLike,
  };

  return <TweetsContext.Provider children={children} value={value} />;
};

export const Providers: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TweetsProvider>{children}</TweetsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export const useCommentForTweetQuery = (tweetId?: string) => {
  return useQuery(['commentsForTweet', tweetId], () => {
    if (tweetId) {
      return client.comments.getAll({ tweetId });
    }

    return null
  }, {
    enabled: !!tweetId
  });
};

export const useCommentTweetMutation = (tweetId?: string) => {
  const queryClient = useQueryClient()

  return useMutation(client.comments.create, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries(['commentsForTweet', tweetId])
      }
    }
  })
}

export const useAutoLogin = () => {
  const { isAuthenticated, loginMutation } = useAuthContext();

  useEffect(() => {
    loginMutation?.mutate({
      username: 'user1',
      password: 'password1',
    });
  }, []);

  return isAuthenticated
}

export const useUsersQuery = () => {
  return useQuery('users', client.users.getAll); 
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(client.users.delete, {
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries('users')
      }
    }
  })
}