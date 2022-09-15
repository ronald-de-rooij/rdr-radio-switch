import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" >
      <a className="text-2xl uppercase font-press font-black">Radio<span className='font-light'>Switch</span></a>
    </Link>
  )
}