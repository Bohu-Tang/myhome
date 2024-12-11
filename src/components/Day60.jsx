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
      <div
          className="w-1/3 border border-slate-300 dark:border-gray-600 rounded text-slate-500 dark:text-gray-300 box-border px-2.5">
        <div className="font-bold text-center">60s看世界</div>
        <div
            className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 mt-3 overflow-x-hidden box-border pb-16"
        >
          {isLoading ? <div className="text-center">加载中</div> : ""}
          {error ? <div>{error}</div> : ""}
          {list?.map((item, index) => (
              <div className="text-sm" key={index}>
                <a
                    href={data.data.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start cursor-pointer text-slate-500 dark:text-gray-300 hover:text-slate-600 dark:hover:text-gray-100"
                >
                  <span className="w-6 shrink-0">{index + 1}.</span>
                  <span className="flex-1 break-words">{item}</span>
                </a>
              </div>


          ))}
        </div>

      </div>
  );
}

export default Day60;