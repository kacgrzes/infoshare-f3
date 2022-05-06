import React, { createContext, useContext, FC, useState } from 'react';
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
    },
  },
});

// Auth
type AuthContextType = {
  me: any;
  isAuthenticated?: boolean;
  loginMutation?: UseMutationResult<
    AxiosResponse,
    unknown,
    { username: string; password: string }
  >;
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
  const [me, setMe] = useState<any>(null);
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
        const user = jwtDecode(response.data.token);
        setMe(user);
      }
    },
  });
  const isAuthenticated = queryClient.defaultQueryOptions().enabled;

  return (
    <AuthContext.Provider
      children={children}
      value={{ loginMutation, isAuthenticated, me }}
    />
  );
};

// Tweets
type TweetsContextType = {
  tweetsQuery?: UseInfiniteQueryResult;
  createTweetMutation: UseMutationResult;
  getTweet?: () => void;
  likeTweetMutation?: UseMutationResult;
  unlikeTweetMutation?: UseMutationResult;
  toggleTweetLike: (tweetId: string) => void;
};

const TweetsContext = createContext<TweetsContextType>({});

export const useTweetsContext = () => {
  const context = useContext(TweetsContext);
  if (context === undefined) {
    throw new Error('useTweetsContext must be used within a TweetsProvider');
  }
  return context;
};

const TweetsProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();

  // mutations
  const createTweetMutation = useMutation(client.tweets.create, {
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
      getNextPageParam: (lastPage, allPages) => {
        const hasNextPage =
          lastPage.data.tweets.length % 10 === 0 &&
          lastPage.data.tweets.length !== 0;
        const pages = allPages.length;
        if (hasNextPage) {
          return pages + 1;
        }
      },
    }
  );

  const getTweet = (tweetId: string) => {
    const cache = queryClient.getQueryData('tweets');
    const tweets = cache.pages.map((page) => page.data.tweets).flat();
    const tweet = tweets.find((tweet) => tweet.id === tweetId);

    return tweet;
  };

  const toggleTweetLike = (tweetId: string) => {
    const tweet = getTweet(tweetId);
    const mutation = tweet.liked ? unlikeTweetMutation : likeTweetMutation;
    mutation.mutate({ tweetId });
  };

  const value = {
    tweetsQuery,
    createTweetMutation,
    likeTweetMutation,
    unlikeTweetMutation,
    getTweet,
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

export const useCommentForTweetQuery = (tweetId: string) => {
  return useQuery(['commentsForTweet', tweetId], () => {
    return client.comments.getAll({ tweetId });
  });
};
