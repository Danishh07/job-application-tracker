import { useState } from 'react'
import toast from 'react-hot-toast'

const initialFormState = {
  company: '',
  role: '',
  status: 'Applied',
  date: '',
}

const inputClasses =
  'bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full'

function AddJobForm({ setJobs }) {
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newJob = {
      id: crypto.randomUUID(),
      company: formData.company,
      role: formData.role,
      status: formData.status,
      date: formData.date,
    }

    setJobs((prevJobs) => [...prevJobs, newJob])
    setFormData(initialFormState)
    toast.success('Job added successfully!')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Add New Job</h2>
      <p className="text-gray-500 mb-6">Track your latest application details below.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            placeholder="e.g. Google"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="e.g. Frontend Developer"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition shadow-sm"
        >
          Add Job
        </button>
      </form>
    </div>
  )
}

export default AddJobForm
