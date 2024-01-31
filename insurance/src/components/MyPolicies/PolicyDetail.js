'use client'
import Row from './AttributeRow'
import PaymentHistory from './PaymentHistory'
import ClaimHistory from './ClaimHistory'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function PolicyDetail() {

  let captions = ["Policy Type","Policy Purchase Date","Annual Premium","Next Payment Date","Plate No.", "Chassis No.","Engine No.","Make of Vehicle","Type of Body","Horse Power of Cylinder Capacity CC","Year of Manufactured","Carrying Capacity including driver","Year Purchased","Purchased Price","Present Estimate Value"]
  let values = ["Motor Vehicle","6/6/2021","10,000 ETB","2/2/2024","4-HR-1230","SV30-0169266","PJ12345U123456P","Toyota","SUV","301","2020","6","2021","3,000,000 ETB","2,000,000 ETB"]
  let detail = JSON.parse(localStorage.getItem("policyDetail"));
  let properties = []
  properties.push(<Row caption={captions[0]} value={detail.InsuredProperty} r={0}/>)
  properties.push(<Row caption={captions[1]} value={detail.PolicyStartDate} r={1}/>)
  properties.push(<Row caption={captions[2]} value={detail.Premium} r={2}/>)
  properties.push(<Row caption={captions[3]} value={detail.PolicyRenewal} r={3}/>)

  // for (let i = 0; i < 4; i++) {
  //   properties.push(<Row caption={captions[i]} value={values[i]} r={i}/>)    
  // }

  let sourcePDF = "";
  let sourceImg = "";

  if (detail.InsuredProperty == "Car") {
    sourcePDF = "https://drive.google.com/file/d/1_kWY50jpKbs9YFGmHuQKfvbmET6b-pAA/preview" 
    sourceImg = '../../car.jpg'
  } else if (detail.InsuredProperty == "House") {
    sourcePDF = "https://drive.google.com/file/d/1Y-9SiTS31f_niqzijY5imWaF8Cblg6E7/preview"
    sourceImg = '../../House.jpg'
  } else {
    sourcePDF = "https://drive.google.com/file/d/1ywlUHkaKBT9W2DAXiaI9ZN-gO5cShqFO/preview"
    sourceImg = '../../life_insurance.jpg'
  }

  const router = useRouter();
  const changeNavigation = () => {
      router.push('/portal/claim');
  };

  let payments = [{date: "2/1/2024", id:"1234", amount: "3000 ETB", reason: "Annual Premium Payment", transactionMethod:"via telebirr"},
                    {date: "1/12/2023", id:"1331", amount: "3000 ETB", reason: "Annual Premium Payment", transactionMethod:"via CBE Birr"},
                    {date: "23/11/2023", id:"1664", amount: "30000 ETB", reason: "Initial Policy Payment", transactionMethod:"via Branch"}]
  async function readPayments() {
    let paymentsAPI = "api/getPayments/"+localStorage.getItem("policyDetail");
    try {
        let response = await fetch(paymentsAPI, {
            method: 'GET',
        })
        let data = await response.json()
        console.log(data);
        payments = data;
        return data
    } catch(error) { return console.error("Error fetching payments:", error); };
  }
  readPayments();

  let claims = [{id:"1234", claimDate: "1/1/2024", reason: "Car Accident", amount: "20000 ETB", paymentDate: "2/2/2024", status: "Ongoing", paymentId:"1111"},
                  {id:"3232", claimDate: "1/1/2024", reason: "Theft", amount: "1500000 ETB", paymentDate: "2/2/2024", status: "Full Payment", paymentId:"2222"},
                  {id:"12121", claimDate: "1/1/2024", reason: "Death", amount: "100000 ETB", paymentDate: "2/2/2024", status: "Full payment", paymentId:"2222"},
                  {id:"32445", claimDate: "1/1/2024", reason: "Car Accident", amount: "20000 ETB", paymentDate: "2/2/2024", status: "Full Repaired", paymentId:"1111"}]

  async function readClaims() {
    let claimsAPI = "api/getClaims/"+localStorage.getItem("policyDetail");
    try {
        let response = await fetch(claimsAPI, {
            method: 'GET',
        })
        let data = await response.json()
        console.log(data);
        claims = data;
        return data
    } catch(error) { return console.error("Error fetching claims:", error); };
  }
  readClaims();

  let paymentsRow = []
  for (let i = 0; i < payments.length; i++) {
    paymentsRow.push(<PaymentHistory date={payments[i].date} id={payments[i].id} amount={payments[i].amount} reason={payments[i].reason} transactionMethod={payments[i].transactionMethod} r={i}/>)
  }

  let claimsRow = []
  for (let i = 0; i < claims.length; i++) {
    claimsRow.push(<ClaimHistory id={claims[i].id} claimDate={claims[i].claimDate} reason={claims[i].reason} amount={claims[i].amount} paymentDate={claims[i].paymentDate} status={claims[i].status} paymentId={claims[i].paymentId} r={i}/>)
  }

  const [paymentsState, setPaymentsState] = useState(false);
  const [claimState, setClaimState] = useState(false);

  const showTable = (table) => {
    if (table == "payment") {
      setPaymentsState(visible => !visible)
    } else {
      setClaimState(visible => !visible);
    }
  };
  
  return (
      <main className='p-5'>
        <header className='flex justify-around my-12 items-center w-4/5 mx-auto'>
          <hgroup>
            <h1 className='font-semibold text-3xl'>{detail.InsuredProperty}</h1>
            <p className='font-semibold'>Policy-ID: {detail.policyId}</p>
          </hgroup>
          <img src={sourceImg}/>
        </header>
        
        <table className='w-4/5 mx-auto text-lg'>
          {properties}
        </table>

        <div className='my-10'>
            <h2 className='text-center text-2xl font-semibold underline'>Policy Contract and Details</h2>
            <iframe className='mx-auto my-8 w-3/5' src={sourcePDF} width="800" height="700"></iframe>
        </div>

        <div className='w-4/5 mx-auto my-10'>
          <h2 className='font-bold text-xl bg-gray-200 p-2 rounded-lg cursor-pointer' onClick={() => showTable("payment")}>Payment History</h2>
          {paymentsState &&
          <table className='w-full'>
            <tr className='border-b-4 border-blue-500'>
              <th className='border-r-4 border-blue-500'>Date</th>
              <th className='border-r-4 border-blue-500 p-3'>Payment ID</th>
              <th className='border-r-4 border-blue-500'>Amount</th>
              <th className='border-r-4 border-blue-500'>Reason</th>
              <th>Transaction Method</th>
            </tr>
            {paymentsRow}
          </table>
        } 
        </div>

        <div className='w-4/5 mx-auto my-10'>
          <h2 className='font-bold text-xl bg-gray-200 p-2 rounded-lg cursor-pointer' onClick={() => showTable("claim")}>Claims History</h2>
          {claimState &&
          <table className='w-full'>
            <tr className='border-b-4 border-blue-500'>
              <th className='border-r-4 border-blue-500 p-3'>Claim ID</th>
              <th className='border-r-4 border-blue-500'>Claim Date</th>
              <th className='border-r-4 border-blue-500'>Reason</th>
              <th className='border-r-4 border-blue-500'>Amount</th>
              <th className='border-r-4 border-blue-500'>Payment Date</th>
              <th className='border-r-4 border-blue-500'>Status</th>
              <th>Payment ID</th>
            </tr>
            {claimsRow}
          </table>
        } 
        </div>


        <div className='flex gap-4 w-4/5 mx-auto mt-20'>
          <button className='bg-blue-500 rounded-xl px-5 py-2 font-bold text-white' onClick={() => router.push("/portal/pay")}>
            Pay Premium
          </button>
          <button className='bg-blue-500 rounded-xl px-5 py-2 font-bold text-white' onClick={changeNavigation}>
            File Claim
          </button>
          <button className='bg-red-500 rounded-xl px-5 py-2 font-bold text-white' onClick={() => router.push("/portal/policy/cancelPolicy")}>
            Cancel Policy
          </button>
        </div>
      </main>
    )
}

export default PolicyDetail