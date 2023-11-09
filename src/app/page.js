import Image from 'next/image'
import Dashboards from '@/components/Dashboards'

export default function Home() {
  return (
    <main className='w-[90%] sm:w-[85%] md:w-[70%] umd:w-[60%] lg:w-[50%] xl:w-[45%] mx-auto mt-10'>
        <Dashboards />
    </main>
  )
}
