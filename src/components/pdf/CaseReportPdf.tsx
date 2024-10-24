import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { CaseReportData } from "@/types/report";
import { timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const CaseReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { caseReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (caseReportData.data && caseReportData.data.length !== 0 && user) {
      const printDiv = document.getElementById("data_report_pdf");

      if (printDiv) {
        const newWindow = window.open("", "", `width=1500`);
        newWindow?.document.write(`
          <html>
            <head>
              <title>Print</title>
              ${pdfStyle}
            </head>
            <body>
              ${printDiv.innerHTML}
            </body>
          </html>
        `);
        newWindow?.document.close();
        newWindow?.focus();
        newWindow?.print();
        newWindow?.close();
      }
    }
  }, [caseReportData, user]);

  return (
    caseReportData.info &&
    caseReportData.data.length != 0 &&
    user && (
      <div id="data_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی صندوق</p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی نرخی فرۆشراو :{" "}
              {formatMoney(caseReportData.info.total_sell_price)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی دانەی فرۆشراو :{" "}
              {formatMoney(caseReportData.info.total_quantity)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>نرخی فرۆشتن</th>
              <th>دانەی فرۆشراو</th>
              <th>بەکارهێنەر</th>
              <th>کۆدی بەکارهێنەر</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {caseReportData?.data.map((val: CaseReportData) => (
              <tr key={val.id}>
                <td>{formatMoney(val.sold_price)}</td>
                <td>{formatMoney(val.sold)}</td>

                <td>{val.created_by}</td>

                <td>{val.user_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="info_black">
          <div className="infoLeft">
            <p>بەرواری چاپ : {timestampToDateString(Date.now())}</p>
          </div>
          <div className="infoRight">
            <p>{user.username} چاپکراوە لەلایەن :</p>
          </div>
        </div>
      </div>
    )
  );
};

export default CaseReportPdf;
