"use client"

import React, { useContext, useState } from "react";

import { BiAtom } from "react-icons/bi";
import HeaderNav from "@/components/MyAccount/MutualFundsAnalyser/HeaderNav";
import Image from 'next/image'
import { ProfileContext } from "@/components/DashboardLayout";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { cn } from "@/utils";
import doc from '@/assets/images/doc.png'
import profilebg from '@/assets/images/profile-bg.png'
import profilebg2 from '@/assets/images/profile-bg-2.png'
import profilebgmd from '@/assets/images/profile-bg-md.png'
import { toast } from "react-toastify";
import trash from '@/assets/images/trash.png'


// import HeaderNav from "../../shared-components/PortfolioAnalyser/HeaderNav";
// import Storage from "../../utils/storage";
// import { UserApi } from "../../api/UserApi";
// import { ProfileContext } from "../../shared-components/DashboardLayout";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { MobileNav } from "./profile/mobile-nav";
// import { useMediaQuery } from "react-responsive";

// const ProfileSection: React.FC<{
//     title: string;
//     value: string;
// }> = ({ title, value }) => (
//   <div className="flex items-center justify-between w-full">
//     <div className="text-lg font-semibold leading-10">{title}:</div>
//     <div className="flex-auto text-base font-normal">{value}</div>
//   </div>
// );

const SensitiveDataSection: React.FC<{
  data: { title: string; value: string; }[];
  alternate: boolean;
}> = ({ data, alternate }) => (
  <div className={`flex justify-between p-3 rounded-2xl text-brand-blue ${alternate ? "bg-[#00B3B0]/20" : ''}`}>
    {data.map((it => (
      <div className={`flex flex-col self-start ${it.title === "Email ID" ? 'w-full' : 'w-1/2'}`} key={it.title}>
        <div className="font-semibold mb-1 text-base">{it.title}:</div>
        <div className="">{it.value}</div>
      </div>
    )))}
  </div>
);

const profileData = [
  { title: "D.O.B.", value: "XYZ" },
  { title: "Hometown", value: "Bangalore" },
  { title: "Marital Status", value: "XYZ" },
  { title: "#of Kids", value: "XYZ" },
]


