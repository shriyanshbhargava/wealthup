"use client"
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PhoneInput from "@/components/ui/PhoneInput";
import React from "react";
import Storage from "@/utils/storage";
import { UserApi } from "@/api/services/user/UserApi";
import { emailRegex } from "@/utils/expressions";
import { initialUser } from "@/components/DashboardLayout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialState = {
  pan: "",
  aadhar: "",
  address: "",
  pin: "",
  fathers_name: "",
  mothers_name: "",
  spouse_name: "",
  height: "",
  weight: "",
  nominee_name: "",
  nominee_relationship: "",
  nominee_phone: "",
  nominee_email: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const SensitiveData = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { route } = useRouter();

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const demo = route.includes('/demo');

  const updateSensitiveData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (demo) {
      toast.success("Data saved sucessfully");
      return;
    }

    const data: Record<string, string | number> = {};
    Object.keys(state).map((entity) => {
      if (
        state[entity] !== null &&
        entity !== "user_id" &&
        entity !== "createdAt" &&
        entity !== "updatedAt" &&
        entity !== "id"
      )
        data[entity] = state[entity];
    });

    const res: Response = await userApiClient.updateSensitiveData(
      JSON.stringify(data)
    );

    const json = await res.json();

    if (res.status === 201) {
      toast.success("Data saved successfully");
    } else {
      toast.error(json?.message ?? "Something went wrong while saving data.");
    }
  };

  React.useEffect(() => {
    const getSensitiveData = async () => {
      const res: Response = await userApiClient.getSensitiveData();
      if (res.status === 200) {
        const data = await res.json();

        dispatch({
          type: "update",
          payload: {
            ...data,
            height: data.height !== null ? +data.height : "",
            weight: data.weight !== null ? +data.weight : "",
          },
        });
      }
    };

    getSensitiveData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    // if (e.target.type === "number") {
    //   value = parseInt(value);
    // }

    dispatch({
      type: "update",
      payload: {
        [e.target.id]: value,
      },
    });
  };

  return (
    <form
      className="w-full md:w-2/3 xl:w-1/2 bg-white z-[1] rounded-xl p-4"
      onSubmit={updateSensitiveData}
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-12">
        <div className="w-full md:w-1/2">
          <Input
            type="text"
            label="PAN"
            placeholder="PAN"
            name="pan"
            id="pan"
            value={state.pan?.toUpperCase()}
            error={
              state.pan.length && !state.pan?.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
                ? "Enter a valid PAN"
                : ""
            }
            onChange={handleChange}
          />

          <Input
            type="text"
            label="Current Address"
            placeholder="Current Address"
            name="address"
            id="address"
            value={state.address}
            onChange={handleChange}
          />

          <Input
            type="text"
            label="Father Name"
            placeholder="Father Name"
            name="fathers_name"
            id="fathers_name"
            value={state.fathers_name}
            error={
              state.fathers_name.length &&
                !state.fathers_name.match(/^[A-Za-z\s]*$/)
                ? "Enter a valid Name"
                : ""
            }
            onChange={handleChange}
          />
          <Input
            type="number"
            label="Height (in cm)"
            placeholder="Height (in cm)"
            name="height"
            id="height"
            value={state.height}
            error={
              state.height?.toString().length &&
                !state.height.toString().match(/^[0-9\.]+$/)
                ? "Height should only contain numbers"
                : ""
            }
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Nominee Name"
            placeholder="Nominee Name"
            name="nominee_name"
            id="nominee_name"
            value={state.nominee_name}
            error={
              state.nominee_name.length &&
                !state.nominee_name.match(/^[A-Za-z\s]*$/)
                ? "Enter a valid Name"
                : ""
            }
            onChange={handleChange}
          />
          {/* <Input
            type="text"
            label="Nominee Phone"
            placeholder="Nominee Phone"
            name="nominee_phone"
            id="nominee_phone"
            value={state.nominee_phone}
            onChange={handleChange}
          /> */}

          <PhoneInput
            value={state.nominee_phone}
            onChange={(value) => {
              dispatch({
                type: "update",
                payload: {
                  nominee_phone: value,
                },
              });
            }}
          />
          <Input
            type="text"
            label="Spouse Name"
            placeholder="Spouse Name"
            id="spouse_name"
            name="spouse_name"
            value={state.spouse_name}
            error={
              state.spouse_name.length &&
                !state.spouse_name.match(/^[A-Za-z\s]*$/)
                ? "Enter a valid Name"
                : ""
            }
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            type="number"
            label="Aadhar Number"
            placeholder="Aadhar Number"
            pattern="[0-9]{12}"
            name="aadhar"
            error={
              state.aadhar?.toString().length &&
                !state.aadhar?.toString().match(/^[0-9]{12}$/)
                ? "Should contain only 12 digits"
                : ""
            }
            id="aadhar"
            value={state.aadhar}
            onChange={handleChange}
          />
          <Input
            type="number"
            label="Pin Code"
            placeholder="Pin Code"
            name="pin"
            id="pin"
            error={
              state.pin.toString().length &&
                !state.pin?.toString()?.match(/^[0-9]{5,6}$/)
                ? "Enter a valid Pin Code"
                : ""
            }
            value={state.pin}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Mother Name"
            placeholder="Mother Name"
            name="mothers_name"
            id="mothers_name"
            value={state.mothers_name}
            error={
              state.mothers_name.length &&
                !state.mothers_name.match(/^[A-Za-z\s]*$/)
                ? "Enter a valid Name"
                : ""
            }
            onChange={handleChange}
          />

          <Input
            type="number"
            label="Weight (in kg)"
            placeholder="Weight (in kg)"
            name="weight"
            id="weight"
            value={state.weight}
            error={
              state.weight.toString().length &&
                !state.weight.toString().match(/^[0-9\.]+$/)
                ? "Weight should only contain numbers"
                : ""
            }
            onChange={handleChange}
          />

          <Input
            type="text"
            label="Nominee Relation"
            placeholder="Nominee Relation"
            name="nominee_relationship"
            id="nominee_relationship"
            value={state.nominee_relationship}
            error={
              state.nominee_relationship.length &&
                !state.nominee_relationship.match(/^[A-Za-z\s]*$/)
                ? "Enter a valid Name"
                : ""
            }
            onChange={handleChange}
          />

          <Input
            type="email"
            label="Nominee Email ID"
            placeholder="Nominee Email ID"
            name="nominee_email"
            id="nominee_email"
            value={state.nominee_email}
            error={
              state.nominee_email.length &&
                !emailRegex.test(state.nominee_email)
                ? "Enter a valid email"
                : ""
            }
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
