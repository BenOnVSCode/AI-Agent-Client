'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { changeCallsFilter } from '@/app/store/slices'



const ALL_FILTERS: { id: number; name: string }[] = [
  { id: 1, name: 'Verification' },
  { id: 2, name: 'WG Sales' },
  { id: 3, name: 'PCP Sales' }
];

export default function FilterButton() {
  const [selectedFilters, setSelectedFilters] = useState<number[]>(ALL_FILTERS.map(filter => filter.id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCallsFilter(selectedFilters))
  }, [selectedFilters]);


  const toggleFilter = (filterId: number) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        const newFilters = prev.filter(id => id !== filterId);
        return newFilters.length === 0 ? ALL_FILTERS.map(filter => filter.id) : newFilters;
      } else {
        return [...prev, filterId];
      }
    });
  }


  const getButtonText = () => {
    if (selectedFilters.length === ALL_FILTERS.length) {
      return 'All';
    } else if (selectedFilters.length === 0) {
      return 'Filter';
    } else {
      return selectedFilters
        .map(id => ALL_FILTERS.find(filter => filter.id === id)?.name)
        .filter(name => name !== undefined)
        .join(', ');
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[120px] justify-start text-left">
          <Filter className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">
            {getButtonText()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]">
        {ALL_FILTERS.map(({ id, name }) => (
          <DropdownMenuCheckboxItem
            key={id}
            checked={selectedFilters.includes(id)}
            onCheckedChange={() => toggleFilter(id)}
          >
            {name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

