
import Image from 'next/image'
import React from 'react'
import ytnote from '../../public/ytnote.png'

const SideHeader = () => {
  return (
    <div className="flex gap-4 pl-2">
      <Image
        src={ytnote}
        width={20}
        height={20}
        className="rounded  object-contain"
        alt="ytnote"
      />
      <span className="text-2xl text-[#5d3fd3]">ytnotes</span>
    </div>
  );
}

export default SideHeader
