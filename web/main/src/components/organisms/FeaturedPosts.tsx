import {Post} from './Post';
import PostType from 'types/post';

interface Props {
  posts: PostType[];
}

export const FeaturedPosts = ({posts}: Props) => {
  return (
    <div className="grid gap-10 px-4 lg:gap-10 md:grid-cols-2">
      {posts.map((post, key) => (
        <Post key={key.toString()} post={post} />
      ))}
    </div>
  );
};
