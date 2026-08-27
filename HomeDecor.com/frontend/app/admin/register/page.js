"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminSignup } from "@/lib/api";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialkey, setSpecialkey] = useState("");

  const handleSubmit = async () => {
    const res = await adminSignup({ name, email, password, specialkey });
    alert(res.msg);
    if (res.msg === "Admin Signup Successfull") {
      localStorage.setItem("admin", res.name);
      router.push("/");
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/style/adminregister.css" />

      <div id="register">
        <h2>Admin Registration</h2>
        <input type="text" placeholder="* Enter Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="* Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder="* Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input required type="text" placeholder="* Enter SpecialKey" value={specialkey} onChange={(e) => setSpecialkey(e.target.value)} />
        <input style={{ width: "30%" }} type="submit" id="btn" onClick={handleSubmit} value="Register" />
      </div>
    </>
  );
}
