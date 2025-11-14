import SideBar from "@/features/SideBar"
import Chat from "@/features/Chat"

export default function Home() {
    return (
        <main className="flex">
          <SideBar />
          <Chat />
        </main>
    )
}