import { Link } from "react-router-dom";
import { getFilePreview } from "../lib";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link
      to={`/post-details/${$id}`}
      className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md 
                 hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] 
                 transition-all duration-300 border border-gray-200 dark:border-gray-800"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {content.replace(/<[^>]+>/g, "").slice(0, 60)}...
        </p>
        <span className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline transition duration-200">
          Read More &rarr;
        </span>
      </div>
    </Link>
  );
}

export default PostCard;
