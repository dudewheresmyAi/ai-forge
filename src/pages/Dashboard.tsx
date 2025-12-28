import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  CreditCard, 
  Settings, 
  LogOut, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  User as UserIcon,
  ArrowLeft
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CalendlyModal from "@/components/CalendlyModal";

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  amount: number;
  billing_period: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "billing" | "settings">("overview");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSubscriptions(data || []);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoadingSubscriptions(false);
      }
    };

    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-4 h-4 text-primary" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getPlanName = (planId: string) => {
    const plans: Record<string, string> = {
      starter: "Starter Plan",
      growth: "Growth Plan",
      enterprise: "Enterprise Plan",
    };
    return plans[planId] || planId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>Dashboard | AgenticForce</title>
        <meta name="description" content="Manage your AgenticForce subscriptions and account" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span className="text-xl font-heading font-bold text-foreground">AgenticForce</span>
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">Dashboard</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Site
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto container-padding py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Welcome back!
            </h1>
            <p className="text-muted-foreground">
              {user.email}
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 p-1 bg-secondary/50 rounded-lg w-fit">
            {[
              { id: "overview", label: "Overview", icon: UserIcon },
              { id: "billing", label: "Billing", icon: CreditCard },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Subscription Overview</CardTitle>
                    <CardDescription>Your current plan and usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingSubscriptions ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : subscriptions.length > 0 ? (
                      <div className="space-y-4">
                        {subscriptions.slice(0, 3).map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(sub.status)}
                              <div>
                                <p className="font-medium text-foreground">
                                  {getPlanName(sub.plan_id)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatAmount(sub.amount)} / {sub.billing_period}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                sub.status === "active" 
                                  ? "bg-primary/20 text-primary"
                                  : sub.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-destructive/20 text-destructive"
                              }`}>
                                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No active subscriptions</h3>
                        <p className="text-muted-foreground mb-4">Choose a plan to get started</p>
                        <Link to="/#pricing">
                          <Button variant="hero">View Plans</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setIsCalendlyOpen(true)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Demo
                    </Button>
                    <Link to="/#pricing" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Upgrade Plan
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "billing" && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past transactions and invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingSubscriptions ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : subscriptions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Plan</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period Start</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period End</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscriptions.map((sub) => (
                            <tr key={sub.id} className="border-b border-border/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(sub.status)}
                                  <span className="font-medium text-foreground">
                                    {getPlanName(sub.plan_id)}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-foreground">
                                {formatAmount(sub.amount)}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  sub.status === "active" 
                                    ? "bg-primary/20 text-primary"
                                    : sub.status === "pending"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : "bg-destructive/20 text-destructive"
                                }`}>
                                  {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {formatDate(sub.current_period_start)}
                              </td>
                              <td className="py-3 px-4 text-muted-foreground">
                                {formatDate(sub.current_period_end)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No billing history</h3>
                      <p className="text-muted-foreground">
                        Your transactions will appear here once you subscribe
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                      <p className="text-foreground">{formatDate(user.created_at)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">User ID</label>
                      <p className="text-muted-foreground text-sm font-mono">{user.id}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </>
  );
};

export default Dashboard;
