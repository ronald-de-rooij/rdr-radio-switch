import Link from 'next/link'

interface Props {
  classNames?: string
  url: string
  link: string
  onClick?: () => void
}

export default function RdrButton({ classNames, url, link, onClick }: Props) {
  return (
    <Link href={url} legacyBehavior>
      <a
        onClick={onClick}
        className={`px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${classNames}`}
      >
        {link}
      </a>
    </Link>
  )
}
