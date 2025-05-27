"use client";

import { FaPencilAlt, FaSave } from "react-icons/fa";
import React, { useEffect } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav"
import { InputRow } from "@/components/ui/Input";
import { ProfileContext } from "@/components/DashboardLayout";
import { SITE_KEY } from "@/utils/constants";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { handleRecaptchaResponse } from "@/utils/recaptcha";
import { taxCrumbs } from "@/utils/Breadcrumbs";
import { toast } from "react-toastify";

type StateType = {
  basic: number | null;
  hra: number | null;
  allowance: number | null;
  fund: number | null;
  professional_tax: number | null;
  income_tax: number | null;
};

const initialState: StateType = {
  basic: null,
  hra: null,
  allowance: null,
  fund: null,
  professional_tax: null,
  income_tax: null,
};

const reducer = (state: StateType, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const TaxPage = () => {
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [taxExtra, setTaxExtra] = React.useState<number>(0);

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const handleChangeDisabled = () => {
    if (disabled === false) {
      handleSave();
    }
    setDisabled(!disabled);
  };

  const handleChange = (value: number, id: string) => {
    dispatch({
      type: "update",
      payload: {
        [id]: value,
      },
    });
  };

  useEffect(() => {
    const loadScriptByURL = (id: string, url: string, callback: () => void) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    }

    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
      
    });
  }, [])

  const { user, taxSavingsData, setTaxSavingsData } =
    React.useContext(ProfileContext);

  const handleSave = async () => {
    const win = window as typeof window & {
      grecaptcha: any
    }
    
    win.grecaptcha.ready(() => {
      win.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token: string) => {
        const result = await handleRecaptchaResponse(token)
        if (result === false) {
          return;
        }
      });
    });

    const res = await userApiClient.updateTax(
      JSON.stringify({ ...state, phone: user!.phone })
    );

    if (res.status === 201) {
      const data = await res.json();
      if (setTaxSavingsData !== null)
        setTaxSavingsData({
          ...state,
          first_tax_saving: data.first_tax_saving,
        });

      setTaxExtra(data.first_tax_saving);
      toast.success("Data saved successfully");
    }
  };

  const getInitialTaxData = async () => {
    if (taxSavingsData !== null) {
      const data = taxSavingsData;
      dispatch({
        type: "update",
        payload: {
          basic: data.basic,
          hra: data.hra,
          allowance: data.allowance,
          fund: data.fund,
          professional_tax: data.professional_tax,
          income_tax: data.income_tax,
        },
      });
      setTaxExtra(data.first_tax_saving);
    } else {
      const taxRes: Response = await userApiClient.getTax();

      if (taxRes.status === 200) {
        const data = await taxRes.json();
        dispatch({
          type: "update",
          payload: {
            basic: data.basic,
            hra: data.hra,
            allowance: data.allowance,
            fund: data.fund,
            professional_tax: data.professional_tax,
            income_tax: data.income_tax,
          },
        });

        setTaxExtra(data.first_tax_saving);
      }
    }
  };

  React.useEffect(() => {
    getInitialTaxData();
  }, []);

  return (
    <div className="w-full h-full">
      <HeaderNav whatsapp={false} showBtn={true} showNotification={true} title="Tax" beta={false} />
      <div className="relative bg-primary-light w-full h-[25rem]">
        {/* <h1 className="text-white font-medium text-2xl py-4 md:py-0 md:text-4xl font-robo mx-4">
          My Tax
        </h1> */}
        <div className="absolute bottom-10 w-full">
          <div className="flex justify-center items-center">
            <p className="text-white text-3xl md:text-5xl font-robo font-medium text-center">
              You can save up to
              <br />
              <span className="font-bold">
                {taxExtra > 0
                  ? taxExtra.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })
                  : "₹0"}
              </span>{" "}
              <br />
              EXTRA in taxes!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 px-4"><Breadcrumbs crumbs={taxCrumbs} /></div>
      <div className="px-6 pt-8 pb-8 flex flex-col items-center">
        <div className="w-full xl:w-4/5 2xl:w-2/3 flex gap-4 sm:gap-16 items-center justify-between">
          <h2 className="mb-0 text-xl sm:text-2xl md:text-4xl font-robo font-medium">
            My Salary Slip
          </h2>
          <Button
            onClick={handleChangeDisabled}
            className="w-[8rem] sm:w-auto font-robo font-xl btn"
            size="bigger"
            // className="font-robo font-normal cursor-pointer flex gap-2 items-center text-base md:text-xl bg-primary-dark rounded-full px-4 text-white flex-1"
          >
            {disabled ? (
              <>
                <FaPencilAlt className="mr-4" />
                Edit
              </>
            ) : (
              <>
                <FaSave className="mr-4" />
                Save
              </>
            )}
          </Button>
        </div>
        <div className="bg-white w-full xl:w-4/5 2xl:w-2/3 rounded-xl flex flex-col md:flex-row p-4 gap-6 my-4">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-robo font-medium text-secondary">
              Income
            </h2>
            <InputRow
              name="Basic"
              disabled={disabled}
              id="basic"
              value={state.basic || 0}
              onChange={handleChange}
            />
            <InputRow
              name="HRA"
              disabled={disabled}
              id="hra"
              value={state.hra  || 0}
              onChange={handleChange}
            />
            <InputRow
              name="Other Allowances"
              disabled={disabled}
              value={state.allowance  || 0}
              id="allowance"
              onChange={handleChange}
            />
            <InputRow
           value={(state.basic || 0) + (state.allowance || 0) + (state.hra || 0)}
              name="Gross Pay"
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-robo font-medium text-secondary">
              Deductions
            </h2>
            <InputRow
              name="Provident Fund"
              disabled={disabled}
              id="fund"
              value={state.fund || 0}
              onChange={handleChange}
            />
            <InputRow
              name="Professional Tax"
              disabled={disabled}
              value={state.professional_tax  || 0}
              id="professional_tax"
              onChange={handleChange}
            />
            <InputRow
              name="TDS"
              value={state.income_tax  || 0}
              disabled={disabled}
              id="income_tax"
              onChange={handleChange}
            />
            <InputRow
              name="Net Pay"
              value={
                (state.basic || 0) +
                (state.allowance || 0) +
                (state.hra || 0) -
                ((state.fund || 0) + (state.professional_tax || 0) + (state.income_tax || 0))
              }
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <div>
        {/*<p className="text-xl pb-8 md:text-2xl font-robo font-medium text-center">
          You can save up to&nbsp;
          <span className="font-bold">
            {taxExtra > 0 ? taxExtra.toLocaleString("en-IN", {maximumFractionDigits: 0,style: "currency",currency: "INR",}): "₹0"}
          </span>
          &nbsp;in taxes in xxx tax regime by claiming deductions of xxx
            </p>*/}
      </div>
    </div>
  );
};

export default TaxPage;
