import {Post} from './Post';
import PostType from 'types/post';

interface Props {
  morePosts: PostType[];
}

export const PostsList = ({morePosts}: Props) => {
  return (
    <div className="mt-10 grid w-full gap-10 px-4 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
      {morePosts.map((post, key) => (
        <Post key={key.toString()} post={post} />
      ))}
    </div>
  );
};
