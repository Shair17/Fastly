import Image from 'next/image';
import Link from 'next/link';
import PostType from '../../types/post';
import {format, parseISO} from 'date-fns';

interface Props {
  post: PostType;
}

export const Post = ({post}: Props) => {
  return (
    <div className="cursor-pointer link-effect">
      <div className="relative overflow-hidden transition-shadow bg-gray-100 rounded-md dark:bg-gray-800 hover:shadow-sm aspect-video">
        <Link as={`/blog/${post.slug}`} href="/blog/[slug]" title={post.title}>
          <a title={post.title}>
            <Image
              className="object-contain"
              layout="fill"
              src={post.coverImage}
              alt={post.title}
            />
          </a>
        </Link>
      </div>
      <h2 className="mt-3 text-lg font-semibold tracking-normal text-black text-brand-primary dark:text-white">
        <span className="link-underline link-underline-blue">{post.title}</span>
      </h2>
      <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 w-5 h-5">
            <Image
              src={post.author.picture}
              layout="fill"
              className="w-full h-full rounded-full"
              alt={post.author.name}
            />
          </div>
          <span className="text-sm">{post.author.name}</span>
        </div>
        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
        <time className="text-sm">
          {format(parseISO(post.date), 'LLLL	d, yyyy')}
        </time>
      </div>
    </div>
  );
};
