import { useTweetsContext } from '@infoshare-f3/data-providers';
import { Button, Tweet } from '@infoshare-f3/shared-ui';

const Tweets = () => {
  const { tweets, deleteTweetMutation } = useTweetsContext();

  return (
    <div className="grid grid-cols-2 gap-4 max-w-5xl m-auto">
      {/* <Button title='elo'/> */}
      {tweets.map((tweet, index) => {
        return (
          <div key={tweet.id} className="grid grid-flow-row items-stretch content-between">
            <Tweet tweet={tweet} author={tweet.author} />
            <Button
              title={'Delete tweet'}
              onPress={() =>
                deleteTweetMutation.mutate({
                  tweetId: tweet.id,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
