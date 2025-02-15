import { CircleCheckBig } from "lucide-react"

const Header = () => {
  return (
    <header className="text-white w-full bg-base-100 border-b border-base-300">
      <div className="flex items-center justify-between px-3 py-3">
        {/* logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-primary/10 rounded-xl  p-2">
            <CircleCheckBig className="text-primary size-5" />
          </div>
          <h1 className="text-lg font-bold">Todo</h1>
        </div>
      </div>
    </header>
  )
}

export default Header
