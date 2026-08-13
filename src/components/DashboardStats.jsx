function DashboardStats({ jobs }) {
  const totalJobs = jobs.length
  const interviewingJobs = jobs.filter((job) => job.status === 'Interviewing').length
  const rejectedJobs = jobs.filter((job) => job.status === 'Rejected').length

  const stats = [
    {
      label: 'Total Applications',
      value: totalJobs,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      valueText: 'text-blue-900',
    },
    {
      label: 'Interviewing',
      value: interviewingJobs,
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-700',
      valueText: 'text-amber-900',
    },
    {
      label: 'Rejected',
      value: rejectedJobs,
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-700',
      valueText: 'text-red-900',
    },
  ]

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} ${stat.border} border rounded-lg p-4`}
          >
            <p className={`text-sm font-medium ${stat.text}`}>{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.valueText}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DashboardStats
