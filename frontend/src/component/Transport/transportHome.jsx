import React from "react";
import { FiPrinter } from "react-icons/fi";
import { Link } from "react-router-dom";
import Transportlist from "./component/Transportlist";
import { getTotal } from "./helpers/helpers";
import TransportGraph from "./graph/TransportGraph";
import { default as api } from "./store/apiSlice";

function TransportHome() {
  const { data } = api.useGetTransportLabelsQuery();
  console.log("trasaction data", data);

  return (
    <div style={{ padding: "0 20px" }}>
      {" "}
      <div className="w-full">
        <div className="text-center drop-shadow-lg text-gray-800 mt-5">
          <div style={{ display: "flex", gap: "15px" }}>
            {" "}
            <div style={{ flex: "3" }}>
              <Transportlist />
            </div>
            <div style={{ flex: "1" }} className="mt-20">
              <div className="relative">
                <h3
                  style={{
                    marginTop: "120px",
                    marginLeft: "150px",
                    position: "absolute"
                  }}
                  className="font-bold title"
                >
                  <span className="text-green-500">Total</span>
                  <span className="block text-3xl">
                    <span className="text-red-500">$</span>
                    <span className="text-black">{getTotal(data) ?? 0}</span>
                  </span>
                </h3>
              </div>
              <TransportGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransportHome;
