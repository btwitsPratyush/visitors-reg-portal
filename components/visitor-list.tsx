"use client"
import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Visitor } from "@/types/visitor"
import { Search, Download, Trash2, ArrowUpDown, Calendar, User, Home, Phone, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface VisitorListProps {
  visitors: Visitor[]
  searchTerm: string
  onSearchChange: (value: string) => void
  sortOrder: "asc" | "desc"
  onSortOrderChange: (value: "asc" | "desc") => void
  onClearAll: () => void
}

// Use memo to prevent unnecessary re-renders
const VisitorList = memo(function VisitorList({
  visitors,
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  onClearAll,
}: VisitorListProps) {
  const downloadCSV = () => {
    if (visitors.length === 0) return

    const headers = ["Name", "Flat Number", "Purpose", "Mobile", "Date & Time"]
    const csvRows = [
      headers.join(","),
      ...visitors.map((visitor) => {
        const date = new Date(visitor.timestamp).toLocaleString()
        return [
          `"${visitor.name}"`,
          `"${visitor.flatNumber}"`,
          `"${visitor.purpose}"`,
          `"${visitor.mobile}"`,
          `"${date}"`,
        ].join(",")
      }),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", `visitor_records_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.display = "none"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url) // Clean up to avoid memory leaks
  }

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "desc" ? "asc" : "desc")
  }

  const getPurposeBadgeColor = (purpose: string) => {
    switch (purpose) {
      case "Delivery":
        return "bg-blue-100 text-blue-800"
      case "Guest":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full shadow-md transition-all hover:shadow-lg">
      <CardHeader className="bg-emerald-50 rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl text-emerald-700">Visitor Log</CardTitle>
            <p className="text-gray-600 mt-1">Complete history of all registered visitors to the society.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleSortOrder} className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCSV}
              disabled={visitors.length === 0}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download CSV</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onClearAll}
              disabled={visitors.length === 0}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or flat number..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {visitors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No visitor records found</p>
            <p className="text-sm mt-2">Register your first visitor using the form to start tracking visits.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visitors.map((visitor) => (
              <div key={visitor.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-emerald-600" />
                      <h3 className="font-medium">{visitor.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm text-gray-600">Flat: {visitor.flatNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm text-gray-600">{visitor.mobile}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <Badge className={`${getPurposeBadgeColor(visitor.purpose)}`}>
                      <FileText className="h-3 w-3 mr-1" />
                      {visitor.purpose}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(visitor.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
})

export default VisitorList
