import React, { useState } from "react";
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
import { CreditCard, History, Plus, Settings, User } from "lucide-react";

// Main home page component for the Dhaka MRT Pass app
const HomePage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showRechargeFlow, setShowRechargeFlow] = useState(false);

  // Mock data for cards
  const cards = [
    {
      id: "card1",
      name: "Work Commute Card",
      balance: 350,
      lastUsed: "2023-09-15",
    },
    { id: "card2", name: "Weekend Card", balance: 120, lastUsed: "2023-09-10" },
    { id: "card3", name: "Family Card", balance: 75, lastUsed: "2023-09-05" },
  ];

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleRecharge = () => {
    setShowRechargeFlow(true);
  };

  const handleCloseRecharge = () => {
    setShowRechargeFlow(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">MRT Buddy</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
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
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleCloseRecharge}
              className="mb-4"
            >
              &larr; Back to Cards
            </Button>
            <CardRechargeFlow onComplete={handleCloseRecharge} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card Selection Section */}
            <div className="lg:col-span-1">
              <Card className="h-full bg-white">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>My Cards</span>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Card
                    </Button>
                  </CardTitle>
                  <CardDescription>Select a card to manage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedCard === card.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                        onClick={() => handleCardSelect(card.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{card.name}</h3>
                            <p className="text-sm text-gray-500">
                              Last used: {card.lastUsed}
                            </p>
                          </div>
                          <Badge
                            variant={
                              card.balance < 100 ? "destructive" : "secondary"
                            }
                          >
                            ৳{card.balance}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Card Details Section */}
            <div className="lg:col-span-2">
              {selectedCard ? (
                <Card className="h-full bg-white">
                  <CardHeader>
                    <CardTitle>
                      {cards.find((card) => card.id === selectedCard)?.name}
                    </CardTitle>
                    <CardDescription>Card ID: {selectedCard}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-2">
                        Current Balance
                      </h3>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">
                          ৳
                          {
                            cards.find((card) => card.id === selectedCard)
                              ?.balance
                          }
                        </span>
                        {(cards.find((card) => card.id === selectedCard)
                          ?.balance || 0) < 100 && (
                          <span className="ml-2 text-sm text-red-500">
                            Low balance
                          </span>
                        )}
                      </div>
                    </div>

                    <Tabs defaultValue="history">
                      <TabsList className="mb-4">
                        <TabsTrigger value="history">
                          <History className="h-4 w-4 mr-2" /> Transaction
                          History
                        </TabsTrigger>
                        <TabsTrigger value="profile">
                          <User className="h-4 w-4 mr-2" /> Card Profile
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="history">
                        <div className="space-y-4">
                          {/* Mock transaction history */}
                          <div className="p-3 border-b">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">
                                  Uttara North to Agargaon
                                </p>
                                <p className="text-sm text-gray-500">
                                  Sep 15, 2023 - 08:45 AM
                                </p>
                              </div>
                              <span className="text-red-500 font-medium">
                                -৳25
                              </span>
                            </div>
                          </div>
                          <div className="p-3 border-b">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">
                                  Recharge via bKash
                                </p>
                                <p className="text-sm text-gray-500">
                                  Sep 14, 2023 - 07:30 PM
                                </p>
                              </div>
                              <span className="text-green-500 font-medium">
                                +৳200
                              </span>
                            </div>
                          </div>
                          <div className="p-3 border-b">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">
                                  Agargaon to Uttara North
                                </p>
                                <p className="text-sm text-gray-500">
                                  Sep 14, 2023 - 05:15 PM
                                </p>
                              </div>
                              <span className="text-red-500 font-medium">
                                -৳25
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="profile">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Card Type</p>
                              <p>Standard Rapid Pass</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Issue Date
                              </p>
                              <p>Jan 15, 2023</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Last Recharge
                              </p>
                              <p>Sep 14, 2023</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <Badge>Active</Badge>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={handleRecharge}
                      disabled={!selectedCard}
                    >
                      Recharge Card
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center bg-white">
                  <CardContent className="text-center py-12">
                    <CreditCard className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      No Card Selected
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Please select a card from the list to view details and
                      recharge
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-400">
        <p>© 2024 Dhaka MRT Pass. All rights reserved.</p>
        <p className="text-xs mt-1">Version 1.0.0</p>
      </footer>
    </div>
  );
};

export default HomePage;
