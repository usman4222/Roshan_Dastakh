import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo_name.png";
import chip from "../assets/images/chip_.png";
import invest from "../assets/images/invest.png";
import withdraw from "../assets/images/round_arrow_downward.png";
import announcement from "../assets/images/ic_announcement.png";
import tax from "../assets/images/ic_tax.png";
import statment from "../assets/images/ic_statment.png";
import ic_investment from "../assets/images/ic_investment.png";
import ic_money from "../assets/images/ic_money.png";
import ic_withdraw from "../assets/images/ic_withdraw.png";
import enfotrix from "../assets/images/enfotrix_logo.png";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Link, useOutletContext } from "react-router-dom";
import { Announcement } from "../Services/GlobalApi";

const Home = () => {
    const [userData] = useOutletContext();
    const [allAnnouncement, setAnnoucement] = useState('');

    useEffect(() => {
        getAnnoucement();
    }, [])

    const getAnnoucement = async () => {
        try {
            const response = await fetch(Announcement, {
                method: 'POST'
            });
            const responseData = await response.json();
            setAnnoucement(responseData.data);
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
        <div className="container mx-auto pt-12 pb-3">
            <div className="md:grid grid-cols-3 gap-5">
                <div className="flex justify-between bg-light-blue-800 rounded-lg py-2 px-4 text-white md:mb-0 mb-4">
                    {userData && (<>
                        <div className="">
                            <h4 className="text-[22px] font-semibold mb-1">{userData.name} </h4>
                            {/* <h4 className="text-[22px] font-semibold mb-1">Muhammad Hussain </h4> */}
                            <img src={chip} className="w-8 mb-2" alt="" />
                            <p className="text-[10px]">Current (Active) Investment</p>
                            <h3 className="text-[22px] font-semibold">Rs. {userData.investment.active_investment}</h3>
                        </div>
                        <div className="">
                            <img src={logo} className="w-20 mx-auto mb-8" alt="" />
                            <p className=" font-medium">{userData.lc_id}</p>
                        </div>
                    </>
                    )}
                </div>
                <div className="md:mb-0 mb-4">
                    <p className="mb-3 text-gray-400">Add Requests</p>
                    <div className="flex text-white gap-5">
                        <Link to={'/investment'} className=" bg-yellow-800  rounded-lg p-4 w-1/2">
                            <div className="flex gap-4">
                                <img src={invest} alt="" className="w-5 h-5" />
                                <p className="my-auto">INVEST</p>
                            </div>
                        </Link>
                        <Link to={'/withdraw'} className=" bg-cyan-900  rounded-lg p-4 w-1/2">
                            <div className="flex gap-4">
                                <img src={withdraw} className="w-4 h-6" alt="" />
                                <p className="my-auto">WITHDRAW</p>
                            </div>
                        </Link>

                    </div>
                </div>
                {userData && (
                    <div className="">
                        <p className="mb-3 text-gray-400">Pending Amounts</p>
                        <div className="bg-white gap-5 rounded-lg shadow-md py-3 px-4">
                            <div className="flex justify-between mb-1">
                                <p>Available Profit</p>
                                <p>Rs.{userData.investment.active_investment}</p>
                            </div>
                            <div className="flex justify-between mb-1">
                                <p>In-Active Investment</p>
                                <p>Rs.{userData.investment.in_active_investment}</p>
                            </div>
                            <div className="flex justify-between mb-1">
                                <p>Profit</p>
                                <p>Rs.{userData.investment.profit}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className=" font-medium">Expected Sum</p>
                                <p className=" font-medium text-yellow-800">Rs.{userData.investment.active_investment + userData.investment.in_active_investment + userData.investment.profit}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <p className="my-3 text-gray-400">Announcement</p>
            <div className="flex bg-white gap-5 rounded-lg shadow-md px-3 py-7 md:w-1/2">
                <img src={announcement} className="w-20" alt="" />
                {allAnnouncement && (
                    <p>{allAnnouncement.data} </p>

                )}
            </div>
            <p className="my-3 text-gray-400">Investment Portfolio</p>
            <Swiper
                slidesPerView={2.3}
                spaceBetween={15}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    // When screen width is 768 pixels or less (mobile devices)
                    768: {
                        slidesPerView: 3,
                    },
                    // When screen width is larger than 768 pixels
                    1024: {
                        slidesPerView: 4.2,
                    },
                }}
            >


                <SwiperSlide>
                    <Link to={'/investment-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_money} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Investment</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/profit-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_investment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Profit</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/withdraw-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={ic_withdraw} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">WithDraw</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/tax-history'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={tax} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">Tax</p>
                            <p>History</p>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/e-statement'}>
                        <div className="bg-white rounded-lg shadow p-3 pt-8">
                            <img src={statment} className="w-24 mx-auto" alt="" />
                            <p className="-mb-1">E</p>
                            <p>Statement</p>
                        </div>
                    </Link>
                </SwiperSlide>

            </Swiper>

            <div className="mt-8">
                <img src={enfotrix} className="w-40 mx-auto" alt="" />
            </div>
        </div>
    </div>;
};

export default Home;
