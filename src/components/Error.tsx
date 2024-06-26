import { PropsWithChildren } from "react"

export const Error = ({children} : PropsWithChildren) => {
  return (
    <div className="text-center my-4 bg-red-400 rounded-lg text-white font-bold p-2 uppercase">
        {children}
    </div>
  )
}
