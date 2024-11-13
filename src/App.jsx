import alIcon from "./assets/al-icon.png"
import baiduImage from './assets/baidu.png';
import {useState} from "react";

function isUrl(str) {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return urlPattern.test(str);
}


function App() {
    const [searchText, setSearchText] = useState("");
    const [searchEngine, setSearchEngine] = useState("Baidu");
    const searchEngineList = {
        Baidu: "https://www.baidu.com/s?wd=",
        Google: "https://www.google.com/search?q=",
        Bing: "https://cn.bing.com/search?q=",
        Yandex: "https://yandex.com/search/?text="
    }

    const goSearch = () => {
        if (isUrl(searchText)) {
            window.open("http://" + searchText)
        } else {
            window.open(searchEngineList[searchEngine] + encodeURIComponent(searchText.trim()))
        }
    }

    return (
        <>
            <div className={"h-screen bg-slate-200"}>
                {/*顶部菜单*/}
                <div className={"text-slate-950 h-12 bg-slate-300 flex items-center justify-end px-5"}>
                    <div className={"px-2"}>Gmail</div>
                    <div className={"px-2"}>图片</div>
                    <img src={alIcon}/>
                </div>
                {/*中间文字*/}
                <div className={"flex items-center justify-center mt-20"}>
                    <span className={"text-7xl text-slate-500 p-5"}>{searchEngine}</span>
                </div>
                {/*搜索框*/}
                <div className="w-full h-20 flex items-center justify-center">
                    {/* 搜索引擎选择下拉菜单 */}
                    <select
                        className="h-12 border-2 border-slate-300 rounded-l-full px-3 bg-white outline-none text-slate-500"
                        value={searchEngine}
                        onChange={(e) => setSearchEngine(e.target.value)}
                    >
                        <option className="text-center text-slate-500" value={"Google"}>Google</option>
                        <option className="text-center text-slate-500" value={"Bing"}>Bing</option>
                        <option className="text-center text-slate-500" value={"Baidu"}>Baidu</option>
                        <option className="text-center text-slate-500" value={"Yandex"}>Yandex</option>
                    </select>

                    {/* 搜索输入框 */}
                    <input
                        type="text"
                        className="w-1/3 h-12 border-t-2 border-b-2 border-slate-300 px-5 outline-none "
                        placeholder="搜索或输入 URL"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                goSearch();
                            }
                        }}
                    />

                    {/* 搜索按钮 */}
                    <button
                        className="h-12 border-2 border-slate-300 rounded-r-full px-5 bg-slate-300 text-white hover:bg-slate-400 active:bg-slate-500"
                        onClick={() => goSearch()}
                    >
                        搜索
                    </button>
                </div>
                {/*导航小方框*/}
                <div className={"w-full flex justify-center"}>
                    <div className={"w-1/3 mt-auto flex flex-wrap"}>
                        <div
                            className={"w-24 h-24 border-2 flex flex-col justify-center items-center hover:bg-slate-100 relative group"}>
                            <div className={"w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center"}>
                                <img className={"w-6 h-6"} src={baiduImage}/>
                            </div>
                            <div className={"mt-2 cursor-pointer"}>百度</div>
                            <div
                                className={"absolute top-0 right-0 w-6 cursor-pointer h-8 flex flex-col items-center justify-center invisible group-hover:visible"}>
                                <div className={"w-1 h-1 bg-slate-300 rounded-full"}></div>
                                <div className={"w-1 h-1 bg-slate-300 rounded-full my-1"}></div>
                                <div className={"w-1 h-1 bg-slate-300 rounded-full"}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default App
