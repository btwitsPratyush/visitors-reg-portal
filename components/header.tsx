import { Building } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm relative z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <Building className="h-8 w-8 text-emerald-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Green Valley Society</h1>
            <p className="text-gray-600 mt-1">Visitor Registration Portal</p>
          </div>
        </div>
      </div>
    </header>
  )
}
