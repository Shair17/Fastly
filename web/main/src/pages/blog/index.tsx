/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import type {NextPage} from 'next';
import {BlogLayout} from 'components/templates/BlogLayout';
import {FeaturedPosts} from 'components/organisms/FeaturedPosts';
import {PostsList} from 'components/organisms/PostsList';
import Post from 'types/post';
import {getAllPosts} from 'utils/api';

type Props = {
  allPosts: Post[];
};

const Blog: NextPage<Props> = ({allPosts}) => {
  const firstPost = allPosts[0];
  const secondPost = allPosts[1];
  const morePosts = allPosts.slice(2);

  return (
    <BlogLayout>
      <h1 className="text-center text-3xl font-bold 2xl:text-6xl">
        Blog de Fastly
      </h1>
      <p className="mt-6 mb-10 text-center text-lg md:text-xl">
        Por aquí compartimos algunos artículos que pueden ser de tu interés :)
      </p>
      <FeaturedPosts posts={[firstPost!, secondPost!]} />
      {morePosts.length > 0 && <PostsList morePosts={morePosts} />}
    </BlogLayout>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: {allPosts},
  };
};
