export const Post = () => {
  return (
    <div className="cursor-pointer">
      <div></div>
      <div></div>
      <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
        <span className="link-underline link-underline-blue">
          Título del post
        </span>
      </h2>
      <div></div>
      <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 w-5 h-5">{/** avatar */}</div>
          <span className="text-sm">Jimmy Morales (autor)</span>
        </div>
        <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
        <time className="text-sm">datetime</time>
      </div>
    </div>
  );
};
