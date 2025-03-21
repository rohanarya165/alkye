"use client";

import { useEffect, useState } from "react";
import AlkyeLogoSvg from "./AlkyeLogoSvg";
import axios from "axios";
import Image from "next/image";

export default function AlkyeHome() {
    const [allData, setAllData] = useState([]);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        axios
            .get("https://untitled-twkmuar27a-uc.a.run.app/api", {
                headers: { Authorization: "Token 97848e8babeb149f26a044838f1fcb6f52d60e7b" },
            })
            .then((res) => setAllData(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="h-screen">
            <div className="text-center w-full flex flex-col items-center my-20">
                <div className="cursor-pointer my-5" onClick={() => setIsShowDetail(false)}>
                    <AlkyeLogoSvg />
                </div>
                <p className="text-[90px] font-[700]">alkye</p>
                <p className="text-[24px] font-[400] ">The easiest test you will ever do</p>
            </div>

            {isShowDetail && selectedCard ? (
                <div className="w-full flex flex-col items-center">
                    <Image
                        src={selectedCard?.image_url}
                        width={800}
                        height={500}
                        quality={100}
                        priority
                        alt="Detailed view"
                        className="w-full h-auto"
                    />
                    <div className="p-20 flex flex-col gap-5">
                        <div className="px-6 py-4 mb-12 w-52 text-2xl text-center rounded-full bg-black text-white">
                            Photography
                        </div>
                        <div className="text-4xl font-bold">{selectedCard.short_description}</div>
                        <div className="text-2xl font-semibold">{selectedCard.content}</div>
                    </div>
                </div>
            ) : (
                <div className="w-full overflow-x-auto flex">
                    {allData.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[1000px] h-[1000px] p-20 bg-black cursor-pointer m-10 rounded-[71px]"
                            style={{
                                backgroundImage: `url(${item.image_url})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                            }}
                            onClick={() => {
                                setSelectedCard(item);
                                setIsShowDetail(true);
                            }}
                        >
                            <div className="px-6 py-4 mb-12 w-52 text-2xl text-center rounded-full bg-black text-white">
                                Photography
                            </div>
                            <p className="text-white text-2xl">{item.short_description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
