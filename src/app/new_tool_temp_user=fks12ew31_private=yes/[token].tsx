import { __prod__, apiUrl } from "@/utils/constants";

import { GetServerSideProps } from "next";
import WealthometerReport from "@/components/MyAccount/Dashboard/Others/WealthometerReport";

const WealthometerReportPage: React.FC<{ data: any }> = ({ data }) => {
  return <WealthometerReport data={data} />;
};

export default WealthometerReportPage;

const SaWeightage = 0.2;
const LWeightage = 0.1;
const EWeightage = 0.2;
const CoWeightage = 0.2;
const InWeightage = 0.3;

const SUMPRODUCT = (
  callback: (x: number, y: number) => boolean,
  ar1: number[],
  ar2: number[]
) => {
  if (ar1.length !== ar2.length) throw new RangeError();

  let sum = 0;

  for (let i = 0; i < ar1.length; i++) {
    if (callback(ar1[i], ar2[i])) sum += ar1[i] * ar2[i];
  }

  return sum;
};

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const token = params?.token;

  try {
    if (!__prod__) {
      return {
        props: {
          data: {
            name: "Syed",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            result: {
              Sa: 8,
              L: 8,
              E: 6,
              Co: 4,
              In: 9,
              total: 50,
            },
          },
        },
      };
    } else {
      const res = await fetch(`${apiUrl}/api/v1/wealthometer/${token}`);

      const data = await res.json();

      const total = Math.round(
        SUMPRODUCT(
          (x, y) => x > -1,
          [SaWeightage, LWeightage, EWeightage, CoWeightage, InWeightage],
          [
            data.result.Sa ?? 0,
            data.result.L ?? 0,
            data.result.E ?? 0,
            data.result.Co ?? 0,
            data.result.In ?? 0,
          ]
        ) * 10
      );

      data.result.Sa = data.result.Sa ?? 0;
      data.result.L = data.result.L ?? 0;
      data.result.E = data.result.E ?? 0;
      data.result.Co = data.result.Co ?? 0;
      data.result.In = data.result.In ?? 0;

      data.result.total = total;

      if (res.status === 200) {
        return {
          props: {
            data,
          },
        };
      } else {
        return { notFound: true };
      }
    }
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};
