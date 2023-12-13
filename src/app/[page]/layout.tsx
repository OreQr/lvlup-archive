import Search from "@/components/search"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col space-y-4 py-6">
      <Search />
      {children}
    </div>
  )
}
