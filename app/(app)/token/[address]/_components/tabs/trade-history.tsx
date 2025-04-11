import React from "react";
interface Props {
    address: string;
}

const TradeHistory: React.FC<Props> = ({ address }) => {
    console.log(address);
    return <div>No data available</div>
}

export default TradeHistory;
