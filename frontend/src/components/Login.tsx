import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { loginForm } from '../schema/formValidation'
import axios, { AxiosError } from "axios"
import type z from "zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [serverError, setServerError] = useState<string | null>(null)
    const nav = useNavigate()

    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        resolver: zodResolver(loginForm),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(data: z.infer<typeof loginForm>) {
        setServerError(null)
        try {
            const res = await axios.post("/api/v1/auth/sign-in/email", data, { withCredentials: true })
            // console.log("Login Success:", res.data)
            nav('/todos')
        } catch (error) {
            console.error("ERROR FROM LOGIN_FORM:", error)
            const axiosError = error as AxiosError<{ message?: string }>;
            const errorMessage = axiosError.response?.data?.message || "Login failed. Please try again."
            setServerError(errorMessage)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-main-gradient p-4">
            <div className="w-full max-w-md p-8 rounded-md shadow-md bg-white/50 backdrop-blur-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {serverError && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {serverError}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-black">Email</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        placeholder="Enter your email"
                                        className={`w-full p-2 border rounded-md outline-none transition-colors ${fieldState.error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-black focus:border-blue-500'
                                            }`}
                                    />

                                    {fieldState.error && (
                                        <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-black">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <input
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        className={`w-full p-2 border rounded-md outline-none transition-colors ${fieldState.error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-black focus:border-blue-500'
                                            }`}
                                    />
                                    {fieldState.error && (
                                        <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>
                                    )}
                                </div>
                            )}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zinc-500 text-black py-2 px-4 rounded-md font-semibold hover:bg-zinc-700 disabled:bg-blue-300 transition-colors"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
