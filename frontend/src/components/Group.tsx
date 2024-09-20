import React from 'react'

interface Props {
  name: string;
  image: string | null;
  minAge: number;
  maxAge: number;
}

export const Group = ({name, image, minAge, maxAge}: Props) => {
  return (
    <article className='flex w-[15rem]'>
      <aside>
        <img className='rounded-full' width={50} height={50} src={image || "https://via.placeholder.com/50"} alt='group' />
      </aside>
      <section className='pl-3 grid grid-flow-row grid-cols-1 grid-rows-2 shrink-0'>
        <h1 className='text-[#c4853a] font-bold'>{name}</h1>
        <p>{minAge}-{maxAge}</p>
      </section>
      

    </article>
  )
}