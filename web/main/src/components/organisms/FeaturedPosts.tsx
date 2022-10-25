import {Post} from './Post';
import PostType from 'types/post';

interface Props {
  posts: PostType[];
}

export const FeaturedPosts = ({posts}: Props) => {
  return (
    <div className="grid gap-10 px-4 md:grid-cols-2 lg:gap-10">
      {posts.map((post, key) => (
        <Post key={key.toString()} post={post} />
      ))}
    </div>
  );
};
