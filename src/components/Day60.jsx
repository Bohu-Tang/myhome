import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function Day60() {
  return (
      <QueryClientProvider client={queryClient}>
        <Content/>
      </QueryClientProvider>
  )
}

function Content() {
  const {isLoading, error, data} = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
        fetch('https://60s.viki.moe/?v2=1').then((res) =>
            res.json(),
        ),
  })

  const list = data && data.data && data.data.news ? data.data.news : [];

  return (
      <div className="w-1/3 border border-slate-300 dark:border-gray-600 rounded text-slate-500 dark:text-gray-300 box-border px-2.5">
        <div className="font-bold text-center">60s看世界</div>
        <div
            className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 mt-3 overflow-x-hidden"
        >
          {isLoading ? <div className="text-center">加载中</div> : ""}
          {error ? <div>{error}</div> : ""}
          {list?.map((item, index) => (
              <div className="text-sm" key={index}>
                <div className="relative group">
                  <a
                      href={data.data.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate cursor-pointer text-slate-500 dark:text-gray-300 hover:text-slate-600 dark:hover:text-gray-100"
                  >
                    {index + 1 + ". " + item}
                  </a>
                  {/* 气泡框 */}
                  <div
                      className="absolute left-0 top-full mt-1 hidden group-hover:block w-max max-w-[calc(100%-8px)]
                bg-white dark:bg-gray-800 text-slate-500 dark:text-gray-300
                text-xs rounded-lg p-2 shadow-lg border border-gray-50 dark:border-gray-600 z-10"
                  >
                    {item}
                  </div>
                </div>
              </div>


          ))}
        </div>

      </div>
  );
}

export default Day60;