import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-16 py-32 text-center">
      <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight">
        Theme toggle demo
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Use the moon button in the navbar to switch between Light, Dark, and
        System. Everything on this page follows the theme.
      </p>
      <Button variant="default">Test button</Button>
    </div>
  )
}
