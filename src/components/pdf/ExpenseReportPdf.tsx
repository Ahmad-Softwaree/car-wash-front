import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { ExpenseReportData } from "@/types/report";
import { formatDateToDDMMYY, timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const ExpenseReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { expenseReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      expenseReportData.expense &&
      expenseReportData.expense.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("expense_report_pdf");

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
  }, [expenseReportData, user]);

  return (
    expenseReportData.info &&
    expenseReportData.expense.length != 0 &&
    user && (
      <div id="expense_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی خەرجی</p>
        <h1>
          {info?.image_url != "" ? info?.image_url : "/images/ap-soft.jpg"}
        </h1>

        <div className="info_black">
          <div className="infoRight"></div>
          <div className="infoLeft">
            <p>کۆی خەرجی : {formatMoney(expenseReportData.info.total_price)}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>بەروار</th>
              <th>بڕی خەرجکراو</th>
              <th>جۆری خەرجی</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {expenseReportData?.expense.map((val: ExpenseReportData) => (
              <tr key={val.id}>
                {val.created_at && (
                  <td>{formatDateToDDMMYY(val.created_at.toString())}</td>
                )}
                <td>{val.price}</td>

                <td>{val.type_name}</td>
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

export default ExpenseReportPdf;