const UserProfile = () => {

  const [buttonText, setButtonText] = useState("Edit Details")
  const [buttonDisable, setButtonDisable] = useState(true)

  const [currentSelected, setCurrentSelected] = useState(1)
  const [currentTab, setCurrentTab] = useState<"sensitivedata" | "documents">("documents")

  const [userProfile, setUserProfile] = useState<any>({})
  const [profileData, setProfileData] = useState([
    { title: "Name", value: "", isEditable: true, inputType: "text", placeholderValue: "Full Name" },
    { title: "Age", value: "00", isEditable: true, inputType: "number", placeholderValue: "in years" },
    { title: "D.O.B.", value: "", isEditable: true, inputType: "date", placeholderValue: "" },
    { title: "Height", value: "00", isEditable: true, inputType: "number", placeholderValue: "in cm" },
    { title: "Weight", value: "00", isEditable: true, inputType: "number", placeholderValue: "in kg" },
    { title: "User since", value: "2020-01-01", isEditable: false, inputType: "date", placeholderValue: "" },
    { title: "Company name", value: "XYZ", isEditable: true, inputType: "text", placeholderValue: "" },
    { title: "School name", value: "XYZ", isEditable: true, inputType: "text", placeholderValue: "" },
    // { title: "Address Line 1", value: "Bangalore" },
    // { title: "Address Line 2", value: "Bangalore" },

    // { title: "PAN", value: "XYZ" },
    // { title: "#of Kids", value: "XYZ" },
    // {title:"Bank 1",value:"XYZ"},
    // {title:"Bank 2",value:"XYZ"}

  ]);
  const [familyData, setFamilyData] = useState([
    { title: "Father DOB", value: "2020-01-01", isEditable: true, inputType: "date", placeholderValue: "" },
    { title: "Mother DOB", value: "2020-01-01", isEditable: true, inputType: "date", placeholderValue: "" },
    { title: "Nominee", value: "XYZ", isEditable: true, inputType: "text", placeholderValue: "" },
    //  { title: "Weight", value: "2.2" },
    { title: "User since", value: "2020-01-01", isEditable: false, inputType: "date", placeholderValue: "" },
    { title: "Company name", value: "XYZ", isEditable: true, inputType: "text", placeholderValue: "" },
    { title: "School name", value: "XYZ", isEditable: true, inputType: "text", placeholderValue: "" },
    { title: "Address Line 1", value: "Bangalore", isEditable: true, inputType: "text", placeholderValue: "" },
    { title: "Address Line 2", value: "Bangalore", isEditable: true, inputType: "text", placeholderValue: "" },



  ]);
  console.log("userProfile", userProfile)
  const [sensitiveData, setSensitiveData] = useState([
    [
      { title: "PAN", value: "XYZ" },
      { title: "Aadhar Number", value: "XYZ" },
    ],
    [
      { title: "bank name", value: "XYZ" },
      { title: "account number", value: "XYZ" },
    ],
    [
      { title: "IFSC", value: "XYZ", additional: "(in cm)" },
      { title: "MICR", value: "XYZ", additional: "(in kg)" },
    ],
    [
      { title: "Branch", value: "XYZ" },

    ],


  ]);

  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [selected, setSelected] = useState('Profile')

  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  const handleProfileDataChange = (index: number, value: string) => {
    const newProfileData = [...profileData];
    newProfileData[index].value = value;
    setProfileData(newProfileData);
    setModifiedFields(prev => new Set(prev).add(profileData[index].title));
  };

  const handleFamilyDataChange = (index: number, value: string) => {
    const newFamilyData = [...familyData];
    newFamilyData[index].value = value;
    setFamilyData(newFamilyData);
    setModifiedFields(prev => new Set(prev).add(familyData[index].title));
  };

  React.useEffect(() => {
    const token = Storage.getToken();
    const userApiClient = new UserApi(token!.access_token);

    const getProfile = async () => {
      const res: Response = await userApiClient.getAuthMe();
      if (res.status === 200) {
        const data = await res.json();


        const dobString = data?.dob;
        let age = "";

        // Calculate age from DOB
        if (dobString) {
          const dobDate = new Date(dobString);
          const today = new Date();
          age = String(today.getFullYear() - dobDate.getFullYear() -
            (today.getMonth() < dobDate.getMonth() ||
              (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate()) ? 1 : 0));
        }
        const name = `${data?.first_name} ${data?.last_name}`;
        setUserProfile(data)
        setProfileData(prevData => prevData.map(item => {
          switch (item.title) {
            case "Age":
              return { ...item, value: age };
            case "D.O.B.":
              return {
                ...item,
                value: data?.dob ? data.dob.split('T')[0] : ""
              };
            case "Name":
              return { ...item, value: data?.name };
            case "Height":
              return { ...item, value: data?.height };
            case "Weight":
              return { ...item, value: data?.weight };
            case "School name":
              return { ...item, value: data?.school_name };
            case "Company name":
              return { ...item, value: data?.company_name };
            case "User since":
              return { ...item, value: data?.createdAt.slice(0, 10) };
            case "Address Line 1":
              return { ...item, value: data?.address?.line1 || "Not Available" };
            case "Address Line 2":
              return { ...item, value: data?.address?.line2 || "Not Available" };
            case "PAN":
              return { ...item, value: data?.PAN || "Not Available" };
            case "Bank 1":
              return { ...item, value: data?.bank_accounts[0]?.ifsc || "Not Available" };
            case "Bank 2":
              return { ...item, value: data?.bank_accounts[1]?.ifsc || "Not Available" };
            case "#of Kids":
              return { ...item, value: data?.kids?.toString() || "Not Available" };
            default:
              return item;
          }
        }));
        setSensitiveData(prevData => prevData.map(group => group.map(item => {
          console.log(item.title);
          switch (item.title) {
            case "PAN":
              return { ...item, value: data.PAN ? `${data.PAN}` : "Not Available" };



            case "Aadhar Number":
              return { ...item, value: data.aadhaar_last_4_digit ? `${data.aadhaar_last_4_digit}` : "Not Available" };
            case "bank name":
              return { ...item, value: data?.bank_accounts[0]?.bank_name || "Not Available" };
            case "account number":
              return { ...item, value: data?.bank_accounts[0]?.account_number || "Not Available" };
            case "IFSC":
              return { ...item, value: data?.bank_accounts[0]?.ifsc || "Not Available" };
            case "MICR":
              return { ...item, value: data?.bank_accounts[0]?.micr || "Not Available" };
            case "Branch":
              return { ...item, value: data?.bank_accounts[0]?.branch || "Not Available" };

            default:
              return item;
          }
        })));
      }
    };

    const getSensitiveData = async () => {
      const res: Response = await userApiClient.getSensitiveData();
      if (res.status === 200) {
        const data = await res.json();

        setSensitiveData(prevData => prevData.map(group => group.map(item => {
          console.log(item.title);
          switch (item.title) {

            case "Height":
              return { ...item, value: data.height ? `${data.height} (in cm)` : "Not Available" };
            case "Weight":
              return { ...item, value: data.weight ? `${data.weight} (in kg)` : "Not Available" };
            case "PAN":
              return { ...item, value: data.pan || "Not Available" };
            case "Aadhar Number":
              return { ...item, value: data.aadhar || "Not Available" };
            case "Father's Name":
              return { ...item, value: data.fathers_name || "Not Available" };
            case "Mother's Name":
              return { ...item, value: data.mothers_name || "Not Available" };
            case "Spouse's Name":
              return { ...item, value: data.spouse_name || "Not Available" };
            case "Nominee Name":
              return { ...item, value: data.nominee_name || "Not Available" };
            case "Nominee Relation":
              return { ...item, value: data.nominee_relationship || "Not Available" };
            case "Phone Number":
              return { ...item, value: data.nominee_phone || "Not Available" };
            case "Email ID":
              return { ...item, value: data.nominee_email || "Not Available" };
            default:
              return item;
          }
        })));
      }
    };

    getProfile();
    // getSensitiveData();
  }, []);

  const { user } = useContext(ProfileContext)

  const handleSaveChanges = async () => {
    // Check if any fields have been modified
    if (modifiedFields.size === 0) {
      toast.info("No changes to save");
      setButtonText("Edit Details");
      setButtonDisable(true);
      return;
    }

    const token = Storage.getToken();
    const userApiClient = new UserApi(token!.access_token);

    const updateData: any = {};

    if (modifiedFields.has("Age")) {
      updateData.age = Number(profileData.find(item => item.title === "Age")?.value);
    }
    if (modifiedFields.has("D.O.B.")) {
      updateData.dob = profileData.find(item => item.title === "D.O.B.")?.value;
    }
    if (modifiedFields.has("Height")) {
      updateData.height = Number(profileData.find(item => item.title === "Height")?.value);
    }
    if (modifiedFields.has("Weight")) {
      updateData.weight = Number(profileData.find(item => item.title === "Weight")?.value);
    }
    if (modifiedFields.has("Company name")) {
      updateData.company_name = profileData.find(item => item.title === "Company name")?.value;
    }
    if (modifiedFields.has("School name")) {
      updateData.school_name = profileData.find(item => item.title === "School name")?.value;
    }
    if (modifiedFields.has("Name")) {
      updateData.name = profileData.find(item => item.title === "Name")?.value;
    }

    if (modifiedFields.has("Address Line 1") || modifiedFields.has("Address Line 2")) {
      updateData.address = {};
      if (modifiedFields.has("Address Line 1")) {
        updateData.address.line1 = familyData.find(item => item.title === "Address Line 1")?.value;
      }
      if (modifiedFields.has("Address Line 2")) {
        updateData.address.line2 = familyData.find(item => item.title === "Address Line 2")?.value;
      }
    }

    if (Object.keys(updateData).length === 0) {
      toast.info("No valid changes to save");
      setButtonText("Edit Details");
      setButtonDisable(true);
      return;
    }

    try {
      const [updateRes, profileRes] = await Promise.all([
        userApiClient.updateUserData(userProfile._id, updateData),
        userApiClient.getAuthMe()
      ]);

      if (updateRes.ok) {
        const profileData = await profileRes.json();
        setUserProfile(profileData);
        setButtonText("Edit Details");
        setButtonDisable(true);
        setModifiedFields(new Set());
        toast.success("Profile updated successfully!");
      } else {
        const errorData = await updateRes.json();
        toast.error(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <HeaderNav whatsapp={false} showBtn={true} showNotification={true} title="My Profile" beta={false} />

      <div className="relative bg-brand-sky-blue pb-12">

        <div className="absolute top-0 -left-1 h-[423px] w-full hidden md:block">
          <Image src={profilebgmd} fill alt="Profile BG" />

        </div>

        <div className="md:hidden">
          <Image src={profilebg} alt="Profile BG" />
        </div>
        <div className="hidden relative md:flex px-6 justify-center">
          <div className="grid grid-cols-3 w-full gap-8 max-w-[1200px]">
            <div className="flex flex-col items-center mt-10 w-full">
              <div className="w-full">
                <div className="w-full">
                  <div className="relative w-full h-[130px]">
                    <Image src={profilebg2} fill alt="Profile BG 2" className="rounded-t-2xl object-cover" />
                    <div className="absolute top-0 left-0 right-0 h-full">
                      <div className="flex items-center justify-center h-full">
                      <span className="text-3xl font-bold text-brand-blue w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                          {user?.first_name?.slice(0, 1)}{user?.last_name?.slice(0, 1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:block w-full bg-white rounded-b-2xl p-6" onClick={() => setCurrentSelected(1)}>
                  <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782" />
                    </svg>
                    Personal details
                  </div>
                  <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                    {profileData.map((it, index) => (
                      <div key={index} className="flex justify-between"
                        onClick={() => { !it.isEditable && alert("You can't edit this field") }}
                      >
                        <span className="font-semibold">{it.title}</span>
                        <span>
                          <input
                            disabled={it.isEditable ? buttonDisable : true}
                            onChange={(e) => handleProfileDataChange(index, e.target.value)}
                            value={it.value}
                            className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                            type={it.inputType}
                          />

                          {buttonText === "Save Changes" && (
                            <p>
                              {it.placeholderValue}
                            </p>
                          )}

                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full mt-8">
                <div className="w-full">
                  <div className="bg-white w-full rounded-2xl p-6 pb-24">
                    <h2 className="text-brand-blue text-center text-lg">{user?.first_name} {user?.last_name}</h2>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-row gap-3  items-center text-brand-blue font-medium text-base">
                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.8945 0.759766H1.22641C1.03116 0.759766 0.843913 0.837326 0.705854 0.975385C0.567795 1.11344 0.490234 1.30069 0.490234 1.49594V14.0108C0.490234 14.4013 0.645356 14.7758 0.921473 15.0519C1.19759 15.3281 1.57209 15.4832 1.96258 15.4832H18.1583C18.5488 15.4832 18.9233 15.3281 19.1994 15.0519C19.4756 14.7758 19.6307 14.4013 19.6307 14.0108V1.49594C19.6307 1.30069 19.5531 1.11344 19.4151 0.975385C19.277 0.837326 19.0898 0.759766 18.8945 0.759766ZM10.0605 8.59539L3.11929 2.23211H17.0016L10.0605 8.59539ZM7.36515 8.12148L1.96258 13.0731V3.16981L7.36515 8.12148ZM8.45469 9.11991L9.55894 10.1367C9.69476 10.2614 9.87241 10.3306 10.0568 10.3306C10.2411 10.3306 10.4188 10.2614 10.5546 10.1367L11.6589 9.11991L16.9961 14.0108H3.11929L8.45469 9.11991ZM12.7558 8.12148L18.1583 3.16889V13.0741L12.7558 8.12148Z" fill="#035782" />
                        </svg>
                        {user?.email}
                      </div>
                      <div className="flex flex-row gap-3  items-center text-brand-blue font-medium text-base">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.7067 13.4672L14.1949 11.4454L14.1825 11.4397C13.9482 11.3395 13.6927 11.2993 13.4391 11.3227C13.1854 11.3461 12.9415 11.4324 12.7296 11.5737C12.7047 11.5902 12.6807 11.6081 12.6578 11.6274L10.3267 13.6147C8.84988 12.8973 7.32519 11.3841 6.60786 9.92647L8.598 7.55994C8.61716 7.536 8.63536 7.51206 8.65259 7.4862C8.79092 7.27483 8.87484 7.03255 8.8969 6.78091C8.91895 6.52927 8.87846 6.27608 8.77901 6.04387V6.03238L6.75152 1.51289C6.62006 1.20955 6.39403 0.956854 6.10715 0.792532C5.82028 0.62821 5.48795 0.561072 5.15979 0.601143C3.86205 0.771911 2.67084 1.40924 1.80866 2.39409C0.946475 3.37894 0.472272 4.64396 0.474618 5.95289C0.474618 13.5572 6.66149 19.7441 14.2658 19.7441C15.5747 19.7464 16.8397 19.2722 17.8246 18.41C18.8094 17.5478 19.4468 16.3566 19.6175 15.0589C19.6577 14.7308 19.5907 14.3986 19.4265 14.1117C19.2624 13.8249 19.0099 13.5988 18.7067 13.4672ZM14.2658 18.2117C11.0156 18.2082 7.89962 16.9155 5.60142 14.6173C3.30321 12.3191 2.01052 9.20304 2.00697 5.95289C2.00337 5.01766 2.34031 4.1131 2.95486 3.40813C3.56942 2.70316 4.41957 2.246 5.34654 2.122C5.34617 2.12582 5.34617 2.12967 5.34654 2.1335L7.35776 6.63478L5.37815 9.00418C5.35805 9.0273 5.3398 9.05196 5.32356 9.07793C5.17943 9.29908 5.09489 9.55372 5.07811 9.81716C5.06133 10.0806 5.11289 10.3439 5.22779 10.5816C6.09548 12.3562 7.88354 14.1309 9.67735 14.9976C9.91675 15.1114 10.1816 15.1612 10.446 15.1421C10.7104 15.1229 10.9653 15.0355 11.1858 14.8884C11.2104 14.8719 11.234 14.854 11.2566 14.8348L13.5849 12.8485L18.0861 14.8645C18.0861 14.8645 18.0938 14.8645 18.0967 14.8645C17.9742 15.7928 17.5177 16.6446 16.8126 17.2607C16.1075 17.8768 15.2021 18.2149 14.2658 18.2117Z" fill="#035782" />
                        </svg>
                        {user?.phone?.replace('91', '')}
                      </div>
                      <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                        <svg width="28" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                        </svg>
                        {userProfile?.address?.line1}
                      </div>
                      <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                        <svg width="28" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                        </svg>
                        {userProfile?.address?.line2}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Details */}
            <div className="mt-[160px] hidden md:flex">
              <div className="flex flex-col gap-6 w-full">
                <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(0)}>
                  <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                    {/* <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.1311 9.35961L18.9167 0.1786C18.7506 0.0901871 18.5654 0.0439453 18.3773 0.0439453C18.1892 0.0439453 18.0039 0.0901871 17.8379 0.1786L0.623508 9.35961C0.439894 9.45746 0.286337 9.60339 0.179262 9.78179C0.0721876 9.96018 0.015625 10.1643 0.015625 10.3724C0.015625 10.5804 0.0721876 10.7846 0.179262 10.963C0.286337 11.1414 0.439894 11.2873 0.623508 11.3852L4.60577 13.5097V20.4557C4.60458 21.0194 4.81204 21.5636 5.18819 21.9835C7.06743 24.0765 11.2778 27.5868 18.3773 27.5868C20.7313 27.6062 23.0677 27.1799 25.263 26.3301V31.0297C25.263 31.334 25.3839 31.6259 25.5992 31.8411C25.8144 32.0564 26.1063 32.1773 26.4107 32.1773C26.715 32.1773 27.0069 32.0564 27.2222 31.8411C27.4374 31.6259 27.5583 31.334 27.5583 31.0297V25.2212C29.0548 24.3573 30.4071 23.2649 31.5664 21.9835C31.9425 21.5636 32.15 21.0194 32.1488 20.4557V13.5097L36.1311 11.3852C36.3147 11.2873 36.4682 11.1414 36.5753 10.963C36.6824 10.7846 36.7389 10.5804 36.7389 10.3724C36.7389 10.1643 36.6824 9.96018 36.5753 9.78179C36.4682 9.60339 36.3147 9.45746 36.1311 9.35961ZM18.3773 25.2915C12.1701 25.2915 8.51917 22.2589 6.90102 20.4557V14.7334L17.8379 20.5662C18.0039 20.6546 18.1892 20.7008 18.3773 20.7008C18.5654 20.7008 18.7506 20.6546 18.9167 20.5662L25.263 17.1821V23.8297C23.4555 24.6732 21.1775 25.2915 18.3773 25.2915ZM29.8535 20.45C29.1656 21.2134 28.3959 21.8989 27.5583 22.4942V15.957L29.8535 14.7334V20.45ZM26.9845 13.6632L26.9529 13.6446L18.9195 9.35961C18.6515 9.22271 18.3404 9.19657 18.0533 9.28683C17.7662 9.3771 17.5261 9.57653 17.3846 9.84217C17.2431 10.1078 17.2116 10.4184 17.297 10.707C17.3823 10.9956 17.5776 11.2392 17.8408 11.3852L24.5458 14.9629L18.3773 18.2523L3.6016 10.3724L18.3773 2.4925L33.153 10.3724L26.9845 13.6632Z" fill="#035782"/>
                  </svg> */}
                    <svg width="22" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9 12h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9 18h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 6h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 12h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 18h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Family Details
                  </div>
                  <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                    {familyData.map((it, index) => (
                      <div key={index} className="flex justify-between"
                        onClick={() => { !it.isEditable && alert("You can't edit this field") }}>
                        <span className="font-semibold">{it.title}</span>
                        <span><input disabled={it.isEditable ? buttonDisable : true}
                          onChange={(e) => {
                            const newFamilyData = [...familyData];
                            newFamilyData[index].value = e.target.value;
                            setFamilyData(newFamilyData);
                            setModifiedFields(prev => new Set(prev).add(it.title));
                          }}
                          value={it.value} className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                          type={it.inputType}
                        ></input>

                          {buttonText === "Save Changes" && (
                            <p>
                              {it.placeholderValue}
                            </p>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(1)}>
                  <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                    {/* <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782"/>
                  </svg> */}
                    <div >
                      {/* <BiAtom/> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2V8zm0 8h-2v2h2v-2z" />
                      </svg>


                    </div>


                    Relationship with Wealthup
                  </div>
                  <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                    {profileData.map((it, index) => (
                      <div key={index} className="flex justify-between"
                        onClick={() => { !it.isEditable && alert("You can't edit this field") }}>
                        <span className="font-semibold">{it.title}</span>
                        {/* <span>{it.value}</span> */}

                        <span><input disabled={it.isEditable ? buttonDisable : true}
                          onChange={(e) => {
                            const newProfileData = [...profileData];
                            newProfileData[index].value = e.target.value;
                            setProfileData(newProfileData);
                            setModifiedFields(prev => new Set(prev).add(it.title));
                          }} value={it.value} className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                          type={it.inputType}>

                        </input>

                          {buttonText === "Save Changes" && (
                            <p>
                              {it.placeholderValue}
                            </p>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*               
              <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(2)}>
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
                  </svg>
                  Profession
                </div>
                <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                  {profileData.map((it, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-semibold">{it.title}</span>
                      <span>{it.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}
              </div>
            </div>

            {/* Sensitive Details */}
            <div className=" flex flex-col gap-6">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (buttonText === "Edit Details") {
                      setButtonText("Save Changes");
                      setButtonDisable(false);
                    } else {
                      handleSaveChanges();
                    }
                  }}
                  type="button"
                  className="bg-[#FF7300] px-4 py-2 text-xl rounded-lg m-6 text-white"
                >
                  {buttonText}
                </button>
              </div>

              <div className="w-full bg-white   mt-[55px] rounded-2xl p-6" >
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782" />
                  </svg>
                  Sensitive Details
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      if (!showSensitiveData) {
                        const pin = prompt("Please enter your 4-digit PIN to view sensitive data");
                        if (pin === "1234") {
                          setShowSensitiveData(true);
                        } else {
                          alert("Invalid PIN. Access denied.");
                        }
                      } else {
                        setShowSensitiveData(false);
                      }
                    }}
                    className="w-full flex items-center justify-between p-2 text-brand-blue"
                  >
                    <span className="font-semibold">Show Sensitive Data</span>
                    <svg
                      className={`w-6 h-6 transition-transform ${showSensitiveData ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`flex flex-col gap-5 text-brand-blue overflow-hidden transition-all duration-300 ${showSensitiveData ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    {sensitiveData.map((data, index) => (
                      <SensitiveDataSection key={index} data={data} alternate={index % 2 === 0} />
                    ))}
                  </div>
                </div>




              </div>
              {/* <div className="w-full bg-white  rounded-2xl p-6" >
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
                  </svg>
                  Profession
                </div>
                <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                  {profileData.map((it, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-semibold">{it.title}</span>
                      <span>{it.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>



            {/* <div className="w-full bg-white  mt-[270px] rounded-2xl p-6" >
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
                  </svg>
                  Profession
                </div>
                <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                  {profileData.map((it, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-semibold">{it.title}</span>
                      <span>{it.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}



            {/* <div className="hidden md:flex mt-[270px] w-full">
            <div className="flex flex-col items-center mt-8 gap-4 w-full">
              {currentTab === "sensitivedata" ? (
                <div className="bg-white p-6 rounded-2xl max-w-[400px] w-full">
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <h2 className="flex items-center gap-3 text-brand-blue text-2xl"><svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="#035782"/>
                      </svg>
                       Sesitive Data</h2>
                    </div>
                    {sensitiveData.map((data, index) => (
                      <SensitiveDataSection key={index} data={data} alternate={index % 2 === 0} />
                    ))}
                  </div>
                </div>
              ) : (
              <button onClick={() => setCurrentTab("sensitivedata")} className="flex items-center justify-center text-white text-lg gap-2 bg-[#01C8A9] h-[67px] w-full rounded-[21px]">
                <svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5391 9.88379H9.03906V7.38379C9.03906 6.45553 9.40781 5.56529 10.0642 4.90892C10.7206 4.25254 11.6108 3.88379 12.5391 3.88379C14.2278 3.88379 15.7453 5.08629 16.0691 6.68254C16.1083 6.87558 16.1852 7.05901 16.2953 7.22234C16.4054 7.38568 16.5466 7.52572 16.7109 7.63448C16.8751 7.74325 17.0592 7.81859 17.2525 7.85622C17.4459 7.89385 17.6448 7.89302 17.8378 7.85379C18.0309 7.81456 18.2143 7.73769 18.3776 7.62757C18.541 7.51745 18.681 7.37623 18.7898 7.21199C18.8985 7.04774 18.9739 6.86369 19.0115 6.67032C19.0491 6.47696 19.0483 6.27808 19.0091 6.08504C18.3978 3.07129 15.6766 0.883789 12.5391 0.883789C10.8158 0.885774 9.16362 1.57123 7.94506 2.78979C6.7265 4.00834 6.04105 5.66049 6.03906 7.38379V9.88379H2.53906C1.87602 9.88379 1.24014 10.1472 0.771296 10.616C0.302455 11.0849 0.0390625 11.7207 0.0390625 12.3838V26.3838C0.0390625 27.0468 0.302455 27.6827 0.771296 28.1516C1.24014 28.6204 1.87602 28.8838 2.53906 28.8838H22.5391C23.2021 28.8838 23.838 28.6204 24.3068 28.1516C24.7757 27.6827 25.0391 27.0468 25.0391 26.3838V12.3838C25.0391 11.7207 24.7757 11.0849 24.3068 10.616C23.838 10.1472 23.2021 9.88379 22.5391 9.88379ZM22.0391 25.8838H3.03906V12.8838H22.0391V25.8838Z" fill="white"/>
                </svg>
                Sensitive Data
              </button>
              )}
              {currentTab === "documents" ? (
                <div className="bg-white p-6 rounded-2xl max-w-[400px] w-full">
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      <h2 className="flex items-center gap-3 text-brand-blue text-2xl"><svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="#035782"/>
                      </svg>
                       Documents</h2>
                    </div>
                    <div className="mt-2 flex flex-col gap-4">
                     <Document />
                     <Document />
                     <Document />
                     <Document />
                     <Document />
                     <Document />
                    </div>
                  </div>
                </div>
              ) : (
              <button onClick={() => setCurrentTab("documents")} className="flex items-center justify-center text-white text-lg gap-2 bg-[#FF7300] h-[67px] w-full rounded-[21px]">
                <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="white"/>
                </svg>
                Documents
              </button>
              )}
            </div>
                  </div> */}
          </div>
        </div>

      </div>
      {/* Mobile */}


      <div className="md:hidden absolute top-20 w-full">
        <div className="flex  justify-end m-5">
          <button
            onClick={() => {
              if (buttonText === "Edit Details") {
                setButtonText("Save Changes");
                setButtonDisable(false);
              } else {
                setButtonText("Edit Details");
                setButtonDisable(true);
              }
            }}
            type="button"
            className="bg-[#443f3b] px-4 py-2 text-xl rounded-lg text-white"
          >
            <span className="text-sm sm:text-base font-medium">{buttonText}</span>
          </button>
        </div>


        <div className="flex flex-col items-center mx-auto mt-10 w-[307px]">

          <div className="flex w-full">
            <div className="w-full">
              <div className="relative w-full h-[314px]">
                <Image src={profilebg2} fill alt="Profile BG 2" className="rounded-t-2xl" />
                <div className="absolute top-0 left-0 right-0 h-full">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-3xl font-bold text-brand-blue w-44 h-44 bg-gray-200 rounded-full flex items-center justify-center">
                      {user?.first_name?.slice(0, 1)}{user?.last_name?.slice(0, 1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full rounded-b-2xl p-6 pb-24">
                <h2 className="text-brand-blue text-center text-lg">{user?.first_name} {user?.last_name}</h2>
                {/* <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.8945 0.759766H1.22641C1.03116 0.759766 0.843913 0.837326 0.705854 0.975385C0.567795 1.11344 0.490234 1.30069 0.490234 1.49594V14.0108C0.490234 14.4013 0.645356 14.7758 0.921473 15.0519C1.19759 15.3281 1.57209 15.4832 1.96258 15.4832H18.1583C18.5488 15.4832 18.9233 15.3281 19.1994 15.0519C19.4756 14.7758 19.6307 14.4013 19.6307 14.0108V1.49594C19.6307 1.30069 19.5531 1.11344 19.4151 0.975385C19.277 0.837326 19.0898 0.759766 18.8945 0.759766ZM10.0605 8.59539L3.11929 2.23211H17.0016L10.0605 8.59539ZM7.36515 8.12148L1.96258 13.0731V3.16981L7.36515 8.12148ZM8.45469 9.11991L9.55894 10.1367C9.69476 10.2614 9.87241 10.3306 10.0568 10.3306C10.2411 10.3306 10.4188 10.2614 10.5546 10.1367L11.6589 9.11991L16.9961 14.0108H3.11929L8.45469 9.11991ZM12.7558 8.12148L18.1583 3.16889V13.0741L12.7558 8.12148Z" fill="#035782"/>
                            </svg>
                            {user?.email}
                            </div>
                            <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7067 13.4672L14.1949 11.4454L14.1825 11.4397C13.9482 11.3395 13.6927 11.2993 13.4391 11.3227C13.1854 11.3461 12.9415 11.4324 12.7296 11.5737C12.7047 11.5902 12.6807 11.6081 12.6578 11.6274L10.3267 13.6147C8.84988 12.8973 7.32519 11.3841 6.60786 9.92647L8.598 7.55994C8.61716 7.536 8.63536 7.51206 8.65259 7.4862C8.79092 7.27483 8.87484 7.03255 8.8969 6.78091C8.91895 6.52927 8.87846 6.27608 8.77901 6.04387V6.03238L6.75152 1.51289C6.62006 1.20955 6.39403 0.956854 6.10715 0.792532C5.82028 0.62821 5.48795 0.561072 5.15979 0.601143C3.86205 0.771911 2.67084 1.40924 1.80866 2.39409C0.946475 3.37894 0.472272 4.64396 0.474618 5.95289C0.474618 13.5572 6.66149 19.7441 14.2658 19.7441C15.5747 19.7464 16.8397 19.2722 17.8246 18.41C18.8094 17.5478 19.4468 16.3566 19.6175 15.0589C19.6577 14.7308 19.5907 14.3986 19.4265 14.1117C19.2624 13.8249 19.0099 13.5988 18.7067 13.4672ZM14.2658 18.2117C11.0156 18.2082 7.89962 16.9155 5.60142 14.6173C3.30321 12.3191 2.01052 9.20304 2.00697 5.95289C2.00337 5.01766 2.34031 4.1131 2.95486 3.40813C3.56942 2.70316 4.41957 2.246 5.34654 2.122C5.34617 2.12582 5.34617 2.12967 5.34654 2.1335L7.35776 6.63478L5.37815 9.00418C5.35805 9.0273 5.3398 9.05196 5.32356 9.07793C5.17943 9.29908 5.09489 9.55372 5.07811 9.81716C5.06133 10.0806 5.11289 10.3439 5.22779 10.5816C6.09548 12.3562 7.88354 14.1309 9.67735 14.9976C9.91675 15.1114 10.1816 15.1612 10.446 15.1421C10.7104 15.1229 10.9653 15.0355 11.1858 14.8884C11.2104 14.8719 11.234 14.854 11.2566 14.8348L13.5849 12.8485L18.0861 14.8645C18.0861 14.8645 18.0938 14.8645 18.0967 14.8645C17.9742 15.7928 17.5177 16.6446 16.8126 17.2607C16.1075 17.8768 15.2021 18.2149 14.2658 18.2117Z" fill="#035782" />
                            </svg>
                            {user?.phone?.replace('91', '')}
                        </div>
                        <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782"/>
              </svg>
              {user?.city}
                        </div>
                      </div> */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-[6px] items-center text-brand-blue font-medium text-base">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.8945 0.759766H1.22641C1.03116 0.759766 0.843913 0.837326 0.705854 0.975385C0.567795 1.11344 0.490234 1.30069 0.490234 1.49594V14.0108C0.490234 14.4013 0.645356 14.7758 0.921473 15.0519C1.19759 15.3281 1.57209 15.4832 1.96258 15.4832H18.1583C18.5488 15.4832 18.9233 15.3281 19.1994 15.0519C19.4756 14.7758 19.6307 14.4013 19.6307 14.0108V1.49594C19.6307 1.30069 19.5531 1.11344 19.4151 0.975385C19.277 0.837326 19.0898 0.759766 18.8945 0.759766ZM10.0605 8.59539L3.11929 2.23211H17.0016L10.0605 8.59539ZM7.36515 8.12148L1.96258 13.0731V3.16981L7.36515 8.12148ZM8.45469 9.11991L9.55894 10.1367C9.69476 10.2614 9.87241 10.3306 10.0568 10.3306C10.2411 10.3306 10.4188 10.2614 10.5546 10.1367L11.6589 9.11991L16.9961 14.0108H3.11929L8.45469 9.11991ZM12.7558 8.12148L18.1583 3.16889V13.0741L12.7558 8.12148Z" fill="#035782" />
                    </svg>
                    {user?.email}
                  </div>
                  <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.7067 13.4672L14.1949 11.4454L14.1825 11.4397C13.9482 11.3395 13.6927 11.2993 13.4391 11.3227C13.1854 11.3461 12.9415 11.4324 12.7296 11.5737C12.7047 11.5902 12.6807 11.6081 12.6578 11.6274L10.3267 13.6147C8.84988 12.8973 7.32519 11.3841 6.60786 9.92647L8.598 7.55994C8.61716 7.536 8.63536 7.51206 8.65259 7.4862C8.79092 7.27483 8.87484 7.03255 8.8969 6.78091C8.91895 6.52927 8.87846 6.27608 8.77901 6.04387V6.03238L6.75152 1.51289C6.62006 1.20955 6.39403 0.956854 6.10715 0.792532C5.82028 0.62821 5.48795 0.561072 5.15979 0.601143C3.86205 0.771911 2.67084 1.40924 1.80866 2.39409C0.946475 3.37894 0.472272 4.64396 0.474618 5.95289C0.474618 13.5572 6.66149 19.7441 14.2658 19.7441C15.5747 19.7464 16.8397 19.2722 17.8246 18.41C18.8094 17.5478 19.4468 16.3566 19.6175 15.0589C19.6577 14.7308 19.5907 14.3986 19.4265 14.1117C19.2624 13.8249 19.0099 13.5988 18.7067 13.4672ZM14.2658 18.2117C11.0156 18.2082 7.89962 16.9155 5.60142 14.6173C3.30321 12.3191 2.01052 9.20304 2.00697 5.95289C2.00337 5.01766 2.34031 4.1131 2.95486 3.40813C3.56942 2.70316 4.41957 2.246 5.34654 2.122C5.34617 2.12582 5.34617 2.12967 5.34654 2.1335L7.35776 6.63478L5.37815 9.00418C5.35805 9.0273 5.3398 9.05196 5.32356 9.07793C5.17943 9.29908 5.09489 9.55372 5.07811 9.81716C5.06133 10.0806 5.11289 10.3439 5.22779 10.5816C6.09548 12.3562 7.88354 14.1309 9.67735 14.9976C9.91675 15.1114 10.1816 15.1612 10.446 15.1421C10.7104 15.1229 10.9653 15.0355 11.1858 14.8884C11.2104 14.8719 11.234 14.854 11.2566 14.8348L13.5849 12.8485L18.0861 14.8645C18.0861 14.8645 18.0938 14.8645 18.0967 14.8645C17.9742 15.7928 17.5177 16.6446 16.8126 17.2607C16.1075 17.8768 15.2021 18.2149 14.2658 18.2117Z" fill="#035782" />
                    </svg>
                    {user?.phone?.replace('91', '')}
                  </div>
                  <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                    </svg>
                    {user?.city}
                  </div>
                  <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                    </svg>
                    {user?.email}
                  </div>
                  <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                    <svg width="28" height="30" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                    </svg>
                    {userProfile?.address?.line1}
                  </div>
                  <div className="flex flex-row gap-3 items-center text-brand-blue font-medium text-base">
                    <svg width="28" height="30" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.3846 8.1666L10.046 1.24256C10.0424 1.23943 10.039 1.23606 10.0359 1.23247C9.76569 0.986748 9.41359 0.850586 9.04837 0.850586C8.68315 0.850586 8.33105 0.986748 8.06086 1.23247L8.05077 1.24256L0.720355 8.1666C0.570828 8.30409 0.45147 8.47113 0.369834 8.65714C0.288199 8.84315 0.246063 9.04408 0.246094 9.24722V17.728C0.246094 18.1172 0.40073 18.4906 0.675983 18.7658C0.951237 19.0411 1.32456 19.1957 1.71383 19.1957H6.11703C6.5063 19.1957 6.87962 19.0411 7.15488 18.7658C7.43013 18.4906 7.58476 18.1172 7.58476 17.728V13.3248H10.5202V17.728C10.5202 18.1172 10.6749 18.4906 10.9501 18.7658C11.2254 19.0411 11.5987 19.1957 11.988 19.1957H16.3912C16.7804 19.1957 17.1538 19.0411 17.429 18.7658C17.7043 18.4906 17.8589 18.1172 17.8589 17.728V9.24722C17.8589 9.04408 17.8168 8.84315 17.7352 8.65714C17.6535 8.47113 17.5342 8.30409 17.3846 8.1666ZM16.3912 17.728H11.988V13.3248C11.988 12.9355 11.8333 12.5622 11.5581 12.2869C11.2828 12.0117 10.9095 11.857 10.5202 11.857H7.58476C7.1955 11.857 6.82217 12.0117 6.54692 12.2869C6.27167 12.5622 6.11703 12.9355 6.11703 13.3248V17.728H1.71383V9.24722L1.72392 9.23804L9.0525 2.31676L16.382 9.23621L16.3921 9.24538L16.3912 17.728Z" fill="#035782" />
                    </svg>
                    {userProfile?.address?.line2}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="md:hidden mt-[0px]  w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(1)}>
                  <div className="flex justify-center  gap-2 text-brand-blue font-semibold font-xl w-full">
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782"/>
                    </svg>
                    Personal details
                  </div>
                  <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                    {profileData.map((it, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-semibold">{it.title}</span>
                        <span>{it.value}</span>
                      </div>
                    ))}
                  </div>
                </div> */}
        </div>
      </div>
      {/* Personal details */}
      <div className="md:hidden  mt-[330px] mx-3 mr-3  w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(1)}>
        <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782" />
          </svg>
          Personal details
        </div>
        <div className="mt-6 flex flex-col gap-5 text-brand-blue">
          {profileData.map((it, index) => (
            <div key={index} className="flex justify-between"
              onClick={() => { !it.isEditable && alert("You can't edit this field") }}>
              <span className="font-semibold">{it.title}</span>
              <span>
                <input disabled={it.isEditable ? buttonDisable : true}
                  onChange={(e) => {
                    const newProfileData = [...profileData];
                    newProfileData[index].value = e.target.value;
                    setProfileData(newProfileData);
                    setModifiedFields(prev => new Set(prev).add(it.title));
                  }} value={it.value} className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                  type={it.inputType}
                ></input>
                {buttonText === "Save Changes" && (
                  <p>
                    {it.placeholderValue}
                  </p>
                )}


              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Family Details */}
      <div className=" md:hidden mx-3 mt-[25px] ">

        <div className="flex flex-col gap-6 w-full">


          <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(0)}>
            <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
              {/* <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.1311 9.35961L18.9167 0.1786C18.7506 0.0901871 18.5654 0.0439453 18.3773 0.0439453C18.1892 0.0439453 18.0039 0.0901871 17.8379 0.1786L0.623508 9.35961C0.439894 9.45746 0.286337 9.60339 0.179262 9.78179C0.0721876 9.96018 0.015625 10.1643 0.015625 10.3724C0.015625 10.5804 0.0721876 10.7846 0.179262 10.963C0.286337 11.1414 0.439894 11.2873 0.623508 11.3852L4.60577 13.5097V20.4557C4.60458 21.0194 4.81204 21.5636 5.18819 21.9835C7.06743 24.0765 11.2778 27.5868 18.3773 27.5868C20.7313 27.6062 23.0677 27.1799 25.263 26.3301V31.0297C25.263 31.334 25.3839 31.6259 25.5992 31.8411C25.8144 32.0564 26.1063 32.1773 26.4107 32.1773C26.715 32.1773 27.0069 32.0564 27.2222 31.8411C27.4374 31.6259 27.5583 31.334 27.5583 31.0297V25.2212C29.0548 24.3573 30.4071 23.2649 31.5664 21.9835C31.9425 21.5636 32.15 21.0194 32.1488 20.4557V13.5097L36.1311 11.3852C36.3147 11.2873 36.4682 11.1414 36.5753 10.963C36.6824 10.7846 36.7389 10.5804 36.7389 10.3724C36.7389 10.1643 36.6824 9.96018 36.5753 9.78179C36.4682 9.60339 36.3147 9.45746 36.1311 9.35961ZM18.3773 25.2915C12.1701 25.2915 8.51917 22.2589 6.90102 20.4557V14.7334L17.8379 20.5662C18.0039 20.6546 18.1892 20.7008 18.3773 20.7008C18.5654 20.7008 18.7506 20.6546 18.9167 20.5662L25.263 17.1821V23.8297C23.4555 24.6732 21.1775 25.2915 18.3773 25.2915ZM29.8535 20.45C29.1656 21.2134 28.3959 21.8989 27.5583 22.4942V15.957L29.8535 14.7334V20.45ZM26.9845 13.6632L26.9529 13.6446L18.9195 9.35961C18.6515 9.22271 18.3404 9.19657 18.0533 9.28683C17.7662 9.3771 17.5261 9.57653 17.3846 9.84217C17.2431 10.1078 17.2116 10.4184 17.297 10.707C17.3823 10.9956 17.5776 11.2392 17.8408 11.3852L24.5458 14.9629L18.3773 18.2523L3.6016 10.3724L18.3773 2.4925L33.153 10.3724L26.9845 13.6632Z" fill="#035782"/>
                  </svg> */}
              <svg width="22" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 12h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 18h11" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 6h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 12h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 18h.01" stroke="#035782" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Family Details
            </div>
            <div className="mt-6 flex flex-col gap-5 text-brand-blue">
              {familyData.map((it, index) => (
                <div key={index} className="flex justify-between"
                  onClick={() => { !it.isEditable && alert("You can't edit this field") }}>
                  <span className="font-semibold">{it.title}</span>z
                  <span><input disabled={it.isEditable ? buttonDisable : true}
                    onChange={(e) => {
                      const newFamilyData = [...familyData];
                      newFamilyData[index].value = e.target.value;
                      setFamilyData(newFamilyData);
                      setModifiedFields(prev => new Set(prev).add(it.title));
                    }}
                    value={it.value} className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                    type={it.inputType}
                  ></input>

                    {buttonText === "Save Changes" && (
                      <p>
                        {it.placeholderValue}
                      </p>
                    )}

                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(1)}>
            <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
              {/* <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782"/>
                  </svg> */}
              <div >
                {/* <BiAtom/> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2V8zm0 8h-2v2h2v-2z" />
                </svg>


              </div>


              Relationship with Wealthup
            </div>
            <div className="mt-6 flex flex-col gap-5 text-brand-blue">
              {profileData.map((it, index) => (
                <div key={index} className="flex justify-between"
                  onClick={() => { !it.isEditable && alert("You can't edit this field") }}>
                  <span className="font-semibold">{it.title}</span>
                  <span>
                    <input disabled={it.isEditable ? buttonDisable : true}
                      onChange={(e) => {
                        const newProfileData = [...profileData];
                        newProfileData[index].value = e.target.value;
                        setProfileData(newProfileData);
                        setModifiedFields(prev => new Set(prev).add(it.title));
                      }} value={it.value} className={!buttonDisable && it.isEditable ? "border-b-2 border-brand-blue" : ""}
                      type={it.inputType}
                    ></input>

                    {buttonText === "Save Changes" && (
                      <p>
                        {it.placeholderValue}
                      </p>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*               
              <div className="w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(2)}>
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
                  </svg>
                  Profession
                </div>
                <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                  {profileData.map((it, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-semibold">{it.title}</span>
                      <span>{it.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}
        </div>
      </div>

      {/* Sensitive Details */}
      <div className=" md:hidden mx-3 sm:bg-red-200  mt-6 flex flex-col gap-6">

        <div className="w-full bg-white   rounded-2xl p-6" >
          <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
            <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782" />
            </svg>
            Sensitive Details
          </div>
          <div className="mt-6">
            <button
              onClick={() => {
                if (!showSensitiveData) {
                  const pin = prompt("Please enter your 4-digit PIN to view sensitive data");
                  if (pin === "1234") {
                    setShowSensitiveData(true);
                  } else {
                    alert("Invalid PIN. Access denied.");
                  }
                } else {
                  setShowSensitiveData(false);
                }
              }}
              className="w-full flex items-center justify-between p-2 text-brand-blue"
            >
              <span className="font-semibold">Show Sensitive Data</span>
              <svg
                className={`w-6 h-6 transition-transform ${showSensitiveData ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`flex flex-col gap-5 text-brand-blue overflow-hidden transition-all duration-300 ${showSensitiveData ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
              {sensitiveData.map((data, index) => (
                <SensitiveDataSection key={index} data={data} alternate={index % 2 === 0} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="w-full bg-white  rounded-2xl p-6" >
                <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
                  <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
                  </svg>
                  Profession
                </div>
                <div className="mt-6 flex flex-col gap-5 text-brand-blue">
                  {profileData.map((it, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-semibold">{it.title}</span>
                      <span>{it.value}</span>
                    </div>
                  ))}
                </div>
              </div> */}
      </div>
      {/* <div className="md:hidden bg-brand-sky-blue py-16 pt-32">
        <div className={
          cn(
            "flex justify-center gap-4 overflow-hidden",
            currentSelected === 0 && 'translate-x-[317px] overflow-visible',
            currentSelected === 2 && '-translate-x-[317px] overflow-visible'
          )
        }>
          <div className="min-w-[307px] w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(0)}>
            <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
              <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.1311 9.35961L18.9167 0.1786C18.7506 0.0901871 18.5654 0.0439453 18.3773 0.0439453C18.1892 0.0439453 18.0039 0.0901871 17.8379 0.1786L0.623508 9.35961C0.439894 9.45746 0.286337 9.60339 0.179262 9.78179C0.0721876 9.96018 0.015625 10.1643 0.015625 10.3724C0.015625 10.5804 0.0721876 10.7846 0.179262 10.963C0.286337 11.1414 0.439894 11.2873 0.623508 11.3852L4.60577 13.5097V20.4557C4.60458 21.0194 4.81204 21.5636 5.18819 21.9835C7.06743 24.0765 11.2778 27.5868 18.3773 27.5868C20.7313 27.6062 23.0677 27.1799 25.263 26.3301V31.0297C25.263 31.334 25.3839 31.6259 25.5992 31.8411C25.8144 32.0564 26.1063 32.1773 26.4107 32.1773C26.715 32.1773 27.0069 32.0564 27.2222 31.8411C27.4374 31.6259 27.5583 31.334 27.5583 31.0297V25.2212C29.0548 24.3573 30.4071 23.2649 31.5664 21.9835C31.9425 21.5636 32.15 21.0194 32.1488 20.4557V13.5097L36.1311 11.3852C36.3147 11.2873 36.4682 11.1414 36.5753 10.963C36.6824 10.7846 36.7389 10.5804 36.7389 10.3724C36.7389 10.1643 36.6824 9.96018 36.5753 9.78179C36.4682 9.60339 36.3147 9.45746 36.1311 9.35961ZM18.3773 25.2915C12.1701 25.2915 8.51917 22.2589 6.90102 20.4557V14.7334L17.8379 20.5662C18.0039 20.6546 18.1892 20.7008 18.3773 20.7008C18.5654 20.7008 18.7506 20.6546 18.9167 20.5662L25.263 17.1821V23.8297C23.4555 24.6732 21.1775 25.2915 18.3773 25.2915ZM29.8535 20.45C29.1656 21.2134 28.3959 21.8989 27.5583 22.4942V15.957L29.8535 14.7334V20.45ZM26.9845 13.6632L26.9529 13.6446L18.9195 9.35961C18.6515 9.22271 18.3404 9.19657 18.0533 9.28683C17.7662 9.3771 17.5261 9.57653 17.3846 9.84217C17.2431 10.1078 17.2116 10.4184 17.297 10.707C17.3823 10.9956 17.5776 11.2392 17.8408 11.3852L24.5458 14.9629L18.3773 18.2523L3.6016 10.3724L18.3773 2.4925L33.153 10.3724L26.9845 13.6632Z" fill="#035782"/>
              </svg>
              Education
            </div>
            <div className="mt-6 flex flex-col gap-5 text-brand-blue">
              {profileData.map((it, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold">{it.title}</span>
                  <span>{it.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-[307px] w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(1)}>
            <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5026 16.4995C20.1818 14.5256 18.1194 12.9876 15.6474 12.133C16.8767 11.3479 17.7848 10.2534 18.2429 9.0044C18.7011 7.75543 18.6862 6.41536 18.2003 5.17403C17.7143 3.93269 16.782 2.85301 15.5354 2.08792C14.2889 1.32283 12.7912 0.911133 11.2545 0.911133C9.71786 0.911133 8.22017 1.32283 6.97358 2.08792C5.72698 2.85301 4.79469 3.93269 4.30876 5.17403C3.82283 6.41536 3.8079 7.75543 4.26607 9.0044C4.72425 10.2534 5.63231 11.3479 6.86163 12.133C4.3896 12.9876 2.32718 14.5256 1.00639 16.4995C0.924546 16.6116 0.869999 16.7365 0.84599 16.8669C0.82198 16.9972 0.828998 17.1304 0.866626 17.2584C0.904254 17.3864 0.971724 17.5067 1.06502 17.612C1.15833 17.7174 1.27555 17.8057 1.40974 17.8717C1.54392 17.9377 1.69232 17.9801 1.84612 17.9963C1.99992 18.0125 2.15597 18.0022 2.305 17.966C2.45403 17.9299 2.593 17.8685 2.71364 17.7857C2.83428 17.7029 2.93414 17.6003 3.00727 17.4839C4.75286 14.9147 7.83558 13.3823 11.2545 13.3823C14.6734 13.3823 17.7562 14.9155 19.5018 17.4839C19.6602 17.7009 19.9116 17.8569 20.2027 17.919C20.4938 17.981 20.8019 17.9442 21.0617 17.8164C21.3216 17.6886 21.5129 17.4797 21.5951 17.2339C21.6774 16.9882 21.6442 16.7248 21.5026 16.4995ZM6.24509 7.14797C6.24509 6.30431 6.53889 5.47959 7.08933 4.77811C7.63977 4.07664 8.42213 3.5299 9.33749 3.20705C10.2528 2.88419 11.2601 2.79972 12.2318 2.96431C13.2035 3.1289 14.0961 3.53516 14.7967 4.13172C15.4973 4.72827 15.9744 5.48834 16.1677 6.31579C16.361 7.14324 16.2618 8.00091 15.8826 8.78035C15.5035 9.55979 14.8614 10.226 14.0376 10.6947C13.2138 11.1634 12.2453 11.4136 11.2545 11.4136C9.9264 11.4123 8.65312 10.9625 7.714 10.1628C6.77489 9.3631 6.24662 8.27888 6.24509 7.14797Z" fill="#035782"/>
              </svg>
              Personal details
            </div>
            <div className="mt-6 flex flex-col gap-5 text-brand-blue">
              {profileData.map((it, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold">{it.title}</span>
                  <span>{it.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="min-w-[307px] w-full bg-white rounded-2xl p-6" onClick={() => setCurrentSelected(2)}>
            <div className="flex justify-center gap-2 text-brand-blue font-semibold font-xl w-full">
              <svg width="29" height="25" viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.6776 23.3784C28.6776 23.6658 28.5634 23.9414 28.3602 24.1446C28.157 24.3479 27.8813 24.462 27.5939 24.462H1.58563C1.29822 24.462 1.02258 24.3479 0.819355 24.1446C0.616126 23.9414 0.501953 23.6658 0.501953 23.3784V1.70477C0.501953 1.41736 0.616126 1.14173 0.819355 0.938496C1.02258 0.735267 1.29822 0.621094 1.58563 0.621094C1.87304 0.621094 2.14868 0.735267 2.35191 0.938496C2.55514 1.14173 2.66931 1.41736 2.66931 1.70477V14.4881L9.54119 8.47777C9.72819 8.31408 9.96576 8.21963 10.2141 8.21026C10.4625 8.20089 10.7065 8.27716 10.9053 8.42629L18.8717 14.4014L26.8801 7.39409C26.9851 7.29015 27.1102 7.20878 27.2478 7.15497C27.3854 7.10117 27.5326 7.07608 27.6802 7.08123C27.8279 7.08638 27.9729 7.12167 28.1064 7.18494C28.24 7.2482 28.3591 7.3381 28.4566 7.4491C28.5541 7.56011 28.6279 7.68989 28.6734 7.83045C28.7189 7.97101 28.7352 8.1194 28.7213 8.26649C28.7073 8.41358 28.6635 8.55626 28.5924 8.68577C28.5213 8.81529 28.4244 8.92889 28.3078 9.01961L19.6384 16.6054C19.4514 16.7691 19.2138 16.8635 18.9655 16.8729C18.7171 16.8822 18.4731 16.806 18.2743 16.6568L10.3079 10.6844L2.66931 17.368V22.2947H27.5939C27.8813 22.2947 28.157 22.4088 28.3602 22.6121C28.5634 22.8153 28.6776 23.0909 28.6776 23.3784Z" fill="#035782"/>
              </svg>
              Profession
            </div>
            <div className="mt-6 flex flex-col gap-5 text-brand-blue">
              {profileData.map((it, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold">{it.title}</span>
                  <span>{it.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:hidden">
        <div className="flex flex-col items-center mt-8 gap-4">
          {currentTab === "sensitivedata" ? (
            <div className="bg-white w-[330px] p-6 rounded-2xl">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <h2 className="flex items-center gap-3 text-brand-blue text-2xl"><svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="#035782"/>
                  </svg>
                  Sesitive Data</h2>
                </div>
                {sensitiveData.map((data, index) => (
                  <SensitiveDataSection key={index} data={data} alternate={index % 2 === 0} />
                ))}
              </div>
            </div>
          ) : (
          <button onClick={() => setCurrentTab("sensitivedata")} className="flex items-center justify-center text-white text-lg gap-2 bg-[#01C8A9] h-[67px] w-[330px] rounded-[21px]">
            <svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5391 9.88379H9.03906V7.38379C9.03906 6.45553 9.40781 5.56529 10.0642 4.90892C10.7206 4.25254 11.6108 3.88379 12.5391 3.88379C14.2278 3.88379 15.7453 5.08629 16.0691 6.68254C16.1083 6.87558 16.1852 7.05901 16.2953 7.22234C16.4054 7.38568 16.5466 7.52572 16.7109 7.63448C16.8751 7.74325 17.0592 7.81859 17.2525 7.85622C17.4459 7.89385 17.6448 7.89302 17.8378 7.85379C18.0309 7.81456 18.2143 7.73769 18.3776 7.62757C18.541 7.51745 18.681 7.37623 18.7898 7.21199C18.8985 7.04774 18.9739 6.86369 19.0115 6.67032C19.0491 6.47696 19.0483 6.27808 19.0091 6.08504C18.3978 3.07129 15.6766 0.883789 12.5391 0.883789C10.8158 0.885774 9.16362 1.57123 7.94506 2.78979C6.7265 4.00834 6.04105 5.66049 6.03906 7.38379V9.88379H2.53906C1.87602 9.88379 1.24014 10.1472 0.771296 10.616C0.302455 11.0849 0.0390625 11.7207 0.0390625 12.3838V26.3838C0.0390625 27.0468 0.302455 27.6827 0.771296 28.1516C1.24014 28.6204 1.87602 28.8838 2.53906 28.8838H22.5391C23.2021 28.8838 23.838 28.6204 24.3068 28.1516C24.7757 27.6827 25.0391 27.0468 25.0391 26.3838V12.3838C25.0391 11.7207 24.7757 11.0849 24.3068 10.616C23.838 10.1472 23.2021 9.88379 22.5391 9.88379ZM22.0391 25.8838H3.03906V12.8838H22.0391V25.8838Z" fill="white"/>
            </svg>
            Sensitive Data 
          </button>
          )}
          {currentTab === "documents" ? (
            <div className="bg-white w-[330px] p-6 rounded-2xl">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <h2 className="flex items-center gap-3 text-brand-blue text-2xl"><svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="#035782"/>
                  </svg>
                  Documents</h2>
                </div>
                <div className="mt-2 flex flex-col gap-4">
                  <Document /> 
                  <Document /> 
                  <Document /> 
                  <Document /> 
                  <Document /> 
                  <Document /> 
                </div>
              </div>
            </div>
          ) : (
          <button onClick={() => setCurrentTab("documents")} className="flex items-center justify-center text-white text-lg gap-2 bg-[#FF7300] h-[67px] w-[330px] rounded-[21px]">
            <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3972 8.6432L16.1784 1.42445C16.0347 1.28062 15.8641 1.16651 15.6764 1.08865C15.4886 1.01079 15.2873 0.970713 15.084 0.970703H2.70898C2.02522 0.970703 1.36947 1.24233 0.885975 1.72582C0.402482 2.20931 0.130859 2.86507 0.130859 3.54883V26.2363C0.130859 26.9201 0.402482 27.5758 0.885975 28.0593C1.36947 28.5428 2.02522 28.8145 2.70898 28.8145H21.2715C21.9552 28.8145 22.611 28.5428 23.0945 28.0593C23.578 27.5758 23.8496 26.9201 23.8496 26.2363V9.73633C23.8496 9.32639 23.6869 8.93323 23.3972 8.6432ZM16.1152 5.74023L19.0801 8.70508H16.1152V5.74023ZM3.22461 25.7207V4.06445H13.0215V10.252C13.0215 10.6622 13.1845 11.0557 13.4746 11.3458C13.7646 11.6359 14.1581 11.7988 14.5684 11.7988H20.7559V25.7207H3.22461Z" fill="white"/>
            </svg>
            Documents
          </button>
          )}
        </div>
      </div>
      </div> */}
    </>
  )
}

export default UserProfile;

const Document = () => {
  return (
    <div className="flex justify-between border-b-2 py-6">
      <div className="flex gap-2 items-center">
        <div className="bg-primary-sky-blue p-2 rounded-full flex items-center justify-center">
          <Image src={doc} alt="Doc" />
        </div>
        <div className="flex flex-col">
          <span className="text-brand-blue text-lg font-semibold">Form 16</span>
          <span className="text-[#B7B7B7] text-sm">12/12/2002</span>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-4">
          <svg width="19" height="27" viewBox="0 0 19 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3652 6.98039V2.52539C18.3652 1.99496 18.1545 1.48625 17.7794 1.11118C17.4044 0.736104 16.8957 0.525391 16.3652 0.525391H2.36523C1.8348 0.525391 1.32609 0.736104 0.951021 1.11118C0.575948 1.48625 0.365234 1.99496 0.365234 2.52539V7.02539C0.36591 7.33576 0.438497 7.64175 0.577299 7.91936C0.716101 8.19696 0.917343 8.43863 1.16523 8.62539L7.69898 13.5254L1.16523 18.4254C0.917343 18.6122 0.716101 18.8538 0.577299 19.1314C0.438497 19.409 0.36591 19.715 0.365234 20.0254V24.5254C0.365234 25.0558 0.575948 25.5645 0.951021 25.9396C1.32609 26.3147 1.8348 26.5254 2.36523 26.5254H16.3652C16.8957 26.5254 17.4044 26.3147 17.7794 25.9396C18.1545 25.5645 18.3652 25.0558 18.3652 24.5254V20.0704C18.3645 19.7612 18.2925 19.4564 18.1549 19.1795C18.0172 18.9027 17.8176 18.6613 17.5715 18.4741L11.024 13.5254L17.5715 8.57539C17.8177 8.38862 18.0174 8.1475 18.1551 7.87083C18.2928 7.59416 18.3647 7.28943 18.3652 6.98039ZM16.3652 24.5254H2.36523V20.0254L9.36523 14.7754L16.3652 20.0691V24.5254ZM16.3652 6.98039L9.36523 12.2754L2.36523 7.02539V2.52539H16.3652V6.98039Z" fill="#FF7300" />
          </svg>
          <div className="text-primary-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path></svg>
          </div>
          <div className="flex-shrink-0">
            <Image src={trash} alt="Trash" />
          </div>
        </div>
      </div>
    </div>
  )
}