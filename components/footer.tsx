import { Github, Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <a
              href="https://github.com/btwitsPratyush"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://pratyushport.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-emerald-50"
              aria-label="Portfolio Website"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
