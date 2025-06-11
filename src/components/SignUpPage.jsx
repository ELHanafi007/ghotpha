// src/components/SignUpPage.jsx - CORRECTED SVG ICON
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) return setError('Passwords do not match.');
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. The email may be in use or password is too weak.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-cream p-4 font-body">
      <div className="w-full max-w-md p-8 space-y-6 border border-cream/10 rounded-xl bg-gray-900/50">
        <h1 className="text-4xl font-fancy-title text-center">Create Your Ghorpha Account</h1>

        {error && <p className="bg-blood-red/20 text-red-400 p-3 rounded-md text-center">{error}</p>}

        {/* --- Google Sign-In Button with Corrected SVG --- */}
        <button onClick={handleGoogleSignIn} className="google-button w-full">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C39.99,36.631,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          Continue with Google
        </button>

        <div className="or-divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-cream/70">Email Address</label>
            <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} className="checkout-input mt-1" required />
          </div>
          <div>
            <label htmlFor="password-signup" className="text-sm font-medium text-cream/70">Password</label>
            <input id="password-signup" name="password" type="password" onChange={(e) => setPassword(e.target.value)} className="checkout-input mt-1" required />
            <p className="text-xs text-cream/40 mt-1">Password should be at least 6 characters.</p>
          </div>
           <div>
            <label htmlFor="password-confirm" className="text-sm font-medium text-cream/70">Confirm Password</label>
            <input id="password-confirm" name="password-confirm" type="password" onChange={(e) => setPasswordConfirm(e.target.value)} className="checkout-input mt-1" required />
          </div>
          <button disabled={loading} type="submit" className="checkout-button w-full">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm text-cream/60">
          Already have an account? <Link to="/login" className="font-medium text-blood-red hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}