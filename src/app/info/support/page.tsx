import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const Support = () => {

  return (
    <main className="bg-zinc-900 h-screen text-white">
    <MaxWidthWrapper className="py-4">
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl">
          Support
        </div>
        <form className="w-full max-w-md flex flex-col items-center">
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-300 mb-1">
                Comments
              </label>
              <textarea
                id="comments"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
      </div>
    </MaxWidthWrapper>
    </main>
  )
}

export default Support