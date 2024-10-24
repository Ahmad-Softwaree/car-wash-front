import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { SellReportData } from "@/types/report";
import { formatDateToDDMMYY, timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const SellReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { sellReportData },
  } = useGlobalContext();
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (sellReportData.sell && sellReportData.sell.length !== 0 && user) {
      const printDiv = document.getElementById("sell_report_pdf");

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
  }, [sellReportData, user]);

  return (
    sellReportData.info &&
    sellReportData.sell.length != 0 &&
    user && (
      <div id="sell_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی لیستی پسوڵەکان</p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی داشکاندنی پسوڵەکان‌ :
              {formatMoney(sellReportData.info.total_sell_discount)}
            </p>
            <p>
              کۆی دوای داشکاندن :
              {formatMoney(
                sellReportData.info.total_sell_price -
                  sellReportData.info.total_sell_discount
              )}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی پسوڵە : {formatMoney(sellReportData.info.sell_count)}
            </p>
            <p>
              کۆی گشتی نرخی پسوڵەکان :
              {formatMoney(sellReportData.info.total_sell_price)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>نرخی دوای داشکاندن</th>
              <th>داشکاندن</th>
              <th>کۆی گشتی</th>
              <th>بەروار</th>
              <th>ژ.وەصڵ</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {sellReportData?.sell.map((val: SellReportData) => (
              <tr key={val.id}>
                <td>{formatMoney(val.total_sell_price - val.discount)}</td>
                <td>{formatMoney(val.discount)}</td>
                <td>{formatMoney(val.total_sell_price)}</td>
                {val.created_at && (
                  <td>{formatDateToDDMMYY(val.created_at.toString())}</td>
                )}
                <td>{val.id}</td>
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

export default SellReportPdf;
