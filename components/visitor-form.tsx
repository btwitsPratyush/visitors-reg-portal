"use client"
import { memo } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { User, Home, Phone, FileText } from "lucide-react"
import type { Visitor } from "@/types/visitor"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  flatNumber: z.string().min(1, { message: "Flat number is required." }),
  purpose: z.enum(["Delivery", "Guest", "Maintenance", "Other"], {
    required_error: "Please select a purpose of visit.",
  }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits." }),
})

type FormValues = z.infer<typeof formSchema>

interface VisitorFormProps {
  onAddVisitor: (visitor: Visitor) => void
}

// Use memo to prevent unnecessary re-renders
const VisitorForm = memo(function VisitorForm({ onAddVisitor }: VisitorFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      flatNumber: "",
      purpose: "Guest",
      mobile: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    const newVisitor: Visitor = {
      id: uuidv4(),
      ...data,
      timestamp: new Date().toISOString(),
    }

    onAddVisitor(newVisitor)
    form.reset()
  }

  return (
    <Card className="w-full shadow-md transition-all hover:shadow-lg">
      <CardHeader className="bg-emerald-50 rounded-t-lg">
        <CardTitle className="text-2xl text-emerald-700">Register New Visitor</CardTitle>
        <p className="text-gray-600 mt-2">Please fill in the visitor details to create a new entry in the system.</p>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-emerald-600" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter visitor's full name"
                      {...field}
                      className="transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flatNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-emerald-600" />
                    Flat Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter flat number (e.g. A-101)"
                      {...field}
                      className="transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-emerald-600" />
                    Purpose of Visit
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                        <SelectValue placeholder="Select purpose of visit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="Guest">Guest</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="10-digit mobile number"
                      {...field}
                      className="transition-all focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      type="tel"
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all">
              Complete Registration
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
})

export default VisitorForm
