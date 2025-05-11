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
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Select your preferred payment method to recharge your NFC card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {processing ? (
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <p className="text-lg font-medium">Processing Payment</p>
              <p className="text-sm text-muted-foreground">
                Please do not close this window
              </p>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              {progress < 100
                ? "Connecting to payment gateway..."
                : "Payment successful!"}
            </p>
          </div>
        ) : (
          <Tabs defaultValue="card" onValueChange={setSelectedPaymentMethod}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="card">
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </TabsTrigger>
              <TabsTrigger value="other">
                <Wallet className="h-4 w-4 mr-2" />
                Other
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="py-4">
              <RadioGroup defaultValue="bkash" className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label htmlFor="bkash" className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=50&q=80"
                      alt="bKash"
                      className="h-8 w-8 mr-2 rounded"
                    />
                    bKash
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="nagad" id="nagad" />
                  <Label htmlFor="nagad" className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=50&q=80"
                      alt="Nagad"
                      className="h-8 w-8 mr-2 rounded"
                    />
                    Nagad
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="rocket" id="rocket" />
                  <Label htmlFor="rocket" className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=50&q=80"
                      alt="Rocket"
                      className="h-8 w-8 mr-2 rounded"
                    />
                    Rocket
                  </Label>
                </div>
              </RadioGroup>
              <div className="mt-4 space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input id="mobileNumber" placeholder="01XXXXXXXXX" />
              </div>
            </TabsContent>

            <TabsContent value="other" className="py-4">
              <div className="space-y-4">
                <div className="text-center p-6 border-2 border-dashed rounded-md">
                  <img
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80"
                    alt="QR Code"
                    className="mx-auto h-48 w-48"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Scan this QR code with your banking app
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Or use reference code:</p>
                  <p className="font-mono font-bold text-lg">
                    MRT-
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">
          Amount: ৳{amount.toFixed(2)}
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel} disabled={processing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={processing}>
            {processing ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodSelector;
