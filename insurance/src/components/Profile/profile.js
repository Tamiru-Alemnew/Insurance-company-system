"use client";
import React, { useState } from "react";
import Field from "./Field";
import Notification from "./notification";

function Profile() {
  const [user, setUser] = useState({
    name: localStorage.getItem("name"),
    id: localStorage.getItem("UserId"),
    gender: "Male",
    dob: "Nov 26, 2003",
    occupation: "Student",
    email: "abenezerseifu@gmail.com",
    address: "Gulele, Addis Ababa, Ethiopia",
    phone: "0912145212",
    preferred: "email",
    password: 123,
  });

  const basicInfo = [
    <Field caption={"Full Name"} value={user.name} />,
    <Field caption={"User ID"} value={user.id} />,
    <Field caption={"Gender"} value={user.gender} />,
    <Field caption={"Date of Birth"} value={user.dob} />,
  ];

  async function readUser() {
    let userAPI = "/api/getUser/";
    try {
      let response = await fetch(userAPI, {
        method: "GET",
      });
      let data = await response.json();
      console.log(data);
      setUser(data);
      return data;
    } catch (error) {
      return console.error("Error reading profile:", error);
    }
  }
  readUser();

  function updateUser(e) {
    e.preventDefault();
    if (isEditMode) {
      return;
    }
    let updateAPI = "api/updateUser/" + localStorage.getItem("UserId");
    fetch(updateAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("You have successfully updated your profile!");
        console.log(data);
      })
      .catch(function (error) {
        return console.error("Error updating profile!", error);
      });
  }

  function checkPassword() {
    let checkPasswordAPI = "api/checkPassword" + localStorage.getItem("UserId");
    fetch(checkPasswordAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: oldPassword,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data == false) {
          setIncorrectPassword(true);
        } else {
          setPasswordCorrect(true);
          setIncorrectPassword(false);
        }
      })
      .catch(function (error) {
        return console.error("Error checking password!", error);
      });
  }

  function updatePassword() {
    let updateAPI = "api/updateUser/" + localStorage.getItem("UserId");
    fetch(updateAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: localStorage.getItem(""),
        password: user.password,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("You have successfully updated your profile!");
        console.log(data);
      })
      .catch(function (error) {
        return console.error("Error updating profile!", error);
      });
  }

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (value, name) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [isPasswordChanger, setPasswordChanger] = useState(false);
  const [isPasswordCorrect, setPasswordCorrect] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");

  
  return (
    <div className=" w-11/12 mx-auto my-10 grid grid-cols-12">
      <div className="col-span-8 bg-gray-200 rounded-lg p-10">
        <div className="flex items-end justify-around">
          <img className="w-1/4" src="../Example-Photo.jpg" />
          <div>{basicInfo}</div>
        </div>
        <div className="my-10 flex flex-col w-4/5 items-between gap-5 mx-auto">
          <h2 className="font-bold text-xl mb-5">Contact Information</h2>
          <form
            onSubmit={updateUser}
            className="flex flex-col w-full items-between gap-5 mx-auto"
          >
            <label className="flex gap-3 justify-between">
              <span className="font-semibold">Address:</span>
              <input
                className="w-3/5"
                type="text"
                value={user.address}
                readOnly={!isEditMode}
                onChange={(e) => handleInputChange(e.target.value, "address")}
              />
            </label>
            <label className="flex gap-3 justify-between">
              <span className="font-semibold">Phone No:</span>
              <input
                className="w-3/5"
                type="number"
                value={user.phone}
                readOnly={!isEditMode}
                onChange={(e) => handleInputChange(e.target.value, "phone")}
              />
            </label>
            <label className="flex gap-3 justify-between">
              <span className="font-semibold">E-Mail:</span>
              <input
                className="w-3/5"
                type="email"
                value={user.email}
                readOnly={!isEditMode}
                onChange={(e) => handleInputChange(e.target.value, "email")}
              />
            </label>
            <label className="flex gap-3 justify-between">
              <span className="font-semibold">Preferred contact method:</span>
              <select
                value={user.preferred}
                onChange={(e) => handleInputChange(e.target.value, "preferred")}
                disabled={!isEditMode}
                className="w-3/5"
              >
                <option key="call" value="call">
                  Phone Call
                </option>
                <option key="sms" value="sms">
                  Phone SMS
                </option>
                <option key="email" value="email">
                  E-Mail
                </option>
              </select>
            </label>

            <div className="gap-4 flex mt-5">
              <button
                className="rounded-xl px-5 py-2 font-bold bg-blue-500 w-max text-white"
                onClick={toggleEditMode}
              >
                {isEditMode ? "Save Changes" : "Edit"}
              </button>
              {isEditMode && (
                <button
                  className="rounded-xl px-5 py-2 font-bold bg-red-500 w-max text-white"
                  onClick={toggleEditMode}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="w-4/5 mx-auto">
          <h3
            className="text-sm text-blue-500 cursor-pointer mb-5"
            onClick={() => setPasswordChanger(!isPasswordChanger)}
          >
            Change Password
          </h3>
          {isPasswordChanger &&
            (!isPasswordCorrect ? (
              <div className="flex flex-col gap-4">
                <label>
                  <span className="font-semibold mr-3">
                    Enter old password:
                  </span>
                  <input
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>
                {incorrectPassword && (
                  <p className="text-sm text-red-500">Incorrect Password</p>
                )}
                <button
                  className="rounded-xl px-5 py-2 font-bold bg-blue-500 w-max text-white"
                  onClick={checkPassword}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input type="text" className="hidden" />
                <label>
                  <span className="font-semibold mr-3">
                    Enter new password:
                  </span>
                  <input
                    type="text"
                    onChange={(e) =>
                      handleInputChange(e.target.value, "password")
                    }
                  />
                </label>
                <button
                  className="rounded-xl px-5 py-2 font-bold bg-blue-500 w-max text-white"
                  onClick={() => {
                    setPasswordChanger(!isPasswordChanger);
                    setPasswordCorrect(false);
                  }}
                >
                  Save
                </button>
              </div>
            ))}
        </div>
      </div>

      <aside className="w-4/5 mx-auto mt-10 flex flex-col gap-4 col-span-4">
        <h2 className="font-bold text-lg mb-5">Notifications</h2>
        <Notification
          title={"Payment Successful"}
          detail={
            "The payment for your insurance policy 1234 was successfully paid"
          }
        />
        <Notification
          title={"Premium due"}
          detail={
            "The annual premium for your insurance policy 2332 is due in 18/1/2024"
          }
        />
        <Notification
          title={"New Policy"}
          detail={"You have successfully registered for new policy 4532"}
        />

        {/* <Notification title={} detail={}/> */}
      </aside>
    </div>
  );
}

export default Profile;
