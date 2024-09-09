import ReactDOM from "react-dom";

const Portal = () => {
  return ReactDOM.createPortal(<div className="dropdown"></div>, document.body);
};

export default Portal;
