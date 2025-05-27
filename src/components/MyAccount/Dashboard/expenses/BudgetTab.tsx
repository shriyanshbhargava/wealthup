import React from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { UserApi } from "@/api/services/user/UserApi";
import { InputRow } from "@/components/ui/Input";
import Storage from "@/utils/storage";

type State = {
  rent: number | null;
  bills: number | null;
  groceries: number | null;
  medical: number | null;
  domestic: number | null;
  emi: number | null;
  other_needs: number | null;
  shopping: number | null;
  subscription: number | null;
  gym: number | null;
  entertainment: number | null;
  savings: number | null;
  transport: number | null;
  other_wants: number | null;
};

const initialState: State = {
  rent: null,
  bills: null,
  groceries: null,
  medical: null,
  domestic: null,
  emi: null,
  other_needs: null,
  shopping: null,
  subscription: null,
  gym: null,
  entertainment: null,
  savings: null,
  transport: null,
  other_wants: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const BudgetTab = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const getInitialBudgetData = async () => {
    const res: Response = await userApiClient.getBudget();

    if (res.status === 200) {
      const data = await res.json();

      dispatch({
        type: "update",
        payload: {
          ...data,
        },
      });
    }
  };

  const handleChange = (value: number, id: string) => {
    dispatch({
      type: "update",
      payload: {
        [id]: value,
      },
    });
  };

  const handleChangeDisable = async () => {
    if (disabled === false) {
      const data = state;
      delete data.id;
      delete data.updatedAt;
      delete data.createdAt;
      delete data.user_id;
      await userApiClient.updateBudget(JSON.stringify(data));
    }
    setDisabled(!disabled);
  };

  React.useEffect(() => {
    getInitialBudgetData();
  }, [getInitialBudgetData]);

  return (
    <div className="pt-8 pb-16 px-6">
      <div className="flex flex-col md:flex-row gap-8 justify-around">
        <div className="w-full md:w-2/5 rounded-xl bg-white p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-robo font-medium mb-0">
              My Budget
            </h2>
            <div
              className="font-robo font-normal flex gap-4 items-center text-xl cursor-pointer"
              onClick={handleChangeDisable}
            >
              {disabled ? (
                <>
                  <FaEdit />
                  Edit Budget
                </>
              ) : (
                <>
                  <FaSave />
                  Set Budget
                </>
              )}
            </div>
          </div>
          <form>
            <InputRow
              name="Rent"
              id="rent"
              value={state.rent}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Bills / Utility"
              id="bills"
              value={state.bills}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Groceries / Supplies"
              id="groceries"
              value={state.groceries}
              disabled={disabled}
              onChange={handleChange}
            />

            <InputRow
              name="Transport"
              id="transport"
              value={state.transport}
              disabled={disabled}
              onChange={handleChange}
            />

            <InputRow
              name="Medical / Insurance"
              id="medical"
              value={state.medical}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Domestic Help"
              id="domestic"
              value={state.domestic}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="EMI"
              id="emi"
              value={state.emi}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Other Needs"
              id="other_needs"
              value={state.other_needs}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Shopping"
              id="shopping"
              value={state.shopping}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Gym / Salon"
              id="gym"
              value={state.gym}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Food / Entertainment"
              id="entertainment"
              value={state.entertainment}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Subscription"
              id="subscription"
              value={state.subscription}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Other Wants"
              id="other_wants"
              value={state.other_wants}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Savings"
              id="savings"
              value={state.savings}
              disabled={disabled}
              onChange={handleChange}
            />
            <InputRow
              name="Total"
              value={
                parseInt(state.rent?.toString() ?? "0") +
                parseInt(state.bills?.toString() ?? "0") +
                parseInt(state.groceries?.toString() ?? "0") +
                parseInt(state.medical?.toString() ?? "0") +
                parseInt(state.domestic?.toString() ?? "0") +
                parseInt(state.emi?.toString() ?? "0") +
                parseInt(state.other_needs?.toString() ?? "0") +
                parseInt(state.shopping?.toString() ?? "0") +
                parseInt(state.subscription?.toString() ?? "0") +
                parseInt(state.gym?.toString() ?? "0") +
                parseInt(state.entertainment?.toString() ?? "0") +
                parseInt(state.transport?.toString() ?? "0") +
                parseInt(state.other_wants?.toString() ?? "0")
              }
              disabled={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
