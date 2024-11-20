import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../Styles/Register.css"; 

function Register() {
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/user/register", {
                user_name: user_name,
                email: email,
                gender: gender, 
                phone_number: phone_number,
                password: password,
            });
            alert("Employee Registration Successful");
            setTimeout(() => {
                navigate('/user/login'); 
            }, 1000);
            
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="d-flex flex-row justify-content-center register-form-container">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 login-form-container text-left mb-4">
                <h2>Registration Form</h2>

                <form>
                    <div className="form-label fw-bold mb-2">
                        <label className="mb-2">Account Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeename"
                            placeholder="Enter Name"
                            value={user_name}
                            onChange={(event) => {
                                setUser_name(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-label fw-bold mb-2">
                        <label className="mb-2">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>

                    <div className="form-label fw-bold mb-2">
                        <label className="mb-2">Gender</label>
                        <select
                            className="form-select"
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                                >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="form-label fw-bold mb-2">
                        <label className="mb-2">Phone Number</label>
                        <input 
                            type="phonenumber"
                            className="form-control"
                            id="phonenumber"
                            placeholder="Enter Phone Number"
                            value={phone_number}
                            onChange={(event) => {
                                setPhoneNumber(event.target.value);
                            }}
                        />
                    </div>


                    <div className="form-label fw-bold mb-2">
                        <label className="mb-2">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>

                    

                    
                        <button type="submit" className="button btn btn-primary w-100 mt-3" onClick={save}>Register</button>
                        
                    
                </form>
            </div>
            
            
        </div>
    );
}

export default Register;
