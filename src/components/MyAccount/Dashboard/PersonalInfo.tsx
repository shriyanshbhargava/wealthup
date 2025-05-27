"use client"

import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";

import { Button } from "@/components/ui/Button";
import DateInput from "@/components/ui/DateInput";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import React from "react";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { emailRegex } from "@/utils/expressions";
import { initialUser } from "@/components/DashboardLayout";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const initialState = {
  ...initialUser,
  city: null,
  relationship_status: null,
  kids: null,
  town: null,
  highest_education: null,
  college: null,
  employer: null,
  designation: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const PersonalInfo = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const pathname = usePathname();

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const demo = pathname.includes('/demo');

  React.useEffect(() => {
    const getProfile = async () => {
      const res: Response = await userApiClient.getMe();
      if (res.status === 200) {
        const data = await res.json();

        const dob = data?.dob ? new Date(data?.dob) : null;

        dispatch({
          type: "update",
          payload: {
            ...data,
            dob,
          },
        });
      }
    };

    getProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "kids") {
      const value = e.target.value.replaceAll(".", "");
      dispatch({
        type: "update",
        payload: {
          [e.target.id]: value,
        },
      });
    } else {
      dispatch({
        type: "update",
        payload: {
          [e.target.id]: e.target.value,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (demo) {
      toast.success("Profile Saved.");
      return;
    }
    const res: Response = await userApiClient.updateMe(state);

    if (res.status === 201) {
      toast.success("Profile Saved.");
    } else {
      toast.error("Something went wrong.");
    }
  };
  return (
    <form
      className="w-full md:w-2/3 xl:w-1/2 bg-white z-[1] rounded-xl p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-12">
        <div className="w-full md:w-1/2">
          <Input
            type="text"
            label="First Name"
            placeholder="First Name"
            name="name"
            id="first_name"
            value={state.first_name}
            error={
              state.first_name?.length &&
                !state.first_name?.match(/^[A-Za-z\s]+$/)
                ? "First name should not contain number"
                : ""
            }
            onChange={handleChange}
          />

          <Input
            type="email"
            label="Email *"
            placeholder="Email"
            name="email"
            id="email"
            value={state.email}
            error={
              state?.email?.length && !emailRegex.test(state.email)
                ? "Enter a valid email"
                : ""
            }
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Current City *"
            placeholder="Current City"
            name="city"
            id="city"
            value={state.city}
            onChange={handleChange}
          />
          <Dropdown
            onChange={(value) => {
              dispatch({
                type: "update",
                payload: {
                  relationship_status: value,
                },
              });
            }}
            defaultTitle={
              state.relationship_status != null
                ? state.relationship_status
                : "Marital Status *"
            }
          >
            <DropdownItem value="Single">Single</DropdownItem>
            <DropdownItem value="Married">Married</DropdownItem>
          </Dropdown>
          <Input
            type="text"
            label="Highest Level of Education *"
            placeholder="Highest Level of Education"
            name="highest_education"
            id="highest_education"
            value={state.highest_education}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Employer"
            placeholder="Employer"
            name="employer"
            id="employer"
            value={state.employer}
            onChange={handleChange}
          />
          <DateInput
            label="Date of Birth *"
            value={state.dob}
            onChange={(date) => {
              dispatch({
                type: "update",
                payload: {
                  dob: date,
                },
              });
            }}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            name="givenname"
            id="last_name"
            value={state.last_name}
            onChange={handleChange}
            error={
              state.last_name?.length &&
                !state.last_name?.match(/^[A-Za-z\s]+$/)
                ? "Last name should not contain number"
                : ""
            }
          />
          <PhoneInput
            value={demo ? '911234567890' : state.phone}
            onChange={() => null}
            disabled={true}
          />
          <Input
            type="text"
            label="Home Town"
            placeholder="Home Town"
            name="town"
            id="town"
            value={state.town}
            onChange={handleChange}
          />
          {state.relationship_status !== "Single" ? (
            <Input
              type="number"
              label="# of kid(s)"
              placeholder="# of kid(s)"
              name="kids"
              id="kids"
              pattern="/d+"
              value={state.kids}
              onChange={handleChange}
            />
          ) : null}
          <Input
            type="text"
            label="College Name"
            placeholder="College Name"
            name="college"
            id="college"
            value={state.college}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Designation"
            placeholder="Designation"
            name="designation"
            id="designation"
            value={state.designation}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end my-2">
        <Button size="bigger" type="submit" className="btn">
          Save
        </Button>
      </div>
    </form>
  );
};
