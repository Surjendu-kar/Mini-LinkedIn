"use client";

import { useState } from "react";
import PostForm from "./PostForm";
import PostsFeed from "./PostsFeed";

export default function CenterFeed() {
  const [feedKey, setFeedKey] = useState(0);

  const handlePostCreated = () => {
    setFeedKey((prev) => prev + 1);
  };

  return (
    <div>
      {/* Post Creation Form */}
      <PostForm onPostCreated={handlePostCreated} />

      {/* Posts Feed */}
      <div className="mt-4 lg:mt-6">
        <PostsFeed key={feedKey} />
      </div>
    </div>
  );
}
