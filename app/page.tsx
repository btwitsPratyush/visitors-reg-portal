"use client"

import { useState, useCallback, useMemo } from "react"
import Header from "@/components/header"
import VisitorForm from "@/components/visitor-form"
import VisitorList from "@/components/visitor-list"
import Footer from "@/components/footer"
import BackgroundAnimation from "@/components/background-animation"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { Visitor } from "@/types/visitor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Building, Shield, Clock, FileText, Users } from "lucide-react"

export default function Home() {
  const { toast } = useToast()
  const [visitors, setVisitors] = useLocalStorage<Visitor[]>("visitors", [])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Use useCallback to prevent recreation of these functions on every render
  const handleAddVisitor = useCallback(
    (visitor: Visitor) => {
      setVisitors((prev) => [visitor, ...prev])
      toast({
        title: "Visitor Registered Successfully",
        description: `${visitor.name} has been registered to visit flat ${visitor.flatNumber}.`,
      })
    },
    [setVisitors, toast],
  )

  const handleClearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all visitor records? This action cannot be undone.")) {
      setVisitors([])
      toast({
        title: "All Records Cleared",
        description: "All visitor records have been permanently removed from the system.",
        variant: "destructive",
      })
    }
  }, [setVisitors, toast])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleSortOrderChange = useCallback((value: "asc" | "desc") => {
    setSortOrder(value)
  }, [])

  // Memoize these calculations to prevent recalculation on every render
  const filteredVisitors = useMemo(
    () =>
      visitors.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [visitors, searchTerm],
  )

  const sortedVisitors = useMemo(
    () =>
      [...filteredVisitors].sort((a, b) => {
        if (sortOrder === "desc") {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        } else {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        }
      }),
    [filteredVisitors, sortOrder],
  )

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BackgroundAnimation />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5">
            <VisitorForm onAddVisitor={handleAddVisitor} />
          </div>
          <div className="lg:col-span-7">
            <VisitorList
              visitors={sortedVisitors}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              sortOrder={sortOrder}
              onSortOrderChange={handleSortOrderChange}
              onClearAll={handleClearAll}
            />
          </div>
        </div>

        {/* Elegant About Section */}
        <section className="mt-16 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-700 inline-block relative">
              About the Portal
              <span className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 opacity-70 rounded"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 transform hover:-translate-y-1 duration-300 border border-emerald-50">
              <div className="bg-emerald-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Building className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Management</h3>
              <p className="text-gray-600">
                Replace traditional paper-based visitor logs with a streamlined digital solution designed for modern
                residential societies.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 transform hover:-translate-y-1 duration-300 border border-emerald-50">
              <div className="bg-emerald-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Enhanced Security</h3>
              <p className="text-gray-600">
                Maintain detailed records of all individuals entering the premises, improving overall society security
                and resident safety.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 transform hover:-translate-y-1 duration-300 border border-emerald-50">
              <div className="bg-emerald-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Time Efficiency</h3>
              <p className="text-gray-600">
                Save time with quick digital registration, instant search capabilities, and automated record-keeping for
                all society visitors.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 transform hover:-translate-y-1 duration-300 border border-emerald-50">
              <div className="bg-emerald-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Insights</h3>
              <p className="text-gray-600">
                Gain valuable information about visitor patterns and frequency through comprehensive record-keeping and
                data exports.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="bg-white p-5 rounded-full shadow-md">
                  <Users className="h-24 w-24 text-emerald-600" />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">Designed for Society Staff & Residents</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The Society Visitor Registration Portal has been meticulously crafted to provide a seamless experience
                  for both society staff and residents. With its intuitive interface, staff can quickly register
                  visitors, while residents benefit from enhanced security and transparency.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The responsive design ensures optimal performance across all devices, from desktop computers to mobile
                  phones, allowing society staff to manage visitors efficiently from anywhere within the premises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-16 mb-4">
          © {currentYear} Green Valley Society Visitor Registration Portal. All rights reserved.
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
