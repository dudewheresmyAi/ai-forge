-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create subscriptions table for PayPal payments
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  paypal_order_id TEXT NOT NULL,
  paypal_payer_id TEXT,
  payer_email TEXT NOT NULL,
  payer_name TEXT,
  plan_id TEXT NOT NULL,
  billing_period TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_source TEXT DEFAULT 'paypal',
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
ON public.subscriptions
FOR SELECT
USING (auth.uid() = user_id OR payer_email = auth.jwt()->>'email');

-- Policy: Service role can insert subscriptions (from edge functions)
CREATE POLICY "Service can insert subscriptions"
ON public.subscriptions
FOR INSERT
WITH CHECK (true);

-- Policy: Service can update subscriptions
CREATE POLICY "Service can update subscriptions"
ON public.subscriptions
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_subscriptions_paypal_order ON public.subscriptions(paypal_order_id);
CREATE INDEX idx_subscriptions_payer_email ON public.subscriptions(payer_email);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();