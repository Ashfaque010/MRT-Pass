import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CardRechargeFlow from "./CardRechargeFlow";
import NFCCardScanner from "./NFCCardScanner";
import {
  ArrowRight,
  CreditCard,
  History,
  RefreshCw,
  Settings,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [scanningMode, setScanningMode] = useState(true);
  const [showRechargeFlow, setShowRechargeFlow] = useState(false);
  const [cardData, setCardData] = useState<{
    cardId: string;
    balance: number;
    lastUsed?: string;
  } | null>(null);

  // Mock transaction history
  const transactions = [
    {
      from: "Agargaon",
      to: "Mirpur 10",
      date: "20 May 2024",
      time: "06:00 PM",
      amount: 18,
    },
    {
      from: "Mirpur 11",
      to: "Agargaon",
      date: "20 May 2024",
      time: "05:00 PM",
      amount: 27,
    },
    {
      from: "Pallabi",
      to: "Mirpur 11",
      date: "28 Oct 2023",
      time: "08:00 AM",
      amount: 18,
    },
    {
      from: "Mirpur 10",
      to: "Pallabi",
      date: "28 Oct 2023",
      time: "08:00 AM",
      amount: 18,
    },
  ];

  const handleCardDetected = (data: { id: string; balance: number }) => {
    setCardData({
      cardId: data.id,
      balance: data.balance,
      lastUsed: new Date().toISOString().split("T")[0],
    });
    setScanningMode(false);
  };

  const handleRecharge = () => {
    setShowRechargeFlow(true);
  };

  const handleCloseRecharge = () => {
    setShowRechargeFlow(false);
  };

  const handleRescan = () => {
    setScanningMode(true);
    setCardData(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold">Dhaka MRT</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {showRechargeFlow ? (
          <div className="max-w-md mx-auto">
            <Button
              variant="ghost"
              onClick={handleCloseRecharge}
              className="mb-4 text-white"
            >
              &larr; Back
            </Button>
            <CardRechargeFlow onComplete={handleCloseRecharge} />
          </div>
        ) : scanningMode ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Dhaka MRT or Rapid Pass
              </h1>
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-3xl overflow-hidden">
              <div className="p-8 flex flex-col items-center">
                <h2 className="text-2xl text-center mb-8">
                  Tap your card behind your phone to read balance
                </h2>
                <NFCCardScanner
                  onCardDetected={handleCardDetected}
                  isScanning={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col max-w-md mx-auto">
            {/* Card Balance Section */}
            <Card className="mb-4 bg-gray-800 border-none text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-400 text-lg">Latest Balance</h3>
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">৳</span>
                      <span className="text-4xl font-bold">
                        {cardData?.balance}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-blue-400"
                    onClick={handleRescan}
                  >
                    Rescan
                    <RefreshCw className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Recent Transactions</h3>
              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {transaction.from} → {transaction.to}
                        </p>
                        <p className="text-sm text-gray-400">
                          {transaction.date}, {transaction.time}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-400">
                        <span className="mr-1">৳</span>
                        <span className="text-xl">-{transaction.amount}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recharge Button */}
            <Button
              onClick={handleRecharge}
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Recharge Card
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-400">
        <p>© 2025 Dhaka MRT Pass. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
