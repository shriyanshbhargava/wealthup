'use client'

import React, { useEffect } from "react";
import { SidebarProvider, useSidebarContext } from "@/components/ui/Sidebar/sidebar-context";

import { AuthApi } from "@/api/services/auth/AuthApi";
import { BodyComponent } from "./BodyComponent";
import { HeaderController } from "@/components/display/HeaderController";
import { InvestmentsData } from "@/components/MyAccount/Dashboard/investments/types";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { differenceInCalendarMonths } from "date-fns";
import { useRouter, usePathname } from "next/navigation";

// @todo: Need to change the context
//  Shoud have context files and custom hook to return specific data
//  dispatch and state should be seperate contexts

type User = {
  _id: string | null;
  calls_booked: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  dob: string | null;
  coins: string | null;
  cas_updated_at: string | null;
  sub_end_date: string | null;
  tier: 'gold' | 'base' | 'silver' | null,
  subscriptionStatus: 'active' | 'inactive' | null,
  token: string | null;
};

export const initialUser: User = {
  _id: null,
  calls_booked: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  city: null,
  dob: null,
  coins: null,
  cas_updated_at: null,
  sub_end_date: null,
  tier: null,
  subscriptionStatus: null,
  token: null,
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [wealthometerData, setWealthometerData] = React.useState<any>(null);
  const [wealthometerLoaded, setWealthometerLoaded] =
    React.useState<boolean>(false);
  const [monthlyExpensesData, setMonthlyExpensesData] = React.useState<
    Array<{
      label: string;
      category: string;
      amount: number;
      budget?: number;
    }>
  >([]);
  const [taxSavingsData, setTaxSavingsData] = React.useState<any>(null);
  const [riskometer, setRiskometer] = React.useState<any>(null);
  const [finknowmeter, setFinknowmeter] = React.useState<any>(null);
  const [investments, setInvestments] = React.useState<InvestmentsData | null>(
    null
  );

  const [showWealthometerPopup, setShowWealthometerPopup] = React.useState<{
    show: boolean;
    new: boolean;
  }>({ show: false, new: false });

  const [scheduleCallLink, setScheduleCallLink] = React.useState<string>('');

  const router = useRouter();
  const pathname = usePathname();

  const { isCollapsed } = useSidebarContext();

  useEffect(() => {
    if (typeof window !== 'undefined' && !pathname.includes('/demo') && !localStorage.getItem('token')) {
      router.push(`/login?next=${pathname}`)
    }
  }, [router, pathname]);

  const getDatashbaordData = async (token: {
    access_token: string;
    expires_at: string;
  }) => {
    const userApiClient = new UserApi(token!.access_token);

    // wealthometer
    // const res: Response = await userApiClient.getWealthometer();

    const [res, expensesRes ] =
      await Promise.all([
        userApiClient.getWealthometer(),
        userApiClient.getMonthlyExpenses(),
        // userApiClient.getTax(),
        // userApiClient.getRiskprofile(),
        // userApiClient.getFinancialLiteracy(),
        // userApiClient.getInvestments(),
      ]);

    if (res.status === 200) {
      const data = await res.json();

      const differenceInMonths = differenceInCalendarMonths(
        Date.now(),
        Date.parse(data.createdAt)
      );

      if (differenceInMonths >= 3) {
        setShowWealthometerPopup({ show: true, new: false });
      }

      setWealthometerData(data);
      setWealthometerLoaded(true);
    } else if (res.status === 404) {
      setWealthometerLoaded(true);
      setShowWealthometerPopup({ show: true, new: true });
    } else {
      setWealthometerLoaded(true);
    }

    // expenes
    // const expensesRes: Response = await userApiClient.getMonthlyExpenses();

    if (expensesRes.status === 200) {
      const data = await expensesRes.json();
      setMonthlyExpensesData(data);
    }

    // Tax
    // const taxRes: Response = await userApiClient.getTax();

    // if (taxRes.status === 200) {
    //   const data = await taxRes.json();

    //   setTaxSavingsData(data);
    // }

    // Risk Profile
    // const rskRes: Response = await userApiClient.getRiskprofile();

    // if (rskRes.status === 200) {
    //   const data = await rskRes.json();

    //   setRiskometer(data[0]);
    // }

    // Financial Literacy
    // const fncRes: Response = await userApiClient.getFinancialLiteracy();

    // if (fncRes.status === 200) {
    //   const data = await fncRes.json();

    //   setFinknowmeter(data[0]);
    // }

    // Investments
    // const invRes: Response = await userApiClient.getInvestments();

    // if (invRes.status === 200) {
    //   const data = await invRes.json();

    //   setInvestments(data);
    // }
  };

  const getUser = async () => {
    const token = Storage.getToken();
    console.log({ token })
    if (token != null) {
      const authApiClient = new AuthApi(token.access_token);

      const res: Response = await authApiClient.me();

      if (res.status === 200) {
        const data = (await res.json()) as User;

        const tier = data.tier;
        if (tier === "base") {
          setScheduleCallLink("https://topmate.io/wealthup_me")
        } else {
          setScheduleCallLink("https://topmate.io/wealthup_me/230755")
        }

        setUser(data);
        getDatashbaordData(token);
        return;
      } else {
        Storage.removeToken();
        router.push(`/login?next=${pathname}`);
        return;
      }
    } else {
      Storage.removeToken();
      router.push(`/login?next=${pathname}`);
      return;
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  if (user === null) {
    return (
      <div className="w-screen h-screen">
        <div className="flex items-center jsutify-center text-black">
          <Spinner size="2" />
        </div>
      </div>
    );
  }

  return (
    <ProfileContext.Provider
      value={{
        user,
        wealthometerData,
        monthlyExpensesData,
        taxSavingsData,
        wealthometerLoaded,
        riskometer,
        finknowmeter,
        investments,
        setTaxSavingsData,
      }}
    >
      <SidebarProvider>
        <HeaderController title={`Dashboard - ${user.first_name}`} />
        <BodyComponent>
          {children}
        </BodyComponent>
        <TakeWealthoMeterModal
          open={showWealthometerPopup.show}
          isNew={showWealthometerPopup.new}
          onClose={() =>
            setShowWealthometerPopup((state) => {
              return { ...state, show: false };
            })
          }
          name={user?.first_name ?? ""}
        />
      </SidebarProvider>
    </ProfileContext.Provider>
  );
};

export const ProfileContext = React.createContext<{
  user: User | null;
  wealthometerData: any;
  monthlyExpensesData: Array<{
    label: string;
    category: string;
    amount: number;
    budget?: number;
  }>;
  taxSavingsData: any;
  wealthometerLoaded: boolean;
  riskometer: any;
  finknowmeter: any;
  investments: InvestmentsData | null;
  setTaxSavingsData: React.Dispatch<any> | null;
}>({
  user: null,
  monthlyExpensesData: [],
  taxSavingsData: null,
  wealthometerData: null,
  wealthometerLoaded: false,
  riskometer: null,
  finknowmeter: null,
  investments: null,
  setTaxSavingsData: null,
});

const TakeWealthoMeterModal: React.FC<{
  isNew: boolean;
  open: boolean;
  onClose: () => void;
  name: string;
}> = ({ open, onClose, isNew, name }) => {
  return (
      <Modal show={open} onClose={onClose}>
        <p className="text-2xl">
          {isNew
            ? `Welcome ${name ?? ""
            }! Start your financial planning by first checking your financial health.`
            : `Welcome ${name ?? ""
            } It's been a while since you checked your financial health. Get your updated scorecard.`}
        </p>
        <div className=" sm:flex sm:flex-row-reverse pb-2">
          <Link href="/wealthometer">

            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Check Now
            </button>

          </Link>
        </div>
      </Modal>
  );
};