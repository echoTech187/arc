
import { AppLayout } from "@/components/AppLayout"
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Dashboard | ARCE",
    description: "Dashboard",
}
export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppLayout title="Dashboard">
            {children}
        </AppLayout>
    )
}
export default DashboardLayout