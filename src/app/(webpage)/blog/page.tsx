import Blog from '@/components/fPost/Post';
import Blogbanner from '@/components/blogbanner';
import React from 'react';

async function getBlogs() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/listpostcustomer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store', // Avoid caching if fresh data is required
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

  return (
    <div>
      <Blogbanner />
      {blogs.length === 0 ? (
        <div>No blogs available at the moment. Please check back later.</div>
      ) : (
        <Blog blogs={blogs} />
      )}
    </div>
  );
};

export default Page;
