import {Post} from './Post';

export const PostsList = () => {
  return (
    <div className="grid w-full gap-10 px-4 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};
