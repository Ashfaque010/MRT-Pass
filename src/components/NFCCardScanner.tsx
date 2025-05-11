import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Smartphone, WifiOff, CheckCircle2, AlertCircle } from "lucide-react";

interface NFCCardScannerProps {
  onCardDetected?: (cardData: { id: string; balance: number }) => void;
  isScanning?: boolean;
}

const NFCCardScanner = ({
  onCardDetected = () => {},
  isScanning = true,
}: NFCCardScannerProps) => {
  const [scanStatus, setScanStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // NFC scanning implementation
  useEffect(() => {
    if (!isScanning) {
      setScanStatus("idle");
      setProgress(0);
      return;
    }

    setScanStatus("scanning");
    let nfcAvailable = false;

    // Check if NFC is available
    if ("NDEFReader" in window) {
      nfcAvailable = true;
    }

    // For demo purposes, simulate scanning
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // In a real app, we would use actual NFC data
          // For demo, simulate success most of the time
          const success = Math.random() > 0.2; // 80% chance of success
          if (success) {
            setScanStatus("success");
            onCardDetected({
              id: "MRT" + Math.floor(Math.random() * 10000),
              balance: Math.floor(Math.random() * 1000),
            });
          } else {
            setScanStatus("error");
            setErrorMessage(
              nfcAvailable
                ? "Could not read card. Please try again."
                : "NFC not available on this device.",
            );
          }
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isScanning, onCardDetected]);

  const handleRetry = () => {
    setScanStatus("idle");
    setProgress(0);
    setErrorMessage("");
    // Restart scanning
    setTimeout(() => {
      setScanStatus("scanning");
    }, 500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800 text-white">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-full h-64 flex justify-center items-center mb-6">
          {/* Phone illustration */}
          <motion.div
            className="relative z-10"
            animate={{
              y: scanStatus === "scanning" ? [0, -10, 0] : 0,
            }}
            transition={{
              repeat: scanStatus === "scanning" ? Infinity : 0,
              duration: 1.5,
            }}
          >
            <Smartphone size={120} className="text-white" />
          </motion.div>

          {/* Card illustration */}
          <motion.div
            className="absolute bg-blue-600 rounded-xl w-32 h-20 z-0"
            style={{ top: "60%" }}
            animate={{
              y: scanStatus === "scanning" ? [0, -5, 0] : 0,
              opacity: scanStatus === "error" ? 0.3 : 1,
            }}
            transition={{
              repeat: scanStatus === "scanning" ? Infinity : 0,
              duration: 1.5,
              delay: 0.2,
            }}
          >
            <div className="h-full w-full flex items-center justify-center text-white font-bold">
              MRT Card
            </div>
          </motion.div>

          {/* NFC Waves animation */}
          {scanStatus === "scanning" && (
            <>
              <motion.div
                className="absolute rounded-full border-2 border-blue-400 z-5"
                initial={{ width: 30, height: 30, opacity: 1 }}
                animate={{ width: 100, height: 100, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ top: "40%" }}
              />
              <motion.div
                className="absolute rounded-full border-2 border-blue-400 z-5"
                initial={{ width: 30, height: 30, opacity: 1 }}
                animate={{ width: 100, height: 100, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                style={{ top: "40%" }}
              />
            </>
          )}

          {/* Success indicator */}
          {scanStatus === "success" && (
            <motion.div
              className="absolute top-0 right-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle2 size={40} className="text-green-500" />
            </motion.div>
          )}

          {/* Error indicator */}
          {scanStatus === "error" && (
            <motion.div
              className="absolute top-0 right-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <WifiOff size={40} className="text-red-500" />
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        {scanStatus === "scanning" && (
          <div className="w-full mb-4">
            <Progress value={progress} className="h-2 bg-gray-800" />
            <p className="text-center mt-2 text-sm text-gray-400">
              Scanning... Please don't move your card
            </p>
          </div>
        )}

        {/* Success message */}
        {scanStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-4"
          >
            <Alert className="bg-green-900/30 border-green-700 text-green-400">
              <AlertDescription className="flex items-center">
                <CheckCircle2 size={16} className="mr-2" />
                Card detected successfully!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Error message */}
        {scanStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-4"
          >
            <Alert className="bg-red-900/30 border-red-800 text-red-400">
              <AlertDescription className="flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {errorMessage}
              </AlertDescription>
            </Alert>
            <Button
              onClick={handleRetry}
              variant="outline"
              className="mt-4 w-full border-blue-700 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default NFCCardScanner;
