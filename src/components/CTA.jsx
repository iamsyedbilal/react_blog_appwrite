import { Link } from "react-router-dom";
import { Components } from "./";
import { FaRocket } from "react-icons/fa";

function CTA() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white py-24 px-6 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-white/10 rounded-full filter blur-2xl animate-pulse"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Ready to Share Your Story?
        </h2>
        <p className="text-lg sm:text-xl mb-8 drop-shadow-sm">
          Join our community of passionate writers and start publishing your
          ideas today.
        </p>
        <Link to="/create-post">
          <Components.Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            Get Started <FaRocket className="animate-bounce" />
          </Components.Button>
        </Link>
      </div>
    </section>
  );
}

export default CTA;
