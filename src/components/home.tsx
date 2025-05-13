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

  // Real transaction history based on the screenshot
  const transactions = [
    {
      id: "tx1",
      type: "journey",
      from: "Shewrapara",
      to: "Karwan Bazar",
      amount: 27,
      date: "10 May 2025",
      time: "05:00 PM",
    },
    {
      id: "tx2",
      type: "recharge",
      amount: 100,
      date: "10 May 2025",
      time: "05:00 PM",
    },
    {
      id: "tx3",
      type: "journey",
      from: "Shewrapara",
      to: "Bijoy Sarani",
      amount: 18,
      date: "03 May 2025",
      time: "08:00 PM",
    },
    {
      id: "tx4",
      type: "journey",
      from: "Motijheel",
      to: "Shewrapara",
      amount: 45,
      date: "29 Apr 2025",
      time: "09:00 PM",
    },
  ];

  // Handle card detection from NFCCardScanner
  const handleCardDetected = (data: { id: string; balance: number }) => {
    setCardData({
      cardId: data.id,
      balance: data.balance,
      name: "Dhaka Rapid Pass",
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
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">MRT Buddy</h1>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        {showScanner ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Tap Your Rapid Pass</h2>
              <p className="text-gray-600">
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
                <Card className="bg-gray-50 border-none shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <p className="text-gray-500 text-lg">Latest Balance</p>
                      <div className="flex items-center justify-center mt-4">
                        <span className="text-5xl font-bold">
                          ৳ {cardData.balance}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Journeys */}
                <Card className="bg-gray-50 border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Recent Journeys</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="p-4">
                          <div className="flex justify-between">
                            <div>
                              {tx.type === "journey" ? (
                                <p className="font-medium">
                                  {tx.from} → {tx.to}
                                </p>
                              ) : (
                                <p className="font-medium">Balance Update</p>
                              )}
                              <p className="text-sm text-gray-500">
                                {tx.date}, {tx.time}
                              </p>
                            </div>
                            <span
                              className={`font-medium ${tx.type === "journey" ? "text-red-600" : "text-green-600"}`}
                            >
                              {tx.type === "journey" ? "৳ -" : "৳ "}
                              {tx.amount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
      {/* Footer Navigation */}
      <footer className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <div className="p-2">
              <Tag className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">Fare</span>
          </div>
          <div className="flex flex-col items-center bg-pink-100 px-6 py-2 rounded-full">
            <div className="p-2">
              <CreditCard className="h-6 w-6 text-pink-500" />
            </div>
            <span className="text-xs text-pink-500 font-medium">Balance</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2">
              <History className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">History</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2">
              <Settings className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-xs text-gray-500">More</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
