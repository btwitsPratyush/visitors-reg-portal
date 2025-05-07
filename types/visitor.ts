export type VisitPurpose = "Delivery" | "Guest" | "Maintenance" | "Other"

export interface Visitor {
  id: string
  name: string
  flatNumber: string
  purpose: VisitPurpose
  mobile: string
  timestamp: string
}
