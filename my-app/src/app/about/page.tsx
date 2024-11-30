import Image from "next/image";

// src/app/about/page.tsx
export default function AboutPage() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          About Us
        </h1>
  
        {/* Description Section */}
        <section className="max-w-4xl mx-auto text-center px-4">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our website! We aim to provide a platform where users can manage tasks efficiently.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Our team believes in simplicity and productivity. This application helps individuals and teams stay
            organized and focused on what matters most.
          </p>
          
          {/* Call to Action */}
          <div className="mt-6">
            <a
              href="/"
              className="inline-block py-2 px-6 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
    );
  }
  