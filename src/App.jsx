import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import DashboardStats from './components/DashboardStats'
import AddJobForm from './components/AddJobForm'
import JobList from './components/JobList'

const STORAGE_KEY = 'job-tracker-data'

function exportToCSV(jobs) {
  const headers = ['Company', 'Role', 'Status', 'Date']
  const rows = jobs.map((job) => [job.company, job.role, job.status, job.date])
  const csvContent = [headers, ...rows]
    .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'jobs.csv'
  link.click()
  URL.revokeObjectURL(url)
}

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem(STORAGE_KEY)
    if (savedJobs) {
      try {
        return JSON.parse(savedJobs)
      } catch {
        return []
      }
    }
    return []
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return true
    return (
      job.company.toLowerCase().includes(term) || job.role.toLowerCase().includes(term)
    )
  })

  const handleExport = () => {
    if (jobs.length === 0) return
    exportToCSV(jobs)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans">
      <Toaster position="bottom-right" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddJobForm setJobs={setJobs} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats jobs={jobs} />
            <section>
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Your Applications</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by company or role..."
                      className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition shadow-sm"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                    Export CSV
                  </button>
                </div>
              </div>
              <JobList
                jobs={filteredJobs}
                setJobs={setJobs}
                searchTerm={searchTerm}
                totalJobCount={jobs.length}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
