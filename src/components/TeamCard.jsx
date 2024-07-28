import React from 'react'

const TeamCard = ({user}) => {
  return (
    <div className="rounded-md border bg-white text-black">
              <img
                src={user.photoURL}
                alt={user.name}
                className="h-[300px] w-full rounded-lg object-cover"
              />
              <p className="mt-6 w-full px-2 text-xl font-semibold">
                {user.name}
              </p>
              <p className="w-full px-2 pb-6 text-sm font-semibold">
                {user.position}
              </p>
            </div>
  )
}

export default TeamCard
