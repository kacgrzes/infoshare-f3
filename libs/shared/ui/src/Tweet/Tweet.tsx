import React from 'react';
import { formatRelative } from 'date-fns';
import { TweetProps } from './Tweet.props';
import { Avatar } from '../Avatar';
import { IoHeart, IoHeartOutline, IoChatboxOutline } from 'react-icons/io5';

export const Tweet = (props: TweetProps) => {
  const {
    author,
    tweet,
    onTweetPress,
    onCommentPress,
    onLikePress,
    onAvatarPress,
  } = props;

  return (
    <div className="flex flex-col p-4 bg-white">
      <div className="flex w-full flex-row" onClick={onTweetPress}>
        <Avatar
          onPress={onAvatarPress}
          profileImageUrl={author?.profileImageUrl}
        />
        <div className="flex flex-1 flex-col ml-4">
          <span className="text-sm">
            <span className="text-black">{author?.name}</span>{' '}
            <span className="text-dark-gray">
              @{author.username} ·{' '}
              {formatRelative(new Date(tweet.createdAt), new Date())}
            </span>
          </span>
          <span className="text-base">{tweet.text}</span>
        </div>
      </div>
      <div className="flex flex-row justify-evenly mt-4">
        <div
          onClick={onCommentPress}
          className="cursor-pointer flex flex-row items-center justify-center"
        >
          <IoChatboxOutline className="text-dark-gray" size={24} />
          <span className="text-dark-gray ml-2">{tweet?.replyCount ?? 0}</span>
        </div>
        <div
          onClick={onLikePress}
          className="cursor-pointer flex flex-row items-center justify-center"
        >
          {tweet.liked ? (
            <IoHeart className="text-red-400" size={24} />
          ) : (
            <IoHeartOutline className="text-dark-gray" size={24} />
          )}
          <span className="text-dark-gray ml-2">{tweet?.likedCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
