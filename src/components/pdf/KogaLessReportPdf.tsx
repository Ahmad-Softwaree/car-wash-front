import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { KogaLessReportData } from "@/types/report";
import { timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const KogaLessReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { kogaLessReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      kogaLessReportData.item &&
      kogaLessReportData.item.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("koga_less_report_pdf");

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
  }, [kogaLessReportData, user]);

  return (
    kogaLessReportData.info &&
    kogaLessReportData.item.length != 0 &&
    user && (
      <div id="koga_less_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی کۆگا - کەمبوو</p>
        <h1>
          {info?.image_url != "" ? info?.image_url : "/images/ap-soft.jpg"}
        </h1>

        <div className="info_black">
          <div className="infoRight"></div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا :{" "}
              {formatMoney(kogaLessReportData.info.total_count)}
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
            {kogaLessReportData?.item.map((val: KogaLessReportData) => (
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

export default KogaLessReportPdf;
