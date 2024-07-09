import React, { useEffect, useState } from "react";
import { Select, Option, Card, Typography } from "@material-tailwind/react";
import { allTransactions } from "../Services/GlobalApi";


const TABLE_HEAD = ["Deposit Balance", "Old Balance", "Deposit Date", "Approval Date"];

const TaxHistory = () => {
    const [taxData, setTaxData] = useState([]);
    useEffect(() => {
        getTaxData();
    }, []);

    const getTaxData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(allTransactions, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // Convert body to JSON format
                    type: 'Tax',
                    status: 'Approved',
                })
            });
            const responseData = await response.json(); // Parse response JSON

            console.log(responseData);
            setTaxData(responseData.data);
        } catch (error) {

        }
    };
    return <div>
        <div className="container mx-auto py-5 min-h-[100vh]">
            <h4 className="mb-4 text-center">Tax</h4>
            <p className="mb-4 text-center text-[10px]">swipe down or refresh</p>
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
                        {taxData.map((item, index) => {
                            const isLast = index === item.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item.id}>
                                    <td className={`${classes} bg-blue-gray-50/50 shadow-sm`}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.previous_balance}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.created_at}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {item.created_at}
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

export default TaxHistory;
