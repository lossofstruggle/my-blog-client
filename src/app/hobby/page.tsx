"use client";

import { useState, useEffect } from "react";
import { Card, Button, Skeleton, message } from "antd";
import {
  LikeOutlined,
  ShareAltOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { MOCK_GAMES } from "@/data/mockData";

export default function Games() {
  const [loading, setLoading] = useState(true);

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 处理点赞
  const handleLike = (type: string, id: number) => {
    message.success(`${type} 已点赞！`);
  };

  // 处理分享
  const handleShare = (type: string, id: number) => {
    message.success(`${type} 已分享！`);
  };
  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_GAMES.map((game) => (
            <Card
              key={game.id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <VideoCameraOutlined className="text-white text-xl" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-1">
                  {game.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarOutlined className="mr-1" />
                    {game.date}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="text"
                      icon={<LikeOutlined />}
                      size="small"
                      onClick={() => handleLike("视频", game.id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {game.likes}
                    </Button>
                    <Button
                      type="text"
                      icon={<ShareAltOutlined />}
                      size="small"
                      onClick={() => handleShare("视频", game.id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {game.shares}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
