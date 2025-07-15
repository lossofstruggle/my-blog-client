"use client";
import type { NextPage } from "next";
import Image from "next/image";
import blogImg from "@/../public/weibo.png";
import avatarImg from "@/../public/toux.png";

const Home: NextPage = () => {
  // const onClick: MenuProps["onClick"] = (e) => {
  //   setCurrent(e.key);
  // };
  // const toggleNav = () => {
  //   setNavOpen(!navOpen);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans">
      {/* 右侧首页导航栏 */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <div
          className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-l-lg shadow-xl p-4 transition-all duration-300 hover:bg-opacity-90"
          style={{ height: "fit-content" }}
        >
          <div className="flex flex-col space-y-6">
            <a
              href="#about"
              className="text-white hover:text-blue-300 transition-colors flex items-center group"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 group-hover:bg-blue-300"></div>
              <span>关于我</span>
            </a>
            <a
              href="#skills"
              className="text-white hover:text-blue-300 transition-colors flex items-center group"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 group-hover:bg-blue-300"></div>
              <span>技术栈</span>
            </a>
            <a
              href="#projects"
              className="text-white hover:text-blue-300 transition-colors flex items-center group"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 group-hover:bg-blue-300"></div>
              <span>项目</span>
            </a>
          </div>
        </div>
      </div>
      <main>
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-4 leading-tight">
              你好，我是{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                技术博主
              </span>
            </h1>
            <p
              className=" text-[clamp(1rem,3vw,1.5rem)] text-gray-300 max-w-3xl mx-auto mb-8"
            >
              热爱全栈开发
            </p>
            <p
              className="text-[clamp(1rem,3vw,1.5rem)] text-gray-300 max-w-3xl mx-auto mb-8"
            >
              分享和记录自己在开发过程中遇到的问题和解决方案。
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              {/* <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1"
              >
                联系我
              </a> */}
              {/* <a
                href="#projects"
                className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-blue-400 transition-all transform hover:-translate-y-1"
              >
                查看项目
              </a> */}
            </div>
          </div>
        </section>
        {/* 关于我 */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-12 text-center">
              <span className="inline-block pb-2 border-b-2 border-blue-500">
                关于我
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4">全栈开发者</h3>
                <p className="text-gray-300 mb-6">
                  我是一名全栈开发者，热衷于探索新技术和解决项目中遇到的各类问题。
                </p>
                <p className="text-gray-300 mb-6">
                  我的博客专注于分享前端开发、后端开发、用户体验和性能优化方面的知识和经验。
                </p>
                <div className="flex space-x-4 mt-8">
                  <a
                    href="#"
                    className="text-2xl hover:text-blue-400 transition-colors"
                  >
                    <i className="fa fa-github"></i>
                  </a>
                  <a
                    href="#"
                    className="text-2xl hover:text-blue-400 transition-colors"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="text-2xl hover:text-blue-400 transition-colors"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    className="text-2xl hover:text-blue-400 transition-colors"
                  >
                    <i className="fa fa-medium"></i>
                  </a>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
                  <div className="relative rounded-full overflow-hidden border-4 border-gray-800">
                    <Image
                      src={avatarImg}
                      alt="技术博主头像"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技术栈 */}
        <section
          id="skills"
          className="py-20 bg-gray-900/50 backdrop-blur-sm relative"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-12 text-center">
              <span className="inline-block pb-2 border-b-2 border-blue-500">
                技术栈
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* 技术卡片 */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="text-4xl mb-4 text-blue-400">
                  <i className="fa fa-code"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">前端开发</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>HTML5 & CSS3</li>
                  <li>JavaScript & TypeScript</li>
                  <li>React.js & Next.js</li>
                  <li>Ant Design</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="text-4xl mb-4 text-green-400">
                  <i className="fa fa-server"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">后端开发</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Java</li>
                  <li>Spring全家桶</li>
                  <li>MyBatis</li>
                  <li>Redis</li>
                  <li>数据库设计</li>
                </ul>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="text-4xl mb-4 text-purple-400">
                  <i className="fa fa-cogs"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">工具与工作流</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Git & GitHub</li>
                  <li>Webpack</li>
                  <li>单元测试</li>
                  <li>CI/CD</li>
                  <li>代码审查</li>
                </ul>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="text-4xl mb-4 text-yellow-400">
                  <i className="fa fa-lightbulb-o"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">其他技能</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>响应式设计</li>
                  <li>性能优化</li>
                  <li>SEO 优化</li>
                  <li>敏捷开发</li>
                  <li>技术写作</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 项目展示 */}
        <section id="projects" className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-12 text-center">
              <span className="inline-block pb-2 border-b-2 border-blue-500">
                精选项目
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 项目卡片 */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blogImg}
                    alt="博客项目预览图"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">React 博客系统</h3>
                  <p className="text-gray-300 mb-4">
                    使用 React 和 Nextjs构建的现代化博客系统，支持
                    Markdown编辑。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      AntDesign
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/project2/600/400"
                    alt="项目预览图"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    DMS经销商管理系统
                  </h3>
                  <p className="text-gray-300 mb-4">
                    是专为解决企业与经销商之间的协作难题而生的数字化工具。
                    它通过整合订单、库存、财务、营销等全流程，实现数据实时共享和智能决策，
                    帮助企业快速响应市场变化，提升渠道管理效率
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      Java
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      MySql
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/project3/600/400"
                    alt="项目预览图"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">WMS汽车零配件仓储物流管理系统</h3>
                  <p className="text-gray-300 mb-4">
                    基于SpringBoot的汽车零配件仓储物流管理系统，包含订单管理、库存管理、物流管理等模块。
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      Vue.js
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      Nuxt.js
                    </span>
                    <span className="px-3 py-1 bg-gray-700 text-xs rounded-full">
                      Firebase
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-blue-400 hover:underline flex items-center"
                  >
                    查看详情 <i className="fa fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
