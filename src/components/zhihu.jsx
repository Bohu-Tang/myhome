import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function Zhihu() {
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
        fetch('https://60s.viki.moe/zhihu-hot').then((res) =>
            res.json(),
        ),
  })

  console.log(data);
  const list = data && data.data ? data.data : [];


  return (
      <div className="w-1/3 border border-gray-50 text-slate-500 dark:text-gray-300 text-center box-border px-2.5">
        <div className="font-bold">知乎热榜</div>
        <div
            className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 mt-3"
        >
          {isLoading ? <div>加载中</div> : ""}
          {error ? <div>{error}</div> : ""}
          {list?.map((item, index) => (
              <div className="text-sm" key={index}>
                <a href={item.link} target="_blank" rel="noreferrer"
                   className="block truncate cursor-pointer hover:text-slate-600">
                  {index + 1 + "." + item.title}
                </a>
              </div>
          ))}
        </div>

      </div>
  );
}

export default Zhihu;