import type {NextPage} from 'next';
import {BlogLayout} from '../../components/templates/BlogLayout';
import {FeaturedPosts} from '../../components/organisms/FeaturedPosts';
import {PostsList} from '../../components/organisms/PostsList';

const Blog: NextPage = () => {
  return (
    <BlogLayout>
      <h1 className="text-3xl font-bold text-center 2xl:text-6xl">
        Blog de Fastly
      </h1>
      <p className="my-6 text-lg text-center md:text-xl">
        Por aquí compartimos algunos artículos que pueden ser de tu interés :)
      </p>
      <FeaturedPosts />
      <PostsList />
    </BlogLayout>
  );
};

export default Blog;
