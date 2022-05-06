import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTweetSchema } from '@infoshare-f3/schemas';
import { CreateComment } from '@infoshare-f3/shared-types';
import { useTweetsContext } from '@infoshare-f3/data-providers';

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
    createTweetMutation.mutate(data);
  };

  const onSubmit = createTweetForm.handleSubmit(handleValid);

  return {
    ...createTweetForm,
    onSubmit,
  };
};
