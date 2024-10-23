import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { ItemReportData, KogaAllReportData } from "@/types/report";
import { formatDateToDDMMYY, timestampToDateString } from "@/lib/functions";

const KogaAllReportPdf = () => {
  const {
    state: { kogaAllReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (kogaAllReportData.item && kogaAllReportData.item.length !== 0 && user) {
      const printDiv = document.getElementById("koga_all_report_pdf");

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
  }, [kogaAllReportData, user]);

  return (
    kogaAllReportData.info &&
    kogaAllReportData.item.length != 0 &&
    user && (
      <div id="koga_all_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی کۆگا - گشت</p>
        <h1>{import.meta.env.VITE_COMPANY_NAME}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی دانەی ماوە :
              {formatMoney(
                kogaAllReportData.info.total_item_quantity -
                  kogaAllReportData.info.total_sell_quantity
              )}
            </p>
            <p>
              کۆی نرخی کڕاو :
              {formatMoney(kogaAllReportData.info.total_purchase_price)}
            </p>
            <p>
              کۆی نرخی فرۆشراو :
              {formatMoney(kogaAllReportData.info.total_sell_price)}
            </p>
            <p>کۆی تێچوو :{formatMoney(kogaAllReportData.info.total_cost)}</p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا :{" "}
              {formatMoney(kogaAllReportData.info.total_count)}
            </p>
            <p>
              کۆی دانەی کڕاو :
              {formatMoney(kogaAllReportData.info.total_item_quantity)}
            </p>
            <p>
              کۆی دانەی فرۆشراو :
              {formatMoney(kogaAllReportData.info.total_sell_quantity)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>تێچوو</th>
              <th>دانەی ماوە</th>
              <th>دانەی فرۆشراو</th>
              <th>نرخی فرۆشتن</th>
              <th>دانەی کڕاو</th>
              <th>نرخی کڕین</th>
              <th>جۆری کاڵا</th>
              <th>بارکۆد</th>
              <th>ناو</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {kogaAllReportData?.item.map((val: KogaAllReportData) => (
              <tr key={val.id}>
                <td>{formatMoney(val.item_sell_price * val.quantity)}</td>

                <td>{formatMoney(val.quantity - val.item_sell_price)}</td>

                <td>{formatMoney(val.sell_quantity)}</td>

                <td>{formatMoney(val.item_sell_price)}</td>

                <td>{formatMoney(val.quantity)}</td>

                <td>{formatMoney(val.item_purchase_price)}</td>
                <td>{val.type_name}</td>

                <td>{val.barcode}</td>

                <td>{val.name}</td>
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

export default KogaAllReportPdf;
