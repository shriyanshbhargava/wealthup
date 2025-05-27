"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import { IoIosDownload } from "react-icons/io";
import { ProfileContext } from "@/components/DashboardLayout";
import { RentReceiptGeneratorForm } from "../../rent-receipt-generator/RentReceiptGeneratorForm";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { toast } from "react-toastify";

const RentReceipt = () => {
  const [rentAssets, setRentAssets] = useState<Array<{ key: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const ref = useRef<HTMLAnchorElement>(null);

  const tokens = Storage.getToken()!;
  const userApiClient = new UserApi(tokens.access_token);

  const { setTaxSavingsData } = useContext(ProfileContext)

  const handleSuccess = async () => {
    setLoading(true);
   const [assetsRes, taxRes] = await Promise.all([
    userApiClient.getAssetsData("Rent"),
    userApiClient.getTax()
   ])

    if (setTaxSavingsData !== null) {
      const data = await taxRes.json();

      setTaxSavingsData((prev: any) => {
        return {
          ...prev,
          first_tax_saving: data.first_tax_saving
        }
      })
    }
    

    const data = await assetsRes.json();

    if (assetsRes.status === 200) {
      setRentAssets(data);
      setLoading(false);
    } else {
      toast.error("Something went wrong while fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSuccess();
  }, []);

  const handleDownload = async (key: string) => {
    setDownloading(true);
    try {
      const res: Response = await userApiClient.getAssetUrl(key);

      const data = await res.json();
      if (res.status === 200) {
        // window.location.assign(data.url);
        const pdfRes = await fetch(data.url);

        if (res.status === 200) {
          const pdfBlob = await pdfRes.blob();

          if (ref.current !== null) {
            ref.current.href = window.URL.createObjectURL(pdfBlob);
            ref.current.download = "rent-receipt.pdf";
            ref.current.click();
          }
        }

        setDownloading(false);
      } else {
        toast.error(data?.message ?? "Something went wrong");
        setDownloading(false);
      }
    } catch (err) {
      console.log(err);
      setDownloading(false);
    }
  };

  return (
    <>
      <a ref={ref} href="#" className="hidden"></a>
      <HeaderNav whatsapp={false} showBtn={true} showNotification={true} title="Rent Receipt Generator" beta={false} />
      {/* <header className="h-24 w-full report-header">
        <Container>
          <div className="h-full flex justify-center items-center">
            <h1 className="text-lg md:text-3xl text-white mb-0 capitalize">
              Rent Receipt Generator
            </h1>
          </div>
        </Container>
      </header> */}
      <RentReceiptGeneratorForm dashboard handleSucess={handleSuccess} />
      <Container>
        <div className="flex justify-end mb-4">
          {loading ? (
            <p className="text-2xl font-bold animate-pulse">Loading...</p>
          ) : null}
          <div className="flex gap-4">
            <Button
              onClick={() => handleDownload(rentAssets[0]?.key)}
              className="btn"
              loading={downloading}
              disabled={!rentAssets[0]}
              icon={<IoIosDownload />}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RentReceipt;
