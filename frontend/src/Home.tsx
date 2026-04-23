
const Home = () => {
    return (
        <>
            <div className="min-h-screen w-full flex flex-col items-center justify-center font-inter bg-gradient-to-br from-yellow-400 via-red-300 to-blue-900">

                <div className="flex flex-col items-center gap-10">

                    <div className="text-7xl md:text-9xl font-bold drop-shadow-2xl">
                        TODOS
                    </div>

                    <div className="flex gap-10">
                        <button className="font-semibold px-4 py-2 border-2 border-black rounded-xl text-2xl md:text-4xl hover:bg-gradient-to-tl hover:from-yellow-400 hover:via-red-300 hover:to-blue-900 transition-all duration-300">
                            Login
                        </button>
                        <button className="font-semibold px-4 py-2 border-2 border-black rounded-xl text-2xl md:text-4xl hover:bg-gradient-to-tl hover:from-yellow-400 hover:via-red-300 hover:to-blue-900 transition-all duration-300">
                            Sign up
                        </button>
                    </div>

                </div>

            </div>


        </>
    )
}

export default Home