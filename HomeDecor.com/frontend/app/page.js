"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { adminSignin } from "@/lib/api";
import Image from "next/image";

const CAROUSEL_IMAGES = [
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-02-25-14-50_881334012804_02?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/887719146447_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-04-15-08-15_49881616426288_pic_hd_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-04-05-11-52_611247373149_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-04-01-02-57_thera400tcperfwhtqss_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/150305412370911p_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-02-23-12-17_avery_sealgrey_primaryimage_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-04-13-13-22_611247385043_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-04-13-13-22_611247385050_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-10-04-10-54_61067_muslin_120_01_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-02-07-22-30_444800852900_1_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-03-04-15-21_d801final_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/S321-10301-FAB-Wide_Pinstripe_3pc_Comforter_set_NAVY_002_ecom_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-02-07-22-30_444800852917_1_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-02-08-10-01_1_ugg_corey_snow_cmf_pckpri_v2_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/846756066477mb_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-10-18-12-03_1_ugg_melangeclassicsherpa_ashfog_pri_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/mktplace-s-a06ce76d-8d61-4ca2-9844-05bba25ad8fe?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/lf_370145469519509p_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/761318252221_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2020-12-04-10-27_444800405281_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-05-06-21-50_d7k_8152_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-06-24-02-20_196927033587_imageset?%24380%24=&wid=2000&hei=2000",
  "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-04-22-04-05_wish_001_tan_primaryjpg_imageset?%24380%24=&wid=2000&hei=2000",
];

function randomCarouselItem() {
  const c = Math.floor(Math.random() * 23) + 1;
  return {
    img: CAROUSEL_IMAGES[c],
    price: (Math.random() * 20).toFixed(1),
    rating: (Math.random() * 1000).toFixed(0),
  };
}

const SIX_THREE_ITEMS = [
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW45-BBB-US-0106-WEB-HP-Valentines-C02-5-v1-1-DSK?$content$",
    "Valentine Day's",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/standmixers_C02_5_1%20%281%29?$content$&wid=202&hei=202",
    "Small Appliances",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-02-25-14-50_881334012804_01?$content$",
    "Coffee",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/444800389918_2_imageset?wid=240&hei=240",
    "Tools and Gadgets",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/lf_299288668531133p_imageset?$content$",
    "Air Fryer",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2020-07-06-16-05_1076267_imageset?$713$&wid=713&hei=713",
    "Water Filter",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW3-BBB-US-0313-0319-Web-Bedding-C02_5_Module3?$content$",
    "Comforters",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/m-2021-12-29-17-25_BBB_CRC_202201_NW_Pima_Cot_Sateen_500_tc_Sheet_Set_007?$imagePLP$&wid=236&hei=236",
    "Sheets",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-06-09-16-08_2_ugg_dawson_heatedthrw_chclt_pri_imageset?wid=529&hei=529",
    "Heat Blankets",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-10-01-11-04_042694402739_imageset?$713$&wid=713&hei=713",
    "Bath Rugs",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/FEO_BBB_Homepage_10.31_C02.5_06?$content$",
    "Towel",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/24359053258234m?$imagePLP$&wid=363&hei=363",
    "Candles",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-01-04-13-00_9550kd_2_imageset?$713$&wid=713&hei=713",
    "Storage & org",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/lf_116523161083295p_imageset?$713$&wid=713&hei=713",
    "Vaccum",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2020-04-30-11-38_Velocity3_Front_imageset?$713$&wid=713&hei=713",
    "Fan",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/2020-05-28-00-10_871407006922_imageset?$713$&wid=713&hei=713",
    "Suitcase",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/444800460440_imageset?$713$&wid=713&hei=713",
    "Mats",
  ],
  [
    "https://b3h2.scene7.com/is/image/BedBathandBeyond/US-FW18-FY20-0628-0704-WEB-HomeDecor-C02-5-12?$content$",
    "under $10 clearance",
  ],
];

