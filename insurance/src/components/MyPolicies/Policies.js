'use client'
import React from 'react'
import './policies.css'
import { useRouter } from 'next/navigation';

function PolicyList() { 
    const router = useRouter();
    const changeNavigation = () => {
        router.push('policy/policydetail');
    };
    return (
        <div>
            <h1 className="font-bold text-6xl my-14 mx-10">Welcome, User</h1>
            <div className="policy-lists w-4/5 mx-auto flex flex-col gap-11 p-5">
                <div className="policy-lists__policy flex justify-between bg-gray-300 p-8 rounded-2xl">
                    <div className="policy-lists__policy__left flex flex-col justify-between items-start flex-grow">
                        <div className="policy-lists__policy__left__metadata px-3 w-11/12">
                            <p><span className="inline font-bold">Policy Type:</span> Motor Vehicle</p>
                            <p><span className="inline font-bold">Policy ID:</span> 1234-5678</p>
                            <div className="flex justify-between">
                                <p><span className="inline font-bold">Annual Premium:</span> 10,000 ETB</p>
                                <p><span className="inline font-bold">Next Payment Date:</span> 02/01/2024</p>
                            </div>
                        </div>
                        <button className='button rounded-xl p-2 font-bold text-white' onClick={changeNavigation}>
                            Policy Details
                        </button>
                    </div>
                    <img src='../car.jpg'/>
                </div>
                <div className="policy-lists__policy flex justify-between bg-gray-300 p-8 rounded-2xl">
                    <div className="policy-lists__policy__left flex flex-col justify-between items-start flex-grow">
                        <div className="policy-lists__policy__left__metadata px-3 w-11/12">
                            <p><span className="inline font-bold">Policy Type:</span> Motor Vehicle</p>
                            <p><span className="inline font-bold">Policy ID:</span> 1234-5678</p>
                            <div className="flex justify-between">
                                <p><span className="inline font-bold">Annual Premium:</span> 10,000 ETB</p>
                                <p><span className="inline font-bold">Next Payment Date:</span> 02/01/2024</p>
                            </div>
                        </div>
                        <button className='button rounded-xl p-2 font-bold text-white'onClick={changeNavigation}>
                            Policy Details
                        </button>
                    </div>
                    <img src='../car.jpg'/>
                </div>
                <div className="policy-lists__policy flex justify-between bg-gray-300 p-8 rounded-2xl">
                    <div className="policy-lists__policy__left flex flex-col justify-between items-start flex-grow">
                        <div className="policy-lists__policy__left__metadata px-3 w-11/12">
                            <p><span className="inline font-bold">Policy Type:</span> Motor Vehicle</p>
                            <p><span className="inline font-bold">Policy ID:</span> 1234-5678</p>
                            <div className="flex justify-between">
                                <p><span className="inline font-bold">Annual Premium:</span> 10,000 ETB</p>
                                <p><span className="inline font-bold">Next Payment Date:</span> 02/01/2024</p>
                            </div>
                        </div>
                        <button className='button rounded-xl p-2 font-bold text-white'onClick={changeNavigation}>
                            Policy Details
                        </button>
                    </div>
                    <img src='../car.jpg'/>
                </div>
                <button className='button rounded-xl py-2 px-4 font-bold text-white w-max self-end' onClick={() => router.push("/portal/policy/newPolicy")}>
                    Add New Policy
                </button>
            </div>
            
    </div>
    )
}

export default PolicyList
