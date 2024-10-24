import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { ItemReportData, SellReportData } from "@/types/report";
import { formatDateToDDMMYY, timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const ItemReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { itemReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (itemReportData.item && itemReportData.item.length !== 0 && user) {
      const printDiv = document.getElementById("item_report_pdf");

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
  }, [itemReportData, user]);

  return (
    itemReportData.info &&
    itemReportData.item.length != 0 &&
    user && (
      <div id="item_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی لیستی کاڵاکان</p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی نرخی فرۆشتن :{formatMoney(itemReportData.info.total_price)}
            </p>
            <p>
              کۆی گشتی نرخی فرۆشراو :
              {formatMoney(itemReportData.info.total_sell_price)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی ژمارەی کاڵا : {formatMoney(itemReportData.info.total_count)}
            </p>
            <p>
              کۆی دانەی فرۆشراو :{formatMoney(itemReportData.info.total_sell)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>بەروار</th>
              <th>کۆی گشتی</th>
              <th>نرخی فرۆشتن</th>
              <th>دانەی فرۆشراو</th>
              <th>جۆری کاڵا</th>
              <th>بارکۆد</th>
              <th>ناوی کاڵا</th>
              <th>ژ.وەصڵ</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {itemReportData?.item.map((val: ItemReportData) => (
              <tr key={val.id}>
                {val.created_at && (
                  <td>{formatDateToDDMMYY(val.created_at.toString())}</td>
                )}

                <td>{formatMoney(val.item_sell_price * val.quantity)}</td>
                <td>{formatMoney(val.item_sell_price)}</td>
                <td>{formatMoney(val.quantity)}</td>

                <td>{val.type_name}</td>
                <td>{val.item_barcode}</td>

                <td>{val.item_name}</td>

                <td>{val.sell_id}</td>
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

export default ItemReportPdf;