const FOUR_ONE_1 = [
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW48-US-0123-0129-WEB-HP-C15-12-V3-2-2?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>save up to 50% </span> on must-haves!
      </>
    ),
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-US-JanuaryOffers-Promo2-HP-WRplus-WEB-C15-12-V3-1?$content$&wid=480",
    heading: "new members get $15 in rewards",
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/00_00-HomeChef-Image-4-C15_12_v3-4across-IMAGE?$content$&wid=480",
    heading: "save $120 on Home Chef",
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V3-3-1?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>get $100 </span>in rewards!
      </>
    ),
  },
];

const FOUR_ONE_2 = [
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-CA-0109-0114-WEB-HP2-C15-12-V3-8%20%28144aa6ce-e4ff-4367-96b7-11652ce143f9%29?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>save $80 </span> on select cookware
      </>
    ),
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V3-5?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>save up to $50</span>on Ninja appliances
      </>
    ),
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V3-6?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>save $50 </span>on select KitchenAid
        stand mixers
      </>
    ),
  },
  {
    img: "https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V3-7?$content$&wid=480",
    heading: (
      <>
        <span style={{ color: "red" }}>save up to 20% </span>on Breville
        appliances
      </>
    ),
  },
];

const FOOTER_SHIPPING = [
  "Track Order",
  "Shipping Info",
  "Store Pickup",
  "Same Day Delivery",
  "Returns",
  "Product Recall Information",
  "Rebates",
  "Price Match Promise",
];
const FOOTER_SHOPPING = [
  "Idea boards",
  "Shop College",
  "Shop Movers",
  "Shop Catalogs",
  "Shop Personalised Invitations",
  "Shop by Brand",
  "Shop Clearances & Savings",
  "Shop Subscription",
  "Buying Guides",
  "Guides & Advice",
  "Coupons",
];

const sectionHeading = {
  textAlign: "center",
  color: "rgb(17, 53, 94)",
  letterSpacing: "1px",
  fontSize: "xx-large",
};

