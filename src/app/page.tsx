"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const [posts, setPost] = useState([]);
  const [search, setSearch] = useState(false);
  const inputRef = useRef("");
  console.log(posts)
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((items) => items.json())
    .then((val)=> setPost(val))
  }, []);

  const searchPost = (e) => {
    if (e.type === 'keyDown' && e.key !== 'Enter') {
      return
    }
    setSearch(!true);
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value)
    .then((items) => items.json())
    .then((val)=> setPost(val))
  }
  return (
    <>  
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
    <div className="flex justify-end px-4">
        <input ref={inputRef }  onKeyDown={searchPost} type="text" className="px-4 py-2 border border-gray-300 rounded-md mb-20" placeholder="Search..." />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 mb-20" disabled={search} onClick={ searchPost} >{search ? "..." : "Search"}</button>
      </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20px">
        {posts.map((post,index) => (
          <Link href={'/post[_id]'} as={`/post/${post._id}`}>
          <div className="border border-gray-200 p-4" key={index}>
            <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image" />
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          
          
            </div>
            </Link>
        ))}
        {posts.length === 0 && <p className="text-center">No Post Found</p>}
        
      
     
    </div>
    
    </>
  )
}
