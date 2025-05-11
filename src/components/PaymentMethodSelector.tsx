import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PaymentMethodSelectorProps {
  amount?: number;
  onPaymentComplete?: (paymentMethod: string, transactionId: string) => void;
  onCancel?: () => void;
  isProcessing?: boolean;
}

const PaymentMethodSelector = ({
  amount = 500,
  onPaymentComplete = () => {},
  onCancel = () => {},
  isProcessing = false,
}: PaymentMethodSelectorProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(isProcessing);
  const [progress, setProgress] = useState(0);

  const handlePayment = () => {
    setProcessing(true);

    // Simulate payment processing with progress
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setProcessing(false);
          // Generate a mock transaction ID
          const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
          onPaymentComplete(selectedPaymentMethod, transactionId);
        }, 500);
      }
    }, 300);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription className="text-gray-400">
          Select your preferred payment method to recharge your NFC card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {processing ? (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <p className="text-lg font-medium">Processing Payment</p>
              <p className="text-sm text-gray-400">
                Please do not close this window
              </p>
            </div>
            <Progress value={progress} className="w-full bg-gray-800" />
            <p className="text-center text-sm text-gray-400">
              {progress < 100
                ? "Connecting to payment gateway..."
                : "Payment successful!"}
            </p>
          </div>
        ) : (
          <Tabs defaultValue="card" onValueChange={setSelectedPaymentMethod}>
            <TabsList className="grid grid-cols-3 w-full bg-gray-800">
              <TabsTrigger
                value="card"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </TabsTrigger>
              <TabsTrigger
                value="mobile"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
              <TabsTrigger
                value="other"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Other
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-gray-300">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-gray-300">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc" className="text-gray-300">
                    CVC
                  </Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Cardholder Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="py-4">
              <RadioGroup defaultValue="bkash" className="space-y-3">
                <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 bg-gray-800">
                  <RadioGroupItem
                    value="bkash"
                    id="bkash"
                    className="border-gray-600 text-blue-500"
                  />
                  <Label
                    htmlFor="bkash"
                    className="flex items-center text-gray-300"
                  >
                    <div className="h-8 w-8 mr-2 rounded bg-pink-600 flex items-center justify-center text-white font-bold text-xs">
                      bKash
                    </div>
                    bKash
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 bg-gray-800">
                  <RadioGroupItem
                    value="nagad"
                    id="nagad"
                    className="border-gray-600 text-blue-500"
                  />
                  <Label
                    htmlFor="nagad"
                    className="flex items-center text-gray-300"
                  >
                    <div className="h-8 w-8 mr-2 rounded bg-orange-600 flex items-center justify-center text-white font-bold text-xs">
                      Nagad
                    </div>
                    Nagad
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-gray-700 rounded-md p-3 bg-gray-800">
                  <RadioGroupItem
                    value="rocket"
                    id="rocket"
                    className="border-gray-600 text-blue-500"
                  />
                  <Label
                    htmlFor="rocket"
                    className="flex items-center text-gray-300"
                  >
                    <div className="h-8 w-8 mr-2 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      Rocket
                    </div>
                    Rocket
                  </Label>
                </div>
              </RadioGroup>
              <div className="mt-4 space-y-2">
                <Label htmlFor="mobileNumber" className="text-gray-300">
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  placeholder="01XXXXXXXXX"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </TabsContent>

            <TabsContent value="other" className="py-4">
              <div className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed border-gray-700 rounded-md bg-gray-800">
                  <div className="mx-auto h-48 w-48 bg-gray-700 rounded-md flex items-center justify-center">
                    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-32 h-32">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-blue-500 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Scan this QR code with your banking app
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Or use reference code:
                  </p>
                  <p className="font-mono font-bold text-lg text-blue-400">
                    MRT-
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <div className="text-lg font-semibold">
          Amount: <span className="text-blue-400">৳{amount.toFixed(2)}</span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={processing}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {processing ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodSelector;
