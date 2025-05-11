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
  CreditCard,
  History,
  Plus,
  Settings,
  User,
  ChevronLeft,
  Wallet,
} from "lucide-react";

// Main home page component for the Dhaka MRT Pass app
const HomePage = () => {
  const [cardData, setCardData] = useState<{
    cardId: string;
    balance: number;
    lastUsed?: string;
    name?: string;
  } | null>(null);
  const [showRechargeFlow, setShowRechargeFlow] = useState(false);
  const [showScanner, setShowScanner] = useState(true);

  // Mock transaction history
  const transactions = [
    {
      id: "tx1",
      type: "ride",
      from: "Uttara North",
      to: "Agargaon",
      amount: 25,
      date: "Sep 15, 2023 - 08:45 AM",
    },
    {
      id: "tx2",
      type: "recharge",
      method: "bKash",
      amount: 200,
      date: "Sep 14, 2023 - 07:30 PM",
    },
    {
      id: "tx3",
      type: "ride",
      from: "Agargaon",
      to: "Uttara North",
      amount: 25,
      date: "Sep 14, 2023 - 05:15 PM",
    },
    {
      id: "tx4",
      type: "ride",
      from: "Uttara North",
      to: "Motijheel",
      amount: 35,
      date: "Sep 13, 2023 - 09:20 AM",
    },
    {
      id: "tx5",
      type: "recharge",
      method: "Card",
      amount: 500,
      date: "Sep 10, 2023 - 02:15 PM",
    },
  ];

  // Handle card detection from NFCCardScanner
  const handleCardDetected = (data: { id: string; balance: number }) => {
    setCardData({
      cardId: data.id,
      balance: data.balance,
      name: "My MRT Card",
      lastUsed: new Date().toLocaleDateString(),
    });
    setShowScanner(false);
  };

  const handleRecharge = () => {
    setShowRechargeFlow(true);
  };

  const handleCloseRecharge = () => {
    setShowRechargeFlow(false);
  };

  const handleRechargeComplete = (data: {
    cardId: string;
    initialBalance: number;
    rechargeAmount: number;
    finalBalance: number;
    paymentMethod: string;
  }) => {
    setCardData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        balance: data.finalBalance,
      };
    });
    setShowRechargeFlow(false);
  };

  const handleRescan = () => {
    setShowScanner(true);
    setCardData(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold">MRT Pass</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        {showRechargeFlow ? (
          <div className="max-w-md mx-auto">
            <Button
              variant="ghost"
              onClick={handleCloseRecharge}
              className="mb-4 text-white"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <CardRechargeFlow onComplete={handleRechargeComplete} />
          </div>
        ) : showScanner ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Tap Your Card</h2>
              <p className="text-gray-400">
                Hold your card behind your phone to read balance
              </p>
            </div>
            <NFCCardScanner
              onCardDetected={handleCardDetected}
              isScanning={true}
            />
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {cardData && (
              <div className="space-y-6">
                {/* Card Balance Section */}
                <Card className="bg-gradient-to-br from-blue-900 to-blue-700 border-none text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{cardData.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-100 hover:text-white hover:bg-blue-800"
                        onClick={handleRescan}
                      >
                        Scan Another
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      Card ID: {cardData.cardId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <p className="text-sm text-blue-200">Current Balance</p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">
                          ৳{cardData.balance}
                        </span>
                        {cardData.balance < 100 && (
                          <span className="ml-2 text-sm text-red-300">
                            Low balance
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <History className="h-4 w-4 mr-2 text-blue-400" />
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-800">
                      {transactions.slice(0, 4).map((tx) => (
                        <div key={tx.id} className="p-4">
                          <div className="flex justify-between">
                            <div>
                              {tx.type === "ride" ? (
                                <p className="font-medium text-sm">
                                  {tx.from} to {tx.to}
                                </p>
                              ) : (
                                <p className="font-medium text-sm">
                                  Recharge via {tx.method}
                                </p>
                              )}
                              <p className="text-xs text-gray-400">{tx.date}</p>
                            </div>
                            <span
                              className={`font-medium ${tx.type === "ride" ? "text-red-400" : "text-green-400"}`}
                            >
                              {tx.type === "ride" ? "-" : "+"}৳{tx.amount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      variant="ghost"
                      className="w-full text-blue-400 hover:text-blue-300"
                    >
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <div className="bg-blue-900/50 p-3 rounded-full mb-2">
                        <CreditCard className="h-6 w-6 text-blue-400" />
                      </div>
                      <p className="text-sm font-medium">Card Details</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <div className="bg-blue-900/50 p-3 rounded-full mb-2">
                        <Wallet className="h-6 w-6 text-blue-400" />
                      </div>
                      <p className="text-sm font-medium">Trip Planner</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      {/* Footer with Recharge Button */}
      {cardData && !showRechargeFlow && (
        <div className="mt-6 pb-4">
          <Button
            onClick={handleRecharge}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Recharge Card
          </Button>
        </div>
      )}
      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-500">
        <p>© 2024 Dhaka MRT Pass. All rights reserved.</p>
        <p className="mt-1">Version 1.0.0</p>
      </footer>
    </div>
  );
};

export default HomePage;
