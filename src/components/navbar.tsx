import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <span className="text-sm font-semibold tracking-tight">Data Structure</span>
      <ThemeToggle />
    </header>
  )
}
