"use client"

import { useEffect, useState } from "react"
import AlkyeLogoSvg from "./AlkyeLogoSvg"
import axios from "axios"
import Image from 'next/image'

export default function AlkyeHome() {

    const [allData, setAllData] = useState([])
    const [isShowDetail, setIsShowDetail] = useState(false)
    const [selectedCard, setSelectedCard] = useState()

    useEffect(() => {

        apiCall()

    }, [])

    function apiCall() {

        let config = {
            headers: {
                'Authorization': "Token 97848e8babeb149f26a044838f1fcb6f52d60e7b"
            }
        }

        axios.get("https://untitled-twkmuar27a-uc.a.run.app/api", config).then(res => {
            setAllData(res.data)
        }).catch(error => console.error(error))
    }

    function showDetail() {
        return <>
            <div className="w-full ">
                <Image
                    src={selectedCard?.image_url}
                    width={100}
                    height={500}
                    style={{ width: "100%", height: "auto" }} // Ensures width is 100% while keeping aspect ratio

                    alt="Picture of the author"
                />
            </div>
            <div className="p-[80px] flex flex-col gap-[20px]">
            <div className="px-6 py-4 mb-12 w-[200px] text-[24px] text-center rounded-full bg-black text-white">Photography</div>
            <div className="text-[45px] font-bold">
                    {selectedCard?.short_description}
                </div>
                <div className="text-[32px] font-semibold">
                    {selectedCard?.content}
                </div>
            </div>

        </>
    }


    return <div className="h-screen">
        <div className="text-center w-full flex justify-center flex-col my-20 ">
            <div className="flex justify-center cursor-pointer my-[20px]" onClick={() => setIsShowDetail(false)}>
                <AlkyeLogoSvg />
            </div>
            <p className="text-[50px] font-bold">alkye</p>
            <p>esiest test you will ever do</p>
        </div>
        {isShowDetail ? showDetail() :
            <div className="w-full overflow-x-auto flex">
                {allData?.map((item => <div
                    key={item.id}
                    style={{
                        backgroundImage: "url(" + item.image_url + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                    className="min-w-[1000px] h-[1000px] p-[80px] bg-black cursor-pointer m-10 rounded-[71px]"
                    onClick={() => {
                        setSelectedCard(item)
                        setIsShowDetail(true)
                    }}
                >

                    <div className="px-6 py-4 mb-12 w-[200px] text-[24px] text-center rounded-full bg-black text-white">Photography</div>

                    <p className="text-white text-[32px]">
                        {item.short_description}
                    </p>

                </div>))}
            </div>}
    </div>
}