import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { ItemProfitReportData } from "@/types/report";
import { timestampToDateString } from "@/lib/functions";

const ItemProfitReportPdf = () => {
  const {
    state: { itemProfitReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      itemProfitReportData.item &&
      itemProfitReportData.item.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("item_profit_report_pdf");

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
  }, [itemProfitReportData, user]);

  return (
    itemProfitReportData.info &&
    itemProfitReportData.item.length != 0 &&
    user && (
      <div id="item_profit_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی قازانج - کاڵا</p>
        <h1>{import.meta.env.VITE_COMPANY_NAME}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی نرخی کڕین :
              {formatMoney(itemProfitReportData.info.total_purchase_price)}
            </p>
            <p>
              کۆی گشتی تێچوو :
              {formatMoney(itemProfitReportData.info.total_cost)}
            </p>
            <p>
              کۆی قازانجی دانە :
              {formatMoney(itemProfitReportData.info.total_single_profit)}
            </p>
            <p>
              کۆی گشتی قازانج :
              {formatMoney(itemProfitReportData.info.total_profit)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا :{" "}
              {formatMoney(itemProfitReportData.info.total_count)}
            </p>
            <p>
              کۆی دانەی فرۆشراو :
              {formatMoney(itemProfitReportData.info.total_quantity)}
            </p>{" "}
            <p>
              کۆی نرخی فرۆشتن :
              {formatMoney(itemProfitReportData.info.total_sell_price)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>کۆی قازانج</th>
              <th>قازانجی دانە</th>
              <th>کۆی تێچوو</th>
              <th>تێچووی دانە</th>
              <th>نرخی کڕین</th>
              <th>نرخی فرۆشتن</th>

              <th>دانەی فرۆشراو</th>

              <th>جۆری کاڵا</th>
              <th>بارکۆد</th>
              <th>ناو</th>
              <th>ژ.وەصڵ</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {itemProfitReportData?.item.map((val: ItemProfitReportData) => (
              <tr key={val.id}>
                <td>
                  {formatMoney(
                    (val.item_sell_price - val.item_purchase_price) *
                      val.quantity
                  )}
                </td>

                <td>
                  {formatMoney(val.item_sell_price - val.item_purchase_price)}
                </td>
                <td>{formatMoney(val.item_purchase_price * val.quantity)}</td>

                <td>{formatMoney(val.item_purchase_price)}</td>

                <td>{formatMoney(val.item_purchase_price)}</td>

                <td>{formatMoney(val.item_sell_price)}</td>

                <td>{formatMoney(val.quantity)}</td>
                <td>{val.type_name}</td>

                <td>{val.item_barcode}</td>

                <td>{val.item_name}</td>
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

export default ItemProfitReportPdf;
