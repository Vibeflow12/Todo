import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Todos = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const nav = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get("/api/v1/auth/get-session", { withCredentials: true })
                if (!res.data) {
                    nav('/login')
                } else {
                    setUser(res.data.user)
                }
            } catch (error) {
                console.error("ERROR FROM GET SESSION:  ", error)
                nav('/login')
            } finally {
                setLoading(false)
            }
        }
        checkSession();
    }, [nav])

    const handleLogout = async () => {
        try {
            const res = await axios.post("/api/v1/auth/sign-out", {}, { withCredentials: true })
            nav('/')
        } catch (error) {
            console.error("ERROR FROM LOGOUT:", error)
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    return (
        <>
            <button
                onClick={handleLogout}
                className="border border-black p-4 font-bold rounded-3xl hover:bg-black hover:text-white cursor-pointer transition-all"
            >
                Log out
            </button>

            <h1 className="text-4xl font-bold">
                Welcome, <span className="text-zinc-700">{user?.name || "User"}</span>
            </h1>

            <div
                className="flex items-center justify-center h-100 w-100 bg-white"
            >Todos</div>
        </>

    )
}


export default Todos