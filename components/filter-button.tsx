'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type FilterOption = 'verification' | 'sales' | 'customer service'

export default function FilterButton() {
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([])

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters(current =>
      current.includes(filter)
        ? current.filter(f => f !== filter)
        : [...current, filter]
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[140px] justify-start">
          <Filter className="mr-2 h-4 w-4" />
          {activeFilters.length > 0 ? `Filters (${activeFilters.length})` : 'Filters'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes('verification')}
          onCheckedChange={() => toggleFilter('verification')}
        >
          Verification
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes('sales')}
          onCheckedChange={() => toggleFilter('sales')}
        >
          Sales
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={activeFilters.includes('customer service')}
          onCheckedChange={() => toggleFilter('customer service')}
        >
          Customer Service
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}