'use client'

import { useState } from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'

export default function ChatFilterBar() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-400"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <select
        className="w-full py-2 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-green-400"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Unread">Unread</option>
        <option value="Starred">Starred</option>
        {/* Add more filters if needed */}
      </select>
    </div>
  )
}
