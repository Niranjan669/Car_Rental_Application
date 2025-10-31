import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/login', form);
      setUser(res.data.user);
      navigate('/cars');
    } catch (error) {
      setErr(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Login</h4>
              <form onSubmit={submit}>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                </div>
                <button className="btn btn-primary">Login</button>
                {err && <div className="mt-2 text-danger">{err}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
