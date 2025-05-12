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
import NFCCardScanner from "./NFCCardScanner";
import {
  CreditCard,
  History,
  Info,
  Settings,
  User,
  ChevronLeft,
  Wallet,
  Calendar,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";

// Main home page component for the Dhaka MRT Pass app
const HomePage = () => {
  const [cardData, setCardData] = useState<{
    cardId: string;
    balance: number;
    lastUsed?: string;
    name?: string;
    issueDate?: string;
    expiryDate?: string;
    cardType?: string;
    cardStatus?: string;
  } | null>(null);
  const [showScanner, setShowScanner] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Real transaction history
  const transactions = [
    {
      id: "tx1",
      type: "ride",
      from: "Uttara North",
      to: "Agargaon",
      amount: 25,
      date: "May 15, 2024 - 08:45 AM",
    },
    {
      id: "tx2",
      type: "recharge",
      method: "bKash",
      amount: 200,
      date: "May 14, 2024 - 07:30 PM",
    },
    {
      id: "tx3",
      type: "ride",
      from: "Agargaon",
      to: "Uttara North",
      amount: 25,
      date: "May 14, 2024 - 05:15 PM",
    },
    {
      id: "tx4",
      type: "ride",
      from: "Uttara North",
      to: "Motijheel",
      amount: 35,
      date: "May 13, 2024 - 09:20 AM",
    },
    {
      id: "tx5",
      type: "recharge",
      method: "Card",
      amount: 500,
      date: "May 10, 2024 - 02:15 PM",
    },
    {
      id: "tx6",
      type: "ride",
      from: "Motijheel",
      to: "Uttara North",
      amount: 35,
      date: "May 09, 2024 - 06:20 PM",
    },
    {
      id: "tx7",
      type: "ride",
      from: "Uttara North",
      to: "Shahbagh",
      amount: 30,
      date: "May 08, 2024 - 10:15 AM",
    },
    {
      id: "tx8",
      type: "recharge",
      method: "Nagad",
      amount: 300,
      date: "May 05, 2024 - 11:30 AM",
    },
  ];

  // Handle card detection from NFCCardScanner
  const handleCardDetected = (data: { id: string; balance: number }) => {
    setCardData({
      cardId: data.id,
      balance: data.balance,
      name: "Standard MRT Pass",
      lastUsed: new Date().toLocaleDateString(),
      issueDate: "01/01/2024",
      expiryDate: "01/01/2026",
      cardType: "Standard",
      cardStatus: "Active",
    });
    setShowScanner(false);
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
        {showScanner ? (
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

                {/* Tabs for Card Info */}
                <Tabs
                  defaultValue="overview"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full bg-gray-800">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      History
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      Details
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-4 space-y-4">
                    {/* Recent Transactions */}
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
                                  <p className="text-xs text-gray-400">
                                    {tx.date}
                                  </p>
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
                          onClick={() => setActiveTab("history")}
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
                          <p className="text-sm font-medium">Card Status</p>
                          <Badge className="mt-2 bg-green-600">
                            {cardData.cardStatus}
                          </Badge>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                          <div className="bg-blue-900/50 p-3 rounded-full mb-2">
                            <Calendar className="h-6 w-6 text-blue-400" />
                          </div>
                          <p className="text-sm font-medium">Valid Until</p>
                          <p className="text-xs mt-2 text-gray-300">
                            {cardData.expiryDate}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* History Tab */}
                  <TabsContent value="history" className="mt-4">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <History className="h-4 w-4 mr-2 text-blue-400" />
                          Transaction History
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Complete history of your card usage
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
                          {transactions.map((tx) => (
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
                                  <p className="text-xs text-gray-400">
                                    {tx.date}
                                  </p>
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
                    </Card>
                  </TabsContent>

                  {/* Details Tab */}
                  <TabsContent value="details" className="mt-4">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Info className="h-4 w-4 mr-2 text-blue-400" />
                          Card Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Card Type</p>
                            <p className="font-medium">{cardData.cardType}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Card Status</p>
                            <p className="font-medium">{cardData.cardStatus}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Issue Date</p>
                            <p className="font-medium">{cardData.issueDate}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Expiry Date</p>
                            <p className="font-medium">{cardData.expiryDate}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Card ID</p>
                            <p className="font-medium">{cardData.cardId}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-400">Last Used</p>
                            <p className="font-medium">{cardData.lastUsed}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-800">
                          <h4 className="text-sm font-medium mb-2">
                            Card Features
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-center text-sm">
                              <Tag className="h-4 w-4 mr-2 text-blue-400" />
                              Standard fare rates
                            </li>
                            <li className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-blue-400" />
                              Valid for 2 years from issue date
                            </li>
                            <li className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                              Access to all MRT stations
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-500">
        <p>© 2024 Dhaka MRT Pass. All rights reserved.</p>
        <p className="mt-1">Version 1.0.0</p>
      </footer>
    </div>
  );
};

export default HomePage;
