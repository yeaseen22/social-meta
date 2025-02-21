"use client";
import Image from "next/image";
import logo from "../../../../public/img/logo1.png";
import { HidePass, MailIcon, ShowPass } from "@/components/common/Icons";
import { useState } from "react";

const Page = () => {
  const [showPass, setShowPass] = useState(true);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const handlePassShow = () => {
    setShowPass(!showPass);
    console.log(showPass, "icon clicked");
    if (type === "password" && showPass === true) {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="bg"></div>
        <div className="login-form flex poppins-regular">
          <Image
            src={logo}
            priority={true}
            alt="logo of the website"
            id="logo"
          />
          <form>
            <p className="flex">Login into your account</p>

            {/* Email Field */}
            <div className="input-field-container">
              <label htmlFor="email" className="block">
                Email :
              </label>
              <div className="input-field-icon">
                <input
                  className="block input-field"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <div className="icon-field">
                  <MailIcon size={"29px"} />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block">
                Password :
              </label>
              <div className="input-field-icon">
                <input
                  className="block input-field"
                  type={type}
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <div onClick={handlePassShow} className="icon-field">
                  {showPass ? (
                    <HidePass size={"29px"} />
                  ) : (
                    <ShowPass size={"29px"} />
                  )}
                </div>
              </div>
              <p id="forget-pass">Forget password?</p>
              <input type="submit" value="Log in" className="login-btn" />
              {/* <p id="footer-line">
                Don’t have an account?{" "}
                <span style={{ color: "#367AFF" }}>Sign Up</span>
              </p> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Page;
