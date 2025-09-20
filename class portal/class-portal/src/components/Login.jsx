import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./shared/InputField";
import Spinners from "./shared/Spinners";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    // Redirect to dashboard when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            console.log("Login component: User is authenticated, redirecting to dashboard");
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const loginHandler = async (data) => {
        console.log("Login Click", data);
        setLoader(true);
        
        try {
            const result = await login(data);
            
            if (result.success) {
                console.log("Login successful");
                toast.success("Login successful! Welcome back! 🎉");
                reset();
                // Navigation will be handled by useEffect when isAuthenticated changes
            } else {
                console.log("Login failed:", result.error);
                toast.error(result.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center" 
             style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-lg border-0" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit(loginHandler)}>
                                    <div className="text-center mb-4">
                                        <div className="mb-3">
                                            <div 
                                                className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                                                style={{ width: '80px', height: '80px' }}
                                            >
                                                <span style={{ fontSize: '2rem' }}>🔐</span>
                                            </div>
                                        </div>
                                        <h2 className="text-dark fw-bold mb-2">
                                            Welcome Back!
                                        </h2>
                                        <p className="text-muted">
                                            Sign in to your Dantra account
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <InputField
                                            label="Name/Email"
                                            required
                                            id="name"
                                            type="text"
                                            message="*Name or email is required"
                                            placeholder="Enter your name or email"
                                            register={register}
                                            errors={errors}
                                        />

                                        <InputField
                                            label="Password"
                                            required
                                            id="password"
                                            type="password"
                                            message="*Password is required"
                                            placeholder="Enter your password"
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>

                                    <button
                                        disabled={loader}
                                        className="btn btn-primary w-100 py-2 mb-3"
                                        type="submit"
                                        style={{
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
                                            border: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            if (!loader) {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (!loader) {
                                                e.target.style.transform = 'translateY(0)';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    >
                                        {loader ? (
                                            <>
                                                <Spinners size="sm" className="me-2" />
                                                Signing In...
                                            </>
                                        ) : (
                                            <>Sign In</>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-muted mb-0">
                                            Don't have an account?{' '}
                                            <Link
                                                to="/register"
                                                className="text-primary text-decoration-none fw-semibold"
                                                style={{ 
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseOver={(e) => e.target.style.color = '#7C3AED'}
                                                onMouseOut={(e) => e.target.style.color = '#8B5CF6'}
                                            >
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
