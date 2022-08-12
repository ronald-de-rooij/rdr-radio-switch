import Link from 'next/link'

export default function Logo() {
  return (
    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-6">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/">
          <img
            className="block h-8 w-auto cursor-pointer"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt="Workflow"
          />
        </Link>
      </div>
    </div>
  )
}