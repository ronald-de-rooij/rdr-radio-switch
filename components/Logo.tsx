import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" legacyBehavior>
      <a className="text-2xl font-black uppercase font-press">
        Radio<span className="font-light">Switch</span>
      </a>
    </Link>
  )
}
