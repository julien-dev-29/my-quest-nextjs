import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { SearchForm } from "../profiles/_components/search-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex items-center gap-4 p-4 border-b">
          <SidebarTrigger />
          <SearchForm />
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
