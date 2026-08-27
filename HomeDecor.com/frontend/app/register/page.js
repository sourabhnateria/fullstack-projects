"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = await signup({ name, email, mob, password });
    alert(data);
    localStorage.setItem("username", "");
    router.push("/");
  };

  return (
    <>
      <link rel="stylesheet" href="/style/register.css" />

      <div>
        <Link style={{ textDecoration: "none", color: "rgb(56, 86, 122)" }} href="/">
          <i className="fa-solid fa-backward"></i> back
        </Link>
      </div>
      <div id="container">
        <div>
          <img width="100%" src="https://b3h2.scene7.com/is/image/BedBathandBeyond/WR_deskstop_22_07_2022?$content$&wid=1280" alt="" />
        </div>
        <div id="inputs">
          <div>
            <h2>create account</h2>
            <input required minLength={1} id="email" type="text" placeholder="* Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required minLength={1} id="name" type="text" placeholder="* Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input required minLength={1} id="mob" type="tel" placeholder="* Enter Mobile No." value={mob} onChange={(e) => setMob(e.target.value)} />
            <input required minLength={1} id="password" type="text" placeholder="* Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input id="btn" type="submit" value="Create an Account" onClick={handleSubmit} />
          </div>
        </div>
        <div id="radio">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">Yes, add me to the Bed Bath & Beyond email list.</label>
          <hr />
          <p>
            By continuing you agree to enroll in and to the Terms of our Welcome
            Rewards Program. For information on our privacy practices, please
            visit our Privacy Policy. California residents: view our Notice of
            Financial Incentive here
          </p>
        </div>
      </div>
    </>
  );
}
