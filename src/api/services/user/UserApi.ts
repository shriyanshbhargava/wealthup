import ApiClient from "@/api/lib/ApiClient";


type Profile = {
  first_name?: string | null;
  last_name?: string | null;
  city?: string | null;
  relationship_status?: string | null;
  dob?: string | null;
  kids?: number | null;
  email?: string | null;
  designation?: string | null;
  town?: string | null;
  college?: string | null;
  highest_education?: string | null;
  employer?: string | null;
};

type Address = {
  line1?: string;
  city?: string;
  state?: string;
  line2?: string;
  line3?: string;
  country?: string;
  pincode?: string;
};

type FamilyMember = {
  relationship: string;
  full_name: string;
  dob: string;
  phone: string;
};

type Nominee = {
  relationship: string;
  full_name: string;
  dob: string;
  phone: string;
};

type BankAccount = {
  account_number: string;
  ifsc: string;
  account_holder_name: string;
  bank_name?: string;
  micr?: string;
  branch?: string;
};

type UserUpdateData = {
  first_name?: string;
  last_name?: string;
  dob?: string;
  height?: number;
  weight?: number;
  age?: number;
  company_name?: string;
  school_name?: string;
  manager_id?: string;
  email?: string;
  phone?: string;
  password?: string;
  pan?: string;
  avatar_url?: string;
  address?: Address;
  family_details?: FamilyMember[];
  nominee?: Nominee;
  bank_accounts?: BankAccount[];
  aadhaar_last_4_digit?: string;
};

type OrderCreateData = {
  amount: number; 
  order_type: string;
  plan_type: string;
};

export class UserApi extends ApiClient {
  constructor(token?: string) {
    super("/api/v1", token);
  }

  updateMe(profile: Profile): Promise<Response | any> {
    const body: Profile = {};

    if (profile.first_name !== null) {
      body.first_name = profile.first_name;
    }
    if (profile.last_name !== null) {
      body.last_name = profile.last_name;
    }
    if (profile.city !== null) {
      body.city = profile.city;
    }
    if (profile.email !== null) {
      body.email = profile.email;
    }
    if (profile.dob !== null) {
      body.dob = profile.dob;
    }
    if (profile.relationship_status !== null) {
      body.relationship_status = profile.relationship_status;
    }
    if (profile.kids !== null) {
      body.kids = profile.kids;
    }
    if (profile.designation !== null) {
      body.designation = profile.designation;
    }
    if (profile.town !== null) {
      body.town = profile.town;
    }
    if (profile.college !== null) {
      body.college = profile.college;
    }
    if (profile.employer !== null) {
      body.employer = profile.employer;
    }
    if (profile.highest_education !== null) {
      body.highest_education = profile.highest_education;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(
          JSON.stringify(body),
          "/profile"
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getMe(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/profile");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAuthMe(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/auth/me");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getTax(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/tax");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateTax(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/tax");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getBudget(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/budget");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateBudget(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/budget");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getMonthlyExpenses(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(
          "/transactions/graph/current"
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Transactions API
  getTransactions(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/transactions/all");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteTransaction(id: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.delete(`/transactions/${id}`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getInsights(category?: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(
          `/transactions/graph/six-months/${category ?? ""}`
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getWealthometer(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/wealthometer");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getTasks(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/rewards");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getCompletedTasks(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/rewards/completed");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  addExpense(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/transactions");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  // sensitive Data
  // updateSensitiveData(body: string): Promise<Response | any> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const response: Response = await this.post(
  //         body,
  //         "/profile/sensitive-data"
  //       );
  //       resolve(response);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // getSensitiveData(): Promise<Response | any> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const response: Response = await this.get("/profile/sensitive-data");
  //       resolve(response);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  getRiskprofile(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/riskprofile");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getFinancialLiteracy(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/financialliteracy");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  generateRentReceipt(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(
          body,
          "/rent-receipt-generator"
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAssetsData(tool: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/assets/${tool}`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAssetUrl(key: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/assets/wuassets/${key}`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Comple Task API
  compleRiskometerTask(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.update(
          `/rewards/62ea8b9e2884b2bff8657287/complete`
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  compleFinknowmeterTask(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.update(
          `/rewards/62ea8bb12884b2bff865728a/complete`
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getInvestments(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/investments`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getInvestmentsUser(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/investments/user`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getPortfolio(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/portfolio`);
        resolve(response);
      } catch (err) { 
        reject(err);
      }
    });
  }

  getPortfolioAudit(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/investments/portfolio-audit`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getPortfolioAuditInvestments(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/investments/portfolio-audit/investments`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  getCodes(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get(`/users/codes`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  useCode(code: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(JSON.stringify({ code }), `/users/codes/use`);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  storeRetirementAge(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(JSON.stringify(body), '/users/retierment-age')
        resolve(response)
      } catch (err) {
        reject(err);
      }
    })
  }

  getRetirementAge(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get('/users/retierment-age');
        resolve(response);
      } catch (err) {
        reject(err);
      }
    })
  }

  createGoal(body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(JSON.stringify(body), '/goals')
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  getGoals(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get('/goals')
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  updateUserData(userId: string, userData: UserUpdateData): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.put(
          JSON.stringify(userData),
          `/users/${userId}`
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }




}
