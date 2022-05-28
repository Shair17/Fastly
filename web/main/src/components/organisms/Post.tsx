export const Post = () => {
  return (
    <div className="cursor-pointer link-effect">
      <div className="relative overflow-hidden transition-shadow bg-gray-100 rounded-md dark:bg-gray-800 hover:shadow-sm aspect-video">
        <a href="#">
          <img
            src="https://random.imagecdn.app/1920/1080"
            className="object-contain"
            alt="random post image"
          />
        </a>
      </div>
      {/* <div>
        <a href="#">
          <span className="inline-block mt-5 text-xs font-medium tracking-wider text-blue-600 uppercase">
            Tecnologia
          </span>
        </a>
      </div> */}
      <h2 className="mt-3 text-lg font-semibold tracking-normal text-black text-brand-primary dark:text-white">
        <span className="link-underline link-underline-blue">
          Architectural Engineering Wonders of the modern era for your
          Inspiration
        </span>
      </h2>
      <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 w-5 h-5">
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>
          <span className="text-sm">Jimmy Morales</span>
        </div>
        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
        <time className="text-sm">May 20, 2022</time>
      </div>
    </div>
  );
};
