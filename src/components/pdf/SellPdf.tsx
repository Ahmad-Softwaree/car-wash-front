import { useGlobalContext } from "@/context/GlobalContext";
import { SellItem } from "@/types/sell";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { Dispatch, useEffect, useRef } from "react";
import { posStyle } from "@/lib/config/pdf.config";
import { GlobalStateType } from "@/types/global";
import { AuthStateType } from "@/types/auth";

const SellPdf = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const {
    state: { sellPrintData },
  }: { state: GlobalStateType; dispatch: Dispatch<any> } = useGlobalContext();
  const {
    state: { user },
  }: { state: AuthStateType; dispatch: Dispatch<any> } = useAuthContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      window.close();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const formattedDate = `${year} - ${month} - ${day} \t ${hours}:${minutes}`;

  const MAX_HEIGHT = 520;
  const calculateHeight = MAX_HEIGHT + 40 * sellPrintData?.sellItems.length;

  let total_money = sellPrintData?.sellItems.reduce(
    (total: number, item: SellItem) => total + item.item_sell_price,
    0
  );

  useEffect(() => {
    if (sellPrintData.sell && sellPrintData.sellItems.length !== 0 && user) {
      const printDiv = document.getElementById("sell_pdf");

      if (printDiv) {
        // Clone the content of the div into a new window to print only that section
        const newWindow = window.open(
          "",
          "",
          `width=1000,height=${calculateHeight}`
        );
        newWindow?.document.write(`
          <html>
            <head>
              <title>Print</title>
              ${posStyle}
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
  }, [sellPrintData, user]);
  return (
    sellPrintData.sell &&
    sellPrintData.sellItems.length != 0 &&
    user && (
      <div ref={printRef} id="sell_pdf" className="hidden pos">
        <p className="username">وەصڵی فرۆشتن</p>
        <h1>غەسلی ڕەها</h1>

        <div className="info_black">
          <p>بەرواری وەصڵ : {formattedDate}</p>
          <p>کارمەند : {user?.username}</p>
          <p>ژ.وەصڵ : {sellPrintData?.sell.id}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>کۆ</th>
              <th>نرخ</th>
              <th>عدد</th>
              <th>کاڵا</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {sellPrintData?.sellItems.map((val: SellItem) => (
              <tr key={val.id}>
                <td>{formatMoney(val.quantity * val.item_sell_price)}</td>
                <td>{formatMoney(val.item_sell_price)}</td>
                <td>{formatMoney(val.quantity)}</td>
                <td>{val.item_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="info_black">
          <p>ژمارەی کاڵا : {sellPrintData?.sellItems.length}</p>
          <p>نرخی گشتی : {formatMoney(total_money)}</p>
          <p>داشکاندن : {formatMoney(sellPrintData?.sell.discount)}</p>
          <p>
            نرخی دوای داشکان :
            {formatMoney(total_money - sellPrintData?.sell.discount)}
          </p>
        </div>
      </div>
    )
  );
};

export default SellPdf;
