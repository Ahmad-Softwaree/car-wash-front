import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { KogaLessReportData, KogaMovementReportData } from "@/types/report";
import { timestampToDateString } from "@/lib/functions";

const KogaMovementReportPdf = () => {
  const {
    state: { kogaMovementReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      kogaMovementReportData.item &&
      kogaMovementReportData.item.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("koga_movement_report_pdf");

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
        // newWindow?.print();
        // newWindow?.close();
      }
    }
  }, [kogaMovementReportData, user]);

  return (
    kogaMovementReportData.info &&
    kogaMovementReportData.item.length != 0 &&
    user && (
      <div id="koga_movement_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی کۆگا - جوڵەی کاڵا</p>
        <h1>{import.meta.env.VITE_COMPANY_NAME}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی دانەی جوڵاو :{" "}
              {formatMoney(kogaMovementReportData.info.total_item_quantity)}
            </p>
            <p>
              کۆی تێچوو : {formatMoney(kogaMovementReportData.info.total_cost)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا :{" "}
              {formatMoney(kogaMovementReportData.info.total_count)}
            </p>
            <p>
              کۆی نرخی کڕین :{" "}
              {formatMoney(kogaMovementReportData.info.total_purchase_price)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>تێچوو</th>
              <th>دانەی جوڵاو</th>
              <th>نرخی کڕین</th>
              <th>جۆری کاڵا</th>
              <th>بارکۆد</th>
              <th>ناو</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {kogaMovementReportData?.item.map((val: KogaMovementReportData) => (
              <tr key={val.id}>
                <td>
                  {formatMoney(val.item_sell_price - val.item_purchase_price)}
                </td>

                <td>{formatMoney(val.quantity)}</td>

                <td>{formatMoney(val.item_purchase_price)}</td>
                <td>{val.type_name}</td>

                <td>{val.item_barcode}</td>

                <td>{val.item_name}</td>
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

export default KogaMovementReportPdf;
