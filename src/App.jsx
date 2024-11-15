import {useState, useEffect} from "react";

function isUrl(str) {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return urlPattern.test(str);
}

function checkNightMode() {
    // 获取当前系统时间的小时数
    const currentHour = new Date().getHours();
    // 判断当前时间是否在晚上8点到早上7点之间
    let theme = (currentHour >= 20 || currentHour < 7) ? "dark" : "light"

    if (localStorage.getItem("theme") === null) {
        localStorage.setItem("theme", theme);
    } else {
        const storedValue = localStorage.getItem("theme");
        theme = storedValue;
    }

    // 返回 true 或 false，表示是否在夜间模式时间段
    return theme;
}


function App() {
    const [searchText, setSearchText] = useState("");
    const [searchEngine, setSearchEngine] = useState("Baidu");
    const [theme, setTheme] = useState(null);

    const searchEngineList = {
        Baidu: "https://www.baidu.com/s?wd=",
        Google: "https://www.google.com/search?q=",
        Bing: "https://cn.bing.com/search?q=",
        Yandex: "https://yandex.com/search/?text="
    };

    const goSearch = () => {
        if (isUrl(searchText)) {
            window.open("http://" + searchText);
        } else {
            window.open(searchEngineList[searchEngine] + encodeURIComponent(searchText.trim()));
        }
    };

    const setDark = () => {
        if (theme === "dark") {
            document.documentElement.classList.remove('dark');
            setTheme("light")
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add('dark');
            setTheme("dark")
            localStorage.setItem("theme", "dark");
        }

    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme"); // 从localStorage中获取已存储的主题
        if (storedTheme) {
            setTheme(storedTheme); // 如果存在，直接设置主题
            if (storedTheme === "dark") {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            const getTheme = checkNightMode(); // 获取基于时间的主题
            setTheme(getTheme);
            localStorage.setItem("theme", getTheme); // 设置并存储主题
            if (getTheme === "dark") {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);


    return (
        <div className="h-screen bg-slate-200 dark:bg-gray-800 transition-colors">
            {/* 顶部菜单 */}
            <div
                className="text-slate-950 dark:text-gray-200 h-12 bg-slate-300 dark:bg-gray-900 flex items-center justify-end px-5">
                <div className="px-2 cursor-pointer text-sm" onClick={setDark}>
                    {theme === "light" ? "夜间模式" : "日间模式"}
                </div>
            </div>

            {/* 中间文字 */}
            <div className="flex items-center justify-center mt-20">
                <span className="text-7xl text-slate-500 dark:text-gray-300 p-5">{searchEngine}</span>
            </div>

            {/* 搜索框 */}
            <div className="w-full h-20 flex items-center justify-center">
                <select
                    className="h-12 border-2 border-slate-300 dark:border-gray-600 rounded-l-full px-3 bg-white dark:bg-gray-700 text-slate-500 dark:text-gray-200 outline-none"
                    value={searchEngine}
                    onChange={(e) => setSearchEngine(e.target.value)}
                >
                    <option className="text-slate-500" value="Google">Google</option>
                    <option className="text-slate-500" value="Bing">Bing</option>
                    <option className="text-slate-500" value="Baidu">Baidu</option>
                    <option className="text-slate-500" value="Yandex">Yandex</option>
                </select>

                <input
                    type="text"
                    className="w-1/3 h-12 border-t-2 border-b-2 border-slate-300 dark:border-gray-600 px-5 bg-white dark:bg-gray-700 text-slate-500 dark:text-gray-200 outline-none"
                    placeholder="搜索或输入 URL"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            goSearch();
                        }
                    }}
                />

                <button
                    className="h-12 border-2 border-slate-300 dark:border-gray-600 rounded-r-full px-5 bg-slate-300 dark:bg-gray-700 text-white dark:text-gray-200 hover:bg-slate-400 dark:hover:bg-gray-600"
                    onClick={goSearch}
                >
                    搜索
                </button>
            </div>
        </div>
    );
}

export default App;
