'use client'
import React, { useState } from 'react'
import PolicyType from './PolicyType'
import { toast } from 'react-toastify'

function Register() {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [address , setAddress] = useState("")
    const [phone , setPhone] = useState("")
    const [occupation , setOccupation] = useState("")
    const [gender , setGender] = useState("")

    function handleChange(change, val){
        switch (val) {
            case "name":
                setName(change)
                break;
            case "email":
                setEmail(change)
                break;
            case "address":
                setAddress(change)
                break
            case "phone":
                setPhone(change)
                break
            case "occupation":
                setOccupation(change)
                break;
            case "gender":
                setGender(change)
                break;
        }
    }
    
    function postUser() {
        console.log({
            "name": name,
            "email": email,
            "address": address,
            "phone": phone,
            "occupation": occupation,
            "gender": gender
        })
        let registerURL = "api/addUser"
        fetch(registerURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "address": address,
                "phone": phone,
                "occupation": occupation,
                "gender": gender
            })
        })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            console.log(data)
        })
        .catch(function (error) { return console.error("Error registering user!", error); });

    }

    let maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 18); 
    maxDate = maxDate.toISOString().split("T")[0];

    function submitChecker(e) {
        //name
        if (/\d/.test(name) || name.length < 2 || name.length > 50) {
            toast.error("Invalid Name!")
            e.preventDefault()
            return
        }
        const ethiopianPhoneNumberRegex = /^(?:\+251|\b09)\d{8}$/;
        if (!ethiopianPhoneNumberRegex.test(phone)) {
        toast.error("invalid phone number format");
         e.preventDefault();
        return;
}

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(emailRegex.test(email))) {
            toast.error("Invalid Email!")   
            console.log("What")
            e.preventDefault()
            return   
        }

        postUser(); 
        toast.success("Registered Successfully");
    }

    return (
        <form className='flex flex-col gap-7' onSubmit={submitChecker} >
            <h1 className="font-bold text-4xl my-12 mx-10">Application Form</h1>
            <div className='bg-gray-300 p-9 rounded-2xl w-4/5 mx-auto'>
                <h2 className='font-bold text-xl'>Basic information</h2>
                <div className='my-7 grid grid-cols-2 gap-4 mx-auto justify-center'>
                    <div className='flex gap-4 justify-end'>
                        <label for="full-name" className='font-semibold'>Full Name :</label>
                        <input onChange={(e) => handleChange(e.target.value,"name")} value={name} type="text" id="full-name" placeholder='eg. Abebe Kebede' required className='w-1/2'/>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <label for="email" className='font-semibold'>Email :</label>
                        <input onChange={(e) => handleChange(e.target.value,"email")} value={email} type="email" id="email" placeholder='eg. abebeKebede@test.com' required className='w-1/2'/>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <label for="BD" className='font-semibold'>Birth Day :</label>
                        <input type="date" id="BD" max={maxDate} required className='w-1/2'/>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <label for="address" className='font-semibold'>Address :</label>
                        <input onChange={(e) => handleChange(e.target.value, "address")} value={address} type="text" id="address" required placeholder='eg. Addis Ababa, Ethiopia' className='w-1/2'/>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <label for="phone" className='font-semibold'>Phone Number :</label>
                        <input onChange={(e) => handleChange(e.target.value, "phone")} value={phone} type="text" id="phone" required placeholder='eg. 0911772772' className='w-1/2' maxLength={10}/>
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <label for="occupation" className='font-semibold'>Occupation</label>
                        <input onChange={(e) => handleChange(e.target.value, "occupation")} value={occupation} type="text" id="occupation" required placeholder='eg. Engineer' className='w-1/2'/>
                    </div>
                    <div className='flex gap-4 justify-end w-full'>
                        <p className='font-semibold'>Gender :</p>
                        <div className='flex gap-3 w-1/2'>
                            <label for="Male"><input onChange={(e) => handleChange(e.target.value, "gender")} type="radio" name='gender' id="Male" value="Male"/> Male</label>
                            <label for="Female"><input onChange={(e) => handleChange(e.target.value, "gender")} type="radio" name='gender' id="Female" value="Female"/> Female</label>
                        </div>
                    </div>
                </div>
            </div>
            <PolicyType/>
        </form>
    )
}



export default Register