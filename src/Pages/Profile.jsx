import React, { useEffect, useState } from "react";
import logo from "../assets/images/bank.png";
import { IoLocationSharp, IoLogOutOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { IoIosLock } from "react-icons/io";
import { updateProfile, userData as userDataEndpoint } from "../Services/GlobalApi";
import { Link, useNavigate } from "react-router-dom";
import {
    Button, Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(''); // Use userData for storing user data
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openPin, setOpenPin] = React.useState(false);
    const [openFather, setOpenFather] = React.useState(false);
    const [phone, setPhone] = useState('');
    const [fatherName, setfatherName] = useState('');
    const [address, sethandleAddress] = useState('');
    const [pin, setPin] = useState('');

    const handleOpen = () => setOpen(!open);
    const handleOpenPin = () => setOpenPin(!openPin);
    const handleFather = () => setOpenFather(!openFather);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(userDataEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const responseData = await response.json();
            setUserData(responseData.data);
            setPhone(responseData.data.phone);
            setfatherName(responseData.data.father_name);
            sethandleAddress(responseData.data.address);
            setPin(responseData.data.pin);
            // console.log(responseData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogout = () => {
        // Clear authentication-related data from local storage
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');

        navigate('/login');
    };
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleFatherName = (e) => {
        setfatherName(e.target.value);
    }
    const handleAddress = (e) => {
        sethandleAddress(e.target.value);
    }
    const handlePin = (e) => {
        setPin(e.target.value);
    }
    // handle phone
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('phone', phone);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });
            const responseData = await response.json();
            setUserData(responseData.data);
            setPhone(responseData.data.phone);

            console.log
        } catch (error) {
            console.log(error);
        }
    }

    const uploadImage = async (base64Image) => {
        try {
            const token = localStorage.getItem('token');
            const imageData = "data:image/jpeg;base64," + base64Image;
            const response = await fetch('https://phplaravel-1248874-4475389.cloudwaysapps.com/api/add-photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ photo: imageData })
            });
            const responseData = await response.json();
            console.log(responseData); 
            if (responseData.success) {
                const imageUrl = responseData.data.photo;

                localStorage.setItem('uploadedImageUrl', imageUrl);
            } else {
                console.error('Error uploading image:', responseData.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                console.log(base64String);
                uploadImage(base64String); 
                const updatedUserData = { ...userData, photo: reader.result };
                setUserData(updatedUserData);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // handle father name
    const handleFatherSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('father_name', fatherName);
        formDataToSend.append('address', address);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });
            const responseData = await response.json();
            setUserData(responseData.data);
            setfatherName(responseData.data.father_name);
            sethandleAddress(responseData.data.address);

            console.log
        } catch (error) {
            console.log(error);
        }
    }
    // handle pin
    const handlePinSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('pin', pin);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(updateProfile, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });
            const responseData = await response.json();
            // console.log(responseData);
            setUserData(responseData.data);
            setPin(responseData.data.pin);

        } catch (error) {
            console.log(error);
        }
    }

    if (!userData) {
        return <div>Loading user profile...</div>;
    }

    return <div>
        {userData && (
            <div className="container mx-auto p-4">
                <div className="md:flex gap-4 md:text-left text-center">
                    <img src={userData.photo} className="w-16 h-16 md:mx-0 mx-auto rounded-full" alt="" />
                    <div className="">
                        <h2><strong>{userData.name}</strong></h2>
                        <p>{userData.cnic}</p>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2" onClick={handleFather}>
                    <span>S/D/O: <strong>{userData.father_name}</strong></span>
                    <div className="flex mt-2 gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoLocationSharp className=" text-blue-700" />
                        </div>
                        <p className="my-auto">{userData.address}</p>
                    </div>
                </div>
                <Dialog open={openFather} handler={handleFather}>
                    <DialogHeader>Update Profile</DialogHeader>
                    <p className="px-4 -mt-4">Update Father Name and Location from here.</p>
                    <form onSubmit={handleFatherSubmit}>
                        <DialogBody>
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Father Name</label>
                                <input type="text" name="father_name" onChange={handleFatherName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Father Name" value={fatherName} required />
                            </div>
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Location</label>
                                <input type="text" name="address" onChange={handleAddress} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" value={address} required />
                            </div>

                        </DialogBody>
                        <DialogFooter>
                            <Button variant="gradient" color="blue" type="submit" className="w-full" onClick={handleFather}>
                                <span>UPDATE</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2">
                    <div className="flex gap-3 cursor-pointer" onClick={handleOpen}>
                        <div className="bg-blue-100 p-2 rounded-full">
                            <FaPhone className=" text-blue-700" />
                        </div>
                        <p className="my-auto">{userData.phone}</p>
                    </div>
                </div>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Update Phone Number</DialogHeader>
                    <p className="px-4 -mt-4">Update Phone Number from here.</p>
                    <form onSubmit={handlePhoneSubmit}>
                        <DialogBody>
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-cyan-700 dark:text-white">Phone Number</label>
                                <input type="number" name="phone" onChange={handlePhone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bank Account" value={phone} required />
                            </div>

                        </DialogBody>
                        <DialogFooter>
                            <Button variant="gradient" color="blue" type="submit" className="w-full" onClick={handleOpen}>
                                <span>UPDATE</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2">
                    {/* {userData.accounts.map((index)=> ( */}

                    <span>Bank Accounts</span>
                    {/* ))} */}
                    <Link to='/accounts'>
                        <div className="flex gap-3 mt-1">
                            <div className="bg-yellow-100 p-2 rounded-full">
                                <GoPlus className=" text-yellow-700" />
                            </div>
                            <p className="my-auto">Investor can edit or add bank accounts.</p>
                        </div>
                    </Link>
                </div>
                <Link to={'/nominee'}>
                    <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2">
                        <span>Nominee</span>
                        <p><strong>{userData.nominees.name}</strong></p>
                        <p><strong>S/D/O:</strong> {userData.nominees.father_name}</p>
                        <p><strong>CNIC:</strong> {userData.nominees.cnic}</p>
                        <p><strong>Address:</strong> {userData.nominees.address}</p>
                    </div>
                </Link>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2 cursor-pointer" onClick={handleOpenPin}>
                    <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoIosLock className=" text-blue-700" />
                        </div>
                        <p className="my-auto"><strong>PIN</strong></p>
                    </div>
                </div>
                <Dialog open={openPin} handler={handleOpenPin}>
                    <DialogHeader>Enter New 6-Digit Pin !</DialogHeader>
                    <p className="px-4 -mt-4">Set 6-digit code of your account. So, you can update your password.</p>
                    <form onSubmit={handlePinSubmit}>
                        <DialogBody>
                            <div className="">
                                <input type="number" name="pin" onChange={handlePin} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter 6 Digit Pin" />
                            </div>

                        </DialogBody>
                        <DialogFooter>
                            <Button variant="gradient" color="blue" type="submit" className="w-full" onClick={handleOpenPin}>
                                <span>UPDATE</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
                <div className="bg-white shadow-lg rounded-xl mt-4 p-4 md:w-1/2 cursor-pointer" onClick={handleLogout}>
                    <div className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <IoLogOutOutline className=" text-blue-700" />
                        </div>
                        <p className="my-auto"><strong>Logout</strong></p>
                    </div>
                </div>
            </div>
        )}
    </div>;
};

export default Profile;
