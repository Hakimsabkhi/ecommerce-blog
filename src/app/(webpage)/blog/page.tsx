
import Blog from '@/components/fPost/Post';
import Blogbanner from '@/components/blogbanner';
import React from 'react';
interface blog {
    title: string;
    description: String;
    imageUrl: string;
    slug: string;
    vadmin:string;
    createdAt:string;
  }

  
  async function getBlogs() {
    try {
      const response = await fetch('/api/blog/listpostcustomer', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in getBlogs:", error);
      return []; // Return an empty array as a fallback
    }
  }

const Page = async () => {
  const blogs = await getBlogs();

  if (blogs.length === 0) {
    return (
      <div>
        <Blogbanner />
        <div>No blogs available at the moment. Please check back later.</div>
      </div>
    );
  }

  return (
    <div>
      <Blogbanner />
      <Blog blogs={blogs} />
    </div>
  );
};

export default Page;