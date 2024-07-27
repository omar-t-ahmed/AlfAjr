import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const CreateHabit = () => {
  return (
    <main className="bg-zinc-900 h-screen text-white">
    <MaxWidthWrapper className="py-4">
      <div className="flex flex-col items-center">
        <div className="font-bold text-3xl">
          Create Habit
        </div>
      </div>
    
    </MaxWidthWrapper>
    </main>
  )
}

export default CreateHabit