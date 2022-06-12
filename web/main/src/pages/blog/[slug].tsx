import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import ErrorPage from 'next/error';
import {BlogLayout} from '../../components/templates/BlogLayout';
import PostType from '../../types/post';
import {getPostBySlug, getAllPosts} from '../../utils/api';
import markdownToHtml from '../../utils/markdownToHtml';
import {PostLayout} from 'components/templates/PostLayout';

interface Props {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
}

const Post: NextPage<Props> = ({post, morePosts, preview}) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <BlogLayout>
      {router.isFallback ? <div>cargando...</div> : <PostLayout post={post} />}
    </BlogLayout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({params}: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
