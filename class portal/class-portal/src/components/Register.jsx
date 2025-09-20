import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./shared/InputField";
import Spinners from "./shared/Spinners";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        console.log("Register Click", data);
        setLoader(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    emailId: data.emailId,
                    password: data.password
                }),
            });

            if (response.ok) {
                toast.success("Registration successful! Please login to continue. 🎉");
                reset();
                navigate("/login");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
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
                                <form onSubmit={handleSubmit(registerHandler)}>
                                    <div className="text-center mb-4">
                                        <div className="mb-3">
                                            <div 
                                                className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                                                style={{ width: '80px', height: '80px' }}
                                            >
                                                <span style={{ fontSize: '2rem' }}>👤</span>
                                            </div>
                                        </div>
                                        <h2 className="text-dark fw-bold mb-2">
                                            Join Dantra!
                                        </h2>
                                        <p className="text-muted">
                                            Create your account to get started
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <InputField
                                            label="Full Name"
                                            required
                                            id="name"
                                            type="text"
                                            message="*Full name is required"
                                            placeholder="Enter your full name"
                                            register={register}
                                            errors={errors}
                                        />

                                        <InputField
                                            label="Email"
                                            required
                                            id="emailId"
                                            type="email"
                                            message="*Email is required"
                                            placeholder="Enter your email"
                                            register={register}
                                            errors={errors}
                                            validation={{
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            }}
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
                                            validation={{
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                }
                                            }}
                                        />
                                    </div>

                                    <button
                                        disabled={loader}
                                        className="btn btn-success w-100 py-2 mb-3"
                                        type="submit"
                                        style={{
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            border: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            if (!loader) {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
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
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>Create Account</>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-muted mb-0">
                                            Already have an account?{' '}
                                            <Link
                                                to="/login"
                                                className="text-primary text-decoration-none fw-semibold"
                                                style={{ 
                                                    transition: 'color 0.3s ease'
                                                }}
                                                onMouseOver={(e) => e.target.style.color = '#7C3AED'}
                                                onMouseOut={(e) => e.target.style.color = '#8B5CF6'}
                                            >
                                                Sign In
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

export default Register;
