import { useNavigation } from "@react-navigation/native"
import { useCallback } from 'react'

export const useTweeterCallbacks = () => {
  const { navigate } = useNavigation();
  const goToTweet = useCallback((id) => navigate('Tweet', { id }), [navigate]);
  const goToUserProfile = useCallback(
    (id) => navigate('UserProfile', { id }),
    [navigate]
  );
  const goToCreateComment = useCallback(
    (id) => navigate('CommentTweet', { id }),
    [navigate]
  );
  const goToCreateTweet = useCallback(
    () => navigate('CreateTweet'),
    [navigate]
  );

  return {
    goToCreateComment,
    goToCreateTweet,
    goToTweet,
    goToUserProfile,
  };
};