const bannerRow = {
  margin: "auto",
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
};

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const [barCount, setBarCount] = useState(1);
  const [barVisible, setBarVisible] = useState(0);

  const [carousel1, setCarousel1] = useState([]);
  const [carousel2, setCarousel2] = useState([]);
  const [carousel3, setCarousel3] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
    setCarousel1(
      CAROUSEL_IMAGES.slice(0, 6).map((img) => ({
        img,
        price: (Math.random() * 20).toFixed(1),
        rating: (Math.random() * 1000).toFixed(0),
      })),
    );
    setCarousel2(Array.from({ length: 6 }, randomCarouselItem));
    setCarousel3(Array.from({ length: 6 }, randomCarouselItem));
  }, []);

  const shiftBar = (direction) => {
    setBarCount((prev) => {
      let count = prev;
      if (count > 3) count = 0;
      if (count < 0) count = 3;
      setBarVisible(count);
      return direction === "left" ? count - 1 : count + 1;
    });
  };

  const goToCategory = (category) => {
    localStorage.setItem("category", category);
    router.push("/product");
  };

  const handleAdminLogin = async () => {
    const res = await adminSignin({
      email: adminEmail,
      password: adminPassword,
    });
    localStorage.setItem("token", res.token);
    alert(res.msg);
    if (res.msg === "Admin Signin Successful") {
      localStorage.setItem("admin", res.name);
      router.push("/admin/crud");
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/style/index.css" />
      <link rel="stylesheet" href="/style/responsive.css" />
      <link rel="stylesheet" href="/style/dropdown.css" />
      <link rel="stylesheet" href="/style/leftDropDown.css" />
      <link rel="stylesheet" href="/style/crousel.css" />
      <link rel="stylesheet" href="/style/popup.css" />
      <link rel="stylesheet" href="/style/dropDown4Signup.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
      />
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"
        strategy="afterInteractive"
      />

      {/* Search Bar */}
      <div id="search_bar">
        {/* Hamburger */}
        <i
          className="fa-solid fa-bars nav-icon"
          onClick={() => setSidenavOpen(true)}
        ></i>

        {/* Logo */}
        <img src="/Media/logo1.png" alt="#" />

        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="🔍 What product can we help you find?"
          />
        </div>

        {/* Account cluster: username + hover dropdown */}
        <div className="account_group">
          <span id="username">{username}</span>

          <div className="down">
            <Link href="/register" className="downbtn">
              <i className="fa-solid fa-user"></i>
            </Link>

            <div className="down-content">
              <div>
                <h5>welcome rewards</h5>
                <p>
                  Earn & redeem points on every purchase across our family of
                  brands.
                </p>
                <button id="signin" onClick={() => router.push("/signin")}>
                  Signin/Create
                </button>
              </div>

              <div>
                <a href="#">📦 track order</a>
                <a href="#">🎁 my offers</a>
                <a href="#">📋 shopping lists</a>
                <a href="#">💡 idea boards</a>
                <p>
                  Have a question for us? <br />
                  We&apos;re here to help
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link href="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
      </div>

      {/* Top red Bar */}
      <div id="top_red">
        <div>
          <i
            className="fa-solid fa-angle-left"
            onClick={() => shiftBar("left")}
          ></i>
        </div>
        <div id="top_red_text">
          <div style={{ display: barVisible === 0 ? "block" : "none" }}>
            <h2>
              save 20% on a single item!{" "}
              <span>
                <a href="#">get offer</a>
              </span>
            </h2>
          </div>
          <div style={{ display: barVisible === 1 ? "block" : "none" }}>
            <h2>
              New Welcome Rewards™+ members get $15 in rewards!{" "}
              <span>
                <a href="#">Enroll for $29/yr</a>
              </span>
            </h2>
          </div>
          <div style={{ display: barVisible === 2 ? "block" : "none" }}>
            <h2>
              create a registry & get $100 in rewards; terms apply{" "}
              <span>
                <a href="#">learn more</a>
              </span>
            </h2>
          </div>
          <div style={{ display: barVisible === 3 ? "block" : "none" }}>
            <h2>
              stock up & save: 25% off bedding, bath & storage{" "}
              <span>
                <a href="#">shop now</a>
              </span>
            </h2>
          </div>
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right"
            onClick={() => shiftBar("right")}
          ></i>
        </div>
      </div>

      {/* Side Drop Down */}
      <div
        id="mySidenav"
        className="sidenav"
        style={{ width: sidenavOpen ? "250px" : "0", marginRight: "10px" }}
      >
        <div className="nav-icon" onClick={() => setSidenavOpen(false)}>
          <i id="closebtn" className="fa-solid fa-xmark"></i>
        </div>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      {/* Categories */}
      <div
        id="categories"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <button onClick={() => goToCategory("Bedding")}>bedding</button>
        <button onClick={() => goToCategory("Pillow")}>pillows</button>
        <button onClick={() => goToCategory("Lightining")}>Lightining</button>
        <button>dinning</button>
        <button>storage & cleaning</button>
        <button>home decor</button>
        <button>curtains</button>
        <button>furniture</button>
        <button>health & beauty</button>
        <button>outdoor</button>
        <button>luggage pet & more</button>
        <button>gifts</button>
        <button>baby & kids</button>
        <button>shop by brand</button>
      </div>

      <hr />

      <div style={bannerRow}>
        <Image
          width={1280}
          height={300}
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/2023-01-10-12-35-38-FY22-FW35-0103-US-Dont-Miss-Deals-With-CTA-C01-19-DSK?$content$&wid=1280&hei=300"
          alt=""
          loading="eager"
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <br />
        <p>
          Valid 10/26. Assortment varies by store. Reward points are valid for
          Welcome Rewards™ members only. Exclusions apply.
        </p>
      </div>

      <br />
      <br />
      <br />
      <div className="crousel">
        <div>
          <i
            className="fa-solid fa-angle-left"
            onClick={() =>
              setCarousel3(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
        <div className="crousel_div3">
          {carousel3.map((item, i) => (
            <div key={i}>
              <img src={item.img} width="100%" alt="" />
              <h5 style={{ color: "red" }}>${item.price}</h5>
              <h6>Tim Hortons® Original</h6>
              <p>
                <i className="fa-solid fa-star">{item.rating}</i>
              </p>
            </div>
          ))}
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right"
            onClick={() =>
              setCarousel3(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
      </div>

      <div style={bannerRow}>
        <img
          width="80%"
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/2022-06-24-09-34-53-FY22-FW18-BBB-US-0630-Omni-BOPIS-Web-C01_19-DSK%20(1)%20(1)?$content$&wid=1280&hei=150"
          alt=""
        />
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <p>
          Valid thru 1/22. Assortment varies by store. Reward points are valid
          for Welcome Rewards™ members only. Exclusions apply.
        </p>
      </div>

      <div style={bannerRow}>
        <img
          width="80%"
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-BBB-US-0119-SUSE-C01_19-DSK?$content$&wid=1280&hei=500"
          alt=""
        />
      </div>

      {/* Three*One */}
      <div className="three_one">
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FW46-FY22-0108-0114-LARS-US-CAN-C15-12-V2-1-1?$content$&wid=675"
            alt=""
          />
          <hr />
          <a href="#">Select Bedding</a>
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FW46-FY22-0108-0114-LARS-US-CAN-C15-12-V2-2-1?$content$&wid=675"
            alt=""
          />
          <hr />
          <a href="#">Select Bath</a>
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FW46-FY22-0108-0114-LARS-US-CAN-C15-12-V2-3-1?$content$&wid=675"
            alt=""
          />
          <hr />
          <a href="#">Select Storage</a>
        </div>
        <br />
      </div>

      <br />
      <br />
      <div
        style={{
          textAlign: "center",
          color: "rgb(17, 53, 94)",
          letterSpacing: "1px",
          fontSize: "large",
        }}
      >
        <h1>winter savings spotlight</h1>
      </div>

      <div id="four_one">
        {FOUR_ONE_1.map((item, i) => (
          <div key={i}>
            <img src={item.img} alt="" />
            <h3 style={{ color: "rgb(17, 53, 94)" }}>{item.heading}</h3>
            <br />
            <p>Incredible prices on everything you need for home</p>
          </div>
        ))}
      </div>

      <div style={bannerRow}>
        <img
          width="80%"
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW12-BBB-US-CA-0515-0521-WEB-C01_19-DSK-Clearance50?$content$&wid=1280&hei=200"
          alt="#"
        />
      </div>
      <br />

      <div id="four_one">
        {FOUR_ONE_2.map((item, i) => (
          <div key={i}>
            <img src={item.img} alt="" />
            <h3 style={{ color: "rgb(17, 53, 94)" }}>{item.heading}</h3>
            <br />
          </div>
        ))}
      </div>

      <h1 style={sectionHeading}>brew your way</h1>
      <div style={{ width: "82%" }} id="two_one">
        <div>
          <img
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V1-3?$content$&wid=945"
            alt=""
          />
          <h4>coffee makers</h4>
        </div>
        <div>
          <img
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V1-4?$content$&wid=945"
            alt=""
          />
          <h4>Keurig K-cup pods 32-48ct</h4>
        </div>
      </div>

      <div style={bannerRow}>
        <img
          width="80%"
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-0102-BBB-FW45-Valentines-Day-Shop-Web-Banner-DSK-1?$content$&wid=1280&hei=300"
          alt=""
        />
      </div>

      <h1 style={sectionHeading}>tidy up & spend less</h1>
      <div className="three_one">
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FW46-FY22-0108-0114-LARS-US-C15-12-V2?$content$&wid=675"
            alt=""
          />
          <hr />
          <h3 style={{ color: "rgb(17, 53, 94)" }}>
            <span style={{ color: "red" }}>save up to $100 </span>on Select
            Dyson vacuums
          </h3>
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V2-1?$content$&wid=675"
            alt=""
          />
          <hr />
          <h3 style={{ color: "rgb(17, 53, 94)" }}>
            <span style={{ color: "red" }}>save up to $50 </span>on select Shark
            vacuums
          </h3>
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-US-0108-0114-WEB-HP-C15-12-V2-2-1?$content$&wid=675"
            alt=""
          />
          <hr />
          <h3 style={{ color: "rgb(17, 53, 94)" }}>OXO cleaning from 8.99</h3>
        </div>
        <br />
      </div>

      <h1 style={sectionHeading}>welcome to shopping made easy</h1>
      <div className="three_one">
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW28-US-CA-0905-WEB-HP-Holiday-C-15-12-V2-3-3?$content$&wid=675"
            alt=""
          />
          <hr />
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW28-US-CA-0905-WEB-HP-Holiday-C-15-12-V2-3-2?$content$&wid=675"
            alt=""
          />
          <hr />
        </div>
        <div>
          <img
            width="100%"
            src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW28-US-CA-0905-WEB-HP-Holiday-C-15-12-V2-3-ALT-1?$content$&wid=675"
            alt=""
          />
          <hr />
        </div>
        <br />
      </div>

      <div style={bannerRow}>
        <img
          width="90%"
          src="https://b3h2.scene7.com/is/image/BedBathandBeyond/FY22-FW46-BBB-US-CAN-1231-Outdoor-HP-C01_19_DSK?$content$&wid=1280&hei=300"
          alt=""
        />
      </div>
      <br />
      <br />
      <h1 style={sectionHeading}>top categories</h1>
      <br />
      <div id="six_three">
        {SIX_THREE_ITEMS.map(([src, label]) => (
          <div key={label}>
            <a href="#">
              <img src={src} alt="" />
            </a>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <br />
      <br />
      <br />
      <h1 style={sectionHeading}>just for you</h1>
      <br />
      <div className="crousel">
        <div>
          <i
            className="fa-solid fa-angle-left"
            onClick={() =>
              setCarousel1(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
        <div className="crousel_div1">
          {carousel1.map((item, i) => (
            <div key={i}>
              <img src={item.img} width="100%" alt="" />
              <h5 style={{ color: "red" }}>${item.price}</h5>
              <h6>Tim Hortons® Original</h6>
              <p>
                <i className="fa-solid fa-star">{item.rating}</i>
              </p>
            </div>
          ))}
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right"
            onClick={() =>
              setCarousel1(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
      </div>

      <br />
      <br />
      <br />
      <h1 style={sectionHeading}>recently reviewed</h1>
      <br />
      <div className="crousel">
        <div>
          <i
            className="fa-solid fa-angle-left"
            onClick={() =>
              setCarousel2(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
        <div className="crousel_div2">
          {carousel2.map((item, i) => (
            <div key={i}>
              <img src={item.img} width="100%" alt="" />
              <h5 style={{ color: "red" }}>${item.price}</h5>
              <h6>Tim Hortons® Original</h6>
              <p>
                <i className="fa-solid fa-star">{item.rating}</i>
              </p>
            </div>
          ))}
        </div>
        <div>
          <i
            className="fa-solid fa-angle-right"
            onClick={() =>
              setCarousel2(Array.from({ length: 6 }, randomCarouselItem))
            }
          ></i>
        </div>
      </div>

      {/* Admin Button */}
      <button id="open-modal" onClick={() => setModalOpen(true)}>
        🌐 ADMIN
      </button>
      {modalOpen && (
        <div
          id="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="modal-content">
            <span id="close-modal" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <div id="register">
              <label>LOGIN</label>
              <input
                type="email"
                id="admin_email"
                placeholder="* Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type="password"
                id="admin_password"
                placeholder="* Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <input
                type="submit"
                id="btn"
                onClick={handleAdminLogin}
                value="Login"
              />
              <Link href="/admin/register">Admin Register</Link>
            </div>
          </div>
        </div>
      )}

      <div id="footer_text">
        <p>
          True to its name, Bed Bath & Beyond® is committed to being the
          destination for home goods, offering a wide array of top-quality items
          in bedding, bath, home décor, furniture, beauty & fitness, luggage,
          and more. Whether your aesthetic is traditional, modern, rustic,
          farmhouse, or transitional, you&apos;ll find an impressive assortment
          of household items to suit your décor style.
        </p>
        <br />
        <p>
          In addition to the well-known brands, our competitive lineup of owned
          brands can help you create the ambiance for your every need. For
          instance, luxuriate in a serene oasis with Everhome™, sleep happy and
          stay cozy with Wamsutta®, or attain organized bliss Squared Away™.
          Simply Essential™ has all the essentials for the everyday task at hand
          and H for Happy™ has everything you need for every season. When family
          and friends spend time together, OurTable™ ensures you what you need
          to cook a delicious meal to share together.
        </p>
        <br />
        <p>
          Bed Bath & Beyond serves as a one-stop shop to create a custom wedding
          registry with convenience and ease. With a huge selection of must-have
          household items like bedding, cookware, electronics, and more from top
          brands, Bed Bath & Beyond is here to make registering for your wedding
          the least of your worries by guiding you through the process step by
          step. For instance, features like interactive registry checklists,
          helpful online tools, and unique perks make creating a wedding
          registry super simple. Plus, with registry favorites and household
          essentials across all categories, look to Bed Bath & Beyond as the top
          destination for shopping.
        </p>
        <br />
        <p>
          Shopping is easy in-store with Bed Bath & Beyond&apos;s coast-to-coast
          presence and our user-friendly website. You can order online and use
          our curbside or Store Pickup option or our Same Day Delivery. And if
          you want additional perks and benefits, our Welcome Rewards+™ program
          is just for you!
        </p>
      </div>
      <br />
      <hr />

      <div id="footer_container">
        <div id="footer_container_centre">
          <div id="social_media">
            <h6>LETS&apos;S CONNECT</h6>
            <div>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-pinterest"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
            <h6>SIGN UP FOR EMAILS</h6>
            <p>
              We&apos;ll let you know about the latest deals & newest products.
              <span style={{ fontWeight: 600, color: "black" }}>
                {" "}
                New subscribers will get 20% off Single Item
              </span>
            </p>
            <input type="text" placeholder="* enter email" />
            <button>get offer</button>
            <p>
              Privacy Policy &nbsp; California Notice of Financial Incentives
            </p>
            <h5>DOWNLOAD OUR APP</h5>
            <img
              width="60%"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
              alt=""
            />
            <img
              width="60%"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
              alt=""
            />
          </div>
          {[0, 1, 2].map((i) => (
            <div className="footer_one" key={i}>
              <div>
                <h5>SHIPING & RETURNS</h5>
                <ul>
                  {FOOTER_SHIPPING.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5>SHOPPING TOOLS</h5>
                <ul>
                  {FOOTER_SHOPPING.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="footer_last">
        <div id="footer_last_centre">
          <div>
            <h5 style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              Explore Other Brands
            </h5>
          </div>
          <div id="footer_last_centre_second">
            <div>
              <h2 style={{ fontFamily: "Courier, monospace" }}>buybuyBABY</h2>
            </div>
            <div>
              <h2 style={{ fontFamily: "monospace" }}>harmon</h2>
            </div>
          </div>
          <div>
            <p>
              All rights reserved © 2026 HomeDecor Inc. and its subsidiaries.
            </p>
            <p>
              website is created by
              <Link href="https://sourabhnateria.vercel.app">
                Sourabh Nateria
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
