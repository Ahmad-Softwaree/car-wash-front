import { useGlobalContext } from "@/context/GlobalContext";
import { formatMoney } from "../shared/FormatMoney";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { pdfStyle } from "@/lib/config/pdf.config";
import { CaseReportData, ReservationReportData } from "@/types/report";
import { formateDateToYMDHM, timestampToDateString } from "@/lib/functions";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

const ReservationReportPdf = () => {
  const { data: info } = useGetCompanyInfo();

  const {
    state: { reservationReportData },
  } = useGlobalContext();

  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (
      reservationReportData.reservations &&
      reservationReportData.reservations.length !== 0 &&
      user
    ) {
      const printDiv = document.getElementById("reservations_report_pdf");

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
  }, [reservationReportData, user]);

  return (
    reservationReportData.info &&
    reservationReportData.reservations.length != 0 &&
    user && (
      <div id="reservations_report_pdf" className="hidden inner_div">
        <p className="username">ڕاپۆرتی نۆرەکان</p>
        <h1>{info?.name}</h1>

        <div className="info_black">
          <div className="infoRight">
            <p>
              کۆی قازانجی نۆرەکان :{" "}
              {formatMoney(reservationReportData.info.total_price)}
            </p>
          </div>
          <div className="infoLeft">
            <p>
              کۆی نۆرەکان :{" "}
              {formatMoney(reservationReportData.info.reservation_count)}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ڕەنگ</th>

              <th>مۆدێلی ئۆتۆمبێل</th>

              <th>جۆری ئۆتۆمبێل</th>
              <th>ژمارەی ئۆتۆمبێل</th>

              <th>خزمەتگوزاری</th>
              <th>بەروار و کات</th>
              <th>ناوی موشتەری</th>
              <th>نرخ</th>
              <th>ژ.نۆرە</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {reservationReportData?.reservations.map(
              (val: ReservationReportData) => (
                <tr key={val.id}>
                  <td>{val.color_name}</td>
                  <td>{val.car_model_name}</td>
                  <td>{val.car_type_name}</td>
                  <td>{val.car_number}</td>

                  <td>{val.service_name}</td>
                  <td>{formateDateToYMDHM(val.date_time as string)}</td>

                  <td>{val.customer_name}</td>

                  <td>{val.price}</td>
                  <td>{val.id}</td>
                </tr>
              )
            )}
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

export default ReservationReportPdf;
