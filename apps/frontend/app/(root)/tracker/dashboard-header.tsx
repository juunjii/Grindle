export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              G
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Grindle</h1>
              <p className="text-sm text-muted-foreground">Job Application Tracker</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            You
          </div>
        </div>
      </div>
    </header>
  )
}
