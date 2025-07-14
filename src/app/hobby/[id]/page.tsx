// import { useState, useEffect } from "react";
// import { Layout, Card, Avatar, Badge, Button, Rate } from "antd";
// import {
//   ShareAltOutlined,
//   GithubOutlined,
//   CalendarOutlined,
//   TagOutlined,
//   EyeOutlined,
//   ArrowLeftOutlined,
//   PlayCircleOutlined,
//   MessageOutlined,
// } from "@ant-design/icons";
// import { useRouter, useParams } from "next/navigation";

// // 模拟数据
// const MOCK_USER = {
//   name: "技术游戏达人",
//   avatar: "https://picsum.photos/id/1005/200/200",
//   bio: "热爱技术与游戏的开发者，分享工作经验和游戏心得",
//   location: "上海",
//   occupation: "前端工程师",
//   social: {
//     github: "https://github.com",
//     twitter: "https://twitter.com",
//     linkedin: "https://linkedin.com",
//   },
//   stats: {
//     articles: 128,
//     questions: 56,
//     answers: 234,
//     followers: 890,
//   },
// };

// const MOCK_GAME = {
//   id: 1,
//   title: "《艾尔登法环》全BOSS攻略",
//   description:
//     "详细介绍《艾尔登法环》中所有BOSS的弱点和打法技巧，帮助玩家顺利通关。本攻略包含游戏中所有主要BOSS的详细分析，包括它们的攻击模式、弱点和推荐的打法策略。",
//   videoUrl: "https://picsum.photos/id/1035/800/450",
//   thumbnail: "https://picsum.photos/id/1035/400/225",
//   tags: ["艾尔登法环", "游戏攻略", "动作RPG"],
//   date: "2023-06-18",
//   views: 2345,
//   likes: 123,
//   shares: 45,
//   author: MOCK_USER,
//   comments: [
//     {
//       id: 1,
//       content:
//         "非常详细的攻略，帮我打败了一直打不过的BOSS！特别是关于攻击时机的建议非常有用。",
//       author: {
//         name: "游戏爱好者",
//         avatar: "https://picsum.photos/id/1012/100/100",
//       },
//       date: "2023-06-19",
//       likes: 28,
//     },
//     {
//       id: 2,
//       content: "请问有没有关于最终BOSS的特别攻略？我卡在那里已经很久了。",
//       author: {
//         name: "卡住的玩家",
//         avatar: "https://picsum.photos/id/1027/100/100",
//       },
//       date: "2023-06-20",
//       likes: 12,
//       replies: [
//         {
//           id: 1,
//           content:
//             "最终BOSS确实很难，我建议使用火焰伤害武器和增加生命值的护符。关键是要保持距离，等待他的攻击间隙再反击。",
//           author: {
//             name: "技术游戏达人",
//             avatar: "https://picsum.photos/id/1005/200/200",
//           },
//           date: "2023-06-20",
//           likes: 15,
//         },
//       ],
//     },
//     {
//       id: 3,
//       content:
//         "视频制作得非常专业，解说也很清晰。请问你是用什么软件录制和编辑的？",
//       author: {
//         name: "视频爱好者",
//         avatar: "https://picsum.photos/id/1025/100/100",
//       },
//       date: "2023-06-21",
//       likes: 8,
//     },
//   ],
// };

// const GamePage: React.FC = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [game, setGame] = useState<MOCK_GAME>(null);
//   const [commentForm, setCommentForm] = useState(false);
//   // const [commentContent, setCommentContent] = useState("");
//   const [likeCount, setLikeCount] = useState(MOCK_GAME.likes);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // 模拟数据加载
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       setGame(MOCK_GAME);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [id]);

//   // 处理返回
//   const handleBack = () => {
//     router.back();
//   };

//   // 处理点赞
//   const handleLike = () => {
//     if (isLiked) {
//       setLikeCount((prev) => prev - 1);
//     } else {
//       setLikeCount((prev) => prev + 1);
//     }
//     setIsLiked(!isLiked);
//   };

//   // 处理分享
//   const handleShare = () => {
//     navigator.clipboard
//       .writeText(window.location.href)
//       .then(() => {
//         alert("链接已复制到剪贴板");
//       })
//       .catch((err) => {
//         console.error("复制失败:", err);
//       });
//   };

//   // 切换评论表单
//   const toggleCommentForm = () => {
//     setCommentForm(!commentForm);
//   };

//   // 提交评论
//   // const handleSubmitComment = () => {
//   //   if (!commentContent.trim()) {
//   //     alert("请输入评论内容");
//   //     return;
//   //   }

