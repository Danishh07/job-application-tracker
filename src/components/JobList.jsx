import toast from 'react-hot-toast'

const statusStyles = {
  Applied: 'bg-blue-100 text-blue-800',
  Interviewing: 'bg-amber-100 text-amber-800',
  Rejected: 'bg-red-100 text-red-800',
}

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function JobList({ jobs, setJobs, searchTerm = '', totalJobCount = 0 }) {
  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id))
    toast.success('Job deleted successfully!')
  }

  const handleStatusChange = (id, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)),
    )
    toast.success('Job status updated!')
  }

  if (totalJobCount === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
          📋
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No jobs added yet</h3>
        <p className="mt-2 text-gray-500">Start applying and track your progress here!</p>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
          🔍
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No matching applications</h3>
        <p className="mt-2 text-gray-500">
          No results for &ldquo;{searchTerm}&rdquo;. Try a different search term.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
              <p className="text-gray-600 mt-1">{job.role}</p>
            </div>
            <span
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[job.status] ?? 'bg-gray-100 text-gray-800'}`}
            >
              {job.status}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Applied on <span className="font-medium text-gray-700">{formatDate(job.date)}</span>
          </p>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job.id, e.target.value)}
              className="flex-1 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="button"
              onClick={() => handleDelete(job.id)}
              className="px-4 py-2 rounded-md text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default JobList
