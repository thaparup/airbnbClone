'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
    label: string,
    description: string,
    icon: IconType,
    selected?: boolean

}


const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, description, selected }) => {

    const queryParams = useSearchParams()

    return (
        <Link href={`?category=${label}`} className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </Link>
    )
}

export default CategoryBox