import Blog from '@/components/fPost/Post';
import Blogbanner from '@/components/blogbanner';

async function getBlogs() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/listpostcustomer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache", // Use no-cache to allow dynamic fetch in a server component
      next: { revalidate: 0 }, // Ensures the data is always fetched fresh
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getBlogs:", error);
    return []; // Return an empty array on error
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
