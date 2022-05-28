import {Post} from './Post';

export const FeaturedPosts = () => {
  return (
    <div className="grid gap-10 px-4 lg:gap-10 md:grid-cols-2">
      <Post />
      <Post />
    </div>
  );
};
