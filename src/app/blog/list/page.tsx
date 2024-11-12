// app/blog/list/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/blog/list');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-4">Blog Posts</h1>
      <Link href="/blog/create" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Create New Post
      </Link>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border-b">
            <h2 className="text-2xl">{post.title}</h2>
            <p>{post.content}</p>
            <div className="mt-2">
              <Link href={`/blog/edit/${post.id}`}>
                <a className="text-blue-500 hover:underline">Edit</a>
              </Link>
              <button
                className="text-red-500 ml-4"
                onClick={async () => {
                  await fetch(`/api/blog/delete?id=${post.id}`, {
                    method: 'DELETE',
                  });
                  setPosts(posts.filter((p) => p.id !== post.id)); // Remove from list
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;