import { AppLayout } from "@/components/AppLayout";

export const metadata = {
    title: "ARCE | Daftar Pekerjaan",
    description: "Daftar pekerjaan yang tersedia di ARCE",
};

export const JobLayout = ({ children }: { children: React.ReactNode }) => {
    return (<>
        <AppLayout >{children}</AppLayout>
    </>

    );
}

export default JobLayout