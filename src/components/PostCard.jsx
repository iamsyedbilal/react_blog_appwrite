import { Link } from "react-router-dom";
import { getFilePreview } from "../lib";

function PostCard({ $id, title, featuredImage }) {
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
      </div>
    </Link>
  );
}

export default PostCard;
