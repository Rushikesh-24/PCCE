'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SearchProductCardProps {
  src: string;
  title: string;
  desc: string;
}

function SearchProductCard({src, title, desc}: SearchProductCardProps) {
  const router = useRouter()
  return (
    <div className='col-span-1 sm:col-span-2 md:col-span-3 p-4 flex items-center justify-center flex-col border'>
        <Image 
            src={src}
            height={200}
            width={200}
            alt=""
            className=' h-[200px] object-contain'
        />
        <div className='p-5 w-full'>
            <p className='text-4xl font-grotesqueBold'>{title}</p>
            <p className='mt-1'>{desc}</p>
            <button className='bg-[#ff7955] hover:bg-[#ff5733] text-white p-2 w-full text-center flex items-center justify-center mt-4' onClick={()=>{router.push('/product/1')}}>Search</button>
        </div>
    </div>
  )
}

export default SearchProductCard