//   //   // 模拟添加评论
//   //   setGame((prev) => ({
//   //     ...prev,
//   //     comments: [
//   //       {
//   //         id: prev.comments.length + 1,
//   //         content: commentContent,
//   //         author: {
//   //           name: "匿名用户",
//   //           avatar: "https://picsum.photos/id/1025/100/100",
//   //         },
//   //         date: new Date().toISOString().split("T")[0],
//   //         likes: 0,
//   //       },
//   //       ...prev.comments,
//   //     ],
//   //   }));

//   //   setCommentContent("");
//   //   setCommentForm(false);
//   // };

//   // 处理评论点赞
//   // const handleCommentLike = (commentId: number) => {
//   //   setGame((prev) => ({
//   //     ...prev,
//   //     comments: prev.comments.map((comment: any) =>
//   //       comment.id === commentId
//   //         ? { ...comment, likes: comment.likes + 1 }
//   //         : comment
//   //     ),
//   //   }));
//   // };

//   // 处理回复点赞
//   // const handleReplyLike = (commentId: number, replyId: number) => {
//   //   setGame((prev) => ({
//   //     ...prev,
//   //     comments: prev.comments.map((comment: any) =>
//   //       comment.id === commentId
//   //         ? {
//   //             ...comment,
//   //             replies: comment.replies.map((reply: any) =>
//   //               reply.id === replyId
//   //                 ? { ...reply, likes: reply.likes + 1 }
//   //                 : reply
//   //             ),
//   //           }
//   //         : comment
//   //     ),
//   //   }));
//   // };

//   // 切换播放状态
//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   if (loading || !game) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
//           <p className="text-gray-500 dark:text-gray-400">加载视频中...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Layout className="container mx-auto px-4 py-6">
//       <Button
//         type="text"
//         icon={<ArrowLeftOutlined />}
//         onClick={handleBack}
//         className="mb-4 hover:text-primary transition-colors"
//       >
//         返回列表
//       </Button>

//       <Card className="mb-6 overflow-hidden">
//         <div className="relative aspect-video bg-gray-900">
//           <img
//             src={game.videoUrl}
//             alt={game.title}
//             className="w-full h-full object-cover"
//           />
//           {!isPlaying && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
//               <Button
//                 type="primary"
//                 size="large"
//                 shape="circle"
//                 icon={<PlayCircleOutlined className="text-4xl" />}
//                 onClick={togglePlay}
//                 className="hover:bg-primary/90 transition-colors"
//               />
//             </div>
//           )}
//           {isPlaying && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//               <p className="text-white text-lg">视频播放中...</p>
//               <Button
//                 type="default"
//                 size="small"
//                 onClick={togglePlay}
//                 className="ml-4"
//               >
//                 暂停
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">{game.title}</h1>

//           <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
//             <Avatar src={game.author.avatar} size={32} className="mr-2" />
//             <span className="mr-3">{game.author.name}</span>
//             <span className="mr-3 flex items-center">
//               <CalendarOutlined className="mr-1" /> {game.date}
//             </span>
//             <span className="flex items-center">
//               <EyeOutlined className="mr-1" /> {game.views}
//             </span>
//           </div>

//           <div className="flex flex-wrap gap-2 mb-6">
//             {game.tags.map((tag: string) => (
//               <Badge
//                 key={tag}
//                 count={tag}
//                 className="cursor-pointer hover:bg-primary/10 transition-colors"
//               >
//                 <TagOutlined />
//               </Badge>
//             ))}
//           </div>

//           <div className="prose max-w-none mb-6">
//             <p className="text-gray-700 dark:text-gray-300">
//               {game.description}
//             </p>
//           </div>

//           <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
//             <div className="flex items-center space-x-4">
//               <Button
//                 type="text"
//                 icon={
//                   <GithubOutlined className={isLiked ? "text-primary" : ""} />
//                 }
//                 onClick={handleLike}
//                 className={`${
//                   isLiked ? "text-primary" : "text-gray-600 dark:text-gray-300"
//                 } hover:text-primary transition-colors`}
//               >
//                 {likeCount}
//               </Button>
//               <Button
//                 type="text"
//                 icon={<ShareAltOutlined />}
//                 onClick={handleShare}
//                 className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
//               >
//                 {game.shares}
//               </Button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Rate defaultValue={4.8} disabled className="text-primary" />
//               <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
//                 4.8 (127人评价)
//               </span>
//             </div>
//           </div>
//         </div>
//       </Card>

//       <Card>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold">评论 ({game.comments.length})</h2>
//             <Button
//               type="primary"
//               onClick={toggleCommentForm}
//               icon={<MessageOutlined />}
//             >
//               {commentForm ? "取消评论" : "发表评论"}
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </Layout>
//   );
// };

// export default GamePage;
