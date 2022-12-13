import Logo from './Logo'
import HeaderAccount from './HeaderAccount'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          <HeaderAccount />
        </div>
      </div>
    </header>
  )
}
