import React from "react"
import clsx from 'clsx'
import { Avatar } from '../Avatar'
import { CommentCardProps } from "./CommentCard.props";

export const CommentCard = (props: CommentCardProps) => {
  const { author, comment, isFirst, isLast } = props;
  return (
    <div className="relative">
      <div
        className={clsx('flex w-0.5 ml-4 absolute -z-10 top-0 bottom-0 left-6 bg-light-gray', isFirst && 'top-1/2 bottom-0', isLast && 'top-0 bottom-1/2')}
      />
      <div className={'flex flex-row p-4'}>
        <Avatar
          profileImageUrl={author.profileImageUrl}
        />
        <div className={'flex flex-1 ml-4'}>
          <p className={'text-base'}>{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
