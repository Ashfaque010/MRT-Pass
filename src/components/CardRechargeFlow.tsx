import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Smartphone,
  Banknote,
} from "lucide-react";
import NFCCardScanner from "./NFCCardScanner";
import PaymentMethodSelector from "./PaymentMethodSelector";

interface CardRechargeFlowProps {
  onComplete?: (data: {
    cardId: string;
    initialBalance: number;
    rechargeAmount: number;
    finalBalance: number;
    paymentMethod: string;
  }) => void;
}

const CardRechargeFlow = ({ onComplete = () => {} }: CardRechargeFlowProps) => {
  // Flow state management
  const [step, setStep] = useState<number>(1);
  const [cardData, setCardData] = useState<{
    cardId: string;
    balance: number;
  } | null>(null);
  const [rechargeAmount, setRechargeAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Predefined recharge amounts
  const rechargeOptions = [100, 200, 500, 1000];

  // Handle card detection from NFCCardScanner
  const handleCardDetected = (cardData: { id: string; balance: number }) => {
    setCardData({ cardId: cardData.id, balance: cardData.balance });
    setStep(2);
  };

  // Handle recharge amount selection
  const handleAmountSelect = (amount: number) => {
    setRechargeAmount(amount);
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setStep(4);
    processPayment();
  };

  // Simulate payment processing
  const processPayment = () => {
    setIsProcessing(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5); // Move to confirmation step

      // Call onComplete with transaction data
      if (cardData) {
        onComplete({
          cardId: cardData.cardId,
          initialBalance: cardData.balance,
          rechargeAmount: rechargeAmount,
          finalBalance: cardData.balance + rechargeAmount,
          paymentMethod: paymentMethod,
        });
      }
    }, 2000);
  };

  // Reset the flow
  const resetFlow = () => {
    setStep(1);
    setCardData(null);
    setRechargeAmount(0);
    setPaymentMethod("");
  };

  // Go to previous step
  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Calculate progress percentage
  const progressPercentage = (step / 5) * 100;

  return (
    <div className="w-full max-w-md mx-auto bg-black p-4">
      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={progressPercentage} className="h-2 bg-gray-800" />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Scan Card</span>
          <span>Amount</span>
          <span>Payment</span>
          <span>Process</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Main content card */}
      <Card className="w-full bg-gray-900 border-gray-800 text-white">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Scan Your NFC Card"}
            {step === 2 && "Select Recharge Amount"}
            {step === 3 && "Choose Payment Method"}
            {step === 4 && "Processing Payment"}
            {step === 5 && "Recharge Complete!"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === 1 && "Place your card behind your phone to scan"}
            {step === 2 &&
              cardData &&
              `Card ID: ${cardData.cardId} • Current Balance: ৳${cardData.balance}`}
            {step === 3 && `Recharging ৳${rechargeAmount}`}
            {step === 4 && "Please wait while we process your payment"}
            {step === 5 && "Your card has been successfully recharged"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[300px] flex flex-col items-center justify-center"
          >
            {/* Step 1: Card Scanning */}
            {step === 1 && (
              <div className="w-full flex justify-center">
                <NFCCardScanner
                  onCardDetected={handleCardDetected}
                  isScanning={true}
                />
              </div>
            )}

            {/* Step 2: Recharge Amount Selection */}
            {step === 2 && (
              <div className="w-full space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {rechargeOptions.map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        rechargeAmount === amount ? "default" : "outline"
                      }
                      className={`h-16 text-lg ${rechargeAmount === amount ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700 text-gray-300 hover:bg-gray-800"}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      ৳{amount}
                    </Button>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Or enter custom amount:
                  </label>
                  <div className="flex items-center">
                    <span className="text-lg mr-2 text-gray-300">৳</span>
                    <input
                      type="number"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter amount"
                      min="50"
                      max="5000"
                      value={rechargeAmount || ""}
                      onChange={(e) =>
                        setRechargeAmount(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Selection */}
            {step === 3 && (
              <div className="w-full">
                <PaymentMethodSelector
                  amount={rechargeAmount}
                  onPaymentComplete={(method, transactionId) =>
                    handlePaymentMethodSelect(method)
                  }
                  onCancel={() => goBack()}
                />
              </div>
            )}

            {/* Step 4: Processing Payment */}
            {step === 4 && (
              <div className="text-center space-y-4">
                <div className="animate-pulse">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                </div>
                <p>Processing your payment of ৳{rechargeAmount}</p>
                <p className="text-sm text-gray-400">
                  Please do not close this window
                </p>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && cardData && (
              <div className="text-center space-y-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />

                <div className="space-y-2">
                  <p className="text-lg font-medium">
                    Card Successfully Recharged!
                  </p>
                  <p>
                    Your new balance is{" "}
                    <span className="text-blue-400 font-bold">
                      ৳{cardData.balance + rechargeAmount}
                    </span>
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-gray-800/50 border-gray-700 text-left">
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">Card ID:</span>{" "}
                    {cardData.cardId}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">
                      Previous Balance:
                    </span>{" "}
                    ৳{cardData.balance}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">
                      Recharge Amount:
                    </span>{" "}
                    ৳{rechargeAmount}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">
                      New Balance:
                    </span>{" "}
                    <span className="text-blue-400">
                      ৳{cardData.balance + rechargeAmount}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">
                      Payment Method:
                    </span>{" "}
                    {paymentMethod}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">
                      Transaction ID:
                    </span>{" "}
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-gray-300">Date:</span>{" "}
                    {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>

        <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
          {step > 1 && step !== 5 && (
            <Button
              variant="outline"
              onClick={goBack}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}

          {step === 1 && (
            <div></div> // Empty div for spacing when there's no back button
          )}

          {step === 2 && (
            <Button
              disabled={rechargeAmount <= 0}
              onClick={() => setStep(3)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {step === 5 && (
            <div className="flex w-full space-x-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={resetFlow}
              >
                Recharge Another Card
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Download Receipt
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardRechargeFlow;
