import PostType from 'types/post';
import Image from 'next/image';
import {Fragment} from 'react';
import {NextSeo} from 'next-seo';
import {format, parseISO} from 'date-fns';
import {getReadingTime} from '../../utils/getReadingTime';
import {PostBody} from '../organisms/PostBody';

interface Props {
  post: PostType;
}

export const PostLayout = ({post}: Props) => {
  return (
    <Fragment>
      <NextSeo title={post.title} />
      <div className="mx-auto">
        <div className="my-5">
          <h1 className="mt-2 mb-5 text-center text-5xl font-semibold tracking-tight dark:text-white lg:text-6xl lg:leading-snug">
            {post.title}
          </h1>
          <div className="mt-3 flex justify-center space-x-3 text-gray-500">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src={post.author.picture}
                  layout="fill"
                  className="rounded-full"
                  alt={post.author.name}
                />
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  {post.author.name}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    dateTime={post.date}
                    className="text-gray-500 dark:text-gray-400">
                    {format(parseISO(post.date), 'LLLL	d, yyyy')}
                  </time>
                  <span>· {getReadingTime(post.content).text}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 mx-auto mt-4 aspect-video overflow-hidden lg:rounded-lg">
          <Image src={post.coverImage} alt={post.title} layout="fill" />
        </div>

        <div>
          <PostBody content={post.content} />
        </div>
      </div>
    </Fragment>
  );
};
