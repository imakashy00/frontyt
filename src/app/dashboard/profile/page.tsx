"use client";

import { useAuthContext } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import axios from "axios";
import { Check, Loader2, LogOut, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SubscribedUser = {
  plan: string;
  current_period_end: Date;
};

const ProfilePage = () => {
  const { user, logout } = useAuthContext();
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancellationReason, setCancellationReason] = useState<string>("");
  const [isYearly, setIsYearly] = useState(true);
  const [paddle, setPaddle] = useState<Paddle | undefined>();
  const [isCancellationLoading, setIsCancellationLoading] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<SubscribedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define prices
  const monthlyPrice = 19;
  const yearlyPrice = 199;
  const savings = monthlyPrice * 12 - yearlyPrice;

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/status`,
          { withCredentials: true }
        );

        const data = {
          plan: response.data.plan,
          current_period_end: new Date(response.data.current_period_end),
        };

        setSubscriptionDetails(data);
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);


  // Initialize Paddle
  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: "test_963be56e83b4879ea5700a772e2",
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        } else {
          console.error("Failed to initialize Paddle - instance is undefined");
          toast.error("Failed to initialize payment system");
        }
      })
      .catch((error) => {
        console.error("Error initializing Paddle:", error);
        toast.error("Failed to initialize payment system");
      });
  }, []);

  const handleSubscribe = () => {
    if (!paddle) {
      toast.error("Payment system is not available");
      return;
    }

    try {
      paddle.Checkout.open({
        items: [
          {
            priceId: isYearly
              ? "pri_01jp4tnsavagaw4s28pnc45gak"
              : "pri_01jp4tmpxadzvj5f7kd3kprnk5",
            quantity: 1,
          },
        ],
        customer: {
          email: user?.email || "",
        },
        customData: {
          userId: user?.id,
          email: user?.email,
        },
        settings: {
          successUrl: window.location.origin + "/dashboard/profile",
        },
      });
    } catch (error) {
      console.error("Error opening checkout:", error);
      toast.error("Failed to open checkout");
    }
  };

  const confirmCancellation = async () => {
    // Validate reason
    if (cancellationReason.trim().length === 0) {
      toast.error("Please tell us why you're cancelling");
      return;
    }

    setIsCancellationLoading(true);

    try {
      // Call backend API to cancel subscription
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription/cancel`,
        {},
        { withCredentials: true }
      );

      // Axios puts the response data directly in response.data
      const data = response.data;

      // Handle successful cancellation
      toast.success(
        "Your subscription has been cancelled. Access will continue until the end of billing period.",
        data
      );

      // Update UI state
      // setIsSubscribed(false);
      setIsCanceling(false);
      setCancellationReason("");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel subscription"
      );
    } finally {
      setIsCancellationLoading(false);
    }
  };

  return (
    <div className="container p-10">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - Profile */}
        <div className="lg:col-span-5 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  {user?.image ? (
                    <div className="relative w-32 h-32">
                      <Image
                        src={user.image}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-4 border-[#5d3fd3]/10"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserIcon size={50} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-gray-500">Name</Label>
                      <p className="text-lg font-medium">
                        {user?.name || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Email</Label>
                      <p className="text-lg font-medium">
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Subscription */}
        <div className="lg:col-span-7">
          {/* Subscription Information */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl">
                Subscription Information
              </CardTitle>
              <CardDescription>
                Manage your subscription details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Plan */}

                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Current Plan</h3>
                        <>
                          <div className="flex items-center gap-2">
                            <div className="bg-[#5d3fd3] text-white border rounded p-2">
                              {subscriptionDetails?.plan === "monthly"
                                ? "Monthly"
                                : "Annual"}
                              Plan
                            </div>
                            <div className="bg-green-500 text-white rounded p-1">
                              Active
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            {subscriptionDetails?.plan === "monthly"
                              ? "You're currently paying $19/month"
                              : "You're currently paying $199/year"}
                          </p>
                        </>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing for unsubscribed users */}
                {!isLoading && !user?.subscribed && (
                  <div className="mt-1">
                    {/* Pricing Toggle */}
                    <div className="flex items-center justify-center mb-6">
                      <span
                        className={`mr-3 ${
                          !isYearly ? "text-[#5d3fd3]" : "text-gray-500"
                        }`}
                      >
                        Monthly
                      </span>
                      <button
                        onClick={() => setIsYearly((prev) => !prev)}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#5d3fd3]/80"
                      >
                        <span className="sr-only">Toggle billing period</span>
                        <span
                          className={`${
                            isYearly
                              ? "translate-x-6 bg-[#5d3fd3]"
                              : "translate-x-1 bg-gray-500"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </button>
                      <span
                        className={`ml-3 ${
                          isYearly ? "text-[#5d3fd3]" : "text-gray-500"
                        }`}
                      >
                        Yearly
                      </span>
                    </div>

                    {/* Pricing Card */}
                    <div className="border rounded-xl overflow-hidden">
                      <div className="bg-[#5d3fd3]/5 px-6 py-4 border-b">
                        <div className="flex justify-between items-center h-[30px]">
                          <h4 className="font-bold text-lg">Premium Plan</h4>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#5d3fd3]">
                              ${isYearly ? yearlyPrice : monthlyPrice}
                              <span className="text-sm font-normal text-gray-500 ml-1">
                                {isYearly ? "/year" : "/month"}
                              </span>
                            </p>
                            {isYearly && (
                              <p className="text-xs text-green-600">
                                Save ${savings}/year
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="p-6">
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center mr-3">
                              <Check className="h-3 w-3 text-[#5d3fd3]" />
                            </div>
                            <span>Unlimited AI-generated notes</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center mr-3">
                              <Check className="h-3 w-3 text-[#5d3fd3]" />
                            </div>
                            <span>AI chatbot for video questions</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center mr-3">
                              <Check className="h-3 w-3 text-[#5d3fd3]" />
                            </div>
                            <span>Notes organization in folders</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-[#5d3fd3]/10 flex items-center justify-center mr-3">
                              <Check className="h-3 w-3 text-[#5d3fd3]" />
                            </div>
                            <span>Export Notes as pdf</span>
                          </li>
                        </ul>

                        <Button
                          onClick={handleSubscribe}
                          className="w-full bg-[#5d3fd3] hover:bg-[#462ab5] text-white"
                        >
                          {isYearly ? "Subscribe Yearly" : "Subscribe Monthly"}
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-4">
                          Cancel anytime. No commitments.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cancel Subscription - Keeping this section */}
                {user?.subscribed && (
                  <div className="pt-4 border-t">
                    <h3 className="font-bold text-gray-700 mb-2">
                      Cancel Subscription
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Your subscription will remain active until the end of the
                      current billing period.
                    </p>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                      onClick={() => {
                        setIsCanceling(true);
                      }}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancellation Dialog */}
      <Dialog open={isCanceling} onOpenChange={setIsCanceling}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Subscription Cancellation</DialogTitle>
            <DialogDescription>
              We&apos;re sorry to see you go. Your access will remain active
              until the end of your current billing period.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label htmlFor="reason" className="text-sm font-medium mb-2 block">
              Please tell us why you&apos;re cancelling
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="reason"
              required
              minLength={10}
              placeholder="Your feedback helps us improve our service"
              className={`w-full h-32 ${
                !cancellationReason.trim()
                  ? "border-red-300 focus:ring-red-500"
                  : ""
              }`}
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
            {cancellationReason.trim() === "" && (
              <p className="text-sm text-red-500 mt-1">
                Please tell us why you&apos;re cancelling
              </p>
            )}
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCanceling(false)}
            >
              Keep Subscription
            </Button>
            <Button
              type="button"
              onClick={confirmCancellation}
              disabled={cancellationReason.trim().length === 0}
              className={`${
                cancellationReason.trim().length === 0
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {isCancellationLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Cancelling...
                </>
              ) : (
                "Confirm Cancellation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
