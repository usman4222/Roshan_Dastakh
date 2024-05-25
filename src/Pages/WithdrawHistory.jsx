import React, { useEffect, useState } from "react";
import { Select, Option, Card, Typography } from "@material-tailwind/react";
import { allTransactions } from "../Services/GlobalApi";

const TABLE_HEAD = ["Request Balance", "Old Balance", "Request Date", "Approval Date"];

const TABLE_ROWS = [
    {
        reqBalance: "423424",
        oldBalance: "2374923",
        reqType: "Profit",
        date: "23/04/24",
        approvalDate: "22/04/24",
    },
    {
        reqBalance: "868867",
        oldBalance: "2374923",
        reqType: "Profit",
        date: "23/04/24",
        approvalDate: "22/04/24",
    },
    {
        reqBalance: "889768",
        oldBalance: "2374923",
        reqType: "Profit",
        date: "23/04/24",
        approvalDate: "22/04/24",
    },
    {
        reqBalance: "878765",
        oldBalance: "2374923",
        reqType: "Profit",
        date: "23/04/24",
        approvalDate: "22/04/24",
    },
    {
        reqBalance: "088979",
        oldBalance: "2374923",
        date: "23/04/24",
        approvalDate: "22/04/24",
    },
];
const WithdrawHistory = () => {
    const [value, setValue] = useState("Approved");
    const [withdrawData, setWithdrawData] = useState([]);
    
    useEffect(() => {
        getWithdrawData(value);
    }, []);

    const getWithdrawData = async (status) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(allTransactions, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // Convert body to JSON format
                    type: 'Withdraw',
                    status: status,
                })
            });
            const responseData = await response.json(); // Parse response JSON

            console.log(responseData);
            setWithdrawData(responseData.data);
        } catch (error) {

        }
    };

    const handleChnage = (newValue) => {
        setValue(newValue);
        getWithdrawData(newValue);

    }
    return <div>
        <div className="container mx-auto py-5 min-h-[100vh]">

            <div className="w-72 mx-auto">
                <Select label="Select Version" value={value}
                    onChange={handleChnage}>
                    <Option value="Approved">Approved Withdraws</Option>
                    <Option value="Pending">Pending Withdraws</Option>
                </Select>
            </div>
            <p className="my-4 text-center text-[10px]">swipe down or refresh</p>
            <Card className="h-full w-full overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="leading-none opacity-70 font-semibold"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawData.map((item, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item.id}>
                                    <td className={`${classes} bg-blue-gray-50/50 shadow-sm`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.new_balance}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.previous_balance}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.updated_at}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.updated_at}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    </div>;
};

export default WithdrawHistory;
