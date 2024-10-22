export const pdfStyle = `
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        font-family: Calibri;
      }
      .innerDiv {
        width:100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;
        font-family: Calibri;
      }

      .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }
      .info_black {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        background-color: black;
        color: white;
        padding-inline: 2rem;
      }
      .infoRight {
        text-align: right;
        font-size: 20px;
      }

      .infoLeft {
        text-align: right;
        font-size: 20px;
      }

      .username {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        margin-top: 30px;
        line-height: 1.3;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        border: 1px solid black;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 5px;
        padding-right: 5px;
        white-space: pre-wrap;
      }

      th {
        color: white;

        background-color: black;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    </style>
`;
export const posStyle = `
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        overflow:hidden;
        padding: 10px;
        font-family: Arial, sans-serif;
        margin: 5px;
        width: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        line-height: 1;
        font-family: Calibri;
      }
      .pos {
        overflow:hidden;
        width: 100%;
        display:flex;
       
        
      }

      .username {
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
        width: 100%;
      }
      h1 {
        margin: 0px;
        margin-bottom: 20px;
        text-align: center;
        width: 100%;
      }

      table {
        border-collapse: collapse;
        margin-top: 10px;
        width: 100%;
      }

      th,
      td {
        border: 1px solid black;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        padding-right: 5px;
        white-space: pre-wrap;
      }

      th {
        color: black;

        padding-left: 5px;
        padding-right: 5px;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .info_black {
        padding: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 0px;
        align-items: start;
        width: 100%;
        color: black;
      }

      .info_black p {
        width: 100%;
        text-align: right;
        margin-top: 0px;
      }
    </style>
`;
