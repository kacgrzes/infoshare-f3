import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTweetSchema, commentTweetSchema } from '@infoshare-f3/schemas';
import { CreateComment } from '@infoshare-f3/types';
import { useTweetsContext, useCommentTweetMutation } from '@infoshare-f3/data-providers';

export const useCreateTweetForm = () => {
  const { createTweetMutation } = useTweetsContext();
  const createTweetForm = useForm<CreateComment>({
    resolver: yupResolver(createTweetSchema),
    defaultValues: {
      text: '',
    },
    mode: 'all',
  });

  const handleValid: SubmitHandler<CreateComment> = (data) => {
    createTweetMutation?.mutate(data);
  };

  const onSubmit = createTweetForm.handleSubmit(handleValid);

  return {
    ...createTweetForm,
    onSubmit,
  };
};

export const useCommentTweetForm = (tweetId?: string) => {
  const commentTweetMutation = useCommentTweetMutation(tweetId);
  const commentTweetForm = useForm<CreateComment>({
    resolver: yupResolver(commentTweetSchema),
    defaultValues: {
      text: '',
    },
    mode: 'all',
  });

  const handleValid: SubmitHandler<CreateComment> = (data) => {
    if (!tweetId) {
      return
    }
    commentTweetMutation?.mutate({
      ...data,
      tweetId
    });
  };

  const onSubmit = commentTweetForm.handleSubmit(handleValid);

  return {
    ...commentTweetForm,
    onSubmit,
  };
